import SectionContainer from "@/components/layout/section-container";
import { ProductGallery } from "@/components/shared/product";
import { getProductBySlug } from "@/sanity/queries/product";
import Image from "next/image";

export interface Props {
    slug: string,
    id?: number
}

export const generateMetadata = async ({ params }: { params: Promise<Props> }) => {
    const { slug } = await params;
    const product: any = await getProductBySlug({ slug });

    const url = `https://bouquet4event.ru/products/${slug}`;

    return {
        title: product.name,
        description: product.description,

        openGraph: {
            title: `${product.name}`,
            description: `${product.description}`,
            images: [`${product.image}`],
            type: 'website',
            locale: 'ru',
            siteName: 'Bouquet4Event',
            url: `https://bouquet4event.ru/products/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name}`,
            description: `${product.description}`,
            images: [`${product.image}`],
            creator: '@artmarketprint',
            site: '@artmarketprint',
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

    console.log(product);

    if (!product) return (
        <SectionContainer>
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
                <h2 className="text-2xl font-medium text-gray-600">Товар не найден</h2>
                <p className="text-gray-500">Товар, который вы ищете, не существует или был удален.</p>
            </div>
        </SectionContainer>
    )

    return (
        <>
            <SectionContainer>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="col-span-1">
                        <ProductGallery images={product.gallery} productName={product.name} />
                    </div>
                </div>
            </SectionContainer>
        </>
    )
}
