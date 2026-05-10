# ALTEC Website

Next.js + Tailwind CSS rebuild for Shenzhen ALTEC Electronics Co., Ltd.

Content and product imagery were collected from `http://www.china-altec.com` and reorganized into a modern responsive landing page.

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

## Netlify

The project includes `netlify.toml` with:

- build command: `npm run build`
- publish directory: `.next`
- Next.js runtime plugin: `@netlify/plugin-nextjs`
- build Node version: `22`
