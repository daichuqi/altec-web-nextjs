import type { Metadata } from "next";
import { applicationArticles, type ApplicationArticle } from "@/lib/application-data";
import {
  activeProducts,
  contactEmail,
  downloads,
  productDetails,
  productDisplayName,
  productSelectionGuides,
  productSlug,
  products,
  type Product,
} from "@/lib/site-data";
import { brandLogo, brandOgImage } from "@/lib/assets";
import { assetUrl } from "@/lib/cdn-assets";
import { isZh, languages, localizedPath, navItems, pick, ui, type Lang } from "@/lib/i18n";

export { localizedPath } from "@/lib/i18n";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.altec-sz.com"
).replace(/\/$/, "");

export const company = {
  name: "深圳市亚特克电子有限公司",
  englishName: "Shenzhen ALTEC Electronics Co., Ltd.",
  brand: "ALTEC 亚特克",
  email: contactEmail,
  phone: ["+86-755-26409070", "+86-755-26416767"],
  address: {
    streetAddress: "深圳市宝安区航城街道洲石路739号恒丰工业城C6栋502B号",
    addressLocality: "深圳",
    addressRegion: "广东",
    addressCountry: "CN",
  },
};

export const seoPages = {
  home: {
    path: "/",
    zhTitle: "ALTEC 亚特克 | 深圳市亚特克电子有限公司工业控制仪表",
    enTitle: "Shenzhen ALTEC Electronics | Industrial Process Controllers",
    zhDescription:
      "深圳市亚特克电子有限公司专注工业自动化智能过程控制仪表，提供温度控制器、张力控制器、pH/ORP 控制器、恒压供水控制器、温湿度控制器及产品资料下载。",
    enDescription:
      "Shenzhen ALTEC Electronics manufactures industrial temperature controllers, tension controllers, pH/ORP controllers, humidity controllers and VFD constant-pressure water-supply controllers.",
  },
  about: {
    path: "/about",
    zhTitle: "公司简介 | 深圳市亚特克电子有限公司",
    enTitle: "About ALTEC | Industrial Control Instrument Manufacturer",
    zhDescription:
      "了解深圳市亚特克电子有限公司的工业自动化仪表研发、生产、定制和应用服务能力。",
    enDescription:
      "Learn about Shenzhen ALTEC Electronics, a process-control instrument manufacturer for temperature, tension, pH/ORP, humidity and water-supply control applications.",
  },
  products: {
    path: "/products",
    zhTitle: "产品中心 | 温度控制器、张力控制器、pH/ORP 控制器",
    enTitle: "Products | Temperature, Tension and pH/ORP Controllers",
    zhDescription:
      "查看 ALTEC 亚特克产品，包括 AL807、AL808、AL810、AL830、TC818、TC930、TC950、MTC35、CPC316 等型号。",
    enDescription:
      "Compare ALTEC controller models including AL807, AL808, AL810, AL830, TC818, TC930, TC950, MTC35, pH/ORP800 and CPC316 with specifications and manuals.",
  },
  applications: {
    path: "/applications",
    zhTitle: "应用方案与基础知识 | 工业控制、测量与典型系统",
    enTitle: "Applications and Knowledge Base | Industrial Control References",
    zhDescription:
      "查看 ALTEC 亚特克工业过程控制基础知识、温湿度测量知识，以及张力控制、pH/ORP 水处理、恒压供水等典型应用方案。",
    enDescription:
      "Review ALTEC application notes for tension control, pH/ORP water treatment, humidity measurement, constant-pressure water supply and industrial process control.",
  },
  downloads: {
    path: "/downloads",
    zhTitle: "下载中心 | ALTEC 产品说明书、通讯协议和软件",
    enTitle: "Downloads | ALTEC Manuals, Protocols and Software",
    zhDescription:
      "下载 ALTEC 亚特克产品说明书、通讯协议、传感器资料和软件，涵盖 AL808、TC818、TC950、MTC35、CPC316 等型号。",
    enDescription:
      "Download ALTEC product manuals, communication protocols, sensor documents and software utilities for AL808, TC818, TC950, MTC35, CPC316 and more.",
  },
  contact: {
    path: "/contact",
    zhTitle: "联系我们 | 深圳市亚特克电子有限公司",
    enTitle: "Contact ALTEC | Shenzhen ALTEC Electronics",
    zhDescription:
      "联系深圳市亚特克电子有限公司，咨询工业控制仪表选型、产品资料、定制仪表和售后支持。",
    enDescription:
      "Contact Shenzhen ALTEC Electronics for controller model selection, product documents, replacement suggestions, custom instruments and technical support.",
  },
} as const;

export type SeoPageKey = keyof typeof seoPages;

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

export function absoluteAssetUrl(path: string) {
  const candidate = assetUrl(path);
  return candidate.startsWith("http") ? candidate : absoluteUrl(candidate);
}

export const seoLastModified = "2026-05-13";

export function pageMetadata(key: SeoPageKey, lang: Lang): Metadata {
  const page = seoPages[key];
  const title = isZh(lang) ? page.zhTitle : page.enTitle;
  const description = isZh(lang) ? page.zhDescription : page.enDescription;
  const canonical = localizedPath(lang, page.path);
  const zhPath = localizedPath("zh", page.path);
  const enPath = localizedPath("en", page.path);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "zh-CN": zhPath,
        "en-US": enPath,
        "x-default": zhPath,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: company.brand,
      locale: languages[lang].ogLocale,
      type: "website",
      images: [
        {
          url: absoluteAssetUrl(brandOgImage),
          width: 800,
          height: 640,
          alt: pick(ui.seo.ogImageAlt, lang),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteAssetUrl(brandOgImage)],
    },
  };
}

export function localizedAlternates(lang: Lang, path: string) {
  const zhPath = localizedPath("zh", path);
  const enPath = localizedPath("en", path);

  return {
    canonical: localizedPath(lang, path),
    languages: {
      "zh-CN": zhPath,
      "en-US": enPath,
      "x-default": zhPath,
    },
  };
}

export function productPageMetadata(product: Product, lang: Lang): Metadata {
  const detail = productDetails[product.model];
  const path = `/products/${productSlug(product.model)}`;
  const displayModel = productDisplayName(product);
  const title = isZh(lang)
    ? `${displayModel} ${product.zh} | ALTEC 亚特克产品详情`
    : `${displayModel} ${product.en} | ALTEC Product Details`;
  const description =
    detail?.overview[lang] ??
    (isZh(lang)
      ? `${displayModel} ${product.zh} 产品详情和本地下载资料。`
      : `${displayModel} ${product.en} details and local downloads.`);

  return {
    title,
    description,
    keywords: [
      product.model,
      displayModel,
      product.zh,
      product.en,
      product.category,
      "ALTEC",
      isZh(lang) ? "工业过程控制仪表" : "industrial process controller",
    ],
    ...(product.status === "archived" ? { robots: { index: false, follow: true } } : {}),
    alternates: localizedAlternates(lang, path),
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath(lang, path)),
      siteName: pick(ui.seo.siteName, lang),
      locale: languages[lang].ogLocale,
      type: "website",
      images: [{ url: absoluteAssetUrl(product.image), alt: `${displayModel} ${product[lang]}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteAssetUrl(product.image)],
    },
  };
}

export function applicationArticleMetadata(article: ApplicationArticle, lang: Lang): Metadata {
  const path = `/applications/${article.slug}`;
  const title = isZh(lang) ? `${article.title.zh} | ALTEC 亚特克应用方案` : `${article.title.en} | ALTEC Applications`;
  const description = article.excerpt[lang];

  return {
    title,
    description,
    keywords: [
      article.title[lang],
      ...article.related,
      isZh(lang) ? "工业控制应用方案" : "industrial control application",
      isZh(lang) ? "工程资料" : "engineering reference",
    ],
    alternates: localizedAlternates(lang, path),
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath(lang, path)),
      siteName: pick(ui.seo.siteName, lang),
      locale: languages[lang].ogLocale,
      type: "article",
      images: [{ url: absoluteAssetUrl(article.image), alt: article.title[lang] }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteAssetUrl(article.image)],
    },
  };
}

export function websiteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: pick(ui.seo.siteName, lang),
    url: siteUrl,
    inLanguage: languages[lang].htmlLang,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function pageWebPageJsonLd(lang: Lang, key: SeoPageKey) {
  const page = seoPages[key];
  const path = localizedPath(lang, page.path);
  const title = isZh(lang) ? page.zhTitle : page.enTitle;
  const description = isZh(lang) ? page.zhDescription : page.enDescription;
  const pageTypes: Record<SeoPageKey, string> = {
    home: "WebPage",
    about: "AboutPage",
    products: "CollectionPage",
    applications: "CollectionPage",
    downloads: "CollectionPage",
    contact: "ContactPage",
  };

  return {
    "@context": "https://schema.org",
    "@type": pageTypes[key],
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: languages[lang].htmlLang,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    ...(key === "products" ? { mainEntity: { "@id": `${absoluteUrl(path)}#product-list` } } : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    legalName: company.name,
    alternateName: [
      company.englishName,
      "Shenzhen ALTEC Electronics",
      "Shenzhen ALTEC Electronic",
      "Shenzhen Altec",
      "ALTEC Electronics",
      "ALTEC",
      "亚特克",
    ],
    url: siteUrl,
    logo: absoluteAssetUrl(brandLogo),
    description:
      "Shenzhen ALTEC Electronics Co., Ltd. manufactures industrial process-control instruments, including temperature controllers, tension controllers, pH/ORP controllers, humidity controllers and VFD constant-pressure water-supply controllers.",
    email: company.email,
    telephone: company.phone,
    areaServed: ["CN", "Worldwide"],
    knowsAbout: [
      "industrial process controller",
      "temperature controller",
      "tension controller",
      "pH/ORP controller",
      "humidity controller",
      "VFD constant-pressure water-supply controller",
      "工业过程控制仪表",
      "温度控制器",
      "张力控制器",
    ],
    address: {
      "@type": "PostalAddress",
      ...company.address,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.phone[0],
        email: company.email,
        contactType: "sales",
        areaServed: ["CN", "Worldwide"],
        availableLanguage: [pick(ui.seo.languageName, "zh"), pick(ui.seo.languageName, "en")],
      },
    ],
  };
}

export function productListJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(localizedPath(lang, seoPages.products.path))}#product-list`,
    name: pick(ui.seo.productListName, lang),
    itemListElement: activeProducts.map((product, index) => {
      const displayModel = productDisplayName(product);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          "@id": `${absoluteUrl(localizedPath(lang, `/products/${productSlug(product.model)}`))}#product`,
          name: `${displayModel} ${product[lang]}`,
          sku: product.model,
          mpn: product.model,
          model: displayModel,
          brand: {
            "@type": "Brand",
            name: "ALTEC",
          },
          category: product.category,
          image: absoluteAssetUrl(product.image),
          url: absoluteUrl(localizedPath(lang, `/products/${productSlug(product.model)}`)),
          description: isZh(lang)
            ? `${displayModel} ${product.zh}，${pick(ui.seo.productDescriptionSuffix, lang)}`
            : `${displayModel} ${product.en} ${pick(ui.seo.productDescriptionSuffix, lang)}`,
        },
      };
    }),
  };
}

function normalizeToken(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function relatedDownloadsForProduct(product: Product) {
  const productToken = normalizeToken(product.model);
  return downloads
    .filter((download) => normalizeToken(`${download.title} ${download.file}`).includes(productToken))
    .slice(0, 8);
}

function parseDownloadDate(value: string) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) {
    return undefined;
  }

  const [, month, day, year] = match;
  return `${year}-${month}-${day}`;
}

function downloadLanguage(title: string) {
  return /[\u3400-\u9fff]/.test(title) ? "zh-CN" : "en-US";
}

function productDocumentJsonLd(product: Product) {
  return relatedDownloadsForProduct(product).map((download) => {
    const dateModified = parseDownloadDate(download.date);

    return {
      "@type": "DigitalDocument",
      name: download.title,
      url: absoluteAssetUrl(download.href),
      encodingFormat: download.type === "PDF" ? "application/pdf" : "application/octet-stream",
      inLanguage: downloadLanguage(download.title),
      about: {
        "@type": "Product",
        name: productDisplayName(product),
        sku: product.model,
        brand: {
          "@type": "Brand",
          name: "ALTEC",
        },
      },
      ...(dateModified ? { dateModified } : {}),
    };
  });
}

function productAdditionalProperties(product: Product, lang: Lang) {
  const detail = productDetails[product.model];
  const guide = productSelectionGuides[product.model];
  const properties = [
    ...(guide
      ? [
          { name: pick(ui.product.buyingFields.productType, lang), value: guide.productType[lang] },
          { name: pick(ui.product.buyingFields.applications, lang), value: guide.applications.map((item) => item[lang]).join("; ") },
          { name: pick(ui.product.buyingFields.input, lang), value: guide.input[lang] },
          { name: pick(ui.product.buyingFields.output, lang), value: guide.output[lang] },
          { name: pick(ui.product.buyingFields.control, lang), value: guide.control[lang] },
          { name: pick(ui.product.buyingFields.model, lang), value: guide.modelSeries },
        ]
      : []),
    ...(detail?.specs.map((spec) => ({
      name: spec.label[lang],
      value: spec.value[lang],
    })) ?? []),
  ];
  const seen = new Set<string>();

  return properties
    .filter((property) => {
      const key = `${property.name}:${property.value}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .map((property) => ({
      "@type": "PropertyValue",
      ...property,
    }));
}

export function productJsonLd(lang: Lang, model: string) {
  const product = products.find((item) => item.model === model);
  if (!product) {
    return {};
  }

  const detail = productDetails[product.model];
  const path = localizedPath(lang, `/products/${productSlug(product.model)}`);
  const displayModel = productDisplayName(product);
  const documents = productDocumentJsonLd(product);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(path)}#product`,
    name: `${displayModel} ${product[lang]}`,
    sku: product.model,
    mpn: product.model,
    model: displayModel,
    brand: {
      "@type": "Brand",
      name: "ALTEC",
    },
    manufacturer: {
      "@id": `${siteUrl}/#organization`,
    },
    category: product.category,
    image: absoluteAssetUrl(product.image),
    url: absoluteUrl(path),
    mainEntityOfPage: {
      "@id": `${absoluteUrl(path)}#webpage`,
    },
    inLanguage: languages[lang].htmlLang,
    description:
      detail?.overview[lang] ??
      (isZh(lang)
        ? `${displayModel} ${product.zh}，${pick(ui.seo.productDescriptionSuffix, lang)}`
        : `${displayModel} ${product.en} ${pick(ui.seo.productDescriptionSuffix, lang)}`),
    additionalProperty: productAdditionalProperties(product, lang),
    ...(documents.length > 0 ? { subjectOf: documents } : {}),
  };
}

export function productWebPageJsonLd(lang: Lang, product: Product) {
  const detail = productDetails[product.model];
  const path = localizedPath(lang, `/products/${productSlug(product.model)}`);
  const url = absoluteUrl(path);
  const displayModel = productDisplayName(product);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: isZh(lang)
      ? `${displayModel} ${product.zh} | ALTEC 亚特克产品详情`
      : `${displayModel} ${product.en} | ALTEC Product Details`,
    description:
      detail?.overview[lang] ??
      (isZh(lang)
        ? `${displayModel} ${product.zh} 产品详情和本地下载资料。`
        : `${displayModel} ${product.en} details and local downloads.`),
    inLanguage: languages[lang].htmlLang,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteAssetUrl(product.image),
    },
    mainEntity: {
      "@id": `${url}#product`,
    },
  };
}

export function applicationArticleJsonLd(lang: Lang, article: ApplicationArticle) {
  const path = localizedPath(lang, `/applications/${article.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title[lang],
    description: article.excerpt[lang],
    image: absoluteAssetUrl(article.image),
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    inLanguage: languages[lang].htmlLang,
    articleSection: article.category,
    dateModified: seoLastModified,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    author: {
      "@id": `${siteUrl}/#organization`,
    },
    about: article.related.map((model) => ({
      "@type": "Product",
      name: model,
      brand: {
        "@type": "Brand",
        name: "ALTEC",
      },
    })),
  };
}

export function breadcrumbJsonLd(lang: Lang, key: SeoPageKey) {
  const page = seoPages[key];
  const homeName = pick(ui.seo.homeName, lang);
  const currentName = isZh(lang) ? page.zhTitle.split(" | ")[0] : page.enTitle.split(" | ")[0];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeName,
        item: absoluteUrl(localizedPath(lang, "/")),
      },
      ...(key === "home"
        ? []
        : [
            {
              "@type": "ListItem",
              position: 2,
              name: currentName,
              item: absoluteUrl(localizedPath(lang, page.path)),
            },
          ]),
    ],
  };
}

export function productDetailBreadcrumbJsonLd(lang: Lang, product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: pick(ui.seo.homeName, lang),
        item: absoluteUrl(localizedPath(lang, "/")),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isZh(lang) ? seoPages.products.zhTitle.split(" | ")[0] : seoPages.products.enTitle.split(" | ")[0],
        item: absoluteUrl(localizedPath(lang, seoPages.products.path)),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${productDisplayName(product)} ${product[lang]}`,
        item: absoluteUrl(localizedPath(lang, `/products/${productSlug(product.model)}`)),
      },
    ],
  };
}

export function applicationDetailBreadcrumbJsonLd(lang: Lang, article: ApplicationArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: pick(ui.seo.homeName, lang),
        item: absoluteUrl(localizedPath(lang, "/")),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isZh(lang) ? seoPages.applications.zhTitle.split(" | ")[0] : seoPages.applications.enTitle.split(" | ")[0],
        item: absoluteUrl(localizedPath(lang, seoPages.applications.path)),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title[lang],
        item: absoluteUrl(localizedPath(lang, `/applications/${article.slug}`)),
      },
    ],
  };
}

export const sitemapEntries = [
  seoPages.home.path,
  ...navItems.map((item) => item.href),
  ...activeProducts.map((product) => `/products/${productSlug(product.model)}`),
  ...applicationArticles.map((article) => `/applications/${article.slug}`),
];

export const sitemapImages = [
  ...activeProducts.map((product) => product.image),
  ...applicationArticles.map((article) => article.image),
];

export function sitemapImagesForPath(path: string) {
  const product = activeProducts.find((item) => `/products/${productSlug(item.model)}` === path);
  if (product) {
    return [product.image];
  }

  const article = applicationArticles.find((item) => `/applications/${item.slug}` === path);
  if (article) {
    return [article.image];
  }

  if (path === "/" || path === "/products" || path === "/applications") {
    return sitemapImages;
  }

  return [];
}
