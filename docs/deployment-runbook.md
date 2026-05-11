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
- Images: served as static files with `images.unoptimized = true`

## GitHub Actions Deploy

The active deployment workflow is:

- `.github/workflows/aliyun-oss.yml`

It runs on every push to `main` and performs:

- Static build (`npm run build`)
- Sync `out/` to OSS
- Cache-Control metadata setup for static assets and HTML
- Extensionless HTML alias upload for clean route compatibility
- Smoke checks against `ALIYUN_SITE_URL` when configured

Required secrets:

- `ALIYUN_ACCESS_KEY_ID`
- `ALIYUN_ACCESS_KEY_SECRET`
- `ALIYUN_OSS_BUCKET`
- `ALIYUN_OSS_ENDPOINT`

Recommended variables/secrets:

- `ALIYUN_SITE_URL=https://china-altec.com`
- `NEXT_PUBLIC_SITE_URL=https://china-altec.com`
- `NEXT_PUBLIC_CDN_BASE_URL` if a dedicated Aliyun CDN asset domain is used
- `ALIYUN_OSS_PREFIX`
- `ALIYUN_OSS_REGION`

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
curl -fsS https://china-altec.com/ >/tmp/altec-home.html
curl -fsS https://china-altec.com/products/al808 >/tmp/altec-al808.html
curl -fsS https://china-altec.com/en/products/pc900 >/tmp/altec-pc900-en.html
curl -fsS https://china-altec.com/altec/products/AL808.jpg >/tmp/altec-al808.jpg

grep -q "ALTEC" /tmp/altec-home.html
grep -q "AL808" /tmp/altec-al808.html
grep -q "PC900" /tmp/altec-pc900-en.html
```

## Fallback: Aliyun Virtual Host

If OSS/CDN is not available, use the FTP-based Aliyun virtual host process in `docs/aliyun-virtual-host-deploy.md`.

Do not use recursive FTP mirroring as the normal deploy path. It is too slow for this site and has already produced retry failures.
