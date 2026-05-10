import type { MetadataRoute } from "next";
import { absoluteUrl, localizedPath, sitemapEntries, sitemapImages } from "@/lib/seo";
import type { Lang } from "@/lib/site-data";

export const dynamic = "force-static";

const languages: Lang[] = ["zh", "en"];
const lastModified = new Date("2026-05-10");

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
      images:
        path === "/" || path === "/products" || path === "/gallery"
          ? sitemapImages.map((image) => absoluteUrl(image))
          : undefined,
    })),
  );
}
