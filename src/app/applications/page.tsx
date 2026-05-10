import { ApplicationsPage } from "@/components/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("applications", "zh");

export default function Page() {
  return <ApplicationsPage lang="zh" />;
}
