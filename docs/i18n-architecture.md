# I18n Architecture

Last updated: 2026-05-11

## Decision

Use a lightweight typed i18n layer in `src/lib/i18n.ts` instead of middleware/proxy-based i18n routing.

This website is deployed as a static export to Aliyun OSS/CDN or an Aliyun virtual host. Next.js static export does not support request-time proxy/middleware behavior, and built-in internationalized routing is not suitable for `output: "export"`. The site therefore keeps the current static URL structure:

- Chinese: `/about`, `/products/al808`, `/applications/...`
- English: `/en/about`, `/en/products/al808`, `/en/applications/...`

## Source Of Truth

`src/lib/i18n.ts` owns:

- `locales`, `Lang`, `LocalizedText`
- language metadata and language switch labels
- `localizedPath(lang, href)`
- `switchLocalePath(lang, pathname)`
- navigation labels
- reusable UI copy for header, footer, homepage, product pages, application pages, downloads and contact pages
- product category descriptions

Content data stays in content-focused modules:

- Product/application/download/company content: `src/lib/site-data.ts` and `src/lib/application-data.ts`
- Rich legacy product detail HTML: `src/lib/product-rich-details.ts`
- SEO construction and canonical/hreflang output: `src/lib/seo.ts`

## Rules

- Do not add new local `path()` helpers in components. Use `localizedPath`.
- Do not scatter repeated `{lang === "zh" ? ... : ...}` UI copy through components. Use `pick(ui.some.key, lang)`.
- Keep product and application data bilingual in structured fields such as `Record<Lang, string>` or `Record<Lang, string[]>`.
- Treat `html` / `htmlEn` rich product details as a migration bridge. New product detail content should move toward structured sections.
- Soft checks are preferred for now. Missing localized rich detail content should be documented and fixed, but should not block the whole build unless the business asks for hard enforcement.

## Why Not `next-intl` Routing Now

`next-intl` is a good choice for App Router projects that can use locale segments and middleware/proxy behavior. For this project, introducing that routing layer would add risk because production is a static export on Aliyun. The current typed module gives us consistency without changing deployment assumptions.

If the site later moves to a Node-capable hosting architecture, `next-intl` can be reconsidered for message loading and route-level locale handling.
