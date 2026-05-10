# ALTEC Website Retrospective: May 10, 2026

This document records the concrete mistakes, failure modes, and fixes from the ALTEC website rebuild and deployment work on May 10, 2026. Keep it factual and use it before future changes.

## What Went Wrong

### 1. Pushed code without enough local verification

The Netlify build failed with:

```text
Page "/blog/[slug]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
```

Root cause:

- The project uses Next.js static export with `output: "export"`.
- Dynamic routes must provide `generateStaticParams()`.
- I did not consistently run the full local verification command before pushing.

Prevention:

- Always run `npm run verify` before committing or pushing.
- Treat `next build` as required, not optional.
- For every new App Router dynamic route, check that it works with static export.

### 2. Deployed from a dirty local Netlify state

The site looked deployed, but Netlify served a broken/502-like production state.

Root cause:

- A local `.netlify/` folder contained generated Netlify internal server handler files.
- A manual deploy uploaded a function even though the site is intended to be static-only.
- Netlify reported a live deploy, but the deploy did not match the expected static export model.

Prevention:

- Before any manual deploy, remove local Netlify generated state:

  ```bash
  rm -rf .netlify
  ```

- Deploy only the static export:

  ```bash
  npx netlify deploy --prod --no-build --dir out --site 0a7fa9b6-ec81-4f21-ad30-1c14265bd68f
  ```

- A healthy ALTEC deploy must have no functions and no edge functions.

### 3. Trusted the default Netlify domain after public DNS failed

The default URL `https://altec-web-nextjs-20260510.netlify.app/` was not a reliable customer-facing URL. Public Google DNS returned `NXDOMAIN` for it even while Netlify reported the deploy as ready.

Root cause:

- I treated Netlify's internal deploy state as sufficient proof of public availability.
- The GitHub Actions smoke test was originally best-effort and allowed failure.
- The production URL was still the generated `*.netlify.app` hostname.

Fix:

- Production was moved to `https://altec.daichuqi.com`.
- Netlify DNS now manages `altec.daichuqi.com` in the `daichuqi.com` zone.
- CI now fails if the custom production domain is not configured.
- CI now performs required smoke tests against `https://altec.daichuqi.com`.

Prevention:

- Do not use the default `*.netlify.app` hostname as the customer-facing URL.
- Check public DNS when a user reports the site is inaccessible:

  ```bash
  curl -s 'https://dns.google/resolve?name=altec.daichuqi.com&type=A'
  curl -s 'https://dns.google/resolve?name=altec.daichuqi.com&type=AAAA'
  ```

### 4. Let broken image paths reach the site

Product cards showed broken image icons.

Root cause:

- Some product image references did not resolve to local static files.
- Legacy source assets were not consistently downloaded, normalized, and verified.

Prevention:

- Every product image used in UI must exist under `public/`.
- Do not depend on old `china-altec.com` image URLs at runtime.
- After adding or changing product images, verify the rendered URL and the file type:

  ```bash
  test -f public/altec/products/AL808.jpg
  curl -fsS https://altec.daichuqi.com/altec/products/AL808.jpg >/tmp/altec-image.jpg
  file /tmp/altec-image.jpg
  ```

### 5. Migrated product details too shallowly

Some product detail pages were missing important source content and source images. Examples raised by the user included `TH136` and `PC900`.

Root cause:

- I initially captured only summary content instead of auditing the full legacy detail page.
- I did not compare the source page's image list and content blocks against the new detail page.

Prevention:

- For every product detail migration, audit the source page for:
  - Main product image.
  - Feature bullets.
  - Technical/specification tables.
  - Panel size images.
  - Mounting/opening size images.
  - Terminal/wiring diagrams.
  - Any operation notes or model-specific warnings.
- Download all detail assets into `public/altec/details/<MODEL>/`.
- Do not mark a product detail page complete until source image counts and content sections have been checked.

### 6. Left download behavior tied to the old website

The user explicitly required downloads to be served by the new site, not redirected to the old website.

Root cause:

- Some early download entries still behaved like legacy links instead of local hosted files.

Prevention:

- All download files must be stored in this project under `public/`.
- No download link should point to `china-altec.com`.
- Run this before release:

  ```bash
  rg -n "china-altec\\.com" src public .github netlify.toml
  ```

Only source attribution notes or migration documentation should reference the old domain.

### 7. Picked the wrong visual direction at first

The first visual direction leaned too much toward a consumer-style Apple-like landing page. The user clarified this is an industrial B2B product website and should not behave like a consumer product launch page.

Root cause:

- I optimized for a premium visual style before grounding the design in the site's actual buyers and workflows.

Prevention:

- For this project, default to industrial B2B information architecture:
  - Multiple navigable pages.
  - Clear product categories.
  - Detail pages with technical content.
  - Local downloads.
  - Low-motion, utilitarian navigation.
- Do not use long single-page scrolling as the primary structure for this site.

### 8. Did not document guardrails early enough

Some problems repeated because the prevention steps were not written down immediately.

Root cause:

- Fixes were made in code and CI, but the operational lesson was not always captured in a durable Markdown file.

Prevention:

- Any production incident or user-reported repeated failure must create or update a document in `docs/`.
- The document must include:
  - What happened.
  - Root cause.
  - Exact commands used to verify the fix.
  - A checklist item that prevents the same issue.

### 9. CDN refactor must pass full build before merge

A CDN-related refactor introduced a TypeScript regression during HTML injection:

```text
Type 'string | undefined' is not assignable to type 'string | TrustedHTML'.
```

Root cause:

- `richDetailHtmlWithCdn` was derived from optional source data without providing a string fallback before passing it into `dangerouslySetInnerHTML`.

Prevention:

- In every render path, keep values used in `__html` typed as non-optional strings.
- Require `npm run verify` (lint + build) after each content/data-model and route refactor.

## Current Required Checks

Run these before pushing any meaningful code or content change:

```bash
git status --short
npm run verify
rg -n "china-altec\\.com" src public .github netlify.toml
```

After deployment, verify production:

```bash
curl -fsS https://altec.daichuqi.com/ >/tmp/altec-home.html
curl -fsS https://altec.daichuqi.com/products/th136 >/tmp/altec-th136.html
curl -fsS https://altec.daichuqi.com/altec/details/TH136/TH136_Panel.gif >/tmp/altec-th136-panel.gif
grep -q "ALTEC" /tmp/altec-home.html
grep -Eq "complete technical details|完整技术资料" /tmp/altec-th136.html
```

Check Netlify deployment health:

```bash
npx netlify api getSite --data '{"site_id":"0a7fa9b6-ec81-4f21-ad30-1c14265bd68f"}'
```

Expected:

- `state` is `current`.
- `published_deploy.state` is `ready`.
- `custom_domain` is `altec.daichuqi.com`.
- `published_deploy.available_functions` is empty.
- No edge functions are present.
