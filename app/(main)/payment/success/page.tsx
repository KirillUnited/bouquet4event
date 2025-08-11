import {notFound} from 'next/navigation'
import PaymentSuccess from "@/components/shared/payment/PaymentSuccess";
import {PaymentError} from "@/components/shared/payment/ui";
import {Donation, updateUserAccount} from "@/lib/userAccount";
import {sendDonateMessage} from "@/lib/messenger";

export interface OrderStatusResponse {
    ErrorCode: string
    OrderStatus: string
    Amount?: string
    Email?: string
    email?: string
    ErrorMessage?: string,
    OrderNumber?: string,
    clientId?: string
}

async function getOrderStatus(orderId: string): Promise<OrderStatusResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/gateway?orderId=${orderId}`)

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

        console.log(status);
        const donation = {
            amount: status.Amount,
            email: status.Email || status.email,
            orderNumber: status.OrderNumber
        };

        await updateUserAccount(status.clientId || '', {
            amount: Number(donation.amount),
            email: donation.email,
            orderNumber: donation.orderNumber
        } as Donation);
        await sendDonateMessage({ userId: status.clientId, ...donation });
    } catch {
        return <PaymentError status={{ErrorCode: 'ERROR', OrderStatus: 'ERROR', ErrorMessage: 'Failed to fetch order status'}}/>
    }

    return (
        <PaymentSuccess orderId={orderId || ''} amount={Number(status.Amount)} email={status.Email}/>
    )
}