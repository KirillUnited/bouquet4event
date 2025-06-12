import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

const PaymentListItem: React.FC<PaymentListItemProps> = ({ method }) => {
    return (
        <>
            {method?.icon?.iconType === 'image' ? (
                <div className="w-10 h-10 flex items-center justify-center bg-background rounded-sm">
                    <Image
                        src={urlFor(method?.icon?.imageIcon).url()}
                        alt={method.method}
                        width={32}
                        height={32}
                        quality={50}
                    />
                </div>
            ) : (
                <i className={`${method?.faicon || 'fa-solid fa-credit-card'} text-3xl`} aria-label={method.method} />
            )}
        </>
    );
};

const PaymentList: React.FC<PaymentListProps> = ({ methods }) => {
    return (
        <ul className="flex flex-wrap gap-4">
            {methods?.map((method) => (
                <li>
                    <PaymentListItem method={method} />
                </li>
            ))}
        </ul>
    );
};

const PaymentContainer: React.FC<{ title?: string, methods: PaymentMethod[] }> = ({ title = 'Способы оплаты', paymentMethods }) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <PaymentList methods={paymentMethods} />
        </div>
    );
};

export default PaymentContainer;
