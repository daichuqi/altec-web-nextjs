import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public");
const sourceRoots = ["src"];
const imageExtensionPattern = /\.(?:avif|gif|ico|jpe?g|png|svg|webp)$/i;
const skippedProjectDirectories = new Set([".git", ".next", "asset-archive", "node_modules", "out"]);
const canonicalImageDirectory = path.join(publicRoot, "altec", "images");
const assetPathPattern = /["'`](\/(?:altec\/[^"'`\s)]+|altec-logo\.svg|favicon\.ico))["'`]/g;
const productImageCallPattern = /productImage\(["'`]([^"'`]+)["'`]\)/g;
const productImageFileCallPattern = /productImageFile\(["'`]([^"'`]+)["'`]\)/g;
const applicationCoverImageCallPattern = /applicationCoverImage\(["'`]([^"'`]+)["'`]\)/g;
const applicationDetailImageCallPattern = /applicationDetailImage\(["'`]([^"'`]+)["'`],\s*["'`]([^"'`]+)["'`]\)/g;
const productImageFilesBlockPattern = /productImageFiles\s*=\s*\{([\s\S]*?)\}\s+as const/;
const productImageFileEntryPattern = /["']?([^"',:\n]+)["']?\s*:\s*["'`]([^"'`]+)["'`]/g;
const allowedImageRoots = ["/altec/images/"];

async function walk(directory, options = {}) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (options.skipDirectory?.(entry.name, absolutePath)) {
        continue;
      }

      files.push(...(await walk(absolutePath, options)));
      continue;
    }

    files.push(absolutePath);
  }

  return files;
}

function isImageFile(file) {
  return imageExtensionPattern.test(file);
}

async function fileExists(relativeAssetPath) {
  const cleanPath = relativeAssetPath.split("?")[0];
  const absolutePath = path.join(publicRoot, cleanPath.replace(/^\//, ""));

  try {
    await access(absolutePath);
    return true;
  } catch {
    return false;
  }
}

function allowedImagePath(assetPath) {
  return allowedImageRoots.some((root) => assetPath === root || assetPath.startsWith(root));
}

function bucketFor(assetPath) {
  const parts = assetPath.replace(/^\//, "").split("/");

  if (parts[0] !== "altec") {
    return "root";
  }

  if (parts[1] !== "images") {
    return `altec/${parts[1]}`;
  }

  if (parts[2] === "applications" && parts[3] === "details") {
    return "altec/images/applications/details";
  }

  return `altec/images/${parts[2]}`;
}

async function productImageFileMap() {
  const assetsSource = await readFile(path.join(projectRoot, "src", "lib", "assets.ts"), "utf8");
  const block = assetsSource.match(productImageFilesBlockPattern)?.[1] || "";
  const entries = new Map();

  for (const match of block.matchAll(productImageFileEntryPattern)) {
    entries.set(match[1].trim(), match[2]);
  }

  return entries;
}

async function main() {
  const sourceFiles = (await Promise.all(sourceRoots.map((root) => walk(path.join(projectRoot, root))))).flat();
  const productImages = await productImageFileMap();
  const imageReferences = new Set();
  const missing = [];
  const disallowed = [];

  function addImageReference(file, assetPath) {
    if (!imageExtensionPattern.test(assetPath)) {
      return;
    }

    imageReferences.add(assetPath);

    if (!allowedImagePath(assetPath)) {
      disallowed.push({ file, assetPath });
    }

    return fileExists(assetPath).then((exists) => {
      if (!exists) {
        missing.push({ file, assetPath });
      }
    });
  }

  for (const file of sourceFiles) {
    const text = await readFile(file, "utf8");
    const checks = [];

    for (const match of text.matchAll(assetPathPattern)) {
      const assetPath = match[1];
      checks.push(addImageReference(file, assetPath));
    }

    for (const match of text.matchAll(productImageCallPattern)) {
      const fileName = productImages.get(match[1]);

      if (!fileName) {
        missing.push({ file, assetPath: `productImage(${match[1]}) has no productImageFiles entry` });
        continue;
      }

      checks.push(addImageReference(file, `/altec/images/products/${fileName}`));
    }

    for (const match of text.matchAll(productImageFileCallPattern)) {
      checks.push(addImageReference(file, `/altec/images/products/${match[1]}`));
    }

    for (const match of text.matchAll(applicationCoverImageCallPattern)) {
      checks.push(addImageReference(file, `/altec/images/applications/${match[1]}`));
    }

    for (const match of text.matchAll(applicationDetailImageCallPattern)) {
      checks.push(addImageReference(file, `/altec/images/applications/details/${match[1]}/${match[2]}`));
    }

    await Promise.all(checks.filter(Boolean));
  }

  const buckets = [...imageReferences].reduce((memo, assetPath) => {
    const bucket = bucketFor(assetPath);
    memo.set(bucket, (memo.get(bucket) || 0) + 1);
    return memo;
  }, new Map());
  const projectFiles = await walk(projectRoot, {
    skipDirectory: (name) => skippedProjectDirectories.has(name),
  });
  const misplacedImageFiles = projectFiles.filter((file) => {
    if (!isImageFile(file)) {
      return false;
    }

    return !file.startsWith(`${canonicalImageDirectory}${path.sep}`);
  });
  const publicMetadataFiles = projectFiles.filter(
    (file) => file.startsWith(`${publicRoot}${path.sep}`) && path.basename(file) === ".DS_Store",
  );

  console.log("Image asset references:");
  for (const [bucket, count] of [...buckets.entries()].sort()) {
    console.log(`- ${bucket}: ${count}`);
  }

  if (disallowed.length > 0) {
    console.error("\nImage paths outside the approved asset roots:");
    for (const issue of disallowed) {
      console.error(`- ${path.relative(projectRoot, issue.file)} -> ${issue.assetPath}`);
    }
  }

  if (missing.length > 0) {
    console.error("\nMissing referenced image files:");
    for (const issue of missing) {
      console.error(`- ${path.relative(projectRoot, issue.file)} -> ${issue.assetPath}`);
    }
  }

  if (misplacedImageFiles.length > 0) {
    console.error("\nImage files outside public/altec/images:");
    for (const file of misplacedImageFiles) {
      console.error(`- ${path.relative(projectRoot, file)}`);
    }
  }

  if (publicMetadataFiles.length > 0) {
    console.error("\nUnexpected macOS metadata files in public:");
    for (const file of publicMetadataFiles) {
      console.error(`- ${path.relative(projectRoot, file)}`);
    }
  }

  if (disallowed.length > 0 || missing.length > 0 || misplacedImageFiles.length > 0 || publicMetadataFiles.length > 0) {
    process.exit(1);
  }

  console.log(`Image asset audit passed (${imageReferences.size} referenced images).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
