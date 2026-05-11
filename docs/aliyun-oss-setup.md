# ALTEC Aliyun Publish Setup

This is the practical checklist for enabling the new Aliyun publish path in this repo.

## 1) OSS Preparation

1. Create an OSS bucket (current production bucket: `altec-web-prod-30330238`).
2. Record bucket endpoint (current production endpoint: `oss-cn-hangzhou.aliyuncs.com`).
3. Upload permissions:
   - Create an AccessKey pair used by CI.
   - Grant permissions at least for:
     - `oss:PutObject`
     - `oss:GetObject`
     - `oss:DeleteObject`
     - `oss:ListObjects`
4. Enable static web hosting or route traffic through CDN origin to OSS.
5. Keep Block Public Access disabled for this static website bucket and set the bucket ACL to public-read, or use CDN/object policies that allow anonymous browser reads.

## 2) Domain Routing (Recommended)

Choose one strategy:

1. OSS website endpoint + custom domain
2. CDN domain -> OSS origin (recommended for mainland)

Either way, ensure browser access is clean for SPA-like deep links:

- `/products/al808`
- `/en/products/pc900`
- `/applications/control-basics`

This repository workflow uploads both:

- `xxx.html`
- `xxx`

so the URLs above can resolve from object storage without runtime rewrites.

## 3) GitHub Variables and Secrets

Set repository variable:

- `ALIYUN_SITE_URL` = your public Aliyun origin (example: `https://china-altec.com`)
- `NEXT_PUBLIC_SITE_URL` = canonical production origin (example: `https://china-altec.com`)

Set repository secrets:

- `ALIYUN_ACCESS_KEY_ID`
- `ALIYUN_ACCESS_KEY_SECRET`
- `ALIYUN_OSS_BUCKET`
- `ALIYUN_OSS_ENDPOINT`

Optional:

- `NEXT_PUBLIC_CDN_BASE_URL` or `ALIYUN_CDN_BASE_URL` = dedicated Aliyun CDN asset origin, if using one
- `ALIYUN_PRODUCTION_SMOKE_REQUIRED=true` = make CI fail when `ALIYUN_SITE_URL` is not serving the latest OSS/CDN deploy. Leave unset during DNS cutover.
- `ALIYUN_OSS_PREFIX`
- `ALIYUN_OSS_REGION`
- `ALIYUN_OSSUTIL_VERSION` (defaults to `1.7.18`)

The workflow sets `NEXT_PUBLIC_ASSET_VERSION` to the Git commit SHA. Optimized image assets are generated under `/altec/optimized/<sha>/` and cached as immutable.

## 4) Enable and Verify

1. Trigger GitHub Action `Deploy to Aliyun OSS` (or push to `main`).
2. Wait for CI and check:
   - build succeeded
   - OSS sync succeeded
   - OSS object smoke test passed
   - production domain smoke test passed, if `ALIYUN_SITE_URL` is set
3. Manually verify key routes:
   - Direct OSS: `https://altec-web-prod-30330238.oss-cn-hangzhou.aliyuncs.com/index.html`
   - Direct OSS: `https://altec-web-prod-30330238.oss-cn-hangzhou.aliyuncs.com/products/al808`
   - Direct OSS: `https://altec-web-prod-30330238.oss-cn-hangzhou.aliyuncs.com/en/products/pc900`
   - Production: `${ALIYUN_SITE_URL}/`
   - Production: `${ALIYUN_SITE_URL}/products/al808`
   - Production: `${ALIYUN_SITE_URL}/en/products/pc900`
   - Production: `${ALIYUN_SITE_URL}/altec/optimized/<commit-sha>/products/AL808-640.avif`

## 5) Common Pitfall

If deep routes still 404:

- Check whether OSS/CDN object keys include extensionless aliases.
- Check custom domain CNAME and HTTPS certificate.
- Confirm route path is not being blocked by origin rules.
- Clear CDN cache if using CDN.

If GitHub Actions reports that OSS smoke passed but production smoke failed:

- The build and upload are good.
- The public domain probably still points to the old host, DNS has not propagated, or CDN has not refreshed.
- Check that `china-altec.com` and `www.china-altec.com` resolve to the Aliyun CDN/OSS route instead of the legacy Apache virtual host.
- The optimized image URL under `/altec/optimized/<commit-sha>/...` is a useful canary because the old host will not have that versioned object.

Current DNS note:

- `china-altec.com` currently uses `ce1.xincache.com` and `ce2.xincache.com` as authoritative name servers, so Aliyun DNS records will not affect this domain until the name servers are changed or records are added at the current DNS provider.
