const cdnBaseUrl = (process.env.NEXT_PUBLIC_CDN_BASE_URL || "").replace(/\/$/, "");

function shouldUseCdn(path: string) {
  return /^(\/(altec|_next|downloads))\//.test(path);
}

export function assetUrl(path: string) {
  if (!cdnBaseUrl) {
    return path;
  }

  if (path.startsWith("https://") || path.startsWith("http://") || !path.startsWith("/")) {
    return path;
  }

  if (!shouldUseCdn(path)) {
    return path;
  }

  return `${cdnBaseUrl}${path}`;
}

const assetSrcPattern = /\b(?:href|src)=(["'])(\/(?:altec|_next|downloads)\/[^"']+)\1/g;
const imgTagPattern = /<img\b[^>]*>/g;

function addAttributeIfMissing(tag: string, attribute: string, value: string) {
  if (new RegExp(`\\s${attribute}=`).test(tag)) {
    return tag;
  }

  return tag.replace(/>$/, ` ${attribute}="${value}">`);
}

function optimizeHtmlImages(html: string) {
  return html.replace(imgTagPattern, (tag) => {
    return addAttributeIfMissing(addAttributeIfMissing(tag, "loading", "lazy"), "decoding", "async");
  });
}

export function rewriteHtmlAssetLinks(html: string) {
  const htmlWithCdnLinks = html.replace(assetSrcPattern, (match) => {
    return match.replace(/\/(?:altec|_next|downloads)\/[^"']+/, (url) => assetUrl(url));
  });

  return optimizeHtmlImages(htmlWithCdnLinks);
}
