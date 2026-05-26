# Aliyun HK ECS Docker Deployment

This project remains a static Next.js export. The Docker image builds the site with Node 22, then serves the exported `out/` directory with Nginx. The container does not run `next start`.

## Build Locally

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://www.altec-sz.com \
  -t altec-web:local .
```

For a local smoke test:

```bash
docker compose up --build
curl -fsSI http://127.0.0.1:3000/
curl -fsSI http://127.0.0.1:3000/en
curl -fsSI http://127.0.0.1:3000/products/al808
curl -fsSI http://127.0.0.1:3000/robots.txt
curl -fsSI http://127.0.0.1:3000/sitemap.xml
```

## Runtime Shape

- Container port: `80`
- Health check: `GET /healthz`
- Static assets: immutable cache for `/_next/static/`, optimized images, images, fonts, scripts, PDFs and ZIP files
- HTML and extensionless routes: `no-cache`
- Clean URLs: Nginx resolves `/products/al808` to `/products/al808.html`

## ECS/VPC Notes

For Aliyun Hong Kong ECS, keep the container behind a reverse proxy, SLB, or CDN when possible. Terminate HTTPS outside the container and forward plain HTTP to container port `80` inside the VPC.

Minimum ECS host flow:

```bash
docker pull <registry>/altec-web:<tag>
docker rm -f altec-web || true
docker run -d \
  --name altec-web \
  --restart unless-stopped \
  -p 80:80 \
  <registry>/altec-web:<tag>
```

If pushing to Alibaba Cloud Container Registry, build and tag the same image, then push it to the HK-accessible registry namespace used by the ECS host:

```bash
docker tag altec-web:local <registry>/altec-web:<tag>
docker push <registry>/altec-web:<tag>
```

`NEXT_PUBLIC_SITE_URL` is baked into the static export at build time. Rebuild the image whenever the public canonical origin changes.
