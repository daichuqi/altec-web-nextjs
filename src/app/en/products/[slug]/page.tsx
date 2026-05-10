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
  const title = `${product.model} ${product.en} | ALTEC Product Details`;
  const description = detail?.overview.en ?? `${product.model} ${product.en} details and local downloads.`;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath("en", path),
      languages: {
        "zh-CN": localizedPath("zh", path),
        "en-US": localizedPath("en", path),
        "x-default": localizedPath("zh", path),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath("en", path)),
      siteName: "ALTEC Industrial Control",
      locale: "en_US",
      type: "website",
      images: [{ url: product.image, alt: `${product.model} ${product.en}` }],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage lang="en" model={product.model} />;
}
