import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, FileText, Grid2X2, Layers, Wrench, type LucideIcon } from "lucide-react";
import { aboutContent, applications, downloads, productCategories, products, type Lang } from "@/lib/site-data";
import { PageShell, PageTitle } from "@/components/site-layout";

function path(lang: Lang, href: string) {
  return `${lang === "en" ? "/en" : ""}${href === "/" ? "" : href}` || "/";
}

export function HomePage({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  return (
    <PageShell lang={lang}>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
              {zh ? "工业自动化过程控制仪表" : "Industrial Process Controllers"}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              {zh ? "面向产线的可靠测控产品与资料中心" : "Reliable control products and documentation for production lines"}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {zh
                ? "亚特克产品覆盖温度、湿度、压力、张力、卷绕、pH/ORP 与恒压供水。本站按工业采购和工程选型习惯重构，分页面呈现产品、应用、图库和本地下载资料。"
                : "ALTEC covers temperature, humidity, pressure, tension, winding, pH/ORP and constant-pressure water control. This site is organized for industrial selection, engineering review and local documentation access."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={path(lang, "/products")} className="bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">
                {zh ? "进入产品中心" : "View products"}
              </Link>
              <Link href={path(lang, "/downloads")} className="border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:border-slate-500">
                {zh ? "下载资料" : "Download documents"}
              </Link>
            </div>
          </div>
          <div className="border border-slate-200 bg-slate-100 p-6">
            <div className="grid grid-cols-2 gap-4">
              {products.slice(1, 5).map((item) => (
                <div key={item.model} className="bg-white p-5">
                  <div className="relative aspect-[1.25]">
                    <Image src={item.image} alt={item.model} fill className="object-contain" sizes="300px" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-950">{item.model}</p>
                  <p className="text-xs text-slate-500">{item[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-px bg-slate-200 sm:grid-cols-3">
        {([
            [Layers, zh ? "17 个产品型号" : "17 product models", zh ? "按过程控制、张力卷绕、环境水处理分类。" : "Grouped by process, tension/winding, environment and water treatment."],
            [Wrench, zh ? "工程选型导向" : "Engineering oriented", zh ? "减少营销长页，保留明确入口和资料。" : "Clear navigation and documentation over long marketing pages."],
            [Download, zh ? "本地资料下载" : "Local downloads", zh ? "PDF/RAR 已迁移到本站，不再跳转旧网站。" : "PDF/RAR files are hosted here without legacy redirects."],
          ] as Array<[LucideIcon, string, string]>).map(([Icon, title, text]) => (
            <div key={String(title)} className="bg-slate-50 p-7">
              <Icon size={28} className="text-blue-700" />
              <h2 className="mt-5 text-xl font-bold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-5">
        {[
          ["/about", zh ? "公司简介" : "About", zh ? "了解亚特克的研发、生产与服务能力。" : "Learn about ALTEC's R&D, production and service capability."],
          ["/products", zh ? "产品中心" : "Products", zh ? "按类别查看控制器产品。" : "Browse controllers by category."],
          ["/applications", zh ? "应用方案" : "Applications", zh ? "查看典型工业场景。" : "Review typical industrial use cases."],
          ["/gallery", zh ? "产品图库" : "Gallery", zh ? "快速浏览全部产品图片。" : "Scan the complete product gallery."],
          ["/downloads", zh ? "下载中心" : "Downloads", zh ? "获取说明书、协议和软件。" : "Get manuals, protocols and software."],
        ].map(([href, title, text]) => (
          <Link key={href} href={path(lang, href)} className="group border border-slate-200 bg-white p-6 hover:border-blue-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{title}</h2>
              <ArrowRight size={18} className="text-slate-400 group-hover:text-blue-700" />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{text}</p>
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
        <aside className="border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold">{zh ? "核心能力" : "Highlights"}</h2>
          <div className="mt-5 grid gap-3">
            {content.highlights.map((item) => (
              <div key={item} className="bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </aside>
        <article className="border border-slate-200 bg-white p-7">
          <div className="space-y-5 text-base leading-8 text-slate-700">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 border-l-4 border-blue-700 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
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
      <PageTitle
        eyebrow={zh ? "Products" : "Products"}
        title={zh ? "产品中心" : "Product Center"}
        text={zh ? "按工业应用类别组织产品，便于工程选型和资料查找。" : "Products are organized by industrial application categories for engineering selection."}
      />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {productCategories.map((category) => (
            <div key={category.en} className="border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold">{category[lang]}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span key={item} className="bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <ProductGrid lang={lang} />
      </section>
    </PageShell>
  );
}

export function GalleryPage({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  return (
    <PageShell lang={lang}>
      <PageTitle
        eyebrow="Gallery"
        title={zh ? "产品图库" : "Products Gallery"}
        text={zh ? "完整产品图集合，适合快速识别型号与外观。" : "A complete product image set for model and appearance review."}
      />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <ProductGrid lang={lang} compact />
      </section>
    </PageShell>
  );
}

export function ApplicationsPage({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  return (
    <PageShell lang={lang}>
      <PageTitle
        eyebrow="Applications"
        title={zh ? "应用方案" : "Applications"}
        text={zh ? "来自原应用资料的典型场景整理，保留工程视角和对应产品。" : "Typical scenarios rebuilt from ALTEC application materials with related products."}
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-2">
        {applications.map((app) => (
          <article key={app.en} className="grid gap-5 border border-slate-200 bg-white p-6 sm:grid-cols-[220px_1fr]">
            <div className="relative aspect-[1.2] bg-slate-100">
              <Image src={app.image} alt={app[lang]} fill className="object-cover" sizes="240px" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-blue-700">{app.related}</p>
              <h2 className="mt-3 text-2xl font-bold">{app[lang]}</h2>
              <p className="mt-4 leading-7 text-slate-600">{zh ? app.zhText : app.enText}</p>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

export function DownloadsPage({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  return (
    <PageShell lang={lang}>
      <PageTitle
        eyebrow="Downloads"
        title={zh ? "下载中心" : "Download Center"}
        text={zh ? "说明书、通讯协议、传感器资料和软件已迁移到本站直接提供，不再跳转旧网站。" : "Manuals, protocols, sensor documents and software are hosted locally by this site. No legacy redirects."}
      />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="overflow-hidden border border-slate-200 bg-white">
          <div className="grid grid-cols-[1fr_90px_120px_120px] bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 max-md:hidden">
            <span>{zh ? "文件" : "File"}</span>
            <span>{zh ? "类型" : "Type"}</span>
            <span>{zh ? "大小" : "Size"}</span>
            <span>{zh ? "日期" : "Date"}</span>
          </div>
          {downloads.map((item) => (
            <a
              key={item.file}
              href={item.href}
              download
              className="grid gap-3 border-t border-slate-200 px-5 py-4 hover:bg-slate-50 md:grid-cols-[1fr_90px_120px_120px] md:items-center"
            >
              <span className="flex items-center gap-3 font-semibold text-slate-950">
                <FileText size={18} className="text-blue-700" />
                {item.title}
              </span>
              <span className="text-sm text-slate-600">{item.type}</span>
              <span className="text-sm text-slate-600">{item.size}</span>
              <span className="text-sm text-slate-600">{item.date}</span>
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
      <PageTitle
        eyebrow="Contact"
        title={zh ? "联系我们" : "Contact Us"}
        text={zh ? "如需产品选型、资料确认或定制仪表，请联系亚特克。" : "Contact ALTEC for product selection, documentation and custom instruments."}
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-2">
        <div className="border border-slate-200 bg-white p-8">
          <h2 className="text-2xl font-bold">{zh ? "深圳市亚特克电子有限公司" : "Shenzhen ALTEC Electronics Co., Ltd."}</h2>
          <div className="mt-6 space-y-4 leading-7 text-slate-600">
            <p>{zh ? "地址：深圳市宝安区航城街道洲石路739号恒丰工业城C6栋502B号" : "Address: Shenzhen, China"}</p>
            <p>{zh ? "电话：0755-26409070 / 26416767 / 13802580359" : "Tel: +86 0755 26409070 / 26416767"}</p>
            <p>{zh ? "传真：0755-26416767" : "Fax: +86 0755 26416767"}</p>
          </div>
        </div>
        <div className="border border-slate-200 bg-slate-100 p-8">
          <h2 className="text-2xl font-bold">{zh ? "资料与支持" : "Documents & Support"}</h2>
          <p className="mt-4 leading-7 text-slate-600">
            {zh
              ? "产品说明书和软件请直接前往下载中心获取，所有可用文件均由本站直接提供。"
              : "Manuals and software are available directly from the Download Center and hosted by this site."}
          </p>
          <Link href={path(lang, "/downloads")} className="mt-6 inline-flex bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">
            {zh ? "前往下载中心" : "Go to downloads"}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function ProductGrid({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  return (
    <div className={`mt-8 grid gap-5 ${compact ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
      {products.map((item) => (
        <article key={item.model} className="border border-slate-200 bg-white p-5">
          <div className="relative aspect-[1.2] bg-slate-100">
            <Image src={item.image} alt={item.model} fill className="object-contain p-5" sizes="(min-width: 1024px) 25vw, 50vw" />
          </div>
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">{item.model}</h2>
              <p className="mt-1 text-sm text-slate-600">{item[lang]}</p>
            </div>
            <Grid2X2 size={18} className="mt-1 shrink-0 text-slate-400" />
          </div>
        </article>
      ))}
    </div>
  );
}
