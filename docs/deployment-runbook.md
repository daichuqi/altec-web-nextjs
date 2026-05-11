# ALTEC Aliyun Deployment Runbook

Related docs:

- `docs/aliyun-oss-setup.md`
- `docs/aliyun-virtual-host-deploy.md`
- `docs/preflight-checklist.md`
- `docs/performance-optimization.md`

## Current Production Policy

ALTEC web deploys to Aliyun only. Do not deploy this project to Netlify.

Primary production origin:

- `https://china-altec.com`
- `https://www.china-altec.com`

Static build facts:

- Build command: `npm run build`
- Publish directory: `out`
- Next.js mode: static export via `output: "export"`
- Images: generated at build time into versioned AVIF/WebP variants under `/altec/optimized/<asset-version>/`

## GitHub Actions Deploy

The active deployment workflow is:

- `.github/workflows/aliyun-oss.yml`

It runs on every push to `main` and performs:

- Static build (`npm run build`)
- Build-time AVIF/WebP generation (`npm run optimize:images`, via `prebuild`)
- Sync `out/` to OSS
- Cache-Control metadata setup for static assets and HTML
- Extensionless HTML alias upload for clean route compatibility
- Mandatory smoke checks against the direct OSS object origin
- Production smoke checks against `ALIYUN_SITE_URL` when configured
- Optimized image cache-header smoke checks

Required secrets:

- `ALIYUN_ACCESS_KEY_ID`
- `ALIYUN_ACCESS_KEY_SECRET`
- `ALIYUN_OSS_BUCKET`
- `ALIYUN_OSS_ENDPOINT`

Recommended variables/secrets:

- `ALIYUN_SITE_URL=https://china-altec.com`
- `NEXT_PUBLIC_SITE_URL=https://china-altec.com`
- `NEXT_PUBLIC_CDN_BASE_URL` or `ALIYUN_CDN_BASE_URL` if a dedicated Aliyun CDN asset domain is used
- `ALIYUN_PRODUCTION_SMOKE_REQUIRED=true` after DNS/CDN cutover is complete
- `ALIYUN_OSS_PREFIX`
- `ALIYUN_OSS_REGION`

Current Aliyun OSS production settings:

- Bucket: `altec-web-prod-30330238`
- Region: `cn-hangzhou`
- Endpoint: `oss-cn-hangzhou.aliyuncs.com`

## Routing Notes

OSS static website hosting does not guarantee server-side rewrites. The workflow therefore uploads both:

- `products/al808.html`
- `products/al808`

This keeps clean URLs such as `/products/al808` working without a server runtime.

## Safe Deploy Checklist

Before any production publish:

```bash
npm run verify
```

Then push to `main` and wait for `Deploy to Aliyun OSS`.

After deployment, smoke test:

```bash
SHA=$(git rev-parse HEAD)

curl -fsS https://altec-web-prod-30330238.oss-cn-hangzhou.aliyuncs.com/index.html >/tmp/altec-oss-home.html
curl -fsS https://altec-web-prod-30330238.oss-cn-hangzhou.aliyuncs.com/products/al808 >/tmp/altec-oss-al808.html
curl -fsS https://altec-web-prod-30330238.oss-cn-hangzhou.aliyuncs.com/en/products/pc900 >/tmp/altec-oss-pc900-en.html
curl -fsSI https://altec-web-prod-30330238.oss-cn-hangzhou.aliyuncs.com/altec/optimized/$SHA/products/AL808-640.avif

curl -fsS https://china-altec.com/ >/tmp/altec-home.html
curl -fsS https://china-altec.com/products/al808 >/tmp/altec-al808.html
curl -fsS https://china-altec.com/en/products/pc900 >/tmp/altec-pc900-en.html
curl -fsSI https://china-altec.com/altec/optimized/$SHA/products/AL808-640.avif

grep -q "ALTEC" /tmp/altec-home.html
grep -q "AL808" /tmp/altec-al808.html
grep -q "PC900" /tmp/altec-pc900-en.html
```

If the direct OSS checks pass but `china-altec.com` fails, do not rebuild first. Fix DNS/CDN/domain binding or purge CDN cache. A production domain that still returns `Server: Apache` is still on the legacy virtual host, not the OSS/CDN path.

As of the initial OSS migration, `china-altec.com` is delegated to `ce1.xincache.com` and `ce2.xincache.com`, not Aliyun DNS. Domain verification TXT records and the final CNAME/A record cutover must be made at that DNS provider, or the domain name servers must first be migrated to Aliyun DNS.

## Fallback: Aliyun Virtual Host

If OSS/CDN is not available, use the FTP-based Aliyun virtual host process in `docs/aliyun-virtual-host-deploy.md`.

Do not use recursive FTP mirroring as the normal deploy path. It is too slow for this site and has already produced retry failures.
