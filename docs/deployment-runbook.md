# ALTEC Netlify Deployment Runbook

## Current Production Setup

- Production URL: `https://altec-web-nextjs-20260510.netlify.app`
- Netlify site id: `0a7fa9b6-ec81-4f21-ad30-1c14265bd68f`
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

1. Run `npm run lint`.
2. Run `npm run build`.
3. Remove local Netlify generated state before deploying:

   ```bash
   rm -rf .netlify
   ```

4. Deploy only the static export:

   ```bash
   npx netlify deploy --prod --no-build --dir out --site 0a7fa9b6-ec81-4f21-ad30-1c14265bd68f
   ```

5. Confirm the deploy summary says `No functions deployed` and `No edge functions deployed`.
6. Smoke test production:

   ```bash
   curl -fsS https://altec-web-nextjs-20260510.netlify.app/ >/tmp/altec-home.html
   curl -fsS https://altec-web-nextjs-20260510.netlify.app/products/th136 >/tmp/altec-th136.html
   curl -fsS https://altec-web-nextjs-20260510.netlify.app/altec/details/TH136/TH136_Panel.gif >/tmp/altec-th136-panel.gif
   grep -q "ALTEC" /tmp/altec-home.html
   grep -q "完整技术资料" /tmp/altec-th136.html
   ```

## CI Guardrails

The GitHub Actions Netlify workflow now includes:

- A static deploy guard that fails if generated Netlify function folders are present.
- A best-effort production URL smoke test that waits for Netlify DNS/CDN propagation, then requests the homepage, TH136 detail page, and a TH136 technical image.
- A required Netlify API health check that confirms the published deploy is `ready`, contains no functions or edge functions, has a deploy screenshot, and includes critical static files.

Do not remove these checks. They are there to catch the exact class of failure where the deploy command succeeds but the public site is not actually usable.

If the public URL smoke test warns with `Could not resolve host`, do not assume the code build is broken. GitHub-hosted runners may occasionally fail to resolve `*.netlify.app` while Netlify itself is serving the site. Check the Netlify deploy first:

```bash
npx netlify api getSite --data '{"site_id":"0a7fa9b6-ec81-4f21-ad30-1c14265bd68f"}'
```

Then confirm the latest `published_deploy` is `ready`, has no functions, and has a screenshot URL. If Netlify is ready but DNS is still failing from GitHub Actions, verify from a browser or an external fetcher before changing application code.
