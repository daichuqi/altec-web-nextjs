"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { productCategories, productDetails, productSlug, products, type Lang } from "@/lib/site-data";
import { assetUrl } from "@/lib/cdn-assets";

type Product = (typeof products)[number];
type ProductCategory = (typeof productCategories)[number];

const categoryDescriptions: Record<string, Record<Lang, string>> = {
  "Temperature & Process Control": {
    zh: "用于温度、压力、流量、液位和中央空调节能等工业过程测控场景。",
    en: "For temperature, pressure, flow, level and central air-conditioning process control.",
  },
  "Tension & Winding Control": {
    zh: "面向纸品、印刷、包装、复合和卷绕设备的张力与同步控制。",
    en: "For tension, synchronization and winding control in paper, printing, packaging and laminating lines.",
  },
  "Environment, Pressure & Water Treatment": {
    zh: "覆盖温湿度、pH/ORP、恒压供水、传感器和水处理相关控制。",
    en: "Covers humidity, pH/ORP, constant-pressure water supply, sensors and water treatment control.",
  },
};

function path(lang: Lang, href: string) {
  return `${lang === "en" ? "/en" : ""}${href === "/" ? "" : href}` || "/";
}

function normalizeSearch(value: string) {
  return value.toLocaleLowerCase().trim();
}

function compactSearch(value: string) {
  return normalizeSearch(value).replace(/[^a-z0-9\u4e00-\u9fff]+/g, "");
}

function productSearchText(product: Product) {
  const detail = productDetails[product.model];
  return [
    product.model,
    product.zh,
    product.en,
    product.category,
    detail?.overview.zh,
    detail?.overview.en,
    ...(detail?.highlights.zh ?? []),
    ...(detail?.highlights.en ?? []),
    ...(detail?.specs.flatMap((spec) => [spec.label.zh, spec.label.en, spec.value.zh, spec.value.en]) ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

function categorySlug(category: ProductCategory) {
  return category.en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function productsForCategory(category: ProductCategory) {
  return category.items
    .map((model) => products.find((product) => product.model === model))
    .filter((product): product is Product => Boolean(product));
}

export function ProductBrowser({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  const searchId = `product-search-${lang}`;
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const normalizedQuery = normalizeSearch(query);
  const compactQuery = compactSearch(query);

  const sections = useMemo(
    () =>
      productCategories
        .filter((category) => activeCategory === "all" || category.en === activeCategory)
        .map((category) => {
          const categoryProducts = productsForCategory(category).filter((product) => {
            if (!normalizedQuery) {
              return true;
            }

            const text = productSearchText(product);
            return normalizeSearch(text).includes(normalizedQuery) || compactSearch(text).includes(compactQuery);
          });

          return { category, products: categoryProducts };
        })
        .filter((section) => section.products.length > 0),
    [activeCategory, compactQuery, normalizedQuery],
  );

  const visibleCount = sections.reduce((count, section) => count + section.products.length, 0);
  const activeCategoryLabel =
    activeCategory === "all"
      ? zh
        ? "全部分类"
        : "All categories"
      : productCategories.find((category) => category.en === activeCategory)?.[lang];

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="border border-line bg-panel p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="relative">
            <label htmlFor={searchId} className="sr-only">
              {zh ? "搜索产品" : "Search products"}
            </label>
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-copy-subtle" />
            <input
              id={searchId}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={zh ? "搜索型号、产品名称或规格关键词，例如 AL808、张力、RS485" : "Search model, product name or spec, e.g. AL808, tension, RS485"}
              className="h-12 w-full border border-line-strong bg-panel pl-11 pr-11 text-sm font-semibold text-heading outline-none placeholder:font-normal placeholder:text-copy-subtle focus:border-accent"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center text-copy-subtle hover:text-heading"
                aria-label={zh ? "清除搜索" : "Clear search"}
              >
                <X size={16} />
              </button>
            ) : null}
          </div>

          <p className="text-sm font-semibold text-copy-muted">
            {zh ? `${activeCategoryLabel} · ${visibleCount} 个型号` : `${activeCategoryLabel} · ${visibleCount} models`}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            aria-pressed={activeCategory === "all"}
            className={`h-10 border px-4 text-sm font-bold ${
              activeCategory === "all"
                ? "border-accent bg-action text-action-contrast"
                : "border-line-strong bg-panel text-copy hover:border-line-strong"
            }`}
          >
            {zh ? `全部产品 ${products.length}` : `All ${products.length}`}
          </button>
          {productCategories.map((category) => {
            const count = productsForCategory(category).length;
            return (
              <button
                key={category.en}
                type="button"
                onClick={() => setActiveCategory(category.en)}
                aria-pressed={activeCategory === category.en}
                className={`h-10 border px-4 text-sm font-bold ${
                  activeCategory === category.en
                    ? "border-accent bg-action text-action-contrast"
                    : "border-line-strong bg-panel text-copy hover:border-line-strong"
                }`}
              >
                {category[lang]} {count}
              </button>
            );
          })}
        </div>
      </div>

      {sections.length > 0 ? (
        <div className="mt-10 grid gap-12">
          {sections.map((section, index) => (
            <ProductCategorySection
              key={section.category.en}
              lang={lang}
              index={index}
              category={section.category}
              products={section.products}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-line bg-panel p-8 text-center">
          <h2 className="text-xl font-bold text-heading">{zh ? "没有找到匹配产品" : "No matching products"}</h2>
          <p className="mt-3 text-sm leading-6 text-copy-muted">
            {zh ? "可以换一个型号、应用词或规格关键词再试。" : "Try another model, application term or specification keyword."}
          </p>
          <button type="button" onClick={() => setQuery("")} className="mt-5 bg-action px-5 py-3 text-sm font-bold text-action-contrast hover:bg-action-strong">
            {zh ? "清除搜索" : "Clear search"}
          </button>
        </div>
      )}
    </section>
  );
}

function ProductCategorySection({
  lang,
  index,
  category,
  products: categoryProducts,
}: {
  lang: Lang;
  index: number;
  category: ProductCategory;
  products: Product[];
}) {
  const zh = lang === "zh";
  const description = categoryDescriptions[category.en]?.[lang];

  return (
    <section id={categorySlug(category)} className="scroll-mt-24 border-t border-line pt-8">
      <div className="flex flex-col justify-between gap-5 pb-6 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            {zh ? `分类 ${String(index + 1).padStart(2, "0")}` : `Category ${String(index + 1).padStart(2, "0")}`}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl">{category[lang]}</h2>
          {description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-copy-muted">{description}</p> : null}
        </div>
        <div className="flex max-w-3xl flex-wrap gap-2">
          {categoryProducts.map((product) => (
            <Link
              key={product.model}
              href={path(lang, `/products/${productSlug(product.model)}`)}
              className="border border-line-strong bg-panel px-3 py-1.5 text-xs font-bold text-copy hover:border-accent hover:text-accent"
            >
              {product.model}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {categoryProducts.map((product) => (
          <ProductResultCard key={product.model} lang={lang} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductResultCard({ lang, product }: { lang: Lang; product: Product }) {
  const zh = lang === "zh";
  const detail = productDetails[product.model];
  const highlights = detail?.highlights[lang].slice(0, 2) ?? [];

  return (
    <Link
      href={path(lang, `/products/${productSlug(product.model)}`)}
      className="group grid min-h-full border border-line bg-panel hover:border-accent sm:grid-cols-[210px_1fr]"
    >
      <div className="relative min-h-[180px] bg-panel-muted">
        <Image
          src={assetUrl(product.image)}
          alt={`${product.model} ${product[lang]}`}
          fill
          className="object-contain p-1 sm:p-2"
          sizes="(min-width: 1024px) 210px, 60vw"
        />
      </div>
      <div className="flex min-w-0 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-heading group-hover:text-accent">{product.model}</h3>
            <p className="mt-1 text-sm font-semibold text-copy-muted">{product[lang]}</p>
          </div>
          <ArrowRight size={18} className="mt-2 shrink-0 text-copy-subtle group-hover:text-accent" />
        </div>

        {highlights.length > 0 ? (
          <ul className="mt-5 grid gap-2">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-copy-muted">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-action" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <span className="mt-auto pt-5 text-sm font-bold text-accent">
          {zh ? "查看产品详情" : "View details"}
        </span>
      </div>
    </Link>
  );
}
