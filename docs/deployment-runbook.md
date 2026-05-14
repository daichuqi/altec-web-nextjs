# ALTEC Deployment Runbook

ALTEC web deploys to Aliyun only. Do not deploy this project to Netlify.

## Current Production Path

The current public site should be served from Aliyun OSS bucket/CDN bound to:

- Primary canonical origin: `https://www.altec-sz.com`
- Secondary host: `https://altec-sz.com` should redirect to the canonical origin when host-level redirects are available.

Use this sequence for normal production publishes:

1. Set `NEXT_PUBLIC_SITE_URL=https://www.altec-sz.com`.
2. Set OSS credentials locally or in GitHub Actions.
3. Run `npm run deploy:aliyun:oss`, or dispatch `.github/workflows/aliyun-oss.yml`.
4. Smoke test the OSS origin and production URLs.
5. Submit `https://www.altec-sz.com/sitemap.xml` in Google Search Console after DNS is live.

`npm run deploy:aliyun:oss` is intentionally the single local bucket publish command. It runs `npm run verify`, which builds the static export, then syncs the current `out/` to OSS and creates extensionless route objects for clean URLs.

Deployment performance rules:

- Prefer CDN cache rules for `_next/static`, optimized images, HTML, `robots.txt`, and `sitemap.xml`. Do not run slow per-object metadata updates during normal deploys.
- Keep clean URL aliases until CDN rewrite rules can map extensionless paths to `.html` objects.
- Do not pass AccessKey values as command-line arguments. The local and CI sync scripts use the Aliyun OSS SDK with environment variables.

## Legacy Virtual Host Fallback

The virtual host zip flow is retained only as a fallback while a domain is still bound to the Aliyun Cloud Virtual Host:

If `npm run verify` already passed in the same working tree and you only need to regenerate the zip, run:

```bash
npm run package:aliyun
```

Do not run `npm run build` again between verify and package unless you deliberately want to replace the current `out/`.

Detailed commands live in `docs/aliyun-virtual-host-deploy.md`.

The Aliyun package intentionally excludes `altec/downloads/`; manuals and software are served from OSS/CDN through `NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL`.

## Downloads CDN

Manuals and software may be served from OSS/CDN without moving the rest of the site:

```bash
npm run sync:downloads:oss
```

This command uses the same Aliyun OSS SDK environment as the full site sync and uploads only files under `public/altec/downloads/`.

When `NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL` is set, only `/altec/downloads/*` links are rewritten to that origin. Images, HTML, and `_next/static` JavaScript/CSS stay on the normal site origin.

Do not use a global CDN asset variable for this project unless the whole static site is deliberately moved and smoke-tested on that origin.

## Full OSS Path

`.github/workflows/aliyun-oss.yml` is the normal CI publish path after repository variables and secrets are configured. Use `docs/aliyun-oss-setup.md` when preparing or validating the OSS/CDN architecture.

Pushes to `main` only trigger this publish workflow when user-facing site, asset, build, dependency, or deployment script files change. Documentation-only updates stay in GitHub and do not sync the bucket. Use the manual `workflow_dispatch` trigger when a deploy is needed after a non-matching change.

## Required Local Checks

Before publishing:

```bash
npm run deploy:aliyun:oss
```

After publishing:

```bash
curl -fsS https://www.altec-sz.com/ >/tmp/altec-home.html
curl -fsS https://www.altec-sz.com/products/al808 >/tmp/altec-al808.html
curl -fsS https://www.altec-sz.com/en/products/pc900 >/tmp/altec-pc900-en.html
curl -fsSI https://www.altec-sz.com/altec/downloads/TC950.pdf

grep -q "ALTEC" /tmp/altec-home.html
grep -q "AL808" /tmp/altec-al808.html
grep -q "PC900" /tmp/altec-pc900-en.html
```

## Hard Rules

- Do not use Netlify.
- Do not use 1Password for Aliyun deploy credentials; use local `.env.local` or GitHub secrets.
- Do not use the virtual-host zip flow unless OSS/CDN is unavailable or the user explicitly asks for the legacy fallback.
- Do not point `_next/static` at a different origin from HTML unless the full OSS/CDN architecture and smoke checks are updated deliberately.
- Keep `/altec/downloads/*` stable because customers may bookmark manuals directly.
