import { rewriteHtmlAssetLinks } from "@/lib/cdn-assets";

type RichHtmlProps = {
  html: string;
  variant?: "product" | "application";
};

export function RichHtml({ html, variant = "product" }: RichHtmlProps) {
  const className =
    variant === "application"
      ? "product-rich-detail application-rich-detail px-6 py-7"
      : "product-rich-detail px-6 py-7";

  return <div className={className} dangerouslySetInnerHTML={{ __html: rewriteHtmlAssetLinks(html) }} />;
}
