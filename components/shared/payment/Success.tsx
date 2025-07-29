'use client'

import {CheckCircle2} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button";

interface PaymentSuccessProps {
    orderId: string
    amount?: number
    email?: string
}

export default function PaymentSuccess({orderId, amount, email}: PaymentSuccessProps) {
    const router = useRouter()

    return (
        <div className="max-w-xl mx-auto py-16 px-4 text-center">
            <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 mb-6"/>
            <h1 className="text-3xl font-bold mb-2">Оплата прошла успешно</h1>
            <p className="text-lg text-muted-foreground mb-6">Благодарим за ваш платёж!</p>

            <div className="bg-muted p-4 rounded-lg text-left text-sm space-y-2">
                <p><strong>Номер заказа:</strong> <code>{orderId}</code></p>
                {amount && <p><strong>Сумма:</strong> {(amount / 100).toFixed(2)} ₽</p>}
                {email && <p><strong>Почта:</strong> {email}</p>}
            </div>

            <Button
                onClick={() => router.push('/')}
            >
                На главную
            </Button>
        </div>
    )
}
