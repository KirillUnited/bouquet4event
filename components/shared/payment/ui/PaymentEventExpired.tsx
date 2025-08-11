import SadFaceIcon from "@/components/ui/icons";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CTAButton} from "@/components/shared/buttons";
import React from "react";

export default function PaymentEventExpired() {
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