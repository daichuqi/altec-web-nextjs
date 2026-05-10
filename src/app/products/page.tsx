import { ProductsPage } from "@/components/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("products", "zh");

export default function Page() {
  return <ProductsPage lang="zh" />;
}
