# ALTEC Website

Next.js + Tailwind CSS rebuild for Shenzhen ALTEC Electronics Co., Ltd.

Legacy ALTEC content, product imagery, manuals and product details have been reorganized into a modern bilingual industrial catalog. Download files are hosted locally by this site.

## Development

Project operating rules, publishing steps and maintenance guidance are documented in `AGENTS.md`.

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

## SEO

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying, for example:

```bash
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

The value is used for canonical URLs, `hreflang`, `robots.txt`, `sitemap.xml`, Open Graph metadata and structured data.

## Netlify

The project includes `netlify.toml` with:

- build command: `npm run build`
- publish directory: `out`
- build Node version: `22`

## CDN + CI pipeline

The site supports an optional CDN for static assets.

- Set `NEXT_PUBLIC_CDN_BASE_URL` in Netlify environment variables (for example `https://cdn.example.com`).
- Set GitHub Actions secrets for each deploy:
  - `CDN_AWS_REGION`
  - `CDN_S3_BUCKET`
  - `CDN_S3_PREFIX` (optional, e.g. `altec`)
- `CDN_AWS_ACCESS_KEY_ID`
- `CDN_AWS_SECRET_ACCESS_KEY`
- `CDN_AWS_SESSION_TOKEN` (optional for temporary credentials)
- `CDN_CLOUDFRONT_DISTRIBUTION_ID` (optional)

CI will always build and deploy to Netlify first, then sync:
- `out/_next/static` -> CDN bucket path `/_next/static`
- `out/altec` -> CDN bucket path `/altec`

If `CDN_CLOUDFRONT_DISTRIBUTION_ID` is configured, the workflow will invalidate `/_next/*` and `/altec/*` after upload.

## Aliyun OSS Deployment

The repository also includes an Aliyun OSS deploy workflow (`.github/workflows/aliyun-oss.yml`) for faster access in mainland China.

Required repository variable:

- `ALIYUN_DEPLOY_ENABLED` (set to `true` to enable the Aliyun publish job)

Required GitHub secrets:

- `ALIYUN_ACCESS_KEY_ID`
- `ALIYUN_ACCESS_KEY_SECRET`
- `ALIYUN_OSS_BUCKET` (for example `altec-web`)
- `ALIYUN_OSS_ENDPOINT` (for example `oss-cn-hangzhou.aliyuncs.com`)

Recommended optional settings:

- `ALIYUN_OSS_PREFIX` (for example `altec`)
- `ALIYUN_OSS_REGION`
- `ALIYUN_SITE_URL` (for smoke test, for example `https://www.your-domain.com`)
- `ALIYUN_OSSUTIL_VERSION` (defaults to `1.7.18` in the workflow)

How it works:

1. Build exports static files to `out/`.
2. Upload all files to OSS.
3. For every `.html` page, publish an extensionless alias object (for example `/products/th136.html` + `/products/th136`) so clean route URLs keep working without a server rewrite.
4. Optional smoke checks use `ALIYUN_SITE_URL`.

Note: production domain routing on OSS depends on your OSS website/CNAME/CDN setup. Keep `ALIYUN_SITE_URL` aligned with the actual public origin.

Operational setup details are documented in `docs/aliyun-oss-setup.md`.
