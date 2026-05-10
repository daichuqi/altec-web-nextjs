import { ProductsPage } from "@/components/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("products", "en");

export default function Page() {
  return <ProductsPage lang="en" />;
}
