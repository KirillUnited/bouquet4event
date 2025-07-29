'use server'

import {redirect} from 'next/navigation'

export async function redirectToPayment(formData: FormData) {
    const orderNumber = formData.get('orderNumber')?.toString() || ''
    const amount = formData.get('amount')?.toString() || ''

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/gateway`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({orderNumber, amount}),
    })

    const data = await res.json()

    if (data.formUrl) {
        redirect(data.formUrl)
    } else {
        throw new Error(`Ошибка: ${data.errorCode} — ${data.errorMessage}`)
    }
}
