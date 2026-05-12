# Product Detail Migration Audit

Last updated: 2026-05-11

## Legacy Sources

The previous ALTEC content is still reachable on the Aliyun host under these paths:

- Chinese product index: `https://china-altec.com/docc/cp.htm`
- Chinese category indexes:
  - `/docc/Temp_Diff.htm`
  - `/docc/Humidity.htm`
  - `/docc/temperature_humidity.htm`
  - `/docc/Tension.htm`
  - `/docc/PH.htm`
  - `/docc/Pressure.htm`
  - `/docc/winding_counter.htm`
  - `/docc/motor_speed.htm`
  - `/docc/Tension_Sensor.htm`
- English product index: `https://china-altec.com/english/products.htm`

## 2026-05-10 Findings

Products already present in the new site with rich detail pages:

- AL807, AL808, AL810, AL830, PC900, D4, DC220
- TC808, TC818, TC930, TC950, AL210
- TH135, TH136, MTC35, pH/ORP800, CPC316

Missing from the new site but available as real legacy detail pages:

- CTS: `/docc/products/tension_sensor/CTS.htm`
- HTS: `/docc/products/tension_sensor/HTS.htm`
- LXA: `/docc/products/tension_sensor/LXA.htm`
- SUP: `/docc/products/tension_sensor/SUP.htm`

Legacy index entries that currently point to 404 detail pages:

- MC320: `/docc/products/motor_speed/MC320.htm`
- TC100: `/docc/products/tension/TC100.htm`

Do not create new product detail pages from broken legacy URLs unless a valid source file, PDF manual, or customer-approved copy is provided.

Retired and removed models:

- D4 and TC808 are archived models. Keep their legacy detail pages and downloads available for historical customers, but do not feature them in product-center lists, homepage modules, sitemap entries, or product list structured data.
- PCP310 was confirmed as an invalid product entry and should not appear in product data, homepage modules, product-center lists, rich details, sitemap entries, or product list structured data.

## Migration Rules

- Compare `src/lib/site-data.ts` product models against `src/lib/product-rich-details.ts` keys before shipping.
- A migrated product detail page must include local images under `public/altec/images/details/<MODEL>/`; do not embed or redirect to old-site image URLs.
- Product-card images belong under `public/altec/images/products/`.
- Old-site image requests can hang. Use `curl --connect-timeout` and `--max-time` when pulling legacy assets.
- After any product route change, run `npm run verify` because `output: export` requires static params for every product route.

## Maintainability Rules

- Product content must not become a pile of hard-to-maintain page-specific strings. If a product has repeated sections such as overview, model coding, diagrams, specifications, documents or applications, represent them as structured data instead of scattered component logic.
- Keep Chinese and English content side by side in the data model whenever possible. A product should not have rich Chinese detail content while the English page quietly falls back to a thin overview.
- Avoid adding more long inline HTML blobs to `src/lib/product-rich-details.ts`. Existing `html` / `htmlEn` entries are a migration bridge, not the preferred long-term content architecture.
- For every product with rich detail content, require parity checks for both languages: same major sections, local images, local downloads and relevant technical specifications.
- When adding or changing a product, update the data, SEO, sitemap and related downloads together, then run `npm run verify`.

## 2026-05-11 Content Architecture Note

AL808, TC818 and CPC316 exposed a maintenance problem: the Chinese detail pages had rich migrated content, while the English pages could remain incomplete because `htmlEn` was optional and not checked. Future refactors should move rich product details toward structured bilingual sections and add a build-time validation script so missing English or Chinese sections fail before deployment.

## 2026-05-10 Fix Applied

Added a new `Tension Sensors` product category and migrated CTS, HTS, LXA and SUP with:

- Product center cards
- Chinese and English product details
- Local product images
- Local detail diagrams for dimensions, mounting, wiring, force analysis and calibration where available
- Related local PDF download links
