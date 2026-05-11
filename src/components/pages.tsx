import Link from "next/link";
import { ArrowRight, Download, FileText, Layers, Wrench, type LucideIcon } from "lucide-react";
import { applicationArticles, applicationCategories, getApplicationBySlug } from "@/lib/application-data";
import { productRichDetails } from "@/lib/product-rich-details";
import { aboutContent, contactEmail, downloads, productCategories, productDetails, productSlug, products, type Lang } from "@/lib/site-data";
import { ProductBrowser } from "@/components/product-browser";
import { OptimizedImage } from "@/components/optimized-image";
import { assetUrl, rewriteHtmlAssetLinks } from "@/lib/cdn-assets";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  organizationJsonLd,
  productJsonLd,
  productListJsonLd,
  websiteJsonLd,
  type SeoPageKey,
} from "@/lib/seo";
import { PageShell, PageTitle } from "@/components/site-layout";

function path(lang: Lang, href: string) {
  return `${lang === "en" ? "/en" : ""}${href === "/" ? "" : href}` || "/";
}

const featuredProductModels = ["AL808", "PCP310", "TC818", "PC900"];

export function HomePage({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  const featuredProducts = featuredProductModels
    .map((model) => products.find((item) => item.model === model))
    .filter((item): item is (typeof products)[number] => Boolean(item));

  return (
    <PageShell lang={lang}>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(lang), breadcrumbJsonLd(lang, "home")]} />
      <section className="bg-panel">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              {zh ? "工业自动化智能过程控制仪表" : "Industrial Automation Process Instruments"}
            </p>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
              {zh ? "为工业现场提供稳定可靠的测控仪表" : "Reliable Process Control Instruments for Industrial Sites"}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-copy-muted sm:text-lg">
              {zh
                ? "亚特克专注工业自动化智能过程控制仪表的研发、生产与应用，长期服务电炉、环境试验、印刷张力、环保水处理、中央空调节能和变频供水等行业。产品覆盖温度、湿度、压力、张力、pH/ORP、称重配料等精确测控场景，并可承接行业专用仪表定制。"
                : "ALTEC develops and manufactures intelligent process control instruments for industrial automation, serving electric furnaces, environmental test equipment, printing tension control, water treatment, HVAC energy saving and variable-frequency water supply. Its portfolio covers precise measurement and control of temperature, humidity, pressure, tension, pH/ORP, weighing and dosing, with custom instruments available for specialized applications."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={path(lang, "/products")} className="bg-action px-5 py-3 text-sm font-semibold text-action-contrast hover:bg-action-strong">
                {zh ? "进入产品中心" : "View products"}
              </Link>
              <Link href={path(lang, "/downloads")} className="border border-line-strong px-5 py-3 text-sm font-semibold text-copy hover:border-line-strong">
                {zh ? "下载资料" : "Download documents"}
              </Link>
            </div>
          </div>
          <div className="border border-line bg-panel-muted p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{zh ? "热销型号" : "Popular Models"}</p>
                <h2 className="mt-1 text-xl font-bold text-heading">{zh ? "常用控制器快速入口" : "Fast Access to Key Controllers"}</h2>
              </div>
              <Link href={path(lang, "/products")} className="shrink-0 text-sm font-bold text-accent hover:text-accent-strong">
                {zh ? "全部产品" : "All products"}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.map((item) => (
                <Link
                  key={item.model}
                  href={path(lang, `/products/${productSlug(item.model)}`)}
                  className="group bg-panel p-4 ring-1 ring-line hover:ring-accent"
                >
                  <div className="relative aspect-[1.28] bg-canvas">
                    <OptimizedImage src={item.image} alt={`${item.model} ${item[lang]}`} fill className="object-contain p-3" sizes="(min-width: 1024px) 250px, 45vw" />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-bold text-heading group-hover:text-accent">{item.model}</p>
                      <p className="mt-1 text-xs leading-5 text-copy-subtle">{item[lang]}</p>
                    </div>
                    <ArrowRight size={16} className="mt-1 shrink-0 text-copy-subtle group-hover:text-accent" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-canvas">
        <div className="mx-auto grid max-w-7xl gap-px bg-line sm:grid-cols-3">
          {([
            [Layers, zh ? `${products.length} 个产品型号` : `${products.length} product models`, zh ? "按过程控制、张力卷绕、环境水处理分类。" : "Grouped by process, tension/winding, environment and water treatment."],
            [Wrench, zh ? "工程选型导向" : "Engineering oriented", zh ? "减少营销长页，保留明确入口和资料。" : "Clear navigation and documentation over long marketing pages."],
            [Download, zh ? "资料集中提供" : "Document Library", zh ? "常用说明书、通讯协议、传感器资料与软件集中整理，便于选型和维护。" : "Manuals, protocols, sensor documents and software are organized for selection and maintenance."],
          ] as Array<[LucideIcon, string, string]>).map(([Icon, title, text]) => (
            <div key={String(title)} className="bg-canvas p-7">
              <Icon size={28} className="text-accent" />
              <h2 className="mt-5 text-xl font-bold text-heading">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-copy-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-4">
        {[
          ["/about", zh ? "公司简介" : "About", zh ? "了解亚特克的研发、生产与服务能力。" : "Learn about ALTEC's R&D, production and service capability."],
          ["/products", zh ? "产品中心" : "Products", zh ? "按类别查看控制器产品。" : "Browse controllers by category."],
          ["/applications", zh ? "应用方案" : "Applications", zh ? "查看典型工业场景。" : "Review typical industrial use cases."],
          ["/downloads", zh ? "下载中心" : "Downloads", zh ? "获取说明书、协议和软件。" : "Get manuals, protocols and software."],
        ].map(([href, title, text]) => (
          <Link key={href} href={path(lang, href)} className="group border border-line bg-panel p-6 hover:border-accent">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{title}</h2>
              <ArrowRight size={18} className="text-copy-subtle group-hover:text-accent" />
            </div>
            <p className="mt-4 text-sm leading-6 text-copy-muted">{text}</p>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}

export function AboutPage({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  const content = aboutContent[lang];
  return (
    <PageShell lang={lang}>
      <PageJsonLd lang={lang} page="about" />
      <PageTitle
        eyebrow="About ALTEC"
        title={zh ? "公司简介" : "About ALTEC"}
        text={
          zh
            ? "内容整理自原中文公司简介页面，保留公司能力、应用领域和质量方针等核心信息。"
            : "Adapted from ALTEC's company profile, covering capabilities, application areas and quality policy."
        }
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="border border-line bg-panel p-6">
          <h2 className="text-xl font-bold">{zh ? "核心能力" : "Highlights"}</h2>
          <div className="mt-5 grid gap-3">
            {content.highlights.map((item) => (
              <div key={item} className="bg-panel-muted px-4 py-3 text-sm font-semibold text-copy">
                {item}
              </div>
            ))}
          </div>
        </aside>
        <article className="border border-line bg-panel p-7">
          <div className="space-y-5 text-base leading-8 text-copy">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 border-l-4 border-accent bg-canvas p-5 text-sm leading-7 text-copy">
            {content.productSummary}
          </div>
        </article>
      </section>
    </PageShell>
  );
}

export function ProductsPage({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  return (
    <PageShell lang={lang}>
      <JsonLd data={[breadcrumbJsonLd(lang, "products"), productListJsonLd(lang)]} />
      <PageTitle
        eyebrow={zh ? "Products" : "Products"}
        title={zh ? "产品中心" : "Product Center"}
        text={
          zh
            ? "按应用方向整理全部控制器型号，可搜索型号、产品名称和规格关键词，快速进入详情页。"
            : "Browse all controller models by application area, or search by model, product name and specification keyword."
        }
      />
      <ProductBrowser lang={lang} />
    </PageShell>
  );
}

function normalizeToken(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function ProductDetailPage({ lang, model }: { lang: Lang; model: string }) {
  const zh = lang === "zh";
  const product = products.find((item) => item.model === model);
  const detail = product ? productDetails[product.model] : undefined;

  if (!product || !detail) {
    return null;
  }

  const category = productCategories.find((item) => item.items.includes(product.model));
  const richDetail = productRichDetails[product.model];
  const richDetailHtml = richDetail ? (zh ? richDetail.html : richDetail.htmlEn) : undefined;
  const richDetailHtmlWithCdn = richDetailHtml ? rewriteHtmlAssetLinks(richDetailHtml) : "";
  const relatedProducts = products.filter((item) => item.category === product.category && item.model !== product.model).slice(0, 4);
  const productToken = normalizeToken(product.model);
  const relatedDownloads = downloads
    .filter((item) => normalizeToken(`${item.title} ${item.file}`).includes(productToken))
    .slice(0, 6);

  return (
    <PageShell lang={lang}>
      <JsonLd data={productJsonLd(lang, product.model)} />
      <section className="border-b border-line bg-panel">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[1.15] border border-line bg-panel-muted">
            <OptimizedImage src={product.image} alt={`${product.model} ${product[lang]}`} fill className="object-contain p-10" sizes="(min-width: 1024px) 48vw, 100vw" priority />
          </div>
          <div>
            <Link href={path(lang, "/products")} className="text-sm font-bold text-accent hover:text-accent-strong">
              {zh ? "返回产品中心" : "Back to products"}
            </Link>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-copy-subtle">{category?.[lang] ?? product.category}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading sm:text-6xl">{product.model}</h1>
            <p className="mt-4 text-2xl font-semibold text-copy">{product[lang]}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-copy-muted">{detail.overview[lang]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={path(lang, "/downloads")} className="bg-action px-5 py-3 text-sm font-semibold text-action-contrast hover:bg-action-strong">
                {zh ? "查看下载资料" : "View downloads"}
              </Link>
              <Link href={path(lang, "/contact")} className="border border-line-strong px-5 py-3 text-sm font-semibold text-copy hover:border-line-strong">
                {zh ? "咨询选型" : "Ask for selection help"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="border border-line bg-panel p-6">
          <h2 className="text-2xl font-bold">{zh ? "产品特点" : "Highlights"}</h2>
          <div className="mt-6 grid gap-3">
            {detail.highlights[lang].map((item) => (
              <div key={item} className="flex gap-3 bg-panel-muted px-4 py-3 text-sm font-semibold leading-6 text-copy">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-action" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </aside>
        <article className="border border-line bg-panel">
          <div className="border-b border-line px-6 py-5">
            <h2 className="text-2xl font-bold">{zh ? "关键规格" : "Key Specifications"}</h2>
          </div>
          <dl className="divide-y divide-line">
            {detail.specs.map((spec) => (
              <div key={spec.label.en} className="grid gap-2 px-6 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-bold text-heading">{spec.label[lang]}</dt>
                <dd className="leading-7 text-copy-muted">{spec.value[lang]}</dd>
              </div>
            ))}
          </dl>
        </article>
      </section>

      {richDetailHtml ? (
        <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
          <div className="border border-line bg-panel">
            <div className="border-b border-line px-6 py-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">Technical Detail</p>
              <h2 className="mt-2 text-2xl font-bold">{zh ? "完整技术资料" : "Technical Details"}</h2>
            </div>
            <div className="product-rich-detail px-6 py-7" dangerouslySetInnerHTML={{ __html: richDetailHtmlWithCdn }} />
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 sm:px-8 lg:grid-cols-2">
        <div className="border border-line bg-panel p-6">
          <h2 className="text-2xl font-bold">{zh ? "相关下载" : "Related Downloads"}</h2>
          <div className="mt-5 divide-y divide-line">
            {relatedDownloads.length > 0 ? (
              relatedDownloads.map((item) => (
                <a key={item.file} href={assetUrl(item.href)} download className="flex items-center justify-between gap-4 py-4 hover:text-accent">
                  <span className="flex items-center gap-3 font-semibold">
                    <FileText size={18} className="shrink-0 text-accent" />
                    {item.title}
                  </span>
                  <span className="shrink-0 text-sm text-copy-subtle">{item.type}</span>
                </a>
              ))
            ) : (
              <p className="py-4 text-sm leading-6 text-copy-muted">{zh ? "暂无单独匹配资料，请前往下载中心查看完整资料库。" : "No directly matched document yet. Visit the download center for the full library."}</p>
            )}
          </div>
        </div>
        <div className="border border-line bg-panel p-6">
          <h2 className="text-2xl font-bold">{zh ? "同类产品" : "Related Products"}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {relatedProducts.map((item) => (
              <Link key={item.model} href={path(lang, `/products/${productSlug(item.model)}`)} className="group flex items-center gap-4 border border-line p-3 hover:border-accent">
                <div className="relative h-16 w-16 shrink-0 bg-panel-muted">
                  <OptimizedImage src={item.image} alt={item.model} fill className="object-contain p-2" sizes="64px" />
                </div>
                <div>
                  <p className="font-bold text-heading group-hover:text-accent">{item.model}</p>
                  <p className="text-sm text-copy-muted">{item[lang]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function ApplicationsPage({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  return (
    <PageShell lang={lang}>
      <PageJsonLd lang={lang} page="applications" />
      <PageTitle
        eyebrow="Applications"
        title={zh ? "应用方案与基础知识" : "Applications and Knowledge Base"}
        text={
          zh
            ? "控制基础、测量知识和典型应用资料集中整理，便于选型、接线与现场调试。"
            : "Control references, measurement notes and typical industrial application pages for selection, wiring and commissioning."
        }
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8">
        {applicationCategories.map((category) => (
          <div key={category.key}>
            <div className="mb-5 flex flex-col justify-between gap-3 border-b border-line pb-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  {category.key === "knowledge" ? "Knowledge" : "Solutions"}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-heading">{category[lang]}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-copy-muted">{category.description[lang]}</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {applicationArticles
                .filter((article) => article.category === category.key)
                .map((article) => (
                  <Link
                    key={article.slug}
                    href={path(lang, `/applications/${article.slug}`)}
                    className="group grid gap-5 border border-line bg-panel p-5 hover:border-accent sm:grid-cols-[210px_1fr]"
                  >
                    <div className="relative aspect-[1.25] bg-panel-muted">
                      <OptimizedImage src={article.image} alt={article.title[lang]} fill className="object-contain p-4" sizes="220px" />
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {article.related.map((item) => (
                          <span key={item} className="bg-panel-muted px-2.5 py-1 text-xs font-bold text-copy-muted">
                            {item}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-heading group-hover:text-accent">{article.title[lang]}</h3>
                      <p className="mt-3 text-sm leading-6 text-copy-muted">{article.excerpt[lang]}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
                        {zh ? "查看详情" : "Read details"}
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}

export function ApplicationDetailPage({ lang, slug }: { lang: Lang; slug: string }) {
  const zh = lang === "zh";
  const article = getApplicationBySlug(slug);

  if (!article) {
    return null;
  }

  const category = applicationCategories.find((item) => item.key === article.category);
  const relatedProducts = products.filter((item) => article.related.includes(item.model));
  const relatedArticles = applicationArticles
    .filter((item) => item.category === article.category && item.slug !== article.slug)
    .slice(0, 4);

  return (
    <PageShell lang={lang}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: article.title[lang],
          description: article.excerpt[lang],
          image: absoluteUrl(article.image),
          inLanguage: zh ? "zh-CN" : "en-US",
          publisher: {
            "@type": "Organization",
            name: zh ? "深圳市亚特克电子有限公司" : "Shenzhen ALTEC Electronics Co., Ltd.",
          },
        }}
      />
      <section className="border-b border-line bg-panel">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Link href={path(lang, "/applications")} className="text-sm font-bold text-accent hover:text-accent-strong">
              {zh ? "返回应用方案" : "Back to applications"}
            </Link>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-copy-subtle">{category?.[lang]}</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-heading sm:text-5xl">{article.title[lang]}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-copy-muted">{article.excerpt[lang]}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {article.related.map((item) => (
                <span key={item} className="bg-panel-muted px-3 py-1.5 text-sm font-bold text-copy">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative aspect-[1.2] border border-line bg-panel-muted">
            <OptimizedImage src={article.image} alt={article.title[lang]} fill className="object-contain p-6" sizes="(min-width: 1024px) 42vw, 100vw" priority />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="border border-line bg-panel">
          <div className="border-b border-line px-6 py-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">Technical Note</p>
            <h2 className="mt-2 text-2xl font-bold">{zh ? "详细内容" : "Details"}</h2>
          </div>
          <div className="product-rich-detail application-rich-detail px-6 py-7" dangerouslySetInnerHTML={{ __html: rewriteHtmlAssetLinks(article.html[lang]) }} />
        </article>

        <aside className="space-y-6">
          {relatedProducts.length > 0 ? (
            <div className="border border-line bg-panel p-6">
              <h2 className="text-xl font-bold">{zh ? "相关产品" : "Related Products"}</h2>
              <div className="mt-5 grid gap-3">
                {relatedProducts.map((item) => (
                    <Link key={item.model} href={path(lang, `/products/${productSlug(item.model)}`)} className="group flex items-center gap-4 border border-line p-3 hover:border-accent">
                      <div className="relative h-16 w-16 shrink-0 bg-panel-muted">
                        <OptimizedImage src={item.image} alt={item.model} fill className="object-contain p-2" sizes="64px" />
                      </div>
                      <div>
                        <p className="font-bold text-heading group-hover:text-accent">{item.model}</p>
                        <p className="text-sm leading-5 text-copy-muted">{item[lang]}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="border border-line bg-panel p-6">
            <h2 className="text-xl font-bold">{zh ? "同类资料" : "Related Notes"}</h2>
            <div className="mt-5 grid gap-3">
              {relatedArticles.map((item) => (
                <Link key={item.slug} href={path(lang, `/applications/${item.slug}`)} className="block border border-line p-4 hover:border-accent">
                  <p className="font-bold text-heading">{item.title[lang]}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-copy-muted">{item.excerpt[lang]}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

export function DownloadsPage({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  return (
    <PageShell lang={lang}>
      <PageJsonLd lang={lang} page="downloads" />
      <PageTitle
        eyebrow="Downloads"
        title={zh ? "下载中心" : "Download Center"}
        text={zh ? "常用说明书、通讯协议、传感器资料与软件集中提供，可按型号快速查找。" : "Manuals, protocols, sensor documents and software are organized here for quick lookup by model."}
      />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="overflow-hidden border border-line bg-panel">
          <div className="grid grid-cols-[1fr_90px_120px_120px] bg-panel-muted px-5 py-3 text-sm font-bold text-copy-muted max-md:hidden">
            <span>{zh ? "文件" : "File"}</span>
            <span>{zh ? "类型" : "Type"}</span>
            <span>{zh ? "大小" : "Size"}</span>
            <span>{zh ? "日期" : "Date"}</span>
          </div>
          {downloads.map((item) => (
            <a
              key={item.file}
              href={assetUrl(item.href)}
              download
              className="grid gap-3 border-t border-line px-5 py-4 hover:bg-panel-muted md:grid-cols-[1fr_90px_120px_120px] md:items-center"
            >
              <span className="flex items-center gap-3 font-semibold text-heading">
                <FileText size={18} className="text-accent" />
                {item.title}
              </span>
              <span className="text-sm text-copy-muted">{item.type}</span>
              <span className="text-sm text-copy-muted">{item.size}</span>
              <span className="text-sm text-copy-muted">{item.date}</span>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export function ContactPage({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  return (
    <PageShell lang={lang}>
      <JsonLd data={[organizationJsonLd(), breadcrumbJsonLd(lang, "contact")]} />
      <PageTitle
        eyebrow="Contact"
        title={zh ? "联系我们" : "Contact Us"}
        text={zh ? "如需产品选型、资料确认或定制仪表，请联系亚特克。" : "Contact ALTEC for product selection, documentation and custom instruments."}
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-2">
        <div className="border border-line bg-panel p-8">
          <h2 className="text-2xl font-bold">{zh ? "深圳市亚特克电子有限公司" : "Shenzhen ALTEC Electronics Co., Ltd."}</h2>
          <div className="mt-6 space-y-4 leading-7 text-copy-muted">
            <p>{zh ? "地址：深圳市宝安区航城街道洲石路739号恒丰工业城C6栋502B号" : "Address: Shenzhen, China"}</p>
            <p>{zh ? "电话：0755-26409070 / 26416767 / 13802580359" : "Tel: +86 0755 26409070 / 26416767"}</p>
            <p>{zh ? "传真：0755-26416767" : "Fax: +86 0755 26416767"}</p>
            <p>
              {zh ? "邮箱：" : "Email: "}
              <a href={`mailto:${contactEmail}`} className="font-semibold text-accent hover:text-accent-strong">
                {contactEmail}
              </a>
            </p>
          </div>
        </div>
        <div className="border border-line bg-panel-muted p-8">
          <h2 className="text-2xl font-bold">{zh ? "资料与支持" : "Documents & Support"}</h2>
          <p className="mt-4 leading-7 text-copy-muted">
            {zh
              ? "产品说明书和软件请直接前往下载中心获取，所有可用文件均由本站直接提供。"
              : "Manuals and software are available directly from the Download Center and hosted by this site."}
          </p>
          <Link href={path(lang, "/downloads")} className="mt-6 inline-flex bg-action px-5 py-3 text-sm font-semibold text-action-contrast hover:bg-action-strong">
            {zh ? "前往下载中心" : "Go to downloads"}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function PageJsonLd({ lang, page }: { lang: Lang; page: SeoPageKey }) {
  return <JsonLd data={breadcrumbJsonLd(lang, page)} />;
}

function JsonLd({ data }: { data: object | object[] }) {
  const graphs = Array.isArray(data) ? data : [data];

  return (
    <>
      {graphs.map((graph, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}
