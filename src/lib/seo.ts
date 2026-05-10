import type { Metadata } from "next";
import { applicationArticles } from "@/lib/application-data";
import { contactEmail, navItems, productDetails, productSlug, products, type Lang } from "@/lib/site-data";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://altec.daichuqi.com"
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
    zhTitle: "ALTEC 亚特克 | 工业自动化过程控制仪表厂家",
    enTitle: "ALTEC Industrial Process Controllers | Shenzhen ALTEC Electronics",
    zhDescription:
      "深圳市亚特克电子有限公司专注工业自动化智能过程控制仪表，提供温度控制器、张力控制器、pH/ORP 控制器、恒压供水控制器、温湿度控制器及产品资料下载。",
    enDescription:
      "Shenzhen ALTEC Electronics provides industrial process control instruments including temperature controllers, tension controllers, pH/ORP controllers, constant-pressure water controllers and temperature-humidity controllers.",
  },
  about: {
    path: "/about",
    zhTitle: "公司简介 | 深圳市亚特克电子有限公司",
    enTitle: "About ALTEC | Industrial Control Instrument Manufacturer",
    zhDescription:
      "了解深圳市亚特克电子有限公司的工业自动化仪表研发、生产、定制和应用服务能力。",
    enDescription:
      "Learn about Shenzhen ALTEC Electronics, an industrial automation instrument manufacturer focused on process control, custom instruments and engineering applications.",
  },
  products: {
    path: "/products",
    zhTitle: "产品中心 | 温度控制器、张力控制器、pH/ORP 控制器",
    enTitle: "Products | Temperature, Tension and pH/ORP Controllers",
    zhDescription:
      "查看 ALTEC 亚特克产品，包括 AL807、AL808、AL810、AL830、TC808、TC930、TC950、MTC35、CPC316 等型号。",
    enDescription:
      "Browse ALTEC industrial controllers including AL807, AL808, AL810, AL830, TC808, TC930, TC950, MTC35 and CPC316.",
  },
  applications: {
    path: "/applications",
    zhTitle: "应用方案与基础知识 | 工业控制、测量与典型系统",
    enTitle: "Applications and Knowledge Base | Industrial Control References",
    zhDescription:
      "查看 ALTEC 亚特克工业过程控制基础知识、温湿度测量知识，以及张力控制、pH/ORP 水处理、恒压供水等典型应用方案。",
    enDescription:
      "Review ALTEC control references, measurement notes and application solutions for tension control, pH/ORP water treatment, constant-pressure water supply and industrial process control.",
  },
  downloads: {
    path: "/downloads",
    zhTitle: "下载中心 | ALTEC 产品说明书、通讯协议和软件",
    enTitle: "Downloads | ALTEC Manuals, Protocols and Software",
    zhDescription:
      "下载 ALTEC 亚特克产品说明书、通讯协议、传感器资料和软件，涵盖 AL808、TC808、TC950、MTC35、CPC316 等型号。",
    enDescription:
      "Download ALTEC manuals, communication protocols, sensor documents and software for AL808, TC808, TC950, MTC35, CPC316 and more.",
  },
  contact: {
    path: "/contact",
    zhTitle: "联系我们 | 深圳市亚特克电子有限公司",
    enTitle: "Contact ALTEC | Shenzhen ALTEC Electronics",
    zhDescription:
      "联系深圳市亚特克电子有限公司，咨询工业控制仪表选型、产品资料、定制仪表和售后支持。",
    enDescription:
      "Contact Shenzhen ALTEC Electronics for industrial controller selection, product documents, custom instruments and support.",
  },
} as const;

export type SeoPageKey = keyof typeof seoPages;

export function localizedPath(lang: Lang, path: string) {
  return `${lang === "en" ? "/en" : ""}${path === "/" ? "" : path}` || "/";
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

export function pageMetadata(key: SeoPageKey, lang: Lang): Metadata {
  const page = seoPages[key];
  const title = lang === "zh" ? page.zhTitle : page.enTitle;
  const description = lang === "zh" ? page.zhDescription : page.enDescription;
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
      locale: lang === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [
        {
          url: "/altec/products/AL808.jpg",
          width: 800,
          height: 640,
          alt: lang === "zh" ? "ALTEC 亚特克控制器" : "ALTEC industrial controller",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/altec/products/AL808.jpg"],
    },
  };
}

export function websiteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: lang === "zh" ? company.brand : "ALTEC Industrial Control",
    url: siteUrl,
    inLanguage: lang === "zh" ? "zh-CN" : "en-US",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    alternateName: [company.englishName, "ALTEC", "亚特克"],
    url: siteUrl,
    logo: absoluteUrl("/altec/products/AL808.jpg"),
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      ...company.address,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.phone[0],
        contactType: "sales",
        areaServed: ["CN", "Worldwide"],
        availableLanguage: ["Chinese", "English"],
      },
    ],
  };
}

export function productListJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "zh" ? "ALTEC 亚特克产品" : "ALTEC industrial controller products",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `${product.model} ${product[lang]}`,
        brand: {
          "@type": "Brand",
          name: "ALTEC",
        },
        category: product.category,
        image: absoluteUrl(product.image),
        url: absoluteUrl(localizedPath(lang, `/products/${productSlug(product.model)}`)),
        description:
          lang === "zh"
            ? `${product.model} ${product.zh}，适用于工业自动化过程控制应用。`
            : `${product.model} ${product.en} for industrial process control applications.`,
      },
    })),
  };
}

export function productJsonLd(lang: Lang, model: string) {
  const product = products.find((item) => item.model === model);
  if (!product) {
    return {};
  }

  const detail = productDetails[product.model];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.model} ${product[lang]}`,
    brand: {
      "@type": "Brand",
      name: "ALTEC",
    },
    category: product.category,
    image: absoluteUrl(product.image),
    url: absoluteUrl(localizedPath(lang, `/products/${productSlug(product.model)}`)),
    description:
      detail?.overview[lang] ??
      (lang === "zh"
        ? `${product.model} ${product.zh}，适用于工业自动化过程控制应用。`
        : `${product.model} ${product.en} for industrial process control applications.`),
  };
}

export function breadcrumbJsonLd(lang: Lang, key: SeoPageKey) {
  const page = seoPages[key];
  const homeName = lang === "zh" ? "首页" : "Home";
  const currentName = lang === "zh" ? page.zhTitle.split(" | ")[0] : page.enTitle.split(" | ")[0];

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

export const sitemapEntries = [
  seoPages.home.path,
  ...navItems.map((item) => item.href),
  ...products.map((product) => `/products/${productSlug(product.model)}`),
  ...applicationArticles.map((article) => `/applications/${article.slug}`),
];

export const sitemapImages = [
  ...products.map((product) => product.image),
  ...applicationArticles.map((article) => article.image),
];
