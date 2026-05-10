import { ContactPage } from "@/components/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("contact", "zh");

export default function Page() {
  return <ContactPage lang="zh" />;
}
