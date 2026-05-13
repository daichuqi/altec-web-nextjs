# Download Performance

Product manuals and software packages should be served from Aliyun OSS with CDN in front of the bucket. Do not rely on FTP or the Aliyun virtual host as the long-term download origin.

## Target Architecture

```text
GitHub Actions or local OSS sync
  -> upload public/altec/downloads/ or out/altec/downloads/ to Aliyun OSS
  -> CDN pulls /altec/downloads/* from OSS
  -> users download manuals/software through the downloads CDN
```

Keep download URLs stable:

```text
/altec/downloads/TC950.pdf
/altec/downloads/AL808_V64.pdf
```

The site rewrites only download links when `NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL` is set. Images, `_next/static` JavaScript/CSS and other assets stay on the normal site origin.

For production, prefer one of these:

```text
NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL=https://www.altec-sz.com
NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL=https://downloads.altec-sz.com
```

Do not use the old global `NEXT_PUBLIC_CDN_BASE_URL` for this project unless the whole static site is deliberately moved behind a verified CDN origin.

## Cache Policy

The downloads-only OSS sync and the full OSS workflow should set this header for manuals and software:

```text
Cache-Control: public,max-age=2592000,stale-while-revalidate=604800
```

This gives downloads a 30-day browser/CDN cache while allowing stale content during revalidation. If a manual is replaced under the same filename, refresh or purge the CDN cache for that object.

For manuals that change often, prefer versioned filenames such as:

```text
TC950_V2026.pdf
AL808_V67.pdf
```

Versioned filenames allow longer CDN caching without stale-file confusion.

## Downloads-Only OSS Sync

Use this when the main site is still served by the Aliyun virtual host but manuals/software should be served from OSS/CDN:

```bash
npm run sync:downloads:oss
```

After a downloads sync, use a light warmup pass before Google Ads traffic if a downloads CDN base URL is configured:

```bash
DOWNLOADS_CDN_BASE_URL=https://downloads.altec-sz.com npm run prewarm:downloads
```

This sends HEAD requests for the download catalog so common manuals and software are less likely to be cold on first access. If Aliyun CDN API preload is later approved, replace this with provider-side refresh/preload calls.

Required local or CI environment variables:

```text
ALIYUN_ACCESS_KEY_ID
ALIYUN_ACCESS_KEY_SECRET
ALIYUN_OSS_BUCKET
ALIYUN_OSS_ENDPOINT
```

Optional:

```text
ALIYUN_OSS_PREFIX
```

The script uses the Aliyun OSS SDK, uploads only files under `public/altec/downloads/`, applies the download cache policy, and deletes stale objects under the same downloads prefix. It does not upload HTML, images, or `_next/static` bundles.

## Deployment Verification

`.github/workflows/aliyun-oss.yml` checks a representative manual after deployment:

```text
/altec/downloads/TC950.pdf
```

The smoke test verifies:

- the PDF can be fetched from the OSS origin
- the PDF can be fetched from the production downloads CDN host when configured
- the response includes the expected download cache policy
- the response includes a `Content-Length` header

## Optional PDF Optimization

PDF files can be optimized for "Fast Web View" so the first page renders before the whole file finishes downloading. Use a PDF tool such as `qpdf --linearize` when available, then verify visual quality before replacing manuals.

Avoid aggressive image recompression on manuals unless the output has been visually checked. Wiring diagrams and parameter tables need to stay sharp.
