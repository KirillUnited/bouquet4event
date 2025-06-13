// src/lib/jsonLd.ts
import { BreadcrumbList, LocalBusiness, WithContext } from "schema-dts";

export const getLocalBusinessJsonLd = (page: any) => {
    const localBusiness: WithContext<LocalBusiness> = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Bouquet4Event",
        "@id": "",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}`,
        "telephone": "+79060820745",
        "priceRange": "BYN",
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
                name: page.title,
                item: `${process.env.NEXT_PUBLIC_SITE_URL}/${page.slug}`,
            },
        ],
    };


    return [localBusiness, breadcrumbList];
};
