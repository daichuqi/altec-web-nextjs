import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";
import { pathExists, projectRoot, walkFiles } from "./lib/common.mjs";

const sourceRoot = path.join(projectRoot, "public", "altec", "images");
const assetVersion = (process.env.NEXT_PUBLIC_ASSET_VERSION || "local").replace(/[^a-zA-Z0-9._-]/g, "-");
const optimizedRoot = path.join(sourceRoot, "optimized");
const outputRoot = path.join(optimizedRoot, assetVersion);
const cacheRoot = path.join(projectRoot, ".next", "cache", "altec-optimized-images");
const variantCacheRoot = path.join(cacheRoot, "variants");
const manifestPath = path.join(cacheRoot, "manifest.json");
let activeOutputRoot = outputRoot;

const widths = [160, 320, 480, 640, 960, 1280, 1600];
const formats = ["avif", "webp"];
const avifOptions = { quality: 54, effort: 4 };
const webpOptions = { quality: 74, effort: 4 };
const sourceExtensions = new Set([".jpg", ".jpeg", ".png"]);
const skippedDirectoryNames = new Set(["legacy", "optimized"]);
const optimizerConfig = { widths, formats, avifOptions, webpOptions, resize: { withoutEnlargement: true, fit: "inside" } };
const optimizerSignature = createHash("sha256").update(JSON.stringify(optimizerConfig)).digest("hex").slice(0, 16);

async function collectImages(directory) {
  return (await walkFiles(directory, { skipDirectory: (name) => skippedDirectoryNames.has(name) })).filter((file) =>
    sourceExtensions.has(path.extname(file).toLowerCase()),
  );
}

async function loadManifest() {
  try {
    return JSON.parse(await readFile(manifestPath, "utf8"));
  } catch {
    return { version: 1, optimizerSignature, entries: {} };
  }
}

async function sourceHash(sourceFile) {
  const buffer = await readFile(sourceFile);
  return createHash("sha256").update(buffer).digest("hex");
}

function relativeSourcePath(sourceFile) {
  return path.relative(sourceRoot, sourceFile).split(path.sep).join("/");
}

function cacheKeyFor(hash) {
  return `${optimizerSignature}-${hash}`;
}

function outputBaseFor(sourceFile) {
  const relative = path.relative(sourceRoot, sourceFile);
  const parsed = path.parse(relative);
  return path.join(activeOutputRoot, parsed.dir, parsed.name);
}

function outputVariantPath(sourceFile, width, format) {
  return `${outputBaseFor(sourceFile)}-${width}.${format}`;
}

function cacheVariantPath(cacheKey, width, format) {
  return path.join(variantCacheRoot, cacheKey, `${width}.${format}`);
}

async function cacheComplete(cacheKey) {
  for (const width of widths) {
    for (const format of formats) {
      if (!(await pathExists(cacheVariantPath(cacheKey, width, format)))) {
        return false;
      }
    }
  }

  return true;
}

async function writeVariantToCache(sourceFile, cacheKey, width, format) {
  const outputFile = cacheVariantPath(cacheKey, width, format);
  await mkdir(path.dirname(outputFile), { recursive: true });

  const pipeline = sharp(sourceFile, { failOn: "none" })
    .rotate()
    .resize({
      width,
      withoutEnlargement: true,
      fit: "inside",
    });

  if (format === "avif") {
    await pipeline.avif(avifOptions).toFile(outputFile);
    return;
  }

  await pipeline.webp(webpOptions).toFile(outputFile);
}

async function generateCachedVariants(sourceFile, cacheKey) {
  await rm(path.join(variantCacheRoot, cacheKey), { recursive: true, force: true });

  for (const width of widths) {
    for (const format of formats) {
      await writeVariantToCache(sourceFile, cacheKey, width, format);
    }
  }
}

async function copyCachedVariantsToOutput(sourceFile, cacheKey) {
  for (const width of widths) {
    for (const format of formats) {
      const outputFile = outputVariantPath(sourceFile, width, format);
      await mkdir(path.dirname(outputFile), { recursive: true });
      await copyFile(cacheVariantPath(cacheKey, width, format), outputFile);
    }
  }
}

async function main() {
  const images = await collectImages(sourceRoot);
  const previousManifest = await loadManifest();
  const nextManifest = {
    version: 1,
    optimizerSignature,
    updatedAt: new Date().toISOString(),
    entries: {},
  };
  const tempOutputRoot = path.join(projectRoot, ".next", `optimized-images-${assetVersion}.tmp-${process.pid}`);
  let generatedImages = 0;
  let reusedImages = 0;

  activeOutputRoot = tempOutputRoot;
  await rm(tempOutputRoot, { recursive: true, force: true });

  try {
    for (const sourceFile of images) {
      const relativePath = relativeSourcePath(sourceFile);
      const hash = await sourceHash(sourceFile);
      const cacheKey = cacheKeyFor(hash);
      const previousEntry = previousManifest.entries?.[relativePath];
      const canReuse = previousEntry?.cacheKey === cacheKey && (await cacheComplete(cacheKey));

      if (canReuse) {
        reusedImages += 1;
      } else {
        generatedImages += 1;
        await generateCachedVariants(sourceFile, cacheKey);
      }

      await copyCachedVariantsToOutput(sourceFile, cacheKey);
      nextManifest.entries[relativePath] = {
        sourceHash: hash,
        cacheKey,
        variants: widths.length * formats.length,
      };
    }

    await rm(optimizedRoot, { recursive: true, force: true });
    await mkdir(optimizedRoot, { recursive: true });
    await rename(tempOutputRoot, outputRoot);
    await mkdir(cacheRoot, { recursive: true });
    await writeFile(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);
  } catch (error) {
    await rm(tempOutputRoot, { recursive: true, force: true });
    throw error;
  }

  const variantCount = images.length * widths.length * formats.length;
  console.log(
    `Optimized image variants ready in ${path.relative(projectRoot, outputRoot)}: ${variantCount} variants, ${generatedImages} source image(s) regenerated, ${reusedImages} reused from cache.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
