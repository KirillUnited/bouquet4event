import PaymentBlock from "@/components/blocks/forms/payment";

export async function generateMetadata() {
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
        },
        twitter: {
            card: 'summary_large_image',
            title: `Пополнение счета`,
            description: `Страница для пополнения вашего счета на Bouquet4Event`,
            creator: '@Bouquet4Event',
            site: '@Bouquet4Event',
        },
        alternates: {
            canonical: url,
        },
    }
}

export default async function PaymentPage() {

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
            title={`Вы можете подарить цветы, которые останутся надолго`} description={`Анна и Михаил решили создать цветочный счёт вместо традиционных букетов.
                    Ваш вклад поможет им получать свежие букеты каждую неделю после свадьбы.`} privacyPolicyText={null}
            buttonText={`Пополнить счет`}
            successMessage={null}
        />
    )
}
