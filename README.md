# ALTEC Website

Next.js + Tailwind CSS rebuild for Shenzhen ALTEC Electronics Co., Ltd.

Legacy ALTEC content, product imagery, manuals and product details have been reorganized into a modern bilingual industrial catalog. Download files are hosted locally by this site.

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

## SEO

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying, for example:

```bash
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

The value is used for canonical URLs, `hreflang`, `robots.txt`, `sitemap.xml`, Open Graph metadata and structured data.

## Netlify

The project includes `netlify.toml` with:

- build command: `npm run build`
- publish directory: `.next`
- Next.js runtime plugin: `@netlify/plugin-nextjs`
- build Node version: `22`
