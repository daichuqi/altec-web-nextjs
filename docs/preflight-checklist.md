# ALTEC Website Preflight Checklist

Use this checklist before pushing, manually deploying, or telling the user a production issue is fixed.

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
- Do not add server-only deployment assumptions unless the Netlify setup changes intentionally.

## 3. Check Legacy URL Leakage

The old site is a source archive, not a runtime dependency.

```bash
rg -n "china-altec\\.com" src public .github netlify.toml
```

Allowed:

- Migration scripts.
- Documentation explaining source provenance.

Not allowed:

- Product image `src` values.
- Download links.
- Runtime redirects to old product pages.

## 4. Check Product Assets

For every product touched:

```bash
find public/altec -iname '*MODEL*' -print
```

Replace `MODEL` with the actual model, for example:

```bash
find public/altec -iname '*PC900*' -print
```

Required:

- Product card image exists.
- Product card image comes from the old product page image path, such as `http://www.china-altec.com/images/AL810/AL810.jpg`.
- Do not use AI-enhanced product photos for production.
- Do not use `images_eng/gallery` thumbnails as the primary product image.
- Detail page images exist under `public/altec/details/<MODEL>/`.
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
- Copy all source diagrams into `public/altec/applications/details/`.
- Rewrite rendered image paths to local `/altec/applications/details/...` URLs.
- Do not render runtime links or redirects to old `china-altec.com` pages.
- Confirm the list page links to the detail page and the language switch preserves the slug.

## 7. Deploy Safely

For manual deploys:

```bash
rm -rf .netlify
npm run verify
npx netlify deploy --prod --no-build --dir out --site 0a7fa9b6-ec81-4f21-ad30-1c14265bd68f
```

Deploy must report:

- No functions deployed.
- No edge functions deployed.

## 8. Verify Production URL

The production URL is:

```text
https://altec.daichuqi.com
```

Do not use the default `*.netlify.app` domain as the user-facing production URL.

Smoke test:

```bash
curl -fsS https://altec.daichuqi.com/ >/tmp/altec-home.html
curl -fsS https://altec.daichuqi.com/products/th136 >/tmp/altec-th136.html
curl -fsS https://altec.daichuqi.com/applications/control-basics >/tmp/altec-app-control.html
curl -fsS https://altec.daichuqi.com/en/applications/tc950-tension-control-applications >/tmp/altec-app-tc950-en.html
curl -fsS https://altec.daichuqi.com/altec/details/TH136/TH136_Panel.gif >/tmp/altec-th136-panel.gif
curl -fsS https://altec.daichuqi.com/altec/applications/details/TC950/TC950_Wind.gif >/tmp/altec-tc950-application.gif
grep -q "ALTEC" /tmp/altec-home.html
grep -q "完整技术资料" /tmp/altec-th136.html
grep -q "工业过程控制常用名词解释" /tmp/altec-app-control.html
grep -q "TC950 Tension Controller Applications" /tmp/altec-app-tc950-en.html
```

DNS check:

```bash
curl -s 'https://dns.google/resolve?name=altec.daichuqi.com&type=A'
curl -s 'https://dns.google/resolve?name=altec.daichuqi.com&type=AAAA'
```

## 9. Verify Netlify State

```bash
npx netlify api getSite --data '{"site_id":"0a7fa9b6-ec81-4f21-ad30-1c14265bd68f"}'
```

Required:

- `custom_domain` is `altec.daichuqi.com`.
- Site `state` is `current`.
- Published deploy state is `ready`.
- No functions are deployed.
- No edge functions are deployed.

## 10. Wait For CI

After pushing to `main`:

```bash
gh run list --branch main --limit 5
gh run watch <run-id> --exit-status
```

Do not call the task done until GitHub Actions has passed.
