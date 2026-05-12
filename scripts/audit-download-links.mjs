import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public");
const downloadsRoot = path.join(publicRoot, "altec", "downloads");
const sourceRoot = path.join(projectRoot, "src");
const skippedDirectories = new Set([".git", ".next", "asset-archive", "node_modules", "out"]);
const downloadHrefPattern = /href=\\?["'](\/altec\/downloads\/[^"'\\]+)\\?["']/g;
const downloadRowPattern = /\[[^\]\n]*["'`]([^"'`]+?\.(?:pdf|rar))["'`][^\]\n]*\]/gi;
const placeholderDownloadPattern = /href=\\?["']\/downloads\\?["']/g;
const richContentFiles = [
  path.join(projectRoot, "src", "lib", "product-rich-details.ts"),
  path.join(projectRoot, "src", "lib", "application-data.ts"),
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (skippedDirectories.has(entry.name)) {
        continue;
      }

      files.push(...(await walk(absolutePath)));
      continue;
    }

    files.push(absolutePath);
  }

  return files;
}

async function fileExists(assetPath) {
  const absolutePath = path.join(publicRoot, assetPath.replace(/^\//, ""));

  try {
    await access(absolutePath);
    return true;
  } catch {
    return false;
  }
}

async function existingFile(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const sourceFiles = await walk(sourceRoot);
  const missing = [];
  const referencedDownloads = new Set();

  for (const file of sourceFiles) {
    const text = await readFile(file, "utf8");

    for (const match of text.matchAll(downloadHrefPattern)) {
      const assetPath = match[1];
      referencedDownloads.add(assetPath);

      if (!(await fileExists(assetPath))) {
        missing.push({ file, assetPath });
      }
    }
  }

  const siteData = await readFile(path.join(projectRoot, "src", "lib", "site-data.ts"), "utf8");
  for (const match of siteData.matchAll(downloadRowPattern)) {
    const assetPath = `/altec/downloads/${match[1]}`;
    referencedDownloads.add(assetPath);

    if (!(await fileExists(assetPath))) {
      missing.push({ file: path.join(projectRoot, "src", "lib", "site-data.ts"), assetPath });
    }
  }

  const placeholders = [];
  for (const file of richContentFiles) {
    if (!(await existingFile(file))) {
      continue;
    }

    const text = await readFile(file, "utf8");
    const placeholderMatches = text.match(placeholderDownloadPattern) || [];
    for (let index = 0; index < placeholderMatches.length; index += 1) {
      placeholders.push(file);
    }
  }

  if (!(await existingFile(downloadsRoot))) {
    console.error(`Download directory is missing: ${path.relative(projectRoot, downloadsRoot)}`);
    process.exit(1);
  }

  if (missing.length > 0) {
    console.error("\nMissing referenced download files:");
    for (const issue of missing) {
      console.error(`- ${path.relative(projectRoot, issue.file)} -> ${issue.assetPath}`);
    }
  }

  if (placeholders.length > 0) {
    console.error("\nPlaceholder download links in rich content:");
    for (const file of placeholders) {
      console.error(`- ${path.relative(projectRoot, file)} -> /downloads`);
    }
  }

  if (missing.length > 0 || placeholders.length > 0) {
    process.exit(1);
  }

  console.log(`Download link audit passed (${referencedDownloads.size} referenced files).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
