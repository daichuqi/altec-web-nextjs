import path from "node:path";
import OSS from "ali-oss";

export const requiredOssEnv = ["ALIYUN_ACCESS_KEY_ID", "ALIYUN_ACCESS_KEY_SECRET", "ALIYUN_OSS_BUCKET", "ALIYUN_OSS_ENDPOINT"];

export const cachePolicies = {
  immutable: "public,max-age=31536000,immutable",
  asset: "public,max-age=2592000,stale-while-revalidate=604800",
  html: "no-cache",
};

const contentTypes = new Map([
  [".avif", "image/avif"],
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".rar", "application/vnd.rar"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"],
  [".zip", "application/zip"],
]);

export function normalizedOssPrefix() {
  return (process.env.ALIYUN_OSS_PREFIX || "").replace(/^\/+|\/+$/g, "");
}

export function objectKey(relativePath) {
  const prefix = normalizedOssPrefix();
  return prefix ? `${prefix}/${relativePath}` : relativePath;
}

export function ossRegion() {
  const region = process.env.ALIYUN_OSS_REGION || "cn-hangzhou";
  return region.startsWith("oss-") ? region : `oss-${region}`;
}

export function createOssClient() {
  return new OSS({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    bucket: process.env.ALIYUN_OSS_BUCKET,
    endpoint: process.env.ALIYUN_OSS_ENDPOINT,
    region: ossRegion(),
    secure: true,
  });
}

export function contentTypeFor(relativePath) {
  if (relativePath.endsWith("robots.txt")) {
    return "text/plain; charset=utf-8";
  }
  if (relativePath.endsWith("sitemap.xml")) {
    return "application/xml; charset=utf-8";
  }

  return contentTypes.get(path.extname(relativePath).toLowerCase()) || "application/octet-stream";
}

export function cacheControlFor(relativePath) {
  if (relativePath.endsWith(".html") || relativePath === "robots.txt" || relativePath === "sitemap.xml") {
    return cachePolicies.html;
  }
  if (relativePath.startsWith("_next/static/") || relativePath.startsWith("altec/images/optimized/")) {
    return cachePolicies.immutable;
  }
  if (relativePath.startsWith("altec/images/") || relativePath.startsWith("altec/downloads/")) {
    return cachePolicies.asset;
  }

  return cachePolicies.asset;
}

export function uploadHeaders(entry) {
  return {
    "Cache-Control": entry.cacheControl,
    "Content-Type": entry.contentType,
  };
}
