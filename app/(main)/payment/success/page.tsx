import {notFound} from 'next/navigation'
import PaymentSuccess from "@/components/shared/payment/PaymentSuccess";
import {PaymentError} from "@/components/shared/payment/ui";

export interface OrderStatusResponse {
    ErrorCode: string
    OrderStatus: string
    Amount?: string
    Email?: string
    ErrorMessage?: string
}

async function getOrderStatus(orderId: string): Promise<OrderStatusResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/gateway?orderId=${orderId}`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch order status')
    }

    return res.json()
}

export default async function SuccessPage({searchParams}: { searchParams: Promise<{ orderId?: string }> }) {
    const {orderId} = await searchParams;

    if (!orderId) return notFound();

    let status: OrderStatusResponse;

    try {
        const orderStatus = await getOrderStatus(orderId);
        
        status=orderStatus;

        if (orderStatus.OrderStatus == '6') {
            return <PaymentError status={orderStatus}/>
        }
    } catch {
        return <PaymentError status={{ErrorCode: 'ERROR', OrderStatus: 'ERROR', ErrorMessage: 'Failed to fetch order status'}}/>
    }

    return (
        <PaymentSuccess orderId={orderId || ''} amount={Number(status.Amount)} email={status.Email}/>
    )
}
