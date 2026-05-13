import { readFile } from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./common.mjs";

export const downloadsRoot = path.join(projectRoot, "public", "altec", "downloads");
export const siteDataFile = path.join(projectRoot, "src", "lib", "site-data.ts");

const downloadRowPattern = /\[\s*["'`][^"'`]*["'`]\s*,\s*["'`][^"'`]*["'`]\s*,\s*["'`][^"'`]*["'`]\s*,\s*["'`]([^"'`]+?\.(?:pdf|rar|zip|exe))["'`]\s*\]/gi;

export async function downloadFilesFromSiteData(options = {}) {
  const text = await readFile(options.siteDataFile || siteDataFile, "utf8");
  const files = [...new Set([...text.matchAll(downloadRowPattern)].map((match) => match[1]))];
  return options.limit > 0 ? files.slice(0, options.limit) : files;
}

export function downloadAssetPath(fileName) {
  return `/altec/downloads/${fileName}`;
}
