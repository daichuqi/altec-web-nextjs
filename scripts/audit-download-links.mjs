import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import {
  downloadAssetPath,
  downloadFilesFromSiteData,
  downloadsRoot,
  siteDataFile,
} from "./lib/downloads.mjs";
import { pathExists, projectRoot, publicRoot, relativeToRoot, sourceRoot, walkFiles } from "./lib/common.mjs";

const skippedDirectories = new Set([".git", ".next", "asset-archive", "node_modules", "out"]);
const downloadHrefPattern = /href=\\?["'](\/altec\/downloads\/[^"'\\]+)\\?["']/g;
const placeholderDownloadPattern = /href=\\?["']\/downloads\\?["']/g;
const richContentFiles = [
  path.join(projectRoot, "src", "lib", "product-rich-details.ts"),
  path.join(projectRoot, "src", "lib", "application-data.ts"),
];

async function fileExists(assetPath) {
  const absolutePath = path.join(publicRoot, assetPath.replace(/^\//, ""));
  return pathExists(absolutePath);
}

async function main() {
  const sourceFiles = await walkFiles(sourceRoot, {
    skipDirectory: (name) => skippedDirectories.has(name),
  });
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

  for (const fileName of await downloadFilesFromSiteData()) {
    const assetPath = downloadAssetPath(fileName);
    referencedDownloads.add(assetPath);

    if (!(await fileExists(assetPath))) {
      missing.push({ file: siteDataFile, assetPath });
    }
  }

  const placeholders = [];
  for (const file of richContentFiles) {
    if (!(await pathExists(file))) {
      continue;
    }

    const text = await readFile(file, "utf8");
    const placeholderMatches = text.match(placeholderDownloadPattern) || [];
    for (let index = 0; index < placeholderMatches.length; index += 1) {
      placeholders.push(file);
    }
  }

  if (!(await pathExists(downloadsRoot))) {
    console.error(`Download directory is missing: ${relativeToRoot(downloadsRoot)}`);
    process.exit(1);
  }

  if (missing.length > 0) {
    console.error("\nMissing referenced download files:");
    for (const issue of missing) {
      console.error(`- ${relativeToRoot(issue.file)} -> ${issue.assetPath}`);
    }
  }

  if (placeholders.length > 0) {
    console.error("\nPlaceholder download links in rich content:");
    for (const file of placeholders) {
      console.error(`- ${relativeToRoot(file)} -> /downloads`);
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
