import { mkdir, readdir, rename, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";
import { pathExists, projectRoot, relativeToRoot } from "./lib/common.mjs";

const sourceDir = path.resolve(projectRoot, process.argv[2] || "products_renew/modern-clean");
const productDir = path.join(projectRoot, "public", "altec", "images", "products");
const archiveRoot = path.join(projectRoot, "asset-archive", "images");
const batchId = process.env.PRODUCT_IMAGE_BATCH || new Date().toISOString().slice(0, 10);
const oldArchiveDir = path.join(archiveRoot, `product-main-old-${batchId}`);
const originalsArchiveDir = path.join(archiveRoot, `product-photo-batch-${batchId}-originals`);
const targetWidth = 1200;
const targetHeight = 900;
const sourceImagePattern = /\.(?:avif|jpe?g|png|webp)$/i;

async function productFileMap() {
  const files = await readdir(productDir);
  return new Map(
    files
      .filter((file) => sourceImagePattern.test(file))
      .map((file) => [path.parse(file).name.toUpperCase(), file]),
  );
}

async function promoteImage(sourceFile, productFiles) {
  const model = path
    .parse(sourceFile)
    .name.toUpperCase()
    .replace(/^PH_ORP800$/, "PH800");
  const currentFile = productFiles.get(model);

  if (!currentFile) {
    return { status: "missing", model, sourceFile };
  }

  const sourcePath = path.join(sourceDir, sourceFile);
  const currentPath = path.join(productDir, currentFile);
  const archivedOldPath = path.join(oldArchiveDir, currentFile);
  const archivedOriginalPath = path.join(originalsArchiveDir, sourceFile);
  const targetPath = path.join(productDir, `${model}.jpg`);

  if (await pathExists(currentPath)) {
    await rename(currentPath, archivedOldPath);
  }

  await sharp(sourcePath, { failOn: "none" })
    .rotate()
    .resize({
      width: targetWidth,
      height: targetHeight,
      fit: "contain",
      background: "#ffffff",
      withoutEnlargement: true,
    })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(targetPath);

  await rename(sourcePath, archivedOriginalPath);
  return { status: "promoted", model, sourceFile };
}

async function main() {
  if (!(await pathExists(sourceDir))) {
    throw new Error(`Source directory does not exist: ${relativeToRoot(sourceDir)}`);
  }

  await mkdir(oldArchiveDir, { recursive: true });
  await mkdir(originalsArchiveDir, { recursive: true });

  const productFiles = await productFileMap();
  const sourceFiles = (await readdir(sourceDir)).filter((file) => sourceImagePattern.test(file)).sort();
  const results = [];

  for (const sourceFile of sourceFiles) {
    results.push(await promoteImage(sourceFile, productFiles));
  }

  const remaining = (await readdir(sourceDir)).filter((file) => file !== ".DS_Store");
  if (remaining.length === 0) {
    await rm(sourceDir, { recursive: true, force: true });
  }

  const promoted = results.filter((result) => result.status === "promoted");
  const missing = results.filter((result) => result.status === "missing");

  console.log(`Processed ${promoted.length} product images: ${promoted.map((result) => result.model).join(", ") || "none"}`);
  if (missing.length > 0) {
    console.log(`No product match yet: ${missing.map((result) => result.sourceFile).join(", ")}`);
  }
  console.log(`Archived old product images: ${path.relative(projectRoot, oldArchiveDir)}`);
  console.log(`Archived original new photos: ${path.relative(projectRoot, originalsArchiveDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
