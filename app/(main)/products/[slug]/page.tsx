import Breadcrumbs from "@/components/blocks/breadcrumbs";
import SectionContainer from "@/components/layout/section-container";
import PortableTextRenderer from "@/components/portable-text-renderer";
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="col-span-1">
                        <ProductGallery images={product.gallery} productName={product.name} />
                    </div>
                    <div className="col-span-1">
                        <h1 className="mb-8">{product.name}</h1>
                        <div className="flex flex-col gap-4">
                            <PortableTextRenderer value={product.description} />
                        </div>
                        <h2 className="text-2xl font-semibold mt-8 mb-4">Цена</h2>
                        <p className="text-2xl font-semibold">{product.price} ₽</p>
                        
                        <div className="flex flex-col py-8">
                            <h2 className="text-2xl font-semibold mb-4">Создайте счет</h2>
                            <p className="text-gray-600 mb-6">Наш менеджер свяжется с вами в ближайшее время</p>
                            <div className="flex gap-4">
                                <Button asChild>
                                    <Link href="/create-account">
                                        <i className="fa fa-user-plus mr-2"></i>
                                        создать счет
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/request-call">
                                        <i className="fa fa-phone-volume mr-2"></i>
                                        обратная связь
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
            <SectionContainer className="py-12">
                <h2 className="text-xl font-semibold mb-4">Еще букеты</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border rounded-lg overflow-hidden shadow-md">
                        <Image src="/images/product-1.jpg" alt="Product Name" width={300} height={200} className="w-full h-auto" />
                        <div className="p-4">
                            <h3 className="text-lg font-medium">Название</h3>
                            <p className="text-gray-500">Краткое описание</p>
                            <Button asChild>
                                <Link href="/products/product-slug">Подробнее</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </>
    )
}
