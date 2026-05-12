# ALTEC Aliyun Virtual Host Deploy Runbook

This project can be published to the Aliyun Cloud Virtual Host bound to:

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

ALTEC web now uses Aliyun only. This virtual host runbook is the fallback path when OSS/CDN publishing is not available.

This host is not OSS and is not controlled by the Aliyun CLI. Treat it as a plain static FTP host. The reliable deployment method is:

1. Build locally.
2. Prepare static route aliases for clean URLs.
3. Zip the prepared output.
4. Upload exactly one zip file by FTP.
5. Use the Aliyun file manager only to extract the uploaded zip into `htdocs` with overwrite enabled.

Avoid recursive FTP mirroring for normal deploys. Uploading thousands of individual `_next`, image, and page files was very slow and produced retry failures.

Do not upload the zip through the Aliyun web UI. Browser uploads are slower, easier to interrupt, and harder to verify. The UI is only for the final extraction step because the virtual host control panel has the server-side unzip action.

## Build And Package

Run the normal verification first:

```bash
npm run verify
```

For virtual-host deploys, build without `NEXT_PUBLIC_CDN_BASE_URL` and without `NEXT_PUBLIC_NEXT_ASSET_PREFIX`. The HTML, `_next/static` JavaScript, CSS, images and downloads must be extracted from the same zip package. Do not point Next.js core bundles at OSS while the HTML is still served by the FTP virtual host; a partial OSS sync can make one missing chunk crash the whole site.

Create a deploy folder from `out/` and add directory `index.html` aliases for every exported page. The aliases are required because the virtual host does not automatically map `/products/al808` to `/products/al808.html`.

```bash
rm -rf /tmp/altec-aliyun-deploy /tmp/altec-aliyun-deploy.zip
cp -R out /tmp/altec-aliyun-deploy

find /tmp/altec-aliyun-deploy -name '*.html' -type f | while read -r file; do
  rel="${file#/tmp/altec-aliyun-deploy/}"
  case "$rel" in
    index.html|404.html) continue ;;
  esac
  route="${rel%.html}"
  mkdir -p "/tmp/altec-aliyun-deploy/$route"
  cp "$file" "/tmp/altec-aliyun-deploy/$route/index.html"
done

cd /tmp/altec-aliyun-deploy
zip -qr /tmp/altec-aliyun-deploy.zip .
```

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

Then open the Aliyun virtual host control panel:

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

Use `http` unless HTTPS has been separately configured for this virtual host.

```bash
curl -fsS -L --max-time 20 -o /tmp/altec-home.html \
  -w "home %{http_code} %{time_total} %{size_download}\n" \
  http://china-altec.com/

curl -fsS -L --max-time 20 -o /tmp/altec-al808.html \
  -w "al808 %{http_code} %{time_total} %{size_download}\n" \
  http://china-altec.com/products/al808

curl -fsS -L --max-time 20 -o /tmp/altec-en-pc900.html \
  -w "en-pc900 %{http_code} %{time_total} %{size_download}\n" \
  http://china-altec.com/en/products/pc900

curl -fsS -L --max-time 20 -o /tmp/altec-al808.jpg \
  -w "image %{http_code} %{content_type} %{size_download}\n" \
  http://china-altec.com/altec/images/products/AL808.jpg

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
