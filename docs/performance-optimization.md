# Performance Optimization Notes

Last updated: 2026-05-13

## Current Baseline

- The site is statically exported by Next.js (`output: "export"`).
- The generated `_next` static bundle is small enough that the largest practical bottleneck is static asset delivery, especially product images, detail diagrams and PDF manuals.
- Product/detail image assets are served from local `/altec/...` paths. Download links can be moved behind OSS/CDN by setting `NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL`.

## Completed Optimizations

- Removed bundled Geist web fonts and switched to system fonts to avoid extra font requests.
- Added `loading="lazy"` and `decoding="async"` to migrated rich-detail HTML images at render time.
- Disabled product-card prefetching on the product browser to avoid fetching many detail routes at once.
- Updated Aliyun OSS deployment to set Cache-Control headers through the SDK upload path for `_next/static`, optimized images, HTML and `/altec` assets.
- Updated Aliyun OSS deployment to mark HTML and extensionless route objects as `no-cache`.
- Added build-time responsive AVIF/WebP generation for JPEG/PNG files under `public/altec`.
- Added a content-hash manifest cache for image optimization so unchanged source images reuse cached AVIF/WebP variants from `.next/cache/altec-optimized-images/`.
- Added `OptimizedImage`/rich-detail HTML rewriting so product and application imagery prefers AVIF, then WebP, then the original source.
- Added versioned optimized image paths using `NEXT_PUBLIC_ASSET_VERSION`; GitHub Actions sets this to the commit SHA so optimized assets can be cached as immutable.
- Updated the Aliyun workflow to inject `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL` and `NEXT_PUBLIC_ASSET_VERSION` at build time.
- Added Aliyun smoke testing for optimized image cache headers.
- Added `npm run prepare:aliyun` for virtual-host publishes so `npm run verify` builds once and the package step reuses the current `out/` without a second build.
- Added `public/.htaccess` for Aliyun virtual-host cache headers. The package step copies it into the deployment zip even if the static export omits dotfiles.
- Added `npm run audit:production-performance` for production timing checks on key Chinese and English pages.
- Added `npm run prewarm:downloads` for light downloads CDN warmup requests when `DOWNLOADS_CDN_BASE_URL` or `NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL` is set.
- Added a root preconnect/dns-prefetch hint for the downloads CDN when `NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL` is configured at build time.
- Added `npm run deploy:aliyun:oss` / `npm run sync:site:oss` for full bucket deploys with extensionless route aliases, cache headers and manifest diff uploads.

## Current Production Asset Flow

1. `npm run build` runs `npm run optimize:images` first.
2. `scripts/generate-optimized-images.mjs` hashes source images, reuses cached variants when possible, and writes generated assets to `public/altec/images/optimized/<asset-version>/`.
3. Next static export copies those generated assets into `out/altec/images/optimized/<asset-version>/`.
4. The normal OSS deploy runs `npm run deploy:aliyun:oss` locally or `.github/workflows/aliyun-oss.yml` in CI. Both paths call `scripts/sync-site-to-oss.mjs`, which syncs `out/` to OSS with a manifest diff and creates extensionless route aliases.
5. Downloads may also be synced separately to OSS/CDN with `npm run sync:downloads:oss`.
6. CDN/browser cache policy:
   - HTML and extensionless route objects: `no-cache`
   - `_next/static`: `public,max-age=31536000,immutable`
   - `/altec/images/optimized`: `public,max-age=31536000,immutable`
   - original `/altec/images/products`, `/altec/images/details`, `/altec/images/applications`, `/altec/downloads`: one month plus stale-while-revalidate

Set `NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL` or `ALIYUN_DOWNLOADS_CDN_BASE_URL` as a GitHub repository variable when a dedicated Aliyun CDN domain is available for manuals/software. This variable rewrites only `/altec/downloads/*`. Images and `_next/static` JavaScript/CSS stay same-origin unless the deployment architecture is deliberately changed and smoke-tested.

## Remaining Optimization Ideas

- Add Brotli precompression upload for large static JS/CSS if the CDN does not compress dynamically.
- Replace the light downloads prewarm script with Aliyun CDN refresh/preload API calls if a dedicated CDN account workflow is approved.
- Track Lighthouse/WebPageTest for `https://www.altec-sz.com/`, `/products`, `/products/al808`, `/en/products/pc900`.

## Rules

- Do not cache HTML aggressively; product pages must be able to update on deploy.
- Hash-named `_next/static` assets can be immutable.
- Versioned `/altec/images/optimized/<asset-version>` assets can be immutable.
- Non-versioned `/altec` originals should use long but not permanent cache unless filenames are versioned.
- Keep `npm run verify` as the required pre-push gate.
- For OSS publishes, use `npm run deploy:aliyun:oss`; use the virtual-host zip flow only as a fallback.
