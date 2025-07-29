import {notFound} from 'next/navigation'
import PaymentSuccess from "@/components/shared/payment/Success";

interface OrderStatusResponse {
    ErrorCode: string
    OrderStatus: string
    Amount?: string
    Email?: string
}

async function getOrderStatus(orderId: string): Promise<OrderStatusResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gateway?orderId=${orderId}`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch order status')
    }

    return res.json()
}

export default async function SuccessPage({searchParams}: { searchParams: Promise<{ orderId?: string }> }) {
    const {orderId} = await searchParams;

    if (!orderId) return notFound()

    // let status: OrderStatusResponse
    // try {
    //     status = await getOrderStatus(orderId)
    // } catch {
    //     return <div className="text-center py-10">Ошибка получения статуса заказа. Попробуйте позже.</div>
    // }

    const statusMap: Record<string, string> = {
        '0': 'Заказ зарегистрирован, но не оплачен.',
        '1': 'Сумма захолдирована (двухстадийный платёж).',
        '2': 'Заказ успешно оплачен.',
        '3': 'Авторизация отменена.',
        '4': 'Средства возвращены.',
        '5': 'Инициирована авторизация через банк.',
        '6': 'Авторизация отклонена.',
    }

    return (
        <PaymentSuccess orderId={orderId}/>
    )
}
