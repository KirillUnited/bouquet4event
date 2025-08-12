import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CheckCircle2Icon, FileQuestionIcon, XCircleIcon} from "lucide-react";
import {OrderStatusResponse} from "@/app/(main)/payment/success/page";

export default function PaymentError({status}: { status: OrderStatusResponse }) {
    const statusMap: Record<string, string> = {
        '0': 'Заказ зарегистрирован, но не оплачен.',
        '1': 'Сумма захолдирована (двухстадийный платёж).',
        '2': 'Заказ успешно оплачен.',
        '3': 'Авторизация отменена.',
        '4': 'Средства возвращены.',
        '5': 'Инициирована авторизация через банк.',
        '6': 'Авторизация отклонена.',
        'ERROR': 'Ошибка при оплате.',
    }
    let icon: any;

    switch (status.OrderStatus) {
        case 'ERROR':
            icon = <XCircleIcon className="text-red-500 h-16 w-16"/>
            break
        default:
            icon = <FileQuestionIcon className="text-yellow-500 h-16 w-16"/>
    }

    return (
        <div className="container flex flex-col gap-4 text-center py-10">
            <div className="flex items-center justify-center gap-2">
                {icon}
            </div>
            <p className="text-2xl font-bold">
                Статус заказа: <span className='font-bold text-red-500'>{status.ErrorMessage}</span>.
            </p>
            <code>
                {statusMap[status.OrderStatus]}
                Попробуйте
                позже.
            </code>
            <Button size="lg" asChild className="self-center mt-4">
                <Link href="/">
                            <span className="flex items-center gap-2">
                                <i className="fas fa-home"></i>
                                На главную
                            </span>
                </Link>
            </Button>
        </div>
    );
}