import { performance } from "node:perf_hooks";
import process from "node:process";

const origin = (process.env.PERF_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL || "https://www.altec-sz.com").replace(/\/$/, "");
const warnMs = Number(process.env.PERF_WARN_MS || 5000);
const failMs = Number(process.env.PERF_FAIL_MS || 12000);

const paths = [
  "/",
  "/en",
  "/products",
  "/en/products",
  "/products/al808",
  "/en/products/al808",
  "/downloads",
  "/en/downloads",
  "/robots.txt",
  "/sitemap.xml",
];

async function request(path) {
  const url = `${origin}${path}`;
  const started = performance.now();
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent": "altec-production-performance-audit/1.0",
    },
  });
  const bytes = (await response.arrayBuffer()).byteLength;
  const elapsedMs = Math.round(performance.now() - started);

  return {
    url,
    status: response.status,
    elapsedMs,
    bytes,
    cacheControl: response.headers.get("cache-control") || "",
  };
}

function sizeLabel(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  return `${Math.round(bytes / 1024)} KB`;
}

function statusLabel(result) {
  if (result.status < 200 || result.status >= 400 || result.elapsedMs >= failMs) {
    return "FAIL";
  }

  if (result.elapsedMs >= warnMs) {
    return "WARN";
  }

  return "OK";
}

async function main() {
  const results = [];

  for (const path of paths) {
    results.push(await request(path));
  }

  let failed = false;
  console.log(`Production performance audit: ${origin}`);
  console.log(`Warn threshold: ${warnMs} ms, fail threshold: ${failMs} ms`);

  for (const result of results) {
    const label = statusLabel(result);
    failed ||= label === "FAIL";
    console.log(
      [
        label.padEnd(4),
        String(result.status),
        `${String(result.elapsedMs).padStart(5)} ms`,
        sizeLabel(result.bytes).padStart(7),
        result.url,
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
