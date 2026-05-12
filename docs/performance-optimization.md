# Performance Optimization Notes

Last updated: 2026-05-11

## Current Baseline

- The site is statically exported by Next.js (`output: "export"`).
- The generated `_next` static bundle is small enough that the largest practical bottleneck is static asset delivery, especially product images, detail diagrams and PDF manuals.
- Product/detail assets are served from local `/altec/...` paths and can be moved behind a CDN by setting `NEXT_PUBLIC_CDN_BASE_URL`.

## Completed Optimizations

- Removed bundled Geist web fonts and switched to system fonts to avoid extra font requests.
- Added `loading="lazy"` and `decoding="async"` to migrated rich-detail HTML images at render time.
- Disabled product-card prefetching on the product browser to avoid fetching many detail routes at once.
- Updated Aliyun OSS deployment to set Cache-Control metadata on `_next/static` and `/altec` asset prefixes.
- Updated Aliyun OSS deployment to mark HTML and extensionless route objects as `no-cache`.
- Added build-time responsive AVIF/WebP generation for JPEG/PNG files under `public/altec`.
- Added `OptimizedImage`/rich-detail HTML rewriting so product and application imagery prefers AVIF, then WebP, then the original source.
- Added versioned optimized image paths using `NEXT_PUBLIC_ASSET_VERSION`; GitHub Actions sets this to the commit SHA so optimized assets can be cached as immutable.
- Updated the Aliyun workflow to inject `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CDN_BASE_URL` and `NEXT_PUBLIC_ASSET_VERSION` at build time.
- Added Aliyun smoke testing for optimized image cache headers.

## Current Production Asset Flow

1. `npm run build` runs `npm run optimize:images` first.
2. `scripts/generate-optimized-images.mjs` writes generated assets to `public/altec/images/optimized/<asset-version>/`.
3. Next static export copies those generated assets into `out/altec/images/optimized/<asset-version>/`.
4. GitHub Actions syncs `out/` to OSS.
5. CDN/browser cache policy:
   - HTML and extensionless route objects: `no-cache`
   - `_next/static`: `public,max-age=31536000,immutable`
   - `/altec/images/optimized`: `public,max-age=31536000,immutable`
   - original `/altec/images/products`, `/altec/images/details`, `/altec/images/applications`, `/altec/downloads`: one month plus stale-while-revalidate

Set `NEXT_PUBLIC_CDN_BASE_URL` or `ALIYUN_CDN_BASE_URL` as a GitHub repository variable when a dedicated Aliyun CDN asset domain is available for images and downloads. Do not use this variable for Next.js core bundles. `_next/static` JavaScript and CSS should stay same-origin unless `NEXT_PUBLIC_NEXT_ASSET_PREFIX` is deliberately configured and the deploy pipeline verifies every referenced chunk on that origin.

## Remaining Optimization Ideas

- Add Brotli precompression upload for large static JS/CSS if the CDN does not compress dynamically.
- Add CDN refresh/preload after OSS sync for the homepage and top product pages.
- Track Lighthouse/WebPageTest for `https://china-altec.com/`, `/products`, `/products/al808`, `/en/products/pc900`.

## Rules

- Do not cache HTML aggressively; product pages must be able to update on deploy.
- Hash-named `_next/static` assets can be immutable.
- Versioned `/altec/images/optimized/<asset-version>` assets can be immutable.
- Non-versioned `/altec` originals should use long but not permanent cache unless filenames are versioned.
- Keep `npm run verify` as the required pre-push gate.
