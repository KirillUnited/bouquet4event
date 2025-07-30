import PaymentBlock from "@/components/blocks/forms/payment";
import {fetchSanityAllUsers, fetchSanityUserById} from "@/sanity/lib/fetch";
import {notFound} from "next/navigation";

export async function generateMetadata({ params } : { params: Promise<{ slug: string }> }) {
    const url = `https://bouquet4event.ru`;

    return {
        title: 'Пополнение счета',
        description: '',

        openGraph: {
            title: `Пополнение счета`,
            description: `Страница для пополнения вашего счета на Bouquet4Event`,
            type: 'website',
            locale: 'ru',
            siteName: 'Bouquet4Event',
            url,
        },
        twitter: {
            card: 'summary_large_image',
            title: `Пополнение счета`,
            description: `Страница для пополнения вашего счета на Bouquet4Event`,
            creator: '@Bouquet4Event',
            site: '@Bouquet4Event',
            url,
        },
        alternates: {
            canonical: url,
        },
    }
}

export async function generateStaticParams() {
    const pages = await fetchSanityAllUsers();

    return pages.map((page: any) => ({
        slug: page.userId,
    }));
}

export default async function PaymentPage({ params }: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params;
    const user = await fetchSanityUserById({userId: slug});

    if (!user) {
        notFound();
    }

    console.log('User Name:', user.name);

    return (
        <PaymentBlock
            _type={`form-register`}
            _key={`key`}
            padding={{
                _type: "section-padding",
                top: true,
                bottom: true,
            }}
            colorVariant={`muted`}
            stackAlign={`center`}
            title={`Вы можете подарить цветы, которые останутся надолго`} description={`${user.name} решил создать цветочный счёт вместо традиционных букетов. Ваш вклад поможет получать свежие букеты каждую неделю после мероприятия.`} privacyPolicyText={null}
            buttonText={`Пополнить счет`}
            successMessage={null}
            user={user}
        />
    )
}