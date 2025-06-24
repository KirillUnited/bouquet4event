import Blocks from "@/components/blocks";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbListJsonLd } from "@/lib/jsonLd";

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams();

  return pages.map((page) => ({
    slug: page.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: params.slug });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  const jsonLd = getBreadcrumbListJsonLd(page?.meta_title, params.slug);
  
  return (
    <>
      <Blocks blocks={page?.blocks ?? []} />
      
      <JsonLd data={jsonLd} />
    </>
  );
}
