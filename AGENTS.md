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
npm run build
```

Do not publish changes that fail lint or build.

Image optimization is part of `npm run build`: the `prebuild` script generates versioned AVIF/WebP variants under `public/altec/optimized/`, which is intentionally gitignored.

## Publishing

Preferred and only production platform: Aliyun.

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

## Maintenance

- Product, application, and download updates should usually be made in `src/lib/site-data.ts`.
- Page layout changes should usually be made in `src/components/pages.tsx`.
- Header, footer, contact block, and language navigation changes should usually be made in `src/components/site-layout.tsx`.
- SEO title, description, sitemap, company schema, and canonical URL changes should usually be made in `src/lib/seo.ts`.
- When adding a downloadable manual or software file, place it under `public/altec/downloads/` and add an entry to `downloads` in `src/lib/site-data.ts`.
- When adding a product image, place it under `public/altec/products/`, add it to `products`, and verify it renders on `/products` and `/gallery`.
- Keep old download URLs stable when possible. Industrial customers may bookmark manuals directly.

## Release Checklist

- `npm run lint` passes.
- `npm run build` passes.
- Chinese and English routes render.
- `/robots.txt` allows crawling.
- `/sitemap.xml` lists the expected routes and production domain.
- Contact phone/address are current.
- Product images and downloads load from production.
- Google Search Console sitemap is submitted after domain changes.
