# Product Detail Migration Audit

Last updated: 2026-05-10

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
- LX: `/docc/products/tension_sensor/LX.htm`
- SUP: `/docc/products/tension_sensor/SUP.htm`

Legacy index entries that currently point to 404 detail pages:

- MC320: `/docc/products/motor_speed/MC320.htm`
- TC100: `/docc/products/tension/TC100.htm`

Do not create new product detail pages from broken legacy URLs unless a valid source file, PDF manual, or customer-approved copy is provided.

Special case:

- PCP310 is a current new-site product and homepage featured model, but no legacy standalone detail URL or PDF was found during this audit. A concise detail page was added from the existing new-site product summary so the route is not empty; replace it with manufacturer-approved source copy when available.

## Migration Rules

- Compare `src/lib/site-data.ts` product models against `src/lib/product-rich-details.ts` keys before shipping.
- A migrated product detail page must include local images under `public/altec/details/<MODEL>/`; do not embed or redirect to old-site image URLs.
- Product-card images belong under `public/altec/products/`.
- Old-site image requests can hang. Use `curl --connect-timeout` and `--max-time` when pulling legacy assets.
- After any product route change, run `npm run verify` because `output: export` requires static params for every product route.

## 2026-05-10 Fix Applied

Added a new `Tension Sensors` product category and migrated CTS, HTS, LX and SUP with:

- Product center cards
- Chinese and English product details
- Local product images
- Local detail diagrams for dimensions, mounting, wiring, force analysis and calibration where available
- Related local PDF download links
