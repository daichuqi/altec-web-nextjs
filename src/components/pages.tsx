import Link from "next/link";
import { ArrowRight, Download, FileText, Layers, Wrench, type LucideIcon } from "lucide-react";
import { applicationArticles, applicationCategories, getApplicationBySlug } from "@/lib/application-data";
import { getProductRichDetailHtml, productRichDetails } from "@/lib/product-rich-details";
import { aboutContent, activeProducts, contactEmail, downloads, productCategories, productDetails, productSlug, products } from "@/lib/site-data";
import { ProductBrowser } from "@/components/product-browser";
import { OptimizedImage } from "@/components/optimized-image";
import { assetUrl, rewriteHtmlAssetLinks } from "@/lib/cdn-assets";
import { localizedPath, pick, ui, type Lang } from "@/lib/i18n";
import {
  applicationArticleJsonLd,
  applicationDetailBreadcrumbJsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
  productDetailBreadcrumbJsonLd,
  productJsonLd,
  productListJsonLd,
  websiteJsonLd,
  type SeoPageKey,
} from "@/lib/seo";
import { PageShell, PageTitle } from "@/components/site-layout";

const featuredProductModels = ["AL808", "PC900", "TC818", "CPC316"];

export function HomePage({ lang }: { lang: Lang }) {
  const copy = ui.home;
  const featuredProducts = featuredProductModels
    .map((model) => activeProducts.find((item) => item.model === model))
    .filter((item): item is (typeof activeProducts)[number] => Boolean(item));

  return (
    <PageShell lang={lang}>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(lang), breadcrumbJsonLd(lang, "home")]} />
      <section className="bg-panel">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:py-12 xl:grid-cols-[minmax(0,0.86fr)_minmax(520px,1fr)] xl:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              {pick(copy.eyebrow, lang)}
            </p>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
              {pick(copy.title, lang)}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-copy-muted sm:text-lg">
              {pick(copy.intro, lang)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localizedPath(lang, "/products")} className="bg-action px-5 py-3 text-sm font-semibold text-action-contrast hover:bg-action-strong">
                {pick(copy.ctaProducts, lang)}
              </Link>
              <Link href={localizedPath(lang, "/downloads")} className="border border-line-strong px-5 py-3 text-sm font-semibold text-copy hover:border-line-strong">
                {pick(copy.ctaDownloads, lang)}
              </Link>
            </div>
          </div>
          <div className="border border-line bg-panel-muted p-4 sm:p-5 xl:mt-0">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{pick(copy.popularEyebrow, lang)}</p>
                <h2 className="mt-1 text-xl font-bold text-heading">{pick(copy.popularTitle, lang)}</h2>
              </div>
              <Link href={localizedPath(lang, "/products")} className="shrink-0 text-sm font-bold text-accent hover:text-accent-strong">
                {pick(copy.allProducts, lang)}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {featuredProducts.map((item) => (
                <Link
                  key={item.model}
                  href={localizedPath(lang, `/products/${productSlug(item.model)}`)}
                  className="group bg-panel p-3 ring-1 ring-line hover:ring-accent"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-panel-muted">
                    <OptimizedImage src={item.image} alt={`${item.model} ${item[lang]}`} fill className="object-cover" sizes="(min-width: 1280px) 260px, (min-width: 640px) 45vw, 90vw" />
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
            [Layers, `${activeProducts.length} ${pick(copy.stats[0].title, lang)}`, pick(copy.stats[0].text, lang)],
            [Wrench, pick(copy.stats[1].title, lang), pick(copy.stats[1].text, lang)],
            [Download, pick(copy.stats[2].title, lang), pick(copy.stats[2].text, lang)],
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
        {copy.cards.map((card) => (
          <Link key={card.href} href={localizedPath(lang, card.href)} className="group border border-line bg-panel p-6 hover:border-accent">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{pick(card.title, lang)}</h2>
              <ArrowRight size={18} className="text-copy-subtle group-hover:text-accent" />
            </div>
            <p className="mt-4 text-sm leading-6 text-copy-muted">{pick(card.text, lang)}</p>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}

export function AboutPage({ lang }: { lang: Lang }) {
  const copy = ui.pages.about;
  const content = aboutContent[lang];
  return (
    <PageShell lang={lang}>
      <PageJsonLd lang={lang} page="about" />
      <PageTitle
        eyebrow={pick(copy.eyebrow, lang)}
        title={pick(copy.title, lang)}
        text={pick(copy.text, lang)}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="border border-line bg-panel p-6">
          <h2 className="text-xl font-bold">{pick(copy.highlights, lang)}</h2>
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
  const copy = ui.pages.products;
  return (
    <PageShell lang={lang}>
      <JsonLd data={[breadcrumbJsonLd(lang, "products"), productListJsonLd(lang)]} />
      <PageTitle
        eyebrow={pick(copy.eyebrow, lang)}
        title={pick(copy.title, lang)}
        text={pick(copy.text, lang)}
      />
      <ProductBrowser lang={lang} />
    </PageShell>
  );
}

function normalizeToken(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function ProductDetailPage({ lang, model }: { lang: Lang; model: string }) {
  const copy = ui.product;
  const product = products.find((item) => item.model === model);
  const detail = product ? productDetails[product.model] : undefined;

  if (!product || !detail) {
    return null;
  }

  const category = productCategories.find((item) => item.items.includes(product.model));
  const isArchived = product.status === "archived";
  const richDetail = productRichDetails[product.model];
  const richDetailHtml = getProductRichDetailHtml(richDetail, lang);
  const richDetailHtmlWithCdn = richDetailHtml ? rewriteHtmlAssetLinks(richDetailHtml) : "";
  const relatedProducts = activeProducts.filter((item) => item.category === product.category && item.model !== product.model).slice(0, 4);
  const productToken = normalizeToken(product.model);
  const relatedDownloads = downloads
    .filter((item) => normalizeToken(`${item.title} ${item.file}`).includes(productToken))
    .slice(0, 6);

  return (
    <PageShell lang={lang}>
      <JsonLd data={[productJsonLd(lang, product.model), productDetailBreadcrumbJsonLd(lang, product)]} />
      <section className="border-b border-line bg-panel">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] border border-line bg-panel-muted">
            <OptimizedImage src={product.image} alt={`${product.model} ${product[lang]}`} fill className="object-contain p-2 sm:p-4" sizes="(min-width: 1024px) 48vw, 100vw" priority />
          </div>
          <div>
            <Link href={localizedPath(lang, "/products")} className="text-sm font-bold text-accent hover:text-accent-strong">
              {pick(copy.back, lang)}
            </Link>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-copy-subtle">{category?.[lang] ?? product.category}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading sm:text-6xl">{product.model}</h1>
            <p className="mt-4 text-2xl font-semibold text-copy">{product[lang]}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-copy-muted">{detail.overview[lang]}</p>
            {isArchived ? (
              <div className="mt-6 border border-line bg-panel-muted px-4 py-3 text-sm font-semibold leading-6 text-copy-muted">
                {pick(copy.archivedNotice, lang)}
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localizedPath(lang, "/downloads")} className="bg-action px-5 py-3 text-sm font-semibold text-action-contrast hover:bg-action-strong">
                {pick(copy.viewDownloads, lang)}
              </Link>
              <Link href={localizedPath(lang, "/contact")} className="border border-line-strong px-5 py-3 text-sm font-semibold text-copy hover:border-line-strong">
                {pick(isArchived ? copy.askReplacement : copy.askSelection, lang)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="border border-line bg-panel p-6">
          <h2 className="text-2xl font-bold">{pick(copy.highlights, lang)}</h2>
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
            <h2 className="text-2xl font-bold">{pick(copy.specs, lang)}</h2>
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
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">{pick(copy.technicalEyebrow, lang)}</p>
              <h2 className="mt-2 text-2xl font-bold">{pick(copy.technicalDetails, lang)}</h2>
            </div>
            <div className="product-rich-detail px-6 py-7" dangerouslySetInnerHTML={{ __html: richDetailHtmlWithCdn }} />
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 sm:px-8 lg:grid-cols-2">
        <div className="border border-line bg-panel p-6">
          <h2 className="text-2xl font-bold">{pick(copy.relatedDownloads, lang)}</h2>
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
              <p className="py-4 text-sm leading-6 text-copy-muted">{pick(copy.noDownloads, lang)}</p>
            )}
          </div>
        </div>
        <div className="border border-line bg-panel p-6">
          <h2 className="text-2xl font-bold">{pick(copy.relatedProducts, lang)}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {relatedProducts.map((item) => (
              <Link key={item.model} href={localizedPath(lang, `/products/${productSlug(item.model)}`)} className="group flex items-center gap-4 border border-line p-3 hover:border-accent">
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
  const copy = ui.pages.applications;
  return (
    <PageShell lang={lang}>
      <PageJsonLd lang={lang} page="applications" />
      <PageTitle
        eyebrow={pick(copy.eyebrow, lang)}
        title={pick(copy.title, lang)}
        text={pick(copy.text, lang)}
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
                    href={localizedPath(lang, `/applications/${article.slug}`)}
                    className="group grid gap-5 border border-line bg-panel p-4 hover:border-accent sm:grid-cols-[210px_1fr]"
                  >
                    <div className="relative aspect-[1.25] overflow-hidden bg-panel-muted">
                      <OptimizedImage src={article.image} alt={article.title[lang]} fill className="object-contain" sizes="220px" />
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
                        {pick(copy.readDetails, lang)}
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
  const copy = ui.pages.applications;
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
      <JsonLd data={[applicationArticleJsonLd(lang, article), applicationDetailBreadcrumbJsonLd(lang, article)]} />
      <section className="border-b border-line bg-panel">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Link href={localizedPath(lang, "/applications")} className="text-sm font-bold text-accent hover:text-accent-strong">
              {pick(copy.back, lang)}
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
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">{pick(copy.technicalNote, lang)}</p>
            <h2 className="mt-2 text-2xl font-bold">{pick(copy.details, lang)}</h2>
          </div>
          <div className="product-rich-detail application-rich-detail px-6 py-7" dangerouslySetInnerHTML={{ __html: rewriteHtmlAssetLinks(article.html[lang]) }} />
        </article>

        <aside className="space-y-6">
          {relatedProducts.length > 0 ? (
            <div className="border border-line bg-panel p-6">
              <h2 className="text-xl font-bold">{pick(copy.relatedProducts, lang)}</h2>
              <div className="mt-5 grid gap-3">
                {relatedProducts.map((item) => (
                    <Link key={item.model} href={localizedPath(lang, `/products/${productSlug(item.model)}`)} className="group flex items-center gap-4 border border-line p-3 hover:border-accent">
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
            <h2 className="text-xl font-bold">{pick(copy.relatedNotes, lang)}</h2>
            <div className="mt-5 grid gap-3">
              {relatedArticles.map((item) => (
                <Link key={item.slug} href={localizedPath(lang, `/applications/${item.slug}`)} className="block border border-line p-4 hover:border-accent">
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
  const copy = ui.pages.downloads;
  return (
    <PageShell lang={lang}>
      <PageJsonLd lang={lang} page="downloads" />
      <PageTitle
        eyebrow={pick(copy.eyebrow, lang)}
        title={pick(copy.title, lang)}
        text={pick(copy.text, lang)}
      />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="overflow-hidden border border-line bg-panel">
          <div className="grid grid-cols-[1fr_90px_120px_120px] bg-panel-muted px-5 py-3 text-sm font-bold text-copy-muted max-md:hidden">
            <span>{pick(copy.columns.file, lang)}</span>
            <span>{pick(copy.columns.type, lang)}</span>
            <span>{pick(copy.columns.size, lang)}</span>
            <span>{pick(copy.columns.date, lang)}</span>
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
  const copy = ui.pages.contact;
  return (
    <PageShell lang={lang}>
      <JsonLd data={[organizationJsonLd(), breadcrumbJsonLd(lang, "contact")]} />
      <PageTitle
        eyebrow={pick(copy.eyebrow, lang)}
        title={pick(copy.title, lang)}
        text={pick(copy.text, lang)}
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-2">
        <div className="border border-line bg-panel p-8">
          <h2 className="text-2xl font-bold">{pick(copy.companyName, lang)}</h2>
          <div className="mt-6 space-y-4 leading-7 text-copy-muted">
            <p>{pick(copy.address, lang)}</p>
            <p>{pick(copy.phone, lang)}</p>
            <p>{pick(copy.fax, lang)}</p>
            <p>
              {pick(copy.emailLabel, lang)}
              <a href={`mailto:${contactEmail}`} className="font-semibold text-accent hover:text-accent-strong">
                {contactEmail}
              </a>
            </p>
          </div>
        </div>
        <div className="border border-line bg-panel-muted p-8">
          <h2 className="text-2xl font-bold">{pick(copy.supportTitle, lang)}</h2>
          <p className="mt-4 leading-7 text-copy-muted">
            {pick(copy.supportText, lang)}
          </p>
          <Link href={localizedPath(lang, "/downloads")} className="mt-6 inline-flex bg-action px-5 py-3 text-sm font-semibold text-action-contrast hover:bg-action-strong">
            {pick(copy.goDownloads, lang)}
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
