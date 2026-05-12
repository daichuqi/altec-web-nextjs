import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { LanguageSwitch } from "@/components/language-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { brandLogo } from "@/lib/assets";
import { contactEmail } from "@/lib/site-data";
import { languages, localizedPath, navItems, pick, ui, type Lang } from "@/lib/i18n";

export function SiteHeader({ lang }: { lang: Lang }) {
  return (
    <header className="border-b border-line bg-panel">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href={localizedPath(lang, "/")} className="flex items-center py-1" aria-label="ALTEC">
          <Image
            src={brandLogo}
            alt="ALTEC"
            width={154}
            height={38}
            className="h-9 w-auto"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-copy-muted lg:flex">
          {navItems.map((item) => (
            <Link key={item.key} href={localizedPath(lang, item.href)} className="hover:text-heading">
              {pick(item.label, lang)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle lang={lang} />
          <LanguageSwitch lang={lang} />
          <Link
            href={localizedPath(lang, "/contact")}
            className="hidden bg-action px-4 py-2 text-sm font-semibold text-action-contrast hover:bg-action-strong sm:inline-flex"
          >
            {pick(ui.header.contactSales, lang)}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-line bg-panel-contrast text-copy-inverse">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_1.2fr]">
        <div>
          <Image src={brandLogo} alt="ALTEC" width={154} height={38} className="h-7 w-auto" />
          <p className="mt-3 max-w-md text-sm leading-6 text-copy-inverse-muted">
            {pick(ui.footer.summary, lang)}
          </p>
        </div>
        <div className="grid gap-3 text-sm text-copy-inverse-muted">
          <p className="flex gap-3">
            <MapPin size={17} className="mt-0.5 shrink-0 text-accent" />
            {pick(ui.footer.address, lang)}
          </p>
          <p className="flex gap-3">
            <Phone size={17} className="mt-0.5 shrink-0 text-accent" />
            0755-26409070 / 26416767
          </p>
          <p className="flex items-center gap-3">
            <Mail size={17} className="shrink-0 text-accent" />
            <a href={`mailto:${contactEmail}`} className="hover:text-action-contrast">
              {contactEmail}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-line-inverse px-5 py-4 text-xs text-copy-inverse-muted sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 md:flex-row">
          <span>Copyright © 深圳市亚特克电子有限公司</span>
          <a href="https://beian.miit.gov.cn/" className="hover:text-copy-inverse">粤ICP备13003237号</a>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <div lang={languages[lang].htmlLang} className="min-h-screen bg-canvas text-heading">
      <SiteHeader lang={lang} />
      <main>{children}</main>
      <SiteFooter lang={lang} />
    </div>
  );
}

export function PageTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="border-b border-line bg-panel">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-heading sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-copy-muted">{text}</p>
      </div>
    </section>
  );
}
