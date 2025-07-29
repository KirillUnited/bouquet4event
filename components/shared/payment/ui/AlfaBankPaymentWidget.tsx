'use client';

import { useEffect, useRef, useState } from 'react';

export interface AlfaBankPaymentProps {
    amount: number;
    orderNumber: string;
    email: string;
    token: string;
    description: string;
}

export function AlfaBankPaymentWidget({
                                    amount,
                                    orderNumber,
                                    email,
                                    token,
                                    description,
                                }: AlfaBankPaymentProps) {
    const [isButtonReady, setIsButtonReady] = useState(false);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    const orderRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const infoRef = useRef<HTMLInputElement>(null);

    // 1. Рендерим DOM и ставим значения
    useEffect(() => {
        if (orderRef.current) orderRef.current.value = orderNumber;
        if (emailRef.current) emailRef.current.value = email;
        if (infoRef.current) infoRef.current.value = email;

        setIsButtonReady(true); // теперь кнопка появилась в DOM
    }, [orderNumber, email]);

    // 2. Подключаем скрипт Alfa после того, как кнопка есть в DOM
    useEffect(() => {
        if (!isButtonReady) return;

        const existing = document.getElementById('alfa-payment-script');
        if (existing) existing.remove();

        const script = document.createElement('script');
        script.id = 'alfa-payment-script';
        script.src = 'https://testpay.alfabank.ru/assets/alfa-payment.js';
        document.head.appendChild(script);
        scriptRef.current = script;

        script.onload = () => {
            const button = document.getElementById('alfa-payment-button');
            if (button) {
                console.log('button', button);
            }
        }


        return () => {
            scriptRef.current?.remove();
        };
    }, [isButtonReady]);

    return (
        <div className="mt-6" id="alfa-payment-container">
            {/* Скрытые значения */}
            <input ref={orderRef} type="text" className="orderNumber" hidden readOnly />
            <input ref={emailRef} type="text" className="clientEmail" hidden readOnly />
            <input ref={infoRef} type="text" className="clientInfo" hidden readOnly />

            {/* Кнопка будет в DOM всегда, скрипт подключается потом */}
            <div
                id="alfa-payment-button"
                data-amount={amount}
                data-order-number-selector=".orderNumber"
                data-version="1.0"
                data-client-info-selector=".clientInfo"
                data-gateway="test"
                data-token={token}
                data-description={description}
                data-language="ru"
                data-stages="1"
                data-email-selector=".clientEmail"
            />
        </div>
    );
}
