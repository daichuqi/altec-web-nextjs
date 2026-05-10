import { AboutPage } from "@/components/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("about", "zh");

export default function Page() {
  return <AboutPage lang="zh" />;
}
