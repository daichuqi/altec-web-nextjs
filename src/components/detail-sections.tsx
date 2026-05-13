import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { ImagePreview } from "@/components/image-preview";
import { OptimizedImage } from "@/components/optimized-image";
import { RichHtml } from "@/components/rich-html";
import { assetUrl } from "@/lib/cdn-assets";
import { localizedPath, type Lang } from "@/lib/i18n";
import type { StructuredProductDetail, StructuredProductDetailSection } from "@/lib/product-structured-details";
import { productDisplayName, productSlug, type Product, type ProductDetail, type ProductSelectionGuide } from "@/lib/site-data";

type DetailCta = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type DetailHeroProps = {
  lang: Lang;
  backHref: string;
  backLabel: string;
  eyebrow?: string;
  title: string;
  titleClassName?: string;
  subtitle?: string;
  text: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
  imageSizes?: string;
  imageAspectClassName?: string;
  ctas?: DetailCta[];
  notice?: string;
  tags?: string[];
  enableImagePreview?: boolean;
};

function ctaClassName(variant: DetailCta["variant"]) {
  if (variant === "secondary") {
    return "border border-line-strong px-5 py-3 text-sm font-semibold text-copy hover:border-line-strong";
  }

  return "bg-action px-5 py-3 text-sm font-semibold text-action-contrast hover:bg-action-strong";
}

export function DetailHero({
  lang,
  backHref,
  backLabel,
  eyebrow,
  title,
  titleClassName = "mt-4 max-w-3xl text-4xl font-bold tracking-tight text-heading sm:text-6xl",
  subtitle,
  text,
  image,
  imageAlt,
  imageClassName = "object-contain p-2 sm:p-4",
  imageSizes = "(min-width: 1024px) 48vw, 100vw",
  imageAspectClassName = "aspect-[4/3]",
  ctas = [],
  notice,
  tags = [],
  enableImagePreview,
}: DetailHeroProps) {
  return (
    <section className="border-b border-line bg-panel">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {enableImagePreview ? (
          <ImagePreview
            lang={lang}
            src={image}
            alt={imageAlt}
            className={imageClassName}
            sizes={imageSizes}
            aspectClassName={imageAspectClassName}
            priority
          />
        ) : (
          <div className={`relative border border-line bg-panel-muted ${imageAspectClassName}`}>
            <OptimizedImage src={image} alt={imageAlt} fill className={imageClassName} sizes={imageSizes} priority />
          </div>
        )}
        <div>
          <Link href={localizedPath(lang, backHref)} className="text-sm font-bold text-accent hover:text-accent-strong">
            {backLabel}
          </Link>
          {eyebrow ? <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-copy-subtle">{eyebrow}</p> : null}
          <h1 className={titleClassName}>{title}</h1>
          {subtitle ? <p className="mt-4 text-2xl font-semibold text-copy">{subtitle}</p> : null}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-copy-muted">{text}</p>
          {tags.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="bg-panel-muted px-3 py-1.5 text-sm font-bold text-copy">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {notice ? (
            <div className="mt-6 border border-line bg-panel-muted px-4 py-3 text-sm font-semibold leading-6 text-copy-muted">
              {notice}
            </div>
          ) : null}
          {ctas.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {ctas.map((cta) => (
                <Link key={cta.href} href={localizedPath(lang, cta.href)} className={ctaClassName(cta.variant)}>
                  {cta.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function HighlightPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <aside className="border border-line bg-panel p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 bg-panel-muted px-4 py-3 text-sm font-semibold leading-6 text-copy">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-action" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function SpecsPanel({
  lang,
  title,
  specs,
}: {
  lang: Lang;
  title: string;
  specs: ProductDetail["specs"];
}) {
  return (
    <article className="border border-line bg-panel">
      <div className="border-b border-line px-6 py-5">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <dl className="divide-y divide-line">
        {specs.map((spec) => (
          <div key={spec.label.en} className="grid gap-2 px-6 py-4 sm:grid-cols-[180px_1fr]">
            <dt className="font-bold text-heading">{spec.label[lang]}</dt>
            <dd className="leading-7 text-copy-muted">{spec.value[lang]}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

type BuyingFieldLabels = {
  model: string;
  productType: string;
  applications: string;
  input: string;
  output: string;
  control: string;
  documents: string;
  inquiry: string;
};

function BuyingField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-line px-5 py-4">
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-copy-subtle">{label}</dt>
      <dd className="mt-2 text-sm font-semibold leading-6 text-copy">{children}</dd>
    </div>
  );
}

export function PurchasingFitPanel({
  lang,
  title,
  text,
  labels,
  product,
  guide,
  manualLabel,
  quoteLabel,
  engineerLabel,
  hasDownloads,
  inquiryHref,
}: {
  lang: Lang;
  title: string;
  text: string;
  labels: BuyingFieldLabels;
  product: Product;
  guide: ProductSelectionGuide;
  manualLabel: string;
  quoteLabel: string;
  engineerLabel: string;
  hasDownloads: boolean;
  inquiryHref: string;
}) {
  const displayModel = productDisplayName(product);

  return (
    <aside className="border border-line bg-panel">
      <div className="border-b border-line px-5 py-5">
        <h2 className="text-2xl font-bold text-heading">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-copy-muted">{text}</p>
      </div>
      <dl>
        <BuyingField label={labels.model}>{displayModel}</BuyingField>
        <BuyingField label={labels.productType}>{guide.productType[lang]}</BuyingField>
        <BuyingField label={labels.applications}>
          <ul className="grid gap-1.5">
            {guide.applications.map((application) => (
              <li key={application.en}>{application[lang]}</li>
            ))}
          </ul>
        </BuyingField>
        <BuyingField label={labels.input}>{guide.input[lang]}</BuyingField>
        <BuyingField label={labels.output}>{guide.output[lang]}</BuyingField>
        <BuyingField label={labels.control}>{guide.control[lang]}</BuyingField>
        <BuyingField label={labels.documents}>{manualLabel}</BuyingField>
      </dl>
      <div className="grid gap-3 border-t border-line p-5 sm:grid-cols-2">
        <a
          href={inquiryHref}
          className="inline-flex items-center justify-center gap-2 bg-action px-4 py-3 text-sm font-bold text-action-contrast hover:bg-action-strong"
        >
          <Mail size={16} />
          {quoteLabel}
        </a>
        <Link
          href={localizedPath(lang, hasDownloads ? "/downloads" : "/contact")}
          className="inline-flex items-center justify-center border border-line-strong px-4 py-3 text-sm font-bold text-copy hover:border-line-strong"
        >
          {engineerLabel}
        </Link>
      </div>
    </aside>
  );
}

export function RichDetailPanel({
  eyebrow,
  title,
  html,
  variant = "product",
}: {
  eyebrow: string;
  title: string;
  html: string;
  variant?: "product" | "application";
}) {
  return (
    <div className="border border-line bg-panel">
      <div className="border-b border-line px-6 py-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold">{title}</h2>
      </div>
      <RichHtml html={html} variant={variant} />
    </div>
  );
}

function SectionDescription({ section, lang }: { section: Extract<StructuredProductDetailSection, { description?: unknown }>; lang: Lang }) {
  if (!section.description) {
    return null;
  }

  return <p className="mt-2 max-w-3xl text-sm leading-6 text-copy-muted">{section.description[lang]}</p>;
}

function StructuredTableSection({
  section,
  lang,
}: {
  section: Extract<StructuredProductDetailSection, { kind: "table" }>;
  lang: Lang;
}) {
  return (
    <section id={section.id} className="border-t border-line px-6 py-6 first:border-t-0">
      <h3 className="text-xl font-bold text-heading">{section.title[lang]}</h3>
      <SectionDescription section={section} lang={lang} />
      <div className="mt-5 overflow-hidden border border-line">
        <div className="grid grid-cols-[minmax(110px,0.36fr)_1fr] bg-panel-muted text-sm font-bold text-copy">
          <span className="border-r border-line px-4 py-3">{section.columns[0][lang]}</span>
          <span className="px-4 py-3">{section.columns[1][lang]}</span>
        </div>
        <dl className="divide-y divide-line">
          {section.rows.map((row) => (
            <div key={row.label.en} className="grid grid-cols-[minmax(110px,0.36fr)_1fr] text-sm leading-6">
              <dt className="border-r border-line px-4 py-3 font-semibold text-heading">{row.label[lang]}</dt>
              <dd className="px-4 py-3 text-copy-muted">{row.value[lang]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function StructuredImageSection({
  section,
  lang,
}: {
  section: Extract<StructuredProductDetailSection, { kind: "images" }>;
  lang: Lang;
}) {
  return (
    <section id={section.id} className="border-t border-line px-6 py-6 first:border-t-0">
      <h3 className="text-xl font-bold text-heading">{section.title[lang]}</h3>
      <SectionDescription section={section} lang={lang} />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {section.images.map((image) => (
          <figure key={image.src} className="border border-line bg-panel-muted p-4">
            <div className="relative aspect-[4/3] bg-panel">
              <OptimizedImage src={image.src} alt={image.alt[lang]} fill className="object-contain p-3" sizes="(min-width: 1024px) 520px, 90vw" />
            </div>
            <figcaption className="mt-3 text-sm font-semibold text-copy">{image.caption[lang]}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function StructuredDocumentsSection({
  section,
  lang,
}: {
  section: Extract<StructuredProductDetailSection, { kind: "documents" }>;
  lang: Lang;
}) {
  return (
    <section id={section.id} className="border-t border-line px-6 py-6 first:border-t-0">
      <h3 className="text-xl font-bold text-heading">{section.title[lang]}</h3>
      <SectionDescription section={section} lang={lang} />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {section.documents.map((document) => (
          <a
            key={document.href}
            href={assetUrl(document.href)}
            target="_blank"
            rel="noopener noreferrer"
            className="download-row flex items-center justify-between gap-4 border border-line px-4 py-3 hover:border-accent hover:text-accent"
          >
            <span className="flex items-center gap-3 font-semibold">
              <FileText size={18} className="shrink-0 text-accent" />
              {document.title[lang]}
            </span>
            <span className="shrink-0 text-xs font-bold text-copy-subtle">{document.type}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function StructuredDetailSection({ section, lang }: { section: StructuredProductDetailSection; lang: Lang }) {
  if (section.kind === "intro") {
    return (
      <section className="px-6 py-6">
        <h3 className="text-xl font-bold text-heading">{section.title[lang]}</h3>
        <div className="mt-4 grid gap-3 text-sm leading-7 text-copy-muted">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.en}>{paragraph[lang]}</p>
          ))}
        </div>
        {section.anchors ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {section.anchors.map((anchor) => (
              <a key={anchor.id} href={`#${anchor.id}`} className="border border-line bg-panel-muted px-3 py-2 text-xs font-bold text-copy hover:border-accent hover:text-accent">
                {anchor.label[lang]}
              </a>
            ))}
          </div>
        ) : null}
      </section>
    );
  }

  if (section.kind === "table") {
    return <StructuredTableSection section={section} lang={lang} />;
  }

  if (section.kind === "images") {
    return <StructuredImageSection section={section} lang={lang} />;
  }

  return <StructuredDocumentsSection section={section} lang={lang} />;
}

export function StructuredProductDetailPanel({
  lang,
  eyebrow,
  title,
  detail,
}: {
  lang: Lang;
  eyebrow: string;
  title: string;
  detail: StructuredProductDetail;
}) {
  return (
    <div className="border border-line bg-panel">
      <div className="border-b border-line px-6 py-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold">{title}</h2>
      </div>
      {detail.sections.map((section, index) => (
        <StructuredDetailSection key={`${section.kind}-${"id" in section ? section.id : index}`} section={section} lang={lang} />
      ))}
    </div>
  );
}

type DownloadItem = {
  title: string;
  file: string;
  href: string;
  type: string;
};

export function DownloadListPanel({
  title,
  items,
  emptyText,
  headingClassName = "text-2xl font-bold",
}: {
  title: string;
  items: DownloadItem[];
  emptyText?: string;
  headingClassName?: string;
}) {
  return (
    <div className="border border-line bg-panel p-6">
      <h2 className={headingClassName}>{title}</h2>
      <div className="mt-5 divide-y divide-line">
        {items.length > 0 ? (
          items.map((item) => (
            <a
              key={item.file}
              href={assetUrl(item.href)}
              target="_blank"
              rel="noopener noreferrer"
              className="download-row flex items-center justify-between gap-4 px-3 py-4 hover:bg-panel-muted hover:text-accent"
            >
              <span className="flex items-center gap-3 font-semibold">
                <FileText size={18} className="shrink-0 text-accent" />
                {item.title}
              </span>
              <span className="shrink-0 text-sm text-copy-subtle">{item.type}</span>
            </a>
          ))
        ) : (
          <p className="py-4 text-sm leading-6 text-copy-muted">{emptyText}</p>
        )}
      </div>
    </div>
  );
}

export function CompactProductLink({ lang, product }: { lang: Lang; product: Product }) {
  const displayModel = productDisplayName(product);

  return (
    <Link key={product.model} href={localizedPath(lang, `/products/${productSlug(product.model)}`)} className="group flex items-center gap-4 border border-line p-3 hover:border-accent">
      <div className="relative h-16 w-16 shrink-0 bg-panel-muted">
        <OptimizedImage src={product.image} alt={displayModel} fill className="object-contain p-2" sizes="64px" />
      </div>
      <div>
        <p className="font-bold text-heading group-hover:text-accent">{displayModel}</p>
        <p className="text-sm leading-5 text-copy-muted">{product[lang]}</p>
      </div>
    </Link>
  );
}

export function RelatedProductsPanel({
  lang,
  title,
  products,
  columns = "sm:grid-cols-2",
  headingClassName = "text-2xl font-bold",
}: {
  lang: Lang;
  title: string;
  products: Product[];
  columns?: string;
  headingClassName?: string;
}) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="border border-line bg-panel p-6">
      <h2 className={headingClassName}>{title}</h2>
      <div className={`mt-5 grid gap-3 ${columns}`}>
        {products.map((product) => (
          <CompactProductLink key={product.model} lang={lang} product={product} />
        ))}
      </div>
    </div>
  );
}

type RelatedArticle = {
  slug: string;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
};

export function RelatedArticlesPanel({
  lang,
  title,
  articles,
}: {
  lang: Lang;
  title: string;
  articles: RelatedArticle[];
}) {
  return (
    <div className="border border-line bg-panel p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-5 grid gap-3">
        {articles.map((article) => (
          <Link key={article.slug} href={localizedPath(lang, `/applications/${article.slug}`)} className="block border border-line p-4 hover:border-accent">
            <p className="font-bold text-heading">{article.title[lang]}</p>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-copy-muted">{article.excerpt[lang]}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ApplicationListCard({
  lang,
  article,
  readDetailsLabel,
}: {
  lang: Lang;
  article: RelatedArticle & {
    image: string;
    related: string[];
  };
  readDetailsLabel: string;
}) {
  return (
    <Link
      href={localizedPath(lang, `/applications/${article.slug}`)}
      className="group grid gap-5 border border-line bg-panel p-4 hover:border-accent sm:grid-cols-[210px_1fr]"
    >
      <div className="relative aspect-[1.25] overflow-hidden bg-panel-muted">
        <OptimizedImage src={article.image} alt={article.title[lang]} fill className="object-contain" sizes="220px" />
        <span className="pointer-events-none absolute inset-0 bg-heading/[0.08] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
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
          {readDetailsLabel}
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
