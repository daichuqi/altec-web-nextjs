import { mkdir, readdir, rename, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "public", "altec", "images");
const assetVersion = (process.env.NEXT_PUBLIC_ASSET_VERSION || "local").replace(/[^a-zA-Z0-9._-]/g, "-");
const optimizedRoot = path.join(sourceRoot, "optimized");
const outputRoot = path.join(optimizedRoot, assetVersion);
let activeOutputRoot = outputRoot;
const widths = [160, 320, 480, 640, 960, 1280, 1600];
const sourceExtensions = new Set([".jpg", ".jpeg", ".png"]);
const skippedDirectoryNames = new Set(["legacy", "optimized"]);

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (skippedDirectoryNames.has(entry.name)) {
        continue;
      }
      files.push(...(await collectImages(absolutePath)));
      continue;
    }

    if (sourceExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(absolutePath);
    }
  }

  return files;
}

function outputBaseFor(sourceFile) {
  const relative = path.relative(sourceRoot, sourceFile);
  const parsed = path.parse(relative);
  return path.join(activeOutputRoot, parsed.dir, parsed.name);
}

async function writeVariant(sourceFile, width, format) {
  const base = outputBaseFor(sourceFile);
  const outputFile = `${base}-${width}.${format}`;
  await mkdir(path.dirname(outputFile), { recursive: true });

  const pipeline = sharp(sourceFile, { failOn: "none" })
    .rotate()
    .resize({
      width,
      withoutEnlargement: true,
      fit: "inside",
    });

  if (format === "avif") {
    await pipeline.avif({ quality: 54, effort: 4 }).toFile(outputFile);
    return;
  }

  await pipeline.webp({ quality: 74, effort: 4 }).toFile(outputFile);
}

async function main() {
  const images = await collectImages(sourceRoot);
  const tempOutputRoot = path.join(projectRoot, ".next", `optimized-images-${assetVersion}.tmp-${process.pid}`);
  activeOutputRoot = tempOutputRoot;
  await rm(tempOutputRoot, { recursive: true, force: true });

  try {
    for (const sourceFile of images) {
      for (const width of widths) {
        await writeVariant(sourceFile, width, "avif");
        await writeVariant(sourceFile, width, "webp");
      }
    }

    await rm(optimizedRoot, { recursive: true, force: true });
    await mkdir(optimizedRoot, { recursive: true });
    await rename(tempOutputRoot, outputRoot);
  } catch (error) {
    await rm(tempOutputRoot, { recursive: true, force: true });
    throw error;
  }

  console.log(`Generated ${images.length * widths.length * 2} optimized image variants in ${path.relative(projectRoot, outputRoot)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
