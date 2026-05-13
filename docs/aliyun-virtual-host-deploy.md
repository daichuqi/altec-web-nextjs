# ALTEC Aliyun Virtual Host Deploy Runbook

This is the legacy fallback runbook for publishing to the Aliyun Cloud Virtual Host bound to:

- `china-altec.com`
- `www.china-altec.com`
- `altek.cn`
- `www.altek.cn`
- `altec.cc`
- `www.altec.cc`

Host facts:

- Host name: `hyu1283370001`
- Temporary host domain: `hyu1283370001.my3w.com`
- Web root: `htdocs`
- Access method: FTP upload plus Aliyun host control panel extraction

Do not commit FTP credentials to this repository.

## Why This Path Exists

ALTEC web now uses Aliyun only. The normal publish path is the OSS bucket/CDN workflow for `https://www.altec-sz.com`. Use this virtual host runbook only while a domain is still served by the Aliyun Cloud Virtual Host.

This host is not OSS and is not controlled by the Aliyun CLI. Treat it as a plain static FTP host. The reliable deployment method is:

1. Verify/build locally once.
2. Prepare static route aliases for clean URLs.
3. Zip the current export output.
4. Upload exactly one zip file by FTP.
5. Tell the user the zip has been uploaded, then open the Aliyun file manager for `hyu1283370001`.
6. The user normally extracts the uploaded zip into `htdocs` with overwrite enabled. Codex only performs this manual extraction when the user explicitly asks Codex to do it.

Avoid recursive FTP mirroring for normal deploys. Uploading thousands of individual `_next`, image, and page files was very slow and produced retry failures.

Do not upload the zip through the Aliyun web UI. Browser uploads are slower, easier to interrupt, and harder to verify. The UI is only for the final extraction step because the virtual host control panel has the server-side unzip action.

## Build And Package

For production publishes, use the single preparation command:

```bash
npm run prepare:aliyun
```

This runs `npm run verify` once, then packages the current `out/`. Do not run `npm run build` again after `npm run verify` during the same publish.

For virtual-host deploys, build without `NEXT_PUBLIC_CDN_BASE_URL` and without `NEXT_PUBLIC_NEXT_ASSET_PREFIX`. The HTML, `_next/static` JavaScript, CSS and images must be extracted from the same zip package. Do not point Next.js core bundles at OSS while the HTML is still served by the FTP virtual host; a partial OSS sync can make one missing chunk crash the whole site. Downloads are the only allowed exception: `NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL` may point `/altec/downloads/*` at OSS/CDN after the manual files have been uploaded and smoke-tested there.

To update only manuals/software on OSS/CDN without touching the rest of the site, run:

```bash
npm run sync:downloads:oss
```

If `npm run verify` already passed in the same working tree and you only need to regenerate the deploy zip from the existing `out/`, use:

```bash
npm run package:aliyun
```

The package script does not build. It copies the current `out/`, adds directory `index.html` aliases for clean routes, excludes `altec/downloads/`, and refuses to package if the exported HTML still contains local `/altec/downloads/` links. Downloads must be served by `NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL` before they are excluded from the zip.

## Upload By FTP

Upload the zip to `htdocs/` with FTP. Use credentials from local environment variables or local `.env.local`; do not use 1Password for this project.

Required local-only variables:

```bash
ALIYUN_FTP_USER=...
ALIYUN_FTP_PASSWORD=...
```

Store them in the local ignored auth file `.env.local`. This file is intentionally covered by `.gitignore` and must never be committed. Do not paste real FTP secrets into this runbook, issue comments, commits, or chat summaries.

If either value is missing or empty, stop and ask for `.env.local` to be filled. Do not fall back to 1Password.

```bash
set -a
[ -f .env.local ] && source .env.local
set +a

: "${ALIYUN_FTP_USER:?missing ALIYUN_FTP_USER}"
: "${ALIYUN_FTP_PASSWORD:?missing ALIYUN_FTP_PASSWORD}"

curl --ftp-create-dirs \
  --connect-timeout 30 \
  --max-time 600 \
  --retry 3 \
  --retry-delay 5 \
  --user "$ALIYUN_FTP_USER:$ALIYUN_FTP_PASSWORD" \
  -T /tmp/altec-aliyun-deploy.zip \
  "ftp://hyu1283370001.my3w.com/htdocs/altec-aliyun-deploy.zip"
```

Confirm the uploaded zip exists before opening the control panel:

```bash
curl --user "$ALIYUN_FTP_USER:$ALIYUN_FTP_PASSWORD" \
  "ftp://hyu1283370001.my3w.com/htdocs/" | rg "altec-aliyun-deploy.zip"
```

## Extract In Aliyun Control Panel

After FTP upload and confirmation, tell the user that `altec-aliyun-deploy.zip` is uploaded and open the Aliyun virtual host file manager:

```text
https://cp.aliyun.com/?siteid=hyu1283370001&url=index&ticket=9623-30330238-4201207252020176-daae13ed8c67&saleID=4201207252020176&userID=30330238&user_platform=OBP&data=&nickname=a*c#/fileManage
```

By default, stop there and wait for the user to extract the zip. The user owns the manual `解压缩` action unless they explicitly say Codex should do it.

If the user explicitly asks Codex to extract, use the Aliyun virtual host control panel:

1. Use Codex Chrome Extension / Chrome automation for the authenticated Aliyun session whenever possible.
2. Go to file manager for `hyu1283370001`.
3. Find `htdocs/altec-aliyun-deploy.zip`.
4. Choose `解压缩`.
5. Set the destination directory to `/`.
6. Keep overwrite enabled.
7. Confirm extraction.

The control panel's `/` destination means the current `htdocs` directory in this file manager context. After extraction, `htdocs/index.html`, `htdocs/_next/`, `htdocs/products/`, and `htdocs/altec/` should exist.

Do not use the control panel upload button for production deploys. If FTP credentials are missing, stop and fill local env vars first.

Delete the uploaded zip after a successful extraction:

```bash
curl --user "$ALIYUN_FTP_USER:$ALIYUN_FTP_PASSWORD" \
  -Q "DELE htdocs/altec-aliyun-deploy.zip" \
  "ftp://hyu1283370001.my3w.com/"
```

## Smoke Test

Use `https` for the production domain. If certificate or binding changes break HTTPS, test `http` only as a temporary diagnosis path.

```bash
curl -fsS -L --max-time 20 -o /tmp/altec-home.html \
  -w "home %{http_code} %{time_total} %{size_download}\n" \
  https://www.altec-sz.com/

curl -fsS -L --max-time 20 -o /tmp/altec-al808.html \
  -w "al808 %{http_code} %{time_total} %{size_download}\n" \
  https://www.altec-sz.com/products/al808

curl -fsS -L --max-time 20 -o /tmp/altec-en-pc900.html \
  -w "en-pc900 %{http_code} %{time_total} %{size_download}\n" \
  https://www.altec-sz.com/en/products/pc900

curl -fsS -L --max-time 20 -o /tmp/altec-al808.jpg \
  -w "image %{http_code} %{content_type} %{size_download}\n" \
  https://www.altec-sz.com/altec/images/products/AL808.jpg

grep -q "ALTEC" /tmp/altec-home.html
grep -q "AL808" /tmp/altec-al808.html
grep -q "PC900" /tmp/altec-en-pc900.html
file /tmp/altec-al808.jpg
```

## Lessons From May 10, 2026

- The host root `htdocs` could not be renamed over FTP, so do not plan on an atomic directory swap.
- A full recursive FTP upload was too slow and unreliable for this asset-heavy static export.
- Zip upload plus control-panel extraction completed much faster and avoided per-file retry churn.
- Keep local route aliases in the package. Without them, clean Next.js export routes can 404 on this host.
- Do not leave deploy archives in `htdocs`; they are publicly reachable while present.
