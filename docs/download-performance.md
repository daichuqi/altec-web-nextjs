# Download Performance

Product manuals and software packages should be served from Aliyun OSS with CDN in front of the bucket. Do not rely on FTP or the Aliyun virtual host as the long-term download origin.

## Target Architecture

```text
GitHub Actions
  -> npm run build
  -> upload out/ to Aliyun OSS
  -> CDN pulls from OSS and caches static assets
  -> users download /altec/downloads/* through the production domain or CDN domain
```

Keep download URLs stable:

```text
/altec/downloads/TC950.pdf
/altec/downloads/AL808_V64.pdf
```

The site can rewrite asset links to a CDN host when `NEXT_PUBLIC_CDN_BASE_URL` is set. For production, prefer one of these:

```text
NEXT_PUBLIC_CDN_BASE_URL=https://www.china-altec.com
NEXT_PUBLIC_CDN_BASE_URL=https://static.china-altec.com
```

## Cache Policy

The Aliyun OSS deploy workflow sets this header for manuals and software:

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

## Deployment Verification

`.github/workflows/aliyun-oss.yml` checks a representative manual after deployment:

```text
/altec/downloads/TC950.pdf
```

The smoke test verifies:

- the PDF can be fetched from the OSS origin
- the PDF can be fetched from the production asset host when configured
- the response includes the expected download cache policy
- the response includes a `Content-Length` header

## Optional PDF Optimization

PDF files can be optimized for "Fast Web View" so the first page renders before the whole file finishes downloading. Use a PDF tool such as `qpdf --linearize` when available, then verify visual quality before replacing manuals.

Avoid aggressive image recompression on manuals unless the output has been visually checked. Wiring diagrams and parameter tables need to stay sharp.
