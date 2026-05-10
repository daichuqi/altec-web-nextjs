import { GalleryPage } from "@/components/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("gallery", "en");

export default function Page() {
  return <GalleryPage lang="en" />;
}
