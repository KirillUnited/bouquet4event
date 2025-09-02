import Breadcrumbs from "@/components/blocks/breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SectionContainer from "@/components/layout/section-container";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { CTAButton } from "@/components/shared/buttons";
import { CallBackDialog } from "@/components/shared/dialog";
import { ProductGallery } from "@/components/shared/product";
import { FeaturedProductList } from "@/components/shared/product/FeaturedProduct";
import { Button } from "@/components/ui/button";
import { getProductJsonLd } from "@/lib/jsonLd";
import { getProductBySlug, getRelatedProducts } from "@/sanity/queries/product";
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
    const relatedProducts = await getRelatedProducts({ currentProductId: product?._id ?? '' });

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
                crumbs={[
                    {
                        _id: 'products',
                        title: 'Букеты',
                        slug: {
                            _type: 'slug',
                            current: '/products',
                        }
                    },
                    {
                        _id: product._id,
                        title: product.name,
                        slug: {
                            _type: 'slug',
                            current: product.slug
                        }
                    }]} />
            <SectionContainer>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="col-span-1">
                        <ProductGallery images={product.gallery} productName={product.name} />
                    </div>
                    <div className="col-span-1 lg:sticky top-10">
                        <h1 className="mb-2">{product.name}</h1>
                        <p className="text-3xl font-semibold mb-6">{product.price} ₽</p>
                        <article>
                            <PortableTextRenderer value={product.description} />
                        </article>

                        <div className="flex flex-col py-8">
                            <h2 className="text-2xl font-semibold mb-4">Создайте счет</h2>
                            <p className="text-gray-600 mb-6">Наш менеджер свяжется с вами в ближайшее время</p>
                            <div className="flex flex-col md:flex-row gap-4">
                                <CTAButton title="Оставить заявку" href="" customGoal="zakazbuket" />
                                <CallBackDialog />
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
            {relatedProducts.length > 0 && (
                <SectionContainer className="py-16">
                    <h3 className="font-semibold mb-4">Еще букеты</h3>
                    <FeaturedProductList products={relatedProducts as any} />
                </SectionContainer>
            )}
            <JsonLd data={getProductJsonLd(product.name, product.slug, product.seo?.metaDescription)} />
        </>
    )
}
