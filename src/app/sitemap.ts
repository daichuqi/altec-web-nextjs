import type { MetadataRoute } from "next";
import { absoluteAssetUrl, absoluteUrl, localizedPath, seoLastModified, sitemapEntries, sitemapImagesForPath } from "@/lib/seo";
import { locales, type Lang } from "@/lib/i18n";

export const dynamic = "force-static";

const languages: Lang[] = [...locales];
const lastModified = new Date(seoLastModified);

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries.flatMap((path) =>
    languages.map((lang) => ({
      url: absoluteUrl(localizedPath(lang, path)),
      lastModified,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path === "/products" ? 0.9 : 0.75,
      alternates: {
        languages: {
          "zh-CN": absoluteUrl(localizedPath("zh", path)),
          "en-US": absoluteUrl(localizedPath("en", path)),
          "x-default": absoluteUrl(localizedPath("zh", path)),
        },
      },
      images: sitemapImagesForPath(path).map((image) => absoluteAssetUrl(image)),
    })),
  );
}
