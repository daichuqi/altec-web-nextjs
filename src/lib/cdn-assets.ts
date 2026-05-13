import { assetRoots } from "@/lib/assets";

const downloadsCdnBaseUrl = (process.env.NEXT_PUBLIC_DOWNLOADS_CDN_BASE_URL || "").replace(/\/$/, "");
const optimizedAssetVersion = (process.env.NEXT_PUBLIC_ASSET_VERSION || "local").replace(/[^a-zA-Z0-9._-]/g, "-");
const optimizedWidths = [160, 320, 480, 640, 960, 1280, 1600] as const;
const optimizableImagePattern = /^\/altec\/images\/(?!optimized\/)(.+)\.(?:jpe?g|png)$/i;

function isDownloadPath(path: string) {
  return path.startsWith(`${assetRoots.downloads}/`) || path.startsWith("/downloads/");
}

export function assetUrl(path: string) {
  if (path.startsWith("https://") || path.startsWith("http://") || !path.startsWith("/")) {
    return path;
  }

  if (!downloadsCdnBaseUrl || !isDownloadPath(path)) {
    return path;
  }

  return `${downloadsCdnBaseUrl}${path}`;
}

function optimizedImagePath(path: string, width: number, format: "avif" | "webp") {
  const match = path.match(optimizableImagePattern);

  if (!match) {
    return null;
  }

  return `${assetRoots.optimized}/${optimizedAssetVersion}/${match[1]}-${width}.${format}`;
}

function optimizedSrcSet(path: string, format: "avif" | "webp") {
  const entries = optimizedWidths
    .map((width) => {
      const optimizedPath = optimizedImagePath(path, width, format);
      return optimizedPath ? `${assetUrl(optimizedPath)} ${width}w` : null;
    })
    .filter(Boolean);

  return entries.length > 0 ? entries.join(", ") : null;
}

export function optimizedImageSources(path: string) {
  const avif = optimizedSrcSet(path, "avif");
  const webp = optimizedSrcSet(path, "webp");

  if (!avif || !webp) {
    return null;
  }

  return { avif, webp };
}

const assetSrcPattern = /\b(?:href|src)=(["'])(\/(?:altec|downloads)\/[^"']+)\1/g;
const imgTagPattern = /<img\b[^>]*>/g;

function addAttributeIfMissing(tag: string, attribute: string, value: string) {
  if (new RegExp(`\\s${attribute}=`).test(tag)) {
    return tag;
  }

  return tag.replace(/>$/, ` ${attribute}="${value}">`);
}

function optimizeHtmlImages(html: string) {
  return html.replace(imgTagPattern, (tag) => {
    const optimizedTag = addAttributeIfMissing(addAttributeIfMissing(tag, "loading", "lazy"), "decoding", "async");
    const src = optimizedTag.match(/\ssrc=(["'])(\/altec\/[^"']+)\1/)?.[2];
    const sources = src ? optimizedImageSources(src) : null;

    if (!src || !sources) {
      return optimizedTag;
    }

    return `<picture><source type="image/avif" srcset="${sources.avif}" sizes="100vw"><source type="image/webp" srcset="${sources.webp}" sizes="100vw">${optimizedTag}</picture>`;
  });
}

export function rewriteHtmlAssetLinks(html: string) {
  const htmlWithOptimizedImages = optimizeHtmlImages(html);
  return htmlWithOptimizedImages.replace(assetSrcPattern, (match) => {
    return match.replace(/\/(?:altec|_next|downloads)\/[^"']+/, (url) => assetUrl(url));
  });
}
