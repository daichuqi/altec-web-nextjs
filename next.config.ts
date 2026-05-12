import type { NextConfig } from "next";

const nextAssetPrefix = (process.env.NEXT_PUBLIC_NEXT_ASSET_PREFIX || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: nextAssetPrefix || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
