# ALTEC Aliyun Publish Setup

This is the practical checklist for enabling the new Aliyun publish path in this repo.

## 1) OSS Preparation

1. Create an OSS bucket (for example `altec-web`).
2. Record bucket endpoint (for example `oss-cn-hangzhou.aliyuncs.com`).
3. Upload permissions:
   - Create an AccessKey pair used by CI.
   - Grant permissions at least for:
     - `oss:PutObject`
     - `oss:GetObject`
     - `oss:DeleteObject`
     - `oss:ListObjects`
4. Enable static web hosting or route traffic through CDN origin to OSS.

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

- `ALIYUN_DEPLOY_ENABLED = true`
- `ALIYUN_SITE_URL` = your public Aliyun origin (example: `https://www.example.com`)

Set repository secrets:

- `ALIYUN_ACCESS_KEY_ID`
- `ALIYUN_ACCESS_KEY_SECRET`
- `ALIYUN_OSS_BUCKET`
- `ALIYUN_OSS_ENDPOINT`

Optional:

- `ALIYUN_OSS_PREFIX`
- `ALIYUN_OSS_REGION`
- `ALIYUN_OSSUTIL_VERSION` (defaults to `1.7.18`)

## 4) Enable and Verify

1. Trigger GitHub Action `Deploy to Aliyun OSS` (or push to `main`).
2. Wait for CI and check:
   - build succeeded
   - OSS sync succeeded
   - smoke tests passed (if `ALIYUN_SITE_URL` is set)
3. Manually verify key routes:
   - `${ALIYUN_SITE_URL}/`
   - `${ALIYUN_SITE_URL}/products/al808`
   - `${ALIYUN_SITE_URL}/en/products/pc900`

## 5) Common Pitfall

If deep routes still 404:

- Check whether OSS/CDN object keys include extensionless aliases.
- Check custom domain CNAME and HTTPS certificate.
- Confirm route path is not being blocked by origin rules.
- Clear CDN cache if using CDN.
