import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fail, pathExists, projectRoot, walkFiles } from "./lib/common.mjs";
import { assertRequiredEnv, loadLocalEnv } from "./lib/env.mjs";
import {
  cacheControlFor,
  cachePolicies,
  contentTypeFor,
  createOssClient,
  normalizedOssPrefix,
  objectKey,
  requiredOssEnv,
  uploadHeaders,
} from "./lib/oss.mjs";

const outRoot = path.join(projectRoot, "out");
const manifestFileName = ".altec-deploy-manifest.json";

function manifestKey() {
  return objectKey(manifestFileName);
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function md5(buffer) {
  return createHash("md5").update(buffer).digest("hex").toUpperCase();
}

function createEntry({ file, relativePath, key }) {
  const content = readFileSync(file);
  return {
    key,
    file,
    source: relativePath,
    size: content.length,
    md5: md5(content),
    hash: sha256(content),
    contentType: contentTypeFor(relativePath),
    cacheControl: cacheControlFor(relativePath),
  };
}

async function createEntries() {
  const files = await walkFiles(outRoot);
  const entries = [];
  const createCleanAliases = process.env.ALIYUN_OSS_CREATE_CLEAN_URL_ALIASES !== "0";

  for (const file of files) {
    const relativePath = path.relative(outRoot, file).split(path.sep).join("/");
    const entry = createEntry({ file, relativePath, key: objectKey(relativePath) });
    entries.push(entry);

    if (!createCleanAliases || !relativePath.endsWith(".html") || relativePath === "index.html") {
      continue;
    }

    entries.push({
      ...entry,
      key: objectKey(relativePath.replace(/\.html$/, "")),
      contentType: "text/html; charset=utf-8",
      cacheControl: cachePolicies.html,
    });
  }

  return entries;
}

async function loadRemoteManifest(client) {
  try {
    const result = await client.get(manifestKey());
    return JSON.parse(result.content.toString("utf8"));
  } catch (error) {
    if (error?.status === 404 || error?.code === "NoSuchKey") {
      return null;
    }
    throw error;
  }
}

function manifestEntry(entry) {
  return {
    source: entry.source,
    size: entry.size,
    md5: entry.md5,
    hash: entry.hash,
    contentType: entry.contentType,
    cacheControl: entry.cacheControl,
  };
}

function manifestFor(entries) {
  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.ALIYUN_SITE_URL || "",
    bucket: process.env.ALIYUN_OSS_BUCKET,
    prefix: normalizedOssPrefix(),
    cleanUrlAliases: process.env.ALIYUN_OSS_CREATE_CLEAN_URL_ALIASES !== "0",
    entries: Object.fromEntries(entries.map((entry) => [entry.key, manifestEntry(entry)])),
  };
}

function sameManifestEntry(previous, current) {
  return (
    previous?.hash === current.hash &&
    previous?.contentType === current.contentType &&
    previous?.cacheControl === current.cacheControl
  );
}

async function remoteObjectMatches(client, entry) {
  try {
    const result = await client.head(entry.key);
    const headers = result.res?.headers || {};
    const remoteEtag = String(headers.etag || "").replaceAll('"', "").toUpperCase();
    const remoteSize = Number(headers["content-length"]);
    return remoteEtag === entry.md5 && remoteSize === entry.size;
  } catch (error) {
    if (error?.status === 404 || error?.code === "NoSuchKey") {
      return false;
    }
    throw error;
  }
}

async function mapLimit(items, limit, mapper) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function entriesToUpload(client, entries, remoteManifest) {
  const remoteEntries = remoteManifest?.entries || {};
  const candidates = entries.filter((entry) => !sameManifestEntry(remoteEntries[entry.key], entry));

  if (remoteManifest) {
    return candidates;
  }

  const matches = await mapLimit(candidates, 20, (entry) => remoteObjectMatches(client, entry));
  return candidates.filter((_, index) => !matches[index]);
}

async function uploadEntries(client, entries) {
  let completed = 0;
  await mapLimit(entries, 8, async (entry) => {
    await client.put(entry.key, entry.file, { headers: uploadHeaders(entry) });
    completed += 1;
    if (completed % 25 === 0 || completed === entries.length) {
      console.log(`Uploaded ${completed}/${entries.length} changed object(s).`);
    }
  });
}

async function deleteRemovedEntries(client, remoteManifest, currentManifest) {
  if (!remoteManifest) {
    return 0;
  }

  const removed = Object.keys(remoteManifest.entries || {}).filter((key) => !currentManifest.entries[key]);
  for (let i = 0; i < removed.length; i += 1000) {
    await client.deleteMulti(removed.slice(i, i + 1000), { quiet: true });
  }

  return removed.length;
}

async function saveManifest(client, manifest) {
  await client.put(manifestKey(), Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`), {
    headers: {
      "Cache-Control": cachePolicies.html,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

async function main() {
  loadLocalEnv();
  assertRequiredEnv(requiredOssEnv, "Aliyun OSS environment variables");

  if (!(await pathExists(path.join(outRoot, "index.html")))) {
    fail("Missing out/index.html. Run npm run verify before syncing the site to OSS.");
  }

  const client = createOssClient();
  const entries = await createEntries();
  const currentManifest = manifestFor(entries);
  const remoteManifest = await loadRemoteManifest(client);
  const changedEntries = await entriesToUpload(client, entries, remoteManifest);

  console.log(
    remoteManifest
      ? `Manifest found. ${changedEntries.length}/${entries.length} object(s) changed.`
      : `No manifest found. ${changedEntries.length}/${entries.length} object(s) need upload after remote checks.`,
  );

  if (changedEntries.length > 0) {
    await uploadEntries(client, changedEntries);
  }

  const removedCount = await deleteRemovedEntries(client, remoteManifest, currentManifest);
  if (removedCount > 0) {
    console.log(`Deleted ${removedCount} stale object(s) from the previous manifest.`);
  }

  await saveManifest(client, currentManifest);
  console.log(`Full site OSS sync completed with manifest diff (${entries.length} tracked object(s)).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
