/* eslint-disable @next/next/no-img-element */
// Static export uses pre-generated AVIF/WebP files. A custom picture/img wrapper
// lets us serve those variants without relying on Next's runtime image optimizer.
import { assetUrl, optimizedImageSources } from "@/lib/cdn-assets";

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
};

function imageClassName(className?: string, fill?: boolean) {
  const base = fill ? "absolute inset-0 h-full w-full" : "";
  return [base, className].filter(Boolean).join(" ");
}

export function OptimizedImage({
  src,
  alt,
  className,
  sizes = "100vw",
  fill,
  priority,
  width,
  height,
}: OptimizedImageProps) {
  const sources = optimizedImageSources(src);
  const loading = priority ? "eager" : "lazy";

  if (!sources) {
    return (
      <img
        src={assetUrl(src)}
        alt={alt}
        className={imageClassName(className, fill)}
        loading={loading}
        decoding="async"
        width={width}
        height={height}
      />
    );
  }

  return (
    <picture>
      <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
      <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
      <img
        src={assetUrl(src)}
        alt={alt}
        className={imageClassName(className, fill)}
        loading={loading}
        decoding="async"
        width={width}
        height={height}
      />
    </picture>
  );
}
