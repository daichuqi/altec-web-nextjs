# ALTEC Website Preflight Checklist

Use this checklist before pushing, deploying, or telling the user a production issue is fixed.

## 1. Protect The Working Tree

```bash
git status --short
```

Rules:

- Identify unrelated dirty files before editing.
- Do not stage or commit unrelated user changes.
- Stage only the files needed for the current task.

## 2. Verify Locally

```bash
npm run verify
```

This must pass before push. It runs lint and the full Next.js static build.

Static export rules:

- Do not add dynamic routes without `generateStaticParams()`.
- Do not rely on runtime server behavior.
- Keep Aliyun routing compatible with exported static files and extensionless aliases.

## 3. Check Legacy URL Leakage

The old site is a source archive, not a runtime dependency.

```bash
rg -n "china-altec\\.com" src public .github
```

Allowed:

- Migration/audit documentation.
- Source provenance notes.

Not allowed:

- Product image `src` values.
- Download links.
- Runtime redirects to old product pages.

## 4. Check Product Assets

For every product touched:

```bash
find public/altec -iname '*MODEL*' -print
```

Required:

- Product card image exists.
- Product card image comes from the old product page image path, not the old gallery thumbnail.
- Do not use AI-enhanced product photos for production.
- Detail page images exist under `public/altec/images/details/<MODEL>/`.
- Downloads are local if shown as downloadable resources.
- Browser-visible image URLs return `200`.

## 5. Check Product Detail Completeness

Before marking a product detail page complete, compare the source page and the new page.

Required sections:

- Product name and model.
- Main product image.
- Feature summary.
- Technical/specification details.
- Panel dimensions when available.
- Mounting/opening dimensions when available.
- Terminal layout when available.
- Wiring diagram when available.
- Any model-specific notes.

If the source page has images, they must be copied locally and rendered by the new page.

## 6. Check Application Detail Pages

For every new knowledge or application page:

- Add both Chinese and English routes.
- Add `generateStaticParams()` for both dynamic route trees.
- Copy all source diagrams into `public/altec/images/applications/details/`.
- Rewrite rendered image paths to local `/altec/images/applications/details/...` URLs.
- Do not render runtime links or redirects to old `china-altec.com` pages.
- Confirm the list page links to the detail page and the language switch preserves the slug.

## 7. Aliyun Deploy Preflight

Production deployment uses Aliyun only.

Verify repository configuration:

```bash
gh variable list | rg -i "ALIYUN|NEXT_PUBLIC_SITE_URL|NEXT_PUBLIC_CDN_BASE_URL"
gh secret list | rg -i "ALIYUN"
```

Required:

- `ALIYUN_ACCESS_KEY_ID`
- `ALIYUN_ACCESS_KEY_SECRET`
- `ALIYUN_OSS_BUCKET`
- `ALIYUN_OSS_ENDPOINT`
- `NEXT_PUBLIC_SITE_URL=https://china-altec.com`

Recommended:

- `ALIYUN_OSS_PREFIX`
- `ALIYUN_OSS_REGION`
- `ALIYUN_SITE_URL=https://china-altec.com`
- `ALIYUN_OSSUTIL_VERSION`
- `NEXT_PUBLIC_CDN_BASE_URL` if a dedicated Aliyun CDN asset domain is used

Virtual host fallback rules:

- Upload the prepared deploy zip by FTP.
- Use the Aliyun control panel only to extract the uploaded zip.
- Do not upload production zip files through the browser UI.
- Do not use recursive FTP mirroring for normal deploys.
- Do not use 1Password for FTP credentials; use local env vars only.

## 8. Verify Production URL

The production URL is:

```text
https://china-altec.com
```

Smoke test:

```bash
curl -fsS https://china-altec.com/ >/tmp/altec-home.html
curl -fsS https://china-altec.com/products/th136 >/tmp/altec-th136.html
curl -fsS https://china-altec.com/applications/control-basics >/tmp/altec-app-control.html
curl -fsS https://china-altec.com/en/applications/tc950-tension-control-applications >/tmp/altec-app-tc950-en.html
curl -fsS https://china-altec.com/altec/images/details/TH136/TH136_Panel.gif >/tmp/altec-th136-panel.gif
curl -fsS https://china-altec.com/altec/images/applications/details/TC950/TC950_Wind.gif >/tmp/altec-tc950-application.gif
grep -q "ALTEC" /tmp/altec-home.html
grep -q "完整技术资料" /tmp/altec-th136.html
grep -q "工业过程控制常用名词解释" /tmp/altec-app-control.html
grep -q "TC950 Tension Controller Applications" /tmp/altec-app-tc950-en.html
```

If a clean path fails, confirm OSS/CDN contains extensionless HTML alias objects such as `products/th136`.

## 9. Wait For CI

After pushing to `main`:

```bash
gh run list --branch main --limit 5
gh run watch <run-id> --exit-status
```

Do not call the task done until GitHub Actions has passed.
