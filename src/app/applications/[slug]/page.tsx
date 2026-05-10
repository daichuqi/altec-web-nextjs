import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplicationDetailPage } from "@/components/pages";
import { applicationArticles, getApplicationBySlug } from "@/lib/application-data";
import { absoluteUrl, localizedPath } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return applicationArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getApplicationBySlug(slug);

  if (!article) {
    return {};
  }

  const path = `/applications/${article.slug}`;
  const title = `${article.title.zh} | ALTEC 亚特克应用方案`;
  const description = article.excerpt.zh;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath("zh", path),
      languages: {
        "zh-CN": localizedPath("zh", path),
        "en-US": localizedPath("en", path),
        "x-default": localizedPath("zh", path),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath("zh", path)),
      siteName: "ALTEC 亚特克",
      locale: "zh_CN",
      type: "article",
      images: [{ url: article.image, alt: article.title.zh }],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getApplicationBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ApplicationDetailPage lang="zh" slug={article.slug} />;
}
