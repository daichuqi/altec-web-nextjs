<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ALTEC Website Project Rules

This project is the bilingual company website for Shenzhen ALTEC Electronics Co., Ltd. Keep it stable, easy to maintain, and friendly to search engines.

## Tech Stack

- Framework: Next.js App Router, version pinned in `package.json`.
- Styling: Tailwind CSS.
- Deployment target: Aliyun OSS bucket/CDN. The legacy Aliyun Cloud Virtual Host zip upload by FTP is retained only as a fallback path.
- Node runtime for deploy: Node 22.
- Main content source: `src/lib/site-data.ts`.
- Shared page UI: `src/components/pages.tsx` and `src/components/site-layout.tsx`.
- SEO config: `src/lib/seo.ts`.

## Before Editing

- Read the relevant local Next.js guide in `node_modules/next/dist/docs/` before changing routing, metadata, images, fonts, config, or build behavior.
- Check existing patterns before adding new files or abstractions.
- Do not remove legacy product/manual assets from `public/altec` unless the business confirms they are obsolete.
- Preserve both Chinese and English versions whenever changing navigation, page content, product data, metadata, or downloads.

## Content Rules

- Company names:
  - Chinese: `深圳市亚特克电子有限公司`
  - English: `Shenzhen ALTEC Electronics Co., Ltd.`
  - Brand: `ALTEC 亚特克`
- Product model names must stay exact, for example `AL807`, `AL808`, `TC808`, `TC930`, `TC950`, `MTC35`, `CPC316`.
- Keep industrial search terms in natural page copy: 温度控制器, 张力控制器, pH/ORP 控制器, 恒压供水控制器, 温湿度控制器, industrial process controller, temperature controller, tension controller.
- Avoid vague marketing copy. This is an industrial catalog and documentation site; prioritize clear product categories, use cases, contact information, and downloads.
- When adding a new page, add it in both languages unless there is a deliberate reason not to.
- Do not let product content become hard to maintain. Avoid adding large one-off HTML blobs or scattered bilingual strings when a structured data model can represent the same content.
- Product detail content should be modeled as maintainable sections whenever possible: overview, model coding tables, diagrams, specifications, applications, downloads, and SEO fields. Each section should carry Chinese and English together so one language cannot silently fall behind.
- If a product detail page still uses legacy `html` / `htmlEn`, keep both versions equally complete and document any temporary mismatch in `docs/product-detail-migration-audit.md`.
- Prefer adding validation or build-time checks for bilingual product completeness over relying on manual review.

## I18n Rules

- The site is a static export deployed on Aliyun. Do not add Next.js middleware/proxy-based i18n routing unless the deployment architecture changes away from static hosting.
- Use `src/lib/i18n.ts` as the single source for locales, localized paths, navigation labels, language switching, category descriptions and reusable UI copy.
- Avoid scattering `{lang === "zh" ? ... : ...}` or duplicated route helpers through components. Prefer `pick(ui.section.key, lang)` and `localizedPath(lang, href)`.
- Product and application content may keep structured `Record<Lang, ...>` fields in their data files, but reusable interface copy belongs in `src/lib/i18n.ts`.
- Keep Chinese and English URLs paired as `/path` and `/en/path`; preserve `hreflang` and canonical generation through `src/lib/seo.ts`.

## SEO Rules

- Every public page must export `metadata` using `pageMetadata(...)` from `src/lib/seo.ts`.
- Update `seoPages` in `src/lib/seo.ts` when adding, renaming, or removing public routes.
- Keep canonical URLs and `hreflang` pairs correct for Chinese and English pages.
- Keep `sitemapEntries` updated for all public routes that should be indexed.
- Keep product images descriptive with `alt` text including both model and product type.
- Do not block Google in `src/app/robots.ts` unless there is a specific launch reason.
- `NEXT_PUBLIC_SITE_URL` must be set to the production origin before deployment. This controls canonical URLs, sitemap URLs, robots, Open Graph, and structured data.

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Verify before handing off:

```bash
npm run verify
```

Do not publish changes that fail lint or build.

Image optimization is part of `npm run build`: the `prebuild` script generates versioned AVIF/WebP variants under `public/altec/images/optimized/`, which is intentionally gitignored.
All image assets belong under `public/altec/images/`; downloads remain under `public/altec/downloads/`. Image asset placement and existence are checked by `npm run audit:images`; see `docs/asset-organization.md`.

## Publishing

Preferred and only production platform: Aliyun.

Local publishing rules:

- Default publish path is full Aliyun OSS bucket sync: run `npm run deploy:aliyun:oss`.
- For OSS deploys, read `ALIYUN_ACCESS_KEY_ID`, `ALIYUN_ACCESS_KEY_SECRET`, `ALIYUN_OSS_BUCKET` and `ALIYUN_OSS_ENDPOINT` from local env or `.env.local`. Never copy real secrets into tracked docs or final summaries.
- Do not use 1Password for ALTEC FTP deploy credentials. FTP is legacy fallback only; if needed, read `ALIYUN_FTP_USER` and `ALIYUN_FTP_PASSWORD` from `.env.local`.
- `.env.local` is the local auth file for deploys and is intentionally ignored by git.
- If required local env values are missing or empty, stop and ask for the local env to be filled. Do not fall back to 1Password.
- For Aliyun console actions that need an authenticated browser session, use the Codex Chrome Extension / Chrome automation path first so the user's normal browsing is not disturbed.
- For virtual-host fallback deploys, run `npm run prepare:aliyun`. It runs `npm run verify` once, then packages the current `out/` without rebuilding.
- Use `npm run package:aliyun` only when `npm run verify` already passed for the current working tree and the existing `out/` should be reused.
- Do not run `npm run build` again after `npm run verify` during a publish; it wastes time and can change the `out/` being packaged.
- For virtual-host fallback deploys, upload the prepared zip by FTP. Do not upload production zip files through the Aliyun web UI.
- After the FTP upload succeeds and the zip is confirmed in `htdocs`, tell the user the zip is uploaded and open the Aliyun virtual host file manager for `hyu1283370001`. The user will handle the `解压缩` step by default.
- Do not manually extract the uploaded zip in the Aliyun file manager unless the user explicitly says Codex should do the manual extraction.
- If the user asks Codex to manually extract, use the Aliyun file manager only to extract the FTP-uploaded zip into `htdocs` with overwrite enabled.
- Do not recursively FTP the exported site file by file.
- Do not include `altec/downloads/` in the virtual-host zip. Downloads are served from OSS/CDN and the package script enforces this.

Before production deploy:

1. Confirm the final production domain.
2. Set `NEXT_PUBLIC_SITE_URL` to the exact Aliyun production origin, currently `https://www.altec-sz.com`.
3. Confirm whether the publish path is current OSS bucket/CDN or legacy virtual host FTP zip.
4. For OSS publishing, run `npm run deploy:aliyun:oss` locally.
5. Follow the matching runbook in `docs/deployment-runbook.md`.

### Downloads OSS/CDN publishing

Use this when only manuals/software should move to OSS/CDN:

```bash
npm run sync:downloads:oss
```

Download CDN scope: only `/altec/downloads/*` should be rewritten to the downloads CDN. Do not set a global public asset CDN for images or `_next/static` unless the deployment architecture and smoke checks are updated deliberately.

### Full Aliyun OSS publishing

1. Set required Aliyun secrets:
   - `ALIYUN_ACCESS_KEY_ID`
   - `ALIYUN_ACCESS_KEY_SECRET`
   - `ALIYUN_OSS_BUCKET`
   - `ALIYUN_OSS_ENDPOINT`
2. Optionally set:
   - `NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL` or `ALIYUN_DOWNLOADS_CDN_BASE_URL` for manuals/software downloads only
   - `ALIYUN_OSS_PREFIX`
   - `ALIYUN_OSS_REGION`
   - `ALIYUN_SITE_URL`
3. Ensure OSS/CDN routing serves clean paths correctly for routes like `/products/th136`, `/en/products/th136`, `/applications/...`.
4. Run `npm run deploy:aliyun:oss` locally, or push/dispatch `.github/workflows/aliyun-oss.yml` after repository variables/secrets are configured.
5. Follow `docs/aliyun-oss-setup.md` for domain/CDN/OSS one-time setup.

After publishing:

1. Open the production homepage and several subpages.
2. Check `/robots.txt`.
3. Check `/sitemap.xml`.
4. Add the domain to Google Search Console.
5. Submit `https://YOUR_DOMAIN/sitemap.xml` in Google Search Console.
6. Use URL Inspection in Google Search Console for the homepage, `/products`, `/en`, and `/en/products`.

### Aliyun virtual host publishing

Use this only as a legacy fallback while a domain is served by the Aliyun Cloud Virtual Host.

- Do not publish the static export by recursive FTP mirroring as the normal process. Uploading many individual `_next`, image, page and route files is too slow and easy to interrupt.
- Run `npm run prepare:aliyun`, upload the generated zip by FTP, confirm it exists, then tell the user and open the Aliyun virtual host file manager. The user normally performs the server-side unzip; Codex only performs the manual unzip when explicitly asked.
- If `npm run verify` already passed in the same working tree, run only `npm run package:aliyun` to package the current `out/`.
- Do not use the Aliyun control panel upload button for production packages.
- Keep `docs/aliyun-virtual-host-deploy.md` as the source of truth for the zip-and-extract process.

## Maintenance

- Product, application, and download updates should usually be made in `src/lib/site-data.ts`.
- Page layout changes should usually be made in `src/components/pages.tsx`.
- Header, footer, contact block, and language navigation changes should usually be made in `src/components/site-layout.tsx`.
- SEO title, description, sitemap, company schema, and canonical URL changes should usually be made in `src/lib/seo.ts`.
- When adding a downloadable manual or software file, place it under `public/altec/downloads/` and add an entry to `downloads` in `src/lib/site-data.ts`.
- When adding a product image, place it under `public/altec/images/products/`, reference it through `src/lib/assets.ts`, and verify it renders on `/products`.
- When adding product-detail or application-detail diagrams, place them under the canonical folders documented in `docs/asset-organization.md`; do not introduce one-off image folders.
- Keep old download URLs stable when possible. Industrial customers may bookmark manuals directly.

## Release Checklist

- For non-publish handoff, `npm run verify` passes.
- For OSS publishing, `npm run deploy:aliyun:oss` passes.
- For virtual-host publishing, `npm run prepare:aliyun` passes. Do not run `npm run verify` and then another `npm run build`.
- Chinese and English routes render.
- `/robots.txt` allows crawling.
- `/sitemap.xml` lists the expected routes and production domain.
- Contact phone/address are current.
- Product images and downloads load from production.
- Google Search Console sitemap is submitted after domain changes.
