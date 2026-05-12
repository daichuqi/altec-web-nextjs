import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplicationDetailPage } from "@/components/pages";
import { applicationArticles, getApplicationBySlug } from "@/lib/application-data";
import { applicationArticleMetadata } from "@/lib/seo";

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

  return applicationArticleMetadata(article, "en");
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getApplicationBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ApplicationDetailPage lang="en" slug={article.slug} />;
}
