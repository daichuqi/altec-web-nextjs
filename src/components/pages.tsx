import Link from "next/link";
import { ArrowRight, Download, FileText, Layers, Wrench, type LucideIcon } from "lucide-react";
import { applicationArticles, applicationCategories, getApplicationBySlug } from "@/lib/application-data";
import { getProductRichDetailHtml, productRichDetails } from "@/lib/product-rich-details";
import { productStructuredDetails } from "@/lib/product-structured-details";
import {
  aboutContent,
  activeProducts,
  contactBusinessHours,
  contactEmail,
  downloads,
  productCategories,
  productDetails,
  productDisplayName,
  productSelectionGuides,
  productSlug,
  products,
  type DownloadCategory,
} from "@/lib/site-data";
import {
  ApplicationListCard,
  DetailHero,
  DownloadListPanel,
  HighlightPanel,
  PurchasingFitPanel,
  RelatedArticlesPanel,
  RelatedProductsPanel,
  RichDetailPanel,
  SpecsPanel,
  StructuredProductDetailPanel,
} from "@/components/detail-sections";
import { ProductBrowser } from "@/components/product-browser";
import { OptimizedImage } from "@/components/optimized-image";
import { assetUrl } from "@/lib/cdn-assets";
import { localizedPath, pick, ui, type Lang } from "@/lib/i18n";
import {
  applicationArticleJsonLd,
  applicationDetailBreadcrumbJsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
  productDetailBreadcrumbJsonLd,
  productJsonLd,
  productListJsonLd,
  productWebPageJsonLd,
  pageWebPageJsonLd,
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
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(lang), pageWebPageJsonLd(lang, "home"), breadcrumbJsonLd(lang, "home")]} />
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
                    <OptimizedImage src={item.image} alt={`${productDisplayName(item)} ${item[lang]}`} fill className="object-cover" sizes="(min-width: 1280px) 260px, (min-width: 640px) 45vw, 90vw" />
                    <span className="pointer-events-none absolute inset-0 bg-heading/[0.08] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-bold text-heading group-hover:text-accent">{productDisplayName(item)}</p>
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
      <section className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="border-t-4 border-accent bg-panel py-6 lg:sticky lg:top-24">
          <div className="border-b border-line px-5 pb-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">ALTEC</p>
            <h2 className="mt-2 text-xl font-bold text-heading">{pick(copy.highlights, lang)}</h2>
          </div>
          <div className="divide-y divide-line">
            {content.highlights.map((item) => (
              <div key={item} className="flex gap-3 px-5 py-4 text-sm font-semibold leading-6 text-copy">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-action" />
                <span>{item}</span>
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
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(lang), pageWebPageJsonLd(lang, "products"), breadcrumbJsonLd(lang, "products"), productListJsonLd(lang)]} />
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

const downloadCategoryOrder: DownloadCategory[] = ["manual", "datasheet", "software", "wiring", "selection"];

export function ProductDetailPage({ lang, model }: { lang: Lang; model: string }) {
  const copy = ui.product;
  const product = products.find((item) => item.model === model);
  const detail = product ? productDetails[product.model] : undefined;

  if (!product || !detail) {
    return null;
  }

  const category = productCategories.find((item) => item.items.includes(product.model));
  const isArchived = product.status === "archived";
  const structuredDetail = productStructuredDetails[product.model];
  const richDetail = productRichDetails[product.model];
  const richDetailHtml = structuredDetail ? undefined : getProductRichDetailHtml(richDetail, lang);
  const displayModel = productDisplayName(product);
  const selectionGuide = productSelectionGuides[product.model];
  const relatedProducts = activeProducts.filter((item) => item.category === product.category && item.model !== product.model).slice(0, 4);
  const productToken = normalizeToken(product.model);
  const relatedDownloads = downloads
    .filter((item) => normalizeToken(`${item.title} ${item.file}`).includes(productToken))
    .slice(0, 6);
  const inquirySubject = encodeURIComponent(`${displayModel} ${product[lang]} inquiry`);
  const inquiryHref = `mailto:${contactEmail}?subject=${inquirySubject}`;

  return (
    <PageShell lang={lang}>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(lang), productWebPageJsonLd(lang, product), productJsonLd(lang, product.model), productDetailBreadcrumbJsonLd(lang, product)]} />
      <DetailHero
        lang={lang}
        backHref="/products"
        backLabel={pick(copy.back, lang)}
        eyebrow={category?.[lang] ?? product.category}
        title={displayModel}
        subtitle={product[lang]}
        text={detail.overview[lang]}
        image={product.image}
        imageAlt={`${displayModel} ${product[lang]}`}
        enableImagePreview
        notice={isArchived ? pick(copy.archivedNotice, lang) : undefined}
        ctas={[
          { href: "/downloads", label: pick(copy.viewDownloads, lang) },
          { href: "/contact", label: pick(isArchived ? copy.askReplacement : copy.askSelection, lang), variant: "secondary" },
        ]}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        {selectionGuide ? (
          <PurchasingFitPanel
            lang={lang}
            title={pick(copy.buyingInfoTitle, lang)}
            text={pick(copy.buyingInfoText, lang)}
            labels={{
              model: pick(copy.buyingFields.model, lang),
              productType: pick(copy.buyingFields.productType, lang),
              applications: pick(copy.buyingFields.applications, lang),
              input: pick(copy.buyingFields.input, lang),
              output: pick(copy.buyingFields.output, lang),
              control: pick(copy.buyingFields.control, lang),
              documents: pick(copy.buyingFields.documents, lang),
              inquiry: pick(copy.buyingFields.inquiry, lang),
            }}
            product={product}
            guide={selectionGuide}
            manualLabel={pick(relatedDownloads.length > 0 ? copy.manualAvailable : copy.manualCheckRequired, lang)}
            quoteLabel={pick(copy.getQuote, lang)}
            engineerLabel={pick(copy.contactEngineer, lang)}
            hasDownloads={relatedDownloads.length > 0}
            inquiryHref={inquiryHref}
          />
        ) : (
          <HighlightPanel title={pick(copy.highlights, lang)} items={detail.highlights[lang]} />
        )}
        <SpecsPanel lang={lang} title={pick(copy.specs, lang)} specs={detail.specs} />
      </section>

      {selectionGuide ? (
        <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
          <HighlightPanel title={pick(copy.highlights, lang)} items={detail.highlights[lang]} />
        </section>
      ) : null}

      {structuredDetail ? (
        <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
          <StructuredProductDetailPanel
            lang={lang}
            eyebrow={pick(copy.technicalEyebrow, lang)}
            title={pick(copy.technicalDetails, lang)}
            detail={structuredDetail}
          />
        </section>
      ) : richDetailHtml ? (
        <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
          <RichDetailPanel eyebrow={pick(copy.technicalEyebrow, lang)} title={pick(copy.technicalDetails, lang)} html={richDetailHtml} />
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 sm:px-8 lg:grid-cols-2">
        <DownloadListPanel title={pick(copy.relatedDownloads, lang)} items={relatedDownloads} emptyText={pick(copy.noDownloads, lang)} />
        <RelatedProductsPanel lang={lang} title={pick(copy.relatedProducts, lang)} products={relatedProducts} />
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
                  <ApplicationListCard key={article.slug} lang={lang} article={article} readDetailsLabel={pick(copy.readDetails, lang)} />
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
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(lang), applicationArticleJsonLd(lang, article), applicationDetailBreadcrumbJsonLd(lang, article)]} />
      <DetailHero
        lang={lang}
        backHref="/applications"
        backLabel={pick(copy.back, lang)}
        eyebrow={category?.[lang]}
        title={article.title[lang]}
        text={article.excerpt[lang]}
        image={article.image}
        imageAlt={article.title[lang]}
        imageClassName="object-contain p-6"
        imageSizes="(min-width: 1024px) 42vw, 100vw"
        imageAspectClassName="aspect-[1.2]"
        titleClassName="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-heading sm:text-5xl"
        tags={article.related}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <RichDetailPanel eyebrow={pick(copy.technicalNote, lang)} title={pick(copy.details, lang)} html={article.html[lang]} variant="application" />

        <aside className="space-y-6">
          <RelatedProductsPanel lang={lang} title={pick(copy.relatedProducts, lang)} products={relatedProducts} columns="" headingClassName="text-xl font-bold" />
          <RelatedArticlesPanel lang={lang} title={pick(copy.relatedNotes, lang)} articles={relatedArticles} />
        </aside>
      </section>
    </PageShell>
  );
}

export function DownloadsPage({ lang }: { lang: Lang }) {
  const copy = ui.pages.downloads;
  const groupedDownloads = downloadCategoryOrder.map((category) => ({
    category,
    items: downloads.filter((item) => item.category === category),
  }));

  return (
    <PageShell lang={lang}>
      <PageJsonLd lang={lang} page="downloads" />
      <PageTitle
        eyebrow={pick(copy.eyebrow, lang)}
        title={pick(copy.title, lang)}
        text={pick(copy.text, lang)}
      />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid gap-8">
          {groupedDownloads.map(({ category, items }) => (
            <section key={category} className="overflow-hidden border border-line bg-panel">
              <div className="border-b border-line bg-panel-muted px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{pick(copy.groupedTitle, lang)}</p>
                <h2 className="mt-1 text-xl font-bold text-heading">{pick(copy.categories[category], lang)}</h2>
              </div>
              <div className="grid grid-cols-[1fr_90px_120px_120px] bg-canvas px-5 py-3 text-sm font-bold text-copy-muted max-md:hidden">
                <span>{pick(copy.columns.file, lang)}</span>
                <span>{pick(copy.columns.type, lang)}</span>
                <span>{pick(copy.columns.size, lang)}</span>
                <span>{pick(copy.columns.date, lang)}</span>
              </div>
              {items.length > 0 ? (
                items.map((item) => (
                  <a
                    key={item.file}
                    href={assetUrl(item.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-row grid gap-3 border-t border-line px-5 py-4 hover:bg-panel-muted md:grid-cols-[1fr_90px_120px_120px] md:items-center"
                  >
                    <span className="flex items-center gap-3 font-semibold text-heading">
                      <FileText size={18} className="text-accent" />
                      {item.title}
                    </span>
                    <span className="text-sm text-copy-muted">{item.type}</span>
                    <span className="text-sm text-copy-muted">{item.size}</span>
                    <span className="text-sm text-copy-muted">{item.date}</span>
                  </a>
                ))
              ) : (
                <p className="border-t border-line px-5 py-5 text-sm leading-6 text-copy-muted">{pick(copy.emptyGroup, lang)}</p>
              )}
            </section>
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
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(lang), breadcrumbJsonLd(lang, "contact")]} />
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
            <p>{pick(copy.mobile, lang)}</p>
            <p>{pick(copy.fax, lang)}</p>
            <p>
              {pick(copy.hoursLabel, lang)}
              {pick(contactBusinessHours, lang)}
            </p>
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
          <div className="mt-6 border-t border-line pt-5">
            <h3 className="text-lg font-bold text-heading">{pick(copy.internationalTitle, lang)}</h3>
            <p className="mt-3 text-sm leading-6 text-copy-muted">{pick(copy.internationalText, lang)}</p>
          </div>
          <Link href={localizedPath(lang, "/downloads")} className="mt-6 inline-flex bg-action px-5 py-3 text-sm font-semibold text-action-contrast hover:bg-action-strong">
            {pick(copy.goDownloads, lang)}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function PageJsonLd({ lang, page }: { lang: Lang; page: SeoPageKey }) {
  return <JsonLd data={[organizationJsonLd(), websiteJsonLd(lang), pageWebPageJsonLd(lang, page), breadcrumbJsonLd(lang, page)]} />;
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
