import Breadcrumbs from "@/components/blocks/breadcrumbs";
import SectionHeader from "@/components/blocks/section-header";
import SectionContainer from "@/components/layout/section-container";
import { CTASection } from "@/components/shared/cta";
import { FeaturedProductList } from "@/components/shared/product/FeaturedProduct";
import { getAllProducts } from "@/sanity/queries/product";

export async function generateMetadata() {
    const title = 'Букеты';
    const description = 'Найдите идеальный букет для вашего события в нашем каталоге';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{
                url: `https://bouquet4event.ru/images/og-image.png`,
                width: 1200,
                height: 630,
                alt: title,
            }],
            type: 'website',
            locale: 'ru',
            siteName: 'Bouquet4Event',
            url: `https://bouquet4event.ru/products`,
        },
        twitter: {
            images: ['https://bouquet4event.ru/images/og-image.png'],
            card: 'summary_large_image',
            title,
            description,
            creator: '@Bouquet4Event',
            site: '@Bouquet4Event',
            url: `https://bouquet4event.ru/products`,
        },
        alternates: {
            canonical: `https://bouquet4event.ru/products`,
        },
    };
}

export default async function ProductsPage() {
    const products = await getAllProducts();

    if (!products) {
        return (
            <SectionContainer>
                <p>К сожалению, в данный момент мы не можем показать вам наши букеты. Пожалуйста, попробуйте позже.</p>
            </SectionContainer>
        )
    };

    return (
        <>
            <SectionHeader className={"products-section"} sectionID={"products"} colorVariant={"background"} sectionWidth={"default"} stackAlign={"left"} tagLine={"🌸 «Свежие цветы, точно в срок — ваша ежемесячная подписка на цветы»"}  title={"Свежие сезонные букеты с доставкой на дом"} description={"Откройте для себя радость от регулярной доставки свежих цветов с помощью нашей услуги подписки на цветы."} padding={{ top: true, bottom: true, _type: "section-padding" }} _key="key" _type="section-header" link={null} />
            <Breadcrumbs _type="breadcrumbs" _key="key" padding={null} colorVariant={`background`} hideCurrent={true} crumbs={[{
                title: "Букеты",
                _id: "key",
                slug: {
                    _type: "slug",
                    current: "products"
                }
            }]} />
            <SectionContainer padding={{ top: false, bottom: true, _type: "section-padding" }}>
                <FeaturedProductList products={products as any} />
            </SectionContainer>
            <CTASection />
        </>
    )
}
