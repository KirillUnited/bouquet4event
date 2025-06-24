// src/lib/jsonLd.ts
import { BreadcrumbList, LocalBusiness, Product, WithContext } from "schema-dts";

export const getLocalBusinessJsonLd = () => {
    const localBusiness: WithContext<LocalBusiness> = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Bouquet4Event",
        "@id": "",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}`,
        "telephone": "+79060820745",
        "priceRange": "RUB",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "",
            "addressLocality": "Москва",
            "postalCode": "101000",
            "addressCountry": "RU"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "",
            "longitude": ""
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "21:00"
        },
        "sameAs": "https://www.instagram.com/bouquet4event/"

    };

    return [localBusiness];
};

export const getBreadcrumbListJsonLd = (name: any, slug: string) => {
    const breadcrumbList: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: `${process.env.NEXT_PUBLIC_SITE_URL}`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: name,
                item: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
            },
        ],
    };

    return [breadcrumbList];
};

export const getProductJsonLd = (name: any, slug: string, description: any) => {
    const product: WithContext<Product> = {
        "@context": "https://schema.org",
        "@type": "Product",
        "image": `${process.env.NEXT_PUBLIC_SITE_URL}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9b0ef703.png&w=96&q=75`,
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/products/${slug}`,
        "brand": "Артмаркетпринт",
        "model": name,
        "name": name,
        "description": description,
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/PreOrder",
            "price": "0",
            "priceCurrency": "BYN",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/products/${slug}`,

        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "itemReviewed": "Web Development",
            "ratingValue": "4.9",
            "reviewCount": "46"
        }
    };
    const breadcrumbList: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: `${process.env.NEXT_PUBLIC_SITE_URL}`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Букеты",
                item: `${process.env.NEXT_PUBLIC_SITE_URL}/products`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: name,
            },
        ],
    };

    return [product, breadcrumbList];
};
