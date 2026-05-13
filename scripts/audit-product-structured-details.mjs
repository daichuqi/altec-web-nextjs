import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const structuredDetailsFile = path.join(projectRoot, "src", "lib", "product-structured-details.ts");
const siteDataFile = path.join(projectRoot, "src", "lib", "site-data.ts");
const publicDir = path.join(projectRoot, "public");

function fail(messages) {
  console.error(["Structured product detail audit failed:", ...messages].join("\n"));
  process.exit(1);
}

function publicAssetPath(assetPath) {
  return path.join(publicDir, assetPath.replace(/^\/+/, ""));
}

function unique(values) {
  return [...new Set(values)];
}

async function main() {
  const [structuredDetails, siteData] = await Promise.all([
    readFile(structuredDetailsFile, "utf8"),
    readFile(siteDataFile, "utf8"),
  ]);
  const errors = [];
  const productModels = unique([...siteData.matchAll(/\{\s*model:\s*"([^"]+)"/g)].map((match) => match[1]));
  const structuredModels = unique([...structuredDetails.matchAll(/^\s{2}(?:"([^"]+)"|([A-Za-z0-9_/]+)):\s*\{/gm)].map((match) => match[1] || match[2]));
  const imageRefs = [...structuredDetails.matchAll(/productDetailImage\("([^"]+)",\s*"([^"]+)"\)/g)].map((match) => ({
    model: match[1],
    file: match[2],
    assetPath: `/altec/images/details/${match[1]}/${match[2]}`,
  }));
  const downloadRefs = [...structuredDetails.matchAll(/downloadAsset\("([^"]+)"\)/g)].map((match) => ({
    file: match[1],
    assetPath: `/altec/downloads/${match[1]}`,
  }));

  for (const model of structuredModels) {
    if (!productModels.includes(model)) {
      errors.push(`- ${model}: structured detail exists but product model is missing from site-data.ts`);
    }
  }

  for (const image of imageRefs) {
    if (!existsSync(publicAssetPath(image.assetPath))) {
      errors.push(`- Missing detail image for ${image.model}: ${image.assetPath}`);
    }
  }

  for (const download of downloadRefs) {
    if (!existsSync(publicAssetPath(download.assetPath))) {
      errors.push(`- Missing download file: ${download.assetPath}`);
    }
  }

  if (errors.length > 0) {
    fail(errors);
  }

  console.log(
    [
      "Structured product detail audit passed",
      `(${structuredModels.length} product(s), ${imageRefs.length} image reference(s), ${downloadRefs.length} download reference(s)).`,
    ].join(" "),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
