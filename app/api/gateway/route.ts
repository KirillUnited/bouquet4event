import {NextResponse} from 'next/server'
import axios from 'axios'

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL!
const USERNAME = process.env.PAYMENT_USERNAME!
const PASSWORD = process.env.PAYMENT_PASSWORD!
const RETURN_URL = process.env.PAYMENT_RETURN_URL!

export async function POST(req: Request) {
    const {orderNumber, amount} = await req.json();

    const params = new URLSearchParams({
        userName: USERNAME,
        password: PASSWORD,
        orderNumber: encodeURIComponent(orderNumber),
        amount: encodeURIComponent(amount),
        returnUrl: RETURN_URL,
    })

    try {
        const {data} = await axios.post(`${GATEWAY_URL}register.do`, params.toString(), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })

        console.log(data);

        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({errorCode: 'NETWORK_ERROR', errorMessage: error.message}, {status: 500})
    }
}

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) return NextResponse.json({error: 'Missing orderId'}, {status: 400})

    const params = new URLSearchParams({
        userName: USERNAME,
        password: PASSWORD,
        orderId: orderId,
    })

    try {
        const {data} = await axios.post(`${GATEWAY_URL}getOrderStatus.do`, params.toString(), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })

        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({errorCode: 'NETWORK_ERROR', errorMessage: error.message}, {status: 500})
    }
}
