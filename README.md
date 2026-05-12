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
npm run verify
```

`npm run verify` runs linting, image asset auditing and the production build.

## SEO

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying, for example:

```bash
NEXT_PUBLIC_SITE_URL=https://china-altec.com
```

The value is used for canonical URLs, `hreflang`, `robots.txt`, `sitemap.xml`, Open Graph metadata and structured data.

## Aliyun OSS Deployment

Production deployment uses Aliyun only. The deploy workflow is `.github/workflows/aliyun-oss.yml`.

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
