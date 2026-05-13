# ALTEC Coding Style Best Practices

This guide is the working style contract for the ALTEC website. It favors a stable static export, bilingual maintainability, SEO correctness, and clear industrial catalog content over clever abstractions.

## Core Principles

- Keep the site static-export friendly. Do not introduce middleware, proxy-based i18n, server-only runtime behavior, or request-time dependencies unless the deployment architecture changes.
- Prefer existing local patterns over new abstractions. Most page work should flow through `src/lib/site-data.ts`, `src/lib/application-data.ts`, `src/lib/i18n.ts`, `src/lib/seo.ts`, `src/components/pages.tsx`, and shared detail components.
- Make product content structured when practical. Use typed data for overview, highlights, specifications, applications, downloads, SEO fields, and bilingual text instead of one-off component markup.
- Keep Chinese and English paired. Any content, navigation, SEO, download, or route change should update both languages together.
- Optimize for industrial buyers and engineers. Copy should quickly expose model, function, input/output, specification, application, manual/download, and contact path.

## TypeScript And React

- Use explicit domain types for shared data structures, especially product, application, locale, SEO, download, and asset data.
- Keep Server Components as the default. Add `"use client"` only for actual browser interaction such as search, previews, theme switching, or local storage.
- Keep Client Components narrow and leaf-oriented. Pass already-shaped data into them instead of moving page orchestration client-side.
- Use `const` data and derived helpers for stable catalogs. Avoid mutating exported data at render time.
- Avoid `any`, broad casts, and disabled lint rules. If a lint exception is unavoidable, keep it local and explain the reason in code or in this document.
- Prefer small pure helpers for repeated transformations such as slugs, localized paths, asset URLs, and normalized search tokens.

## I18n

- Use `src/lib/i18n.ts` as the source for shared UI copy, navigation, reusable labels, category descriptions, and locale helpers.
- Use `pick(localizedValue, lang)` for reusable UI copy and `localizedPath(lang, href)` for links.
- Avoid scattering `{lang === "zh" ? ... : ...}` inside components. Branching in SEO helpers is acceptable when it builds language-specific titles, descriptions, keywords, or schemas.
- Product and application data may use `Record<Lang, ...>` fields, but reusable interface copy belongs in `ui`.
- Every public route should have a Chinese path and an English `/en/...` path unless explicitly documented otherwise.

## SEO And Metadata

- Every public page must export `metadata` using `pageMetadata(...)`, `productPageMetadata(...)`, or `applicationArticleMetadata(...)`.
- Canonical URLs, Open Graph URLs, JSON-LD URLs, `robots.txt`, and `sitemap.xml` must come from `src/lib/seo.ts`.
- Keep the canonical production origin as `https://www.altec-sz.com` unless the business deliberately changes the primary domain.
- Add, rename, or remove public routes only together with `seoPages`, `sitemapEntries`, breadcrumbs, and localized alternates.
- Keep `hreflang` pairs complete: `zh-CN`, `en-US`, and `x-default`.
- Product images need descriptive alt text that includes the model and product type where possible.

## Assets And Rich Content

- Product images belong under `public/altec/images/products/` and should be referenced through `productImage(...)`.
- Application cover/detail images should use the asset helpers in `src/lib/assets.ts`.
- Downloads remain under `public/altec/downloads/` and must be listed in `downloads`.
- Use `OptimizedImage` for local product/application images so AVIF/WebP variants are used when available.
- Raw rich HTML is allowed only for migrated technical content and must render through `RichHtml`, which rewrites asset links. Do not add new arbitrary `dangerouslySetInnerHTML` call sites.
- Prefer migrating legacy `html` / `htmlEn` into structured bilingual sections over adding larger HTML blobs.

## Styling And UI

- Use Tailwind utility classes and existing design tokens such as `bg-panel`, `text-copy-muted`, `border-line`, and `text-accent`.
- Build dense, utilitarian catalog interfaces. Avoid marketing-style hero copy, decorative sections, or one-off visual systems.
- Keep buttons, cards, panels, and grids consistent with existing components. Add shared components only when they reduce real duplication.
- Use lucide icons for standard actions instead of custom inline SVG.
- Ensure mobile text and controls fit without overlap. Use stable dimensions for product cards, image frames, search controls, and repeated panels.

## Scripts And Deployment

- Scripts should be deterministic, idempotent where possible, and fail loudly with clear messages.
- Shared script plumbing belongs under `scripts/lib/`. Use the common helpers for filesystem walking, env loading, Aliyun OSS client setup, cache policy, and download catalog parsing instead of copying those utilities into each script.
- Never commit secrets. FTP credentials stay in local ignored `.env.local`.
- Use `npm run verify` before non-publish handoff.
- Use `npm run prepare:aliyun` for virtual-host publishing. Do not run a second build between verify and packaging.
- Use the SDK-based `npm run sync:site:oss` and `npm run sync:downloads:oss` paths for OSS publishes. Do not add new `ossutil` shell workflows that pass AccessKey values as command-line arguments.
- Do not introduce a global asset CDN for `_next/static` or images unless the deploy architecture and smoke checks are updated deliberately.
- Downloads CDN rewriting must remain scoped to `/altec/downloads/*`.

## Review Checklist

- `npm run lint` passes.
- `npm run verify` passes before handoff or publish.
- All public pages export metadata.
- `robots.txt`, `sitemap.xml`, canonical, hreflang, Open Graph, and JSON-LD agree on the canonical origin.
- Product/application/download data is bilingual and complete.
- New product or application assets pass `npm run audit:images`.
- New downloads pass `npm run audit:downloads`.
- No new scattered locale conditionals, raw image paths, or arbitrary rich HTML renderers.
- No dead components, unused files, or duplicated versions of the same UI remain after refactors.

## Codebase Audit - 2026-05-13

Overall status after cleanup: compliant with the enforceable rules below. The remaining long-term style debt is legacy migrated rich HTML, which is now guarded by an active-product bilingual completeness audit.

### Passing Checks

- `npm run lint` passes.
- `npm run audit:code-style` passes and is part of `npm run verify`.
- All 16 `src/app/**/page.tsx` files export metadata.
- `src/app/robots.ts` and `src/app/sitemap.ts` generate static metadata routes from shared SEO helpers.
- Local export currently produces `robots.txt` and `sitemap.xml` with `https://www.altec-sz.com`.
- Sitemap output has complete `zh-CN`, `en-US`, and `x-default` alternates.
- 21 product models have 21 matching `productDetails` entries.
- Every active product with migrated rich details has an English `htmlEn` entry.
- Shared UI copy and navigation are centralized in `src/lib/i18n.ts`.
- Public route metadata and JSON-LD are centralized in `src/lib/seo.ts`.
- Image and download audits pass through the existing verify pipeline.

### Addressed Gaps

- `src/components/product-detail-sections.tsx` was removed after confirming no source imports referenced it.
- `scripts/audit-code-style.mjs` now blocks the retired product detail component from returning.
- `scripts/audit-code-style.mjs` now blocks unexpected `dangerouslySetInnerHTML` call sites. The allowed boundaries are root theme initialization, JSON-LD rendering, and `RichHtml` for migrated technical content.
- `scripts/audit-code-style.mjs` now blocks unexpected `@next/next/no-img-element` disables. The allowed image boundaries are `OptimizedImage` and `ImagePreview`.
- AL807, AL810 and DC220 now have English migrated technical detail content, closing the active-product `htmlEn` gaps.
- `OptimizedImage` and `ImagePreview` now include comments explaining why raw `<img>` is intentional in those two components.
- Some SEO helpers still use explicit `isZh(lang)` branching. This remains acceptable for title/description/schema generation, while reusable interface text should continue to use `pick(...)`.

### Remaining Long-Term Debt

- Legacy product rich details still contain large `html` / `htmlEn` string blobs in `src/lib/product-rich-details.ts`. This is allowed as migration debt, but new product detail content should move toward structured sections instead.

### Suggested Next Improvements

- Gradually migrate legacy product HTML into typed sections: model coding, diagrams, specifications, applications, downloads, and SEO fields.
- Add a CI/local check that fails if generated sitemap URLs do not start with `https://www.altec-sz.com/`.
- Keep the `NEXT_PUBLIC_SITE_URL` repository variable aligned with `https://www.altec-sz.com` so CI cannot override the code default with an old domain.
