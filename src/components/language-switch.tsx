"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/site-data";

export function LanguageSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const target =
    lang === "zh"
      ? `/en${pathname === "/" ? "" : pathname}`
      : pathname.replace(/^\/en/, "") || "/";

  return (
    <Link
      href={target}
      className="inline-flex h-9 items-center border border-line-strong px-3 text-sm font-semibold text-copy hover:border-line-strong hover:text-heading"
    >
      {lang === "zh" ? "English" : "中文"}
    </Link>
  );
}
