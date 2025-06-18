import Breadcrumbs from "@/components/blocks/breadcrumbs";
import SectionContainer from "@/components/layout/section-container";
import { ProductGallery } from "@/components/shared/product";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/sanity/queries/product";
import Image from "next/image";
import Link from "next/link";

export interface Props {
    slug: string,
    id?: number
}

export const generateMetadata = async ({ params }: { params: Promise<Props> }) => {
    const { slug } = await params;
    const product: any = await getProductBySlug({ slug });

    const url = `https://bouquet4event.ru/products/${slug}`;

    return {
        title: product?.seo?.metaTitle || product.name,
        description: product?.seo?.metaDescription,

        openGraph: {
            title: `${product?.seo?.metaTitle || product.name}`,
            description: `${product?.seo?.metaDescription}`,
            type: 'website',
            locale: 'ru',
            siteName: 'Bouquet4Event',
            url: `https://bouquet4event.ru/products/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product?.seo?.metaTitle || product.name}`,
            description: `${product?.seo?.metaDescription}`,
            creator: '@Bouquet4Event',
            site: '@Bouquet4Event',
            url: `https://bouquet4event.ru/products/${slug}`,
        },
        alternates: {
            canonical: url,
        },
    }
}

export default async function ProductPage({ params }: { params: Promise<Props> }) {
    const { slug } = await params;
    const [product] = await Promise.all([
        getProductBySlug({ slug }),
    ]);

    if (!product) return (
        <SectionContainer>
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
                <h2 className="text-2xl font-medium text-gray-600">Товар не найден</h2>
                <p className="text-gray-500">Товар, который вы ищете, не существует или был удален.</p>
                <Button asChild>
                    <Link href="/">Вернуться на главную</Link>
                </Button>
            </div>
        </SectionContainer>
    )

    return (
        <>
            <Breadcrumbs
                _type="breadcrumbs"
                _key={product._id}
                padding={null}
                colorVariant={`background`}
                hideCurrent={true}
                crumbs={[{
                    _id: product._id,
                    title: product.name,
                    slug: {
                        _type: 'slug',
                        current: product.slug
                    }
                }]} />
            <SectionContainer>
                <h1 className="mb-8">{product.name}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="col-span-1">
                        <ProductGallery images={product.gallery} productName={product.name} />
                    </div>
                </div>
            </SectionContainer>
        </>
    )
}
