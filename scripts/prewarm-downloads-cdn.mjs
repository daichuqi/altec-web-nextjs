import process from "node:process";
import { downloadFilesFromSiteData } from "./lib/downloads.mjs";
import { fail } from "./lib/common.mjs";
import { loadLocalEnv } from "./lib/env.mjs";

loadLocalEnv();

const cdnBaseUrl = (
  process.env.DOWNLOADS_CDN_BASE_URL ||
  process.env.NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL ||
  process.env.ALIYUN_DOWNLOADS_CDN_BASE_URL ||
  ""
).replace(/\/$/, "");
const limit = Number(process.env.DOWNLOADS_PREWARM_LIMIT || 0);

async function prewarm(file) {
  const url = `${cdnBaseUrl}/altec/downloads/${encodeURIComponent(file)}`;
  const response = await fetch(url, {
    method: "HEAD",
    redirect: "follow",
    headers: {
      "user-agent": "altec-downloads-cdn-prewarm/1.0",
    },
  });

  return {
    file,
    url,
    status: response.status,
    cacheControl: response.headers.get("cache-control") || "",
  };
}

async function main() {
  if (!cdnBaseUrl) {
    fail("Missing downloads CDN base URL. Set DOWNLOADS_CDN_BASE_URL or NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL.");
  }

  const files = await downloadFilesFromSiteData({ limit });
  const results = [];

  for (const file of files) {
    results.push(await prewarm(file));
  }

  let failed = false;
  console.log(`Downloads CDN prewarm: ${cdnBaseUrl}`);

  for (const result of results) {
    const ok = result.status >= 200 && result.status < 400;
    failed ||= !ok;
    console.log(
      [
        ok ? "OK  " : "FAIL",
        String(result.status),
        result.file,
        result.cacheControl ? `cache-control=${result.cacheControl}` : "",
      ]
        .filter(Boolean)
        .join("  "),
    );
  }

  if (failed) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
