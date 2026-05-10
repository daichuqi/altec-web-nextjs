# ALTEC Netlify Deployment Runbook

Related docs:

- `docs/incident-retrospective-2026-05-10.md`
- `docs/preflight-checklist.md`
- `docs/aliyun-oss-setup.md`

## Current Production Setup

- Production URL: `https://altec.daichuqi.com`
- Netlify default domain: `https://altec-web-nextjs-20260510.netlify.app`
- Netlify site id: `0a7fa9b6-ec81-4f21-ad30-1c14265bd68f`
- Netlify DNS zone: `daichuqi.com`
- Build command: `npm run build`
- Publish directory: `out`
- Next.js mode: static export via `output: "export"`
- Images: served as static files with `images.unoptimized = true`

This site should deploy as static files only. A healthy production deploy must report:

- `No functions deployed`
- `No edge functions deployed`

## Why The Site Broke

The failure mode was a false-positive deploy: Netlify reported the deploy as live, but the public site returned connection/502-style failures.

During debugging, a local `.netlify/` cache contained generated Netlify internal server handler files. A manual deploy from that dirty local state bundled a function even though the project is intended to be static. The site was then redeployed after moving `.netlify/` out of the repository folder, producing a clean static deploy with no functions or edge functions.

The repository already ignores `.netlify`, but local deploys can still read that folder if it exists in the working tree.

## Safe Deploy Checklist

Before any manual production deploy:

1. Run `npm run verify`. This runs lint and a full static Next.js build.
2. Remove local Netlify generated state before deploying:

   ```bash
   rm -rf .netlify
   ```

3. Deploy only the static export:

   ```bash
   npx netlify deploy --prod --no-build --dir out --site 0a7fa9b6-ec81-4f21-ad30-1c14265bd68f
   ```

4. Confirm the deploy summary says `No functions deployed` and `No edge functions deployed`.
5. Smoke test production through the custom production domain:

   ```bash
   curl -fsS https://altec.daichuqi.com/ >/tmp/altec-home.html
   curl -fsS https://altec.daichuqi.com/products/th136 >/tmp/altec-th136.html
   curl -fsS https://altec.daichuqi.com/altec/details/TH136/TH136_Panel.gif >/tmp/altec-th136-panel.gif
   grep -q "ALTEC" /tmp/altec-home.html
   grep -q "完整技术资料" /tmp/altec-th136.html
   ```

## CI Guardrails

The GitHub Actions Netlify workflow now includes:

- A static deploy guard that fails if generated Netlify function folders are present.
- A required production URL smoke test that waits for DNS/CDN propagation, then requests the homepage, TH136 detail page, and a TH136 technical image through `https://altec.daichuqi.com`.
- A required Netlify API health check that confirms the published deploy is `ready`, contains no functions or edge functions, and includes critical static files.
- A domain guard that fails CI if Netlify is not configured with `altec.daichuqi.com` as the production custom domain.

Do not remove these checks. They are there to catch the exact class of failure where the deploy command succeeds but the public site is not actually usable.

Do not use the default `*.netlify.app` hostname as the customer-facing URL. On May 10, 2026, public DNS lookups for `altec-web-nextjs-20260510.netlify.app` returned `NXDOMAIN` from Google DNS even while the deploy was healthy in Netlify. The production domain is now `altec.daichuqi.com`, backed by the `daichuqi.com` Netlify DNS zone.

## Aliyun OSS Deploy Path

An optional Aliyun publish workflow is available at `.github/workflows/aliyun-oss.yml`.

It runs on `main` when `ALIYUN_DEPLOY_ENABLED=true` and performs:

- Static build (`npm run build`)
- Sync `out/` to OSS bucket
- Extensionless HTML alias upload for clean route compatibility
- Optional smoke checks against `ALIYUN_SITE_URL` if set

Required secret/variable setup:

- `ALIYUN_DEPLOY_ENABLED` (repository variable: `true` to run this job)
- `ALIYUN_ACCESS_KEY_ID`
- `ALIYUN_ACCESS_KEY_SECRET`
- `ALIYUN_OSS_BUCKET`
- `ALIYUN_OSS_ENDPOINT`
- `ALIYUN_OSS_PREFIX` (optional)
- `ALIYUN_SITE_URL` (optional; used for smoke checks)

Notes on routing:

- OSS static website hosting does not guarantee SPA-like route rewriting the way Netlify does. This workflow therefore uploads both `xxx.html` and `xxx` for page routes, so URLs like `/products/al808` resolve directly.
- If your domain/CNAME/CDN requires additional fallback rules, keep them aligned with this route shape.

If the public URL smoke test fails, check the Netlify deploy first:

```bash
npx netlify api getSite --data '{"site_id":"0a7fa9b6-ec81-4f21-ad30-1c14265bd68f"}'
```

Then confirm the latest `published_deploy` is `ready`, has no functions, has no edge functions, and reports `custom_domain: "altec.daichuqi.com"`. If Netlify is ready but the smoke test still fails, verify DNS before changing application code:

```bash
curl -s 'https://dns.google/resolve?name=altec.daichuqi.com&type=A'
curl -s 'https://dns.google/resolve?name=altec.daichuqi.com&type=AAAA'
```
