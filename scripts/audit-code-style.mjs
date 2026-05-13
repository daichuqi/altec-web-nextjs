import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileExists, relativeToRoot, sourceRoot, walkFiles } from "./lib/common.mjs";

const appRoot = path.join(sourceRoot, "app");
const skippedDirectories = new Set([".git", ".next", "asset-archive", "node_modules", "out"]);

const allowedHtmlInjectionFiles = new Set([
  path.join(sourceRoot, "app", "layout.tsx"),
  path.join(sourceRoot, "components", "pages.tsx"),
  path.join(sourceRoot, "components", "rich-html.tsx"),
]);

const allowedNoImgElementDisableFiles = new Set([
  path.join(sourceRoot, "components", "image-preview.tsx"),
  path.join(sourceRoot, "components", "optimized-image.tsx"),
]);

function relative(file) {
  return relativeToRoot(file);
}

function productEntries(siteData) {
  const productsBlock = siteData.match(/export const products: Product\[] = \[([\s\S]*?)\];/)?.[1] || "";
  const entries = [];
  const productPattern = /\{\s*model: "([^"]+)"([\s\S]*?)\},/g;

  for (const match of productsBlock.matchAll(productPattern)) {
    entries.push({
      model: match[1],
      archived: /status:\s*"archived"/.test(match[2]),
    });
  }

  return entries;
}

function richDetailEntries(productRichDetails) {
  const entries = new Map();
  const entryPattern = /^  "?([^"\n:]+)"?: \{\n([\s\S]*?)^  \},/gm;
  const assignmentPattern = /productRichDetails(?:\.([A-Z0-9]+)|\["([^"]+)"\])\.htmlEn/g;

  for (const match of productRichDetails.matchAll(entryPattern)) {
    entries.set(match[1], {
      hasHtmlEn: /htmlEn\s*:/.test(match[2]),
    });
  }

  for (const match of productRichDetails.matchAll(assignmentPattern)) {
    const model = match[1] || match[2];
    const entry = entries.get(model) || { hasHtmlEn: false };
    entry.hasHtmlEn = true;
    entries.set(model, entry);
  }

  return entries;
}

async function main() {
  const issues = [];
  const sourceFiles = await walkFiles(sourceRoot, {
    skipDirectory: (name) => skippedDirectories.has(name),
  });

  for (const file of sourceFiles) {
    const text = await readFile(file, "utf8");

    if (text.includes("dangerouslySetInnerHTML") && !allowedHtmlInjectionFiles.has(file)) {
      issues.push(`Unexpected dangerouslySetInnerHTML in ${relative(file)}`);
    }

    if (text.includes("@next/next/no-img-element") && !allowedNoImgElementDisableFiles.has(file)) {
      issues.push(`Unexpected @next/next/no-img-element disable in ${relative(file)}`);
    }
  }

  const retiredProductDetailSections = path.join(sourceRoot, "components", "product-detail-sections.tsx");
  if (await fileExists(retiredProductDetailSections)) {
    issues.push("Retired component still exists: src/components/product-detail-sections.tsx");
  }

  const pageFiles = sourceFiles.filter((file) => file.startsWith(`${appRoot}${path.sep}`) && path.basename(file) === "page.tsx");
  for (const file of pageFiles) {
    const text = await readFile(file, "utf8");
    if (!/export const metadata|export async function generateMetadata/.test(text)) {
      issues.push(`Missing metadata export in ${relative(file)}`);
    }
  }

  const siteData = await readFile(path.join(sourceRoot, "lib", "site-data.ts"), "utf8");
  const richDetails = await readFile(path.join(sourceRoot, "lib", "product-rich-details.ts"), "utf8");
  const products = productEntries(siteData);
  const richEntries = richDetailEntries(richDetails);
  const activeRichDetailsMissingEnglish = products
    .filter((product) => !product.archived && richEntries.has(product.model) && !richEntries.get(product.model).hasHtmlEn)
    .map((product) => product.model);

  if (activeRichDetailsMissingEnglish.length > 0) {
    issues.push(`Active rich product details missing htmlEn: ${activeRichDetailsMissingEnglish.join(", ")}`);
  }

  const seoSource = await readFile(path.join(sourceRoot, "lib", "seo.ts"), "utf8");
  if (!seoSource.includes('process.env.NEXT_PUBLIC_SITE_URL || "https://www.altec-sz.com"')) {
    issues.push("src/lib/seo.ts must default NEXT_PUBLIC_SITE_URL to https://www.altec-sz.com");
  }

  if (issues.length > 0) {
    console.error("\nCode style audit failed:");
    for (const issue of issues) {
      console.error(`- ${issue}`);
    }
    process.exit(1);
  }

  console.log(`Code style audit passed (${pageFiles.length} pages checked, ${products.length} products checked).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
