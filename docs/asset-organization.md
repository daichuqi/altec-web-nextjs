# Image Asset Organization

This site keeps static assets under `public/` so the static export can be served by Aliyun virtual host, OSS, or CDN without a runtime image service.

## Canonical Locations

All project image assets live under `public/altec/images/`. The only allowed root-level public image is `public/favicon.ico` for browser compatibility. Downloads stay in `public/altec/downloads/` because manuals and software packages are not image assets.

- `public/altec/images/brand/` - logo, favicon and other brand images.
- `public/altec/images/products/` - catalog and product-card images. One primary product image per model, named by model when possible, for example `AL808.jpg`.
- `public/altec/images/details/<MODEL>/` - product detail diagrams, wiring diagrams, panel drawings and mounting drawings.
- `public/altec/images/applications/` - application list cover images.
- `public/altec/images/applications/details/<TOPIC>/` - application and knowledge-base article diagrams.
- `public/altec/downloads/` - manuals, protocols, PDFs and software packages.
- `public/altec/images/legacy/` - preserved old-site assets that are not part of the active UI but should not be removed without business confirmation.
- `public/altec/images/optimized/<asset-version>/` - generated AVIF/WebP variants created by `npm run optimize:images`; this folder is build output and should stay generated.

Historical source batches, replaced product photos, Topaz workbench files, and unmatched incoming photos belong under `asset-archive/`, not `public/`. Files under `public/` are copied into the static export and can be deployed publicly.

## Code Rules

- New product-card images should be referenced through `src/lib/assets.ts` using `productImage(...)`.
- Application cover images should use `applicationCoverImage(...)`.
- Application article image fields should use `applicationDetailImage(...)` or `productImage(...)`.
- Product detail HTML may still contain local `<img src="/altec/images/details/...">` paths because the migrated source content is HTML-heavy, but every path must point to one of the canonical locations above.
- Do not add random image directories under `public/`.
- Do not use old `china-altec.com` image URLs at runtime.
- `legacy/` and `optimized/` are skipped by the build-time optimizer; only active source images should be optimized into WebP/AVIF.
- The optimizer keeps a content-hash cache under `.next/cache/altec-optimized-images/`. If a source image has not changed, the existing AVIF/WebP variants are copied from cache instead of regenerated.

## Product Photo Batches

Use a private incoming folder when a new product-photo batch arrives:

```bash
npm run promote:product-images -- products_renew/modern-clean
```

The script matches image filenames to existing product-image model names, converts matched photos to 1200x900 progressive JPEG files under `public/altec/images/products/`, archives the replaced product photos under `asset-archive/images/product-main-old-<date>/`, and archives the original high-resolution batch under `asset-archive/images/product-photo-batch-<date>-originals/`. Images without a matching product model are reported and left for review.

## Verification

Run:

```bash
npm run audit:images
```

The audit checks that image references in `src/` point to approved asset roots and that referenced files exist under `public/`. It also fails if image files are added outside `public/altec/images/`, except for `public/favicon.ico` and private archives under `asset-archive/`.
