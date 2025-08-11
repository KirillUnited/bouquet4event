import PaymentBlock from "@/components/blocks/forms/payment";
import {fetchSanityAllUsers, fetchSanityUserById} from "@/sanity/lib/fetch";
import {notFound} from "next/navigation";
import Link from "next/link";
import SadFaceIcon from "@/components/ui/icons";
import {Button} from "@/components/ui/button";
import {CTAButton} from "@/components/shared/buttons";
import React from "react";

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }) {
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

export default async function PaymentPage({params}: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params;
    const user = await fetchSanityUserById({userId: slug});

    const now = new Date();
    const expirationDate = new Date(user.date);
    const hasExpired = now.getTime() > expirationDate.getTime();

    if (hasExpired) {
        return (
            <div className="flex flex-col items-center gap-2 justify-center h-full py-16 container max-w-fit">
                <SadFaceIcon size={120}/>

                <h1 className="text-2xl font-bold mb-4">Мероприятие завершено</h1>
                <Button asChild variant='link'>
                    <Link href={'/'}>
                        <i className="fas fa-home"></i>
                        <span>На главную</span>
                    </Link>
                </Button>
                <div className="flex items-center gap-3 self-stretch">
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"/>
                    <span className="text-gray-500">или</span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"/>
                </div>

                <p>Создайте свой собственный цветочный счёт</p>
                <CTAButton
                    title={`Создайте счёт`}
                    href={'#'}
                    buttonVariant={'default'}
                    className='mt-4'
                />
            </div>
        )
    }

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
            title={`Вы можете подарить цветы, которые останутся надолго`}
            description={`${user.name} решил создать цветочный счёт вместо традиционных букетов. Ваш вклад поможет получать свежие букеты каждую неделю после мероприятия.`}
            privacyPolicyText={null}
            buttonText={`Пополнить счет`}
            successMessage={null}
            user={user}
        />
    )
}