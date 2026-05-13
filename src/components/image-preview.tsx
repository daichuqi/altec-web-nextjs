"use client";

/* eslint-disable @next/next/no-img-element */
// The preview modal intentionally opens the original asset path at full size.
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { OptimizedImage } from "@/components/optimized-image";
import { assetUrl } from "@/lib/cdn-assets";
import type { Lang } from "@/lib/i18n";

type ImagePreviewProps = {
  lang: Lang;
  src: string;
  alt: string;
  className: string;
  sizes: string;
  aspectClassName: string;
  priority?: boolean;
};

const labels = {
  zh: {
    open: "查看高清大图",
    close: "关闭大图",
  },
  en: {
    open: "View large image",
    close: "Close large image",
  },
};

export function ImagePreview({
  lang,
  src,
  alt,
  className,
  sizes,
  aspectClassName,
  priority,
}: ImagePreviewProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const copy = labels[lang];

  function openPreview() {
    setIsMounted(true);
    requestAnimationFrame(() => setIsVisible(true));
  }

  function closePreview() {
    setIsVisible(false);
    window.setTimeout(() => setIsMounted(false), 180);
  }

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMounted]);

  return (
    <>
      <button
        type="button"
        onClick={openPreview}
        className={`group relative block w-full cursor-pointer overflow-hidden border border-line bg-panel-muted transition duration-300 ease-out hover:border-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel ${aspectClassName}`}
        aria-label={copy.open}
        title={copy.open}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          fill
          className={className}
          sizes={sizes}
          priority={priority}
        />
        <span className="pointer-events-none absolute inset-0 bg-heading/[0.04] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
      </button>

      {isMounted ? (
        <div
          className={`fixed inset-0 z-50 grid place-items-center bg-heading/80 px-4 py-6 transition-opacity duration-200 ease-out sm:px-8 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={copy.open}
          onClick={closePreview}
        >
          <div
            className={`relative flex max-h-full w-full max-w-6xl items-center justify-center transition duration-200 ease-out ${
              isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.985] opacity-0"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePreview}
              className="absolute right-0 top-0 z-10 inline-flex h-11 w-11 -translate-y-3 translate-x-3 items-center justify-center border border-line-strong bg-panel text-copy shadow-lg hover:border-accent hover:text-accent"
              aria-label={copy.close}
              title={copy.close}
            >
              <X size={20} aria-hidden="true" />
            </button>
            <div className="max-h-[88vh] w-full border border-line bg-panel p-3 shadow-2xl sm:p-4">
              <img src={assetUrl(src)} alt={alt} className="mx-auto max-h-[82vh] w-full object-contain" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
