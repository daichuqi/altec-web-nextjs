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
- Access method: FTP plus Aliyun host control panel file manager

Do not commit FTP credentials to this repository.

## Why This Path Exists

The Netlify deployment is still useful, but mainland China access can be slow or unreliable. The Aliyun virtual host gives China users a faster origin for the static site.

This host is not OSS and is not controlled by the Aliyun CLI. Treat it as a plain static FTP host. The fastest reliable deployment method found on May 10, 2026 was:

1. Build locally.
2. Prepare static route aliases for clean URLs.
3. Zip the prepared output.
4. Upload one zip file by FTP.
5. Use the Aliyun file manager to extract it into `htdocs` with overwrite enabled.

Avoid recursive FTP mirroring for normal deploys. Uploading thousands of individual `_next`, image, and page files was very slow and produced retry failures.

## Build And Package

Run the normal verification first:

```bash
npm run verify
```

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

## Upload

Upload the zip to `htdocs/` with FTP. Use credentials from the approved password manager, not from this document.

```bash
curl --ftp-create-dirs \
  --connect-timeout 30 \
  --max-time 600 \
  --retry 3 \
  --retry-delay 5 \
  --user "$ALIYUN_FTP_USER:$ALIYUN_FTP_PASSWORD" \
  -T /tmp/altec-aliyun-deploy.zip \
  "ftp://hyu1283370001.my3w.com/htdocs/altec-aliyun-deploy.zip"
```

Then open the Aliyun virtual host control panel:

1. Go to file manager for `hyu1283370001`.
2. Find `htdocs/altec-aliyun-deploy.zip`.
3. Choose `解压缩`.
4. Set the destination directory to `/`.
5. Keep overwrite enabled.
6. Confirm extraction.

The control panel's `/` destination means the current `htdocs` directory in this file manager context. After extraction, `htdocs/index.html`, `htdocs/_next/`, `htdocs/products/`, and `htdocs/altec/` should exist.

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
  http://china-altec.com/altec/products/AL808.jpg

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
