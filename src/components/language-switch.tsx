"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { languages, switchLocalePath, type Lang } from "@/lib/i18n";

export function LanguageSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const target = switchLocalePath(lang, pathname);

  return (
    <Link
      href={target}
      className="inline-flex h-9 items-center border border-line-strong px-3 text-sm font-semibold text-copy hover:border-line-strong hover:text-heading"
    >
      {languages[lang].switchLabel}
    </Link>
  );
}
