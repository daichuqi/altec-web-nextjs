import { AboutPage } from "@/components/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("about", "en");

export default function Page() {
  return <AboutPage lang="en" />;
}
