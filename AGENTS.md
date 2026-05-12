<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ALTEC Website Project Rules

This project is the bilingual company website for Shenzhen ALTEC Electronics Co., Ltd. Keep it stable, easy to maintain, and friendly to search engines.

## Tech Stack

- Framework: Next.js App Router, version pinned in `package.json`.
- Styling: Tailwind CSS.
- Deployment target: Aliyun OSS/CDN, configured by `.github/workflows/aliyun-oss.yml`.
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

Verify before handing off or publishing:

```bash
npm run lint
npm run audit:images
npm run build
```

Do not publish changes that fail lint or build.

Image optimization is part of `npm run build`: the `prebuild` script generates versioned AVIF/WebP variants under `public/altec/images/optimized/`, which is intentionally gitignored.
All image assets belong under `public/altec/images/`; downloads remain under `public/altec/downloads/`. Image asset placement and existence are checked by `npm run audit:images`; see `docs/asset-organization.md`.

## Publishing

Preferred and only production platform: Aliyun.

Local publishing rules:

- Do not use 1Password for ALTEC FTP deploy credentials. Read `ALIYUN_FTP_USER` and `ALIYUN_FTP_PASSWORD` from the local ignored `.env.local` file.
- `.env.local` is the local auth file for FTP deploys and is intentionally ignored by git. Never copy real FTP secrets into tracked docs or final summaries.
- If those local env values are missing or empty, stop and ask for the local env to be filled. Do not fall back to 1Password.
- For Aliyun console actions that need an authenticated browser session, use the Codex Chrome Extension / Chrome automation path first so the user's normal browsing is not disturbed.
- For virtual-host deploys, upload the prepared zip by FTP. Do not upload production zip files through the Aliyun web UI.
- Use the Aliyun file manager only to extract the FTP-uploaded zip into `htdocs` with overwrite enabled.
- Do not recursively FTP the exported site file by file.

Before the first production deploy:

1. Confirm the final production domain.
2. Set `NEXT_PUBLIC_SITE_URL` to the exact Aliyun production origin, for example `https://china-altec.com`.
3. Confirm DNS points to the Aliyun OSS/CDN or Aliyun virtual host origin.
4. Run `npm run lint` and `npm run build` locally.
5. Deploy through the Aliyun workflow.

### Aliyun OSS publishing

1. Set required Aliyun secrets:
   - `ALIYUN_ACCESS_KEY_ID`
   - `ALIYUN_ACCESS_KEY_SECRET`
   - `ALIYUN_OSS_BUCKET`
   - `ALIYUN_OSS_ENDPOINT`
2. Optionally set:
   - `NEXT_PUBLIC_CDN_BASE_URL` or `ALIYUN_CDN_BASE_URL`
   - `ALIYUN_OSS_PREFIX`
   - `ALIYUN_OSS_REGION`
   - `ALIYUN_SITE_URL`
3. Ensure OSS/CDN routing serves clean paths correctly for routes like `/products/th136`, `/en/products/th136`, `/applications/...`.
4. Run `npm run verify` before pushing.
5. Follow `docs/aliyun-oss-setup.md` for domain/CDN/OSS one-time setup.

After publishing:

1. Open the production homepage and several subpages.
2. Check `/robots.txt`.
3. Check `/sitemap.xml`.
4. Add the domain to Google Search Console.
5. Submit `https://YOUR_DOMAIN/sitemap.xml` in Google Search Console.
6. Use URL Inspection in Google Search Console for the homepage, `/products`, `/en`, and `/en/products`.

### Aliyun virtual host fallback

Use this only while the production domain still points to the Aliyun cloud virtual host instead of OSS/CDN.

- Do not publish the static export by recursive FTP mirroring as the normal process. Uploading many individual `_next`, image, page and route files is too slow and easy to interrupt.
- Build the site, create one zip package from the deploy folder, upload that zip by FTP, then use the Aliyun virtual host file manager only to extract it into `htdocs` with overwrite enabled.
- Do not use the Aliyun control panel upload button for production packages.
- Keep `docs/aliyun-virtual-host-deploy.md` as the source of truth for the zip-and-extract fallback process.

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

- `npm run lint` passes.
- `npm run audit:images` passes.
- `npm run build` passes.
- Chinese and English routes render.
- `/robots.txt` allows crawling.
- `/sitemap.xml` lists the expected routes and production domain.
- Contact phone/address are current.
- Product images and downloads load from production.
- Google Search Console sitemap is submitted after domain changes.
