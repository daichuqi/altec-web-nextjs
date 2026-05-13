import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { downloadsRoot } from "./lib/downloads.mjs";
import { assertRequiredEnv, loadLocalEnv } from "./lib/env.mjs";
import { fail, pathExists, relativeToRoot } from "./lib/common.mjs";
import { cachePolicies, contentTypeFor, createOssClient, objectKey, requiredOssEnv, uploadHeaders } from "./lib/oss.mjs";

function md5(buffer) {
  return createHash("md5").update(buffer).digest("hex").toUpperCase();
}

function createEntry(fileName) {
  const relativePath = `altec/downloads/${fileName}`;
  const file = path.join(downloadsRoot, fileName);
  const content = readFileSync(file);

  return {
    key: objectKey(relativePath),
    file,
    source: relativePath,
    size: content.length,
    md5: md5(content),
    contentType: contentTypeFor(relativePath),
    cacheControl: cachePolicies.asset,
  };
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

async function listRemoteKeys(client, prefix) {
  const keys = [];
  let marker;

  do {
    const result = await client.list(
      {
        prefix,
        marker,
        "max-keys": 1000,
      },
      {},
    );

    keys.push(...(result.objects || []).map((object) => object.name));
    marker = result.nextMarker;
  } while (marker);

  return keys;
}

async function main() {
  loadLocalEnv();
  assertRequiredEnv(requiredOssEnv, "Aliyun OSS environment variables");

  if (!(await pathExists(downloadsRoot))) {
    fail(`Download directory is missing: ${relativeToRoot(downloadsRoot)}`);
  }

  const files = (await readdir(downloadsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
    .map((entry) => entry.name);
  if (files.length === 0) {
    fail(`Download directory is empty: ${relativeToRoot(downloadsRoot)}`);
  }

  for (const fileName of files) {
    const file = path.join(downloadsRoot, fileName);
    if (!(await pathExists(file))) {
      fail(`Download file is missing: ${relativeToRoot(file)}`);
    }
  }

  const client = createOssClient();
  const entries = files.map(createEntry);
  const matches = await mapLimit(entries, 20, (entry) => remoteObjectMatches(client, entry));
  const changedEntries = entries.filter((_, index) => !matches[index]);

  console.log(`Downloads OSS sync: ${changedEntries.length}/${entries.length} file(s) changed.`);

  let completed = 0;
  await mapLimit(changedEntries, 8, async (entry) => {
    await client.put(entry.key, entry.file, { headers: uploadHeaders(entry) });
    completed += 1;
    if (completed % 10 === 0 || completed === changedEntries.length) {
      console.log(`Uploaded ${completed}/${changedEntries.length} changed download file(s).`);
    }
  });

  const downloadPrefix = objectKey("altec/downloads/");
  const currentKeys = new Set(entries.map((entry) => entry.key));
  const staleKeys = (await listRemoteKeys(client, downloadPrefix)).filter((key) => !currentKeys.has(key));

  for (let i = 0; i < staleKeys.length; i += 1000) {
    await client.deleteMulti(staleKeys.slice(i, i + 1000), { quiet: true });
  }

  if (staleKeys.length > 0) {
    console.log(`Deleted ${staleKeys.length} stale download object(s).`);
  }

  console.log(`Download OSS sync completed (${entries.length} tracked file(s)).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
