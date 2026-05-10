import { DownloadsPage } from "@/components/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("downloads", "en");

export default function Page() {
  return <DownloadsPage lang="en" />;
}
