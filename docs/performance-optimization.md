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

## Next Optimization Pass

- Generate WebP/AVIF variants for product and detail images during build.
- Add responsive image metadata for product cards and hero images.
- Move production delivery fully to OSS + CDN rather than the 1Mbps virtual host.
- Add a post-deploy smoke check for representative cache headers:
  - `/`
  - `/_next/static/...js`
  - `/altec/products/AL808.jpg`
  - `/altec/details/PC900/PC900_Panel.gif`

## Rules

- Do not cache HTML aggressively; product pages must be able to update on deploy.
- Hash-named `_next/static` assets can be immutable.
- Non-hashed `/altec` assets should use long but not permanent cache unless filenames are versioned.
- Keep `npm run verify` as the required pre-push gate.
