import type { NextConfig } from "next";

const cdnBaseUrl = (process.env.NEXT_PUBLIC_CDN_BASE_URL || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: cdnBaseUrl || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
