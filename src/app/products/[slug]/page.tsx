import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/pages";
import { getProductBySlug, productDetails, productSlug, products } from "@/lib/site-data";
import { absoluteUrl, localizedPath } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: productSlug(product.model),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const detail = productDetails[product.model];
  const path = `/products/${productSlug(product.model)}`;
  const title = `${product.model} ${product.zh} | ALTEC 亚特克产品详情`;
  const description = detail?.overview.zh ?? `${product.model} ${product.zh} 产品详情和本地下载资料。`;

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
      type: "website",
      images: [{ url: product.image, alt: `${product.model} ${product.zh}` }],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage lang="zh" model={product.model} />;
}
