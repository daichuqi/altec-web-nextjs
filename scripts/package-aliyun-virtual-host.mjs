import { copyFile, cp, mkdir, readFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fail, pathExists, projectRoot, walkFiles } from "./lib/common.mjs";

const sourceDir = path.join(projectRoot, "out");
const publicHtaccessFile = path.join(projectRoot, "public", ".htaccess");
const deployDir = process.env.ALIYUN_DEPLOY_DIR || "/tmp/altec-aliyun-deploy";
const zipFile = process.env.ALIYUN_DEPLOY_ZIP || "/tmp/altec-aliyun-deploy.zip";
const excludedDownloadsDir = path.join(deployDir, "altec", "downloads");

function isExcludedDownloadPath(sourcePath) {
  const relative = path.relative(sourceDir, sourcePath).split(path.sep).join("/");
  return relative === "altec/downloads" || relative.startsWith("altec/downloads/");
}

async function addCleanRouteAliases() {
  const files = await walkFiles(deployDir);
  const htmlFiles = files.filter((file) => file.endsWith(".html"));

  for (const file of htmlFiles) {
    const relative = path.relative(deployDir, file);
    if (relative === "index.html" || relative === "404.html") {
      continue;
    }

    const route = relative.replace(/\.html$/, "");
    const targetDir = path.join(deployDir, route);
    await mkdir(targetDir, { recursive: true });
    await cp(file, path.join(targetDir, "index.html"));
  }
}

async function assertDownloadsAreCdnBacked() {
  const files = await walkFiles(deployDir);
  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  const offenders = [];

  for (const file of htmlFiles) {
    const text = await readFile(file, "utf8");
    if (text.includes('href="/altec/downloads/') || text.includes('\\"href\\":\\"/altec/downloads/')) {
      offenders.push(path.relative(deployDir, file));
    }
  }

  if (offenders.length > 0) {
    fail(
      [
        "Refusing to package without downloads CDN rewrite.",
        "Set NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL, run npm run verify once, then run this package step again.",
        `HTML files with local download links: ${offenders.slice(0, 8).join(", ")}`,
      ].join("\n"),
    );
  }
}

async function copyVirtualHostConfig() {
  if (!(await pathExists(publicHtaccessFile))) {
    return;
  }

  await copyFile(publicHtaccessFile, path.join(deployDir, ".htaccess"));
}

function runZip() {
  const result = spawnSync("zip", ["-qr", zipFile, "."], {
    cwd: deployDir,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

async function sizeLabel(file) {
  const result = spawnSync("du", ["-sh", file], { encoding: "utf8" });
  return result.stdout.trim();
}

async function main() {
  if (!(await pathExists(sourceDir))) {
    fail("Missing out/. Run npm run verify before packaging, or use npm run prepare:aliyun.");
  }

  await rm(deployDir, { recursive: true, force: true });
  await rm(zipFile, { force: true });
  await cp(sourceDir, deployDir, {
    recursive: true,
    filter: (sourcePath) => !isExcludedDownloadPath(sourcePath),
  });
  await copyVirtualHostConfig();

  if (await pathExists(excludedDownloadsDir)) {
    fail("Packaging error: downloads directory was copied into deploy package.");
  }

  await addCleanRouteAliases();
  await assertDownloadsAreCdnBacked();
  runZip();

  console.log(`Packaged Aliyun virtual host zip: ${zipFile}`);
  console.log(`Deploy folder size: ${await sizeLabel(deployDir)}`);
  console.log(`Zip size: ${await sizeLabel(zipFile)}`);
  console.log("Excluded from zip: altec/downloads/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
