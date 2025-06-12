import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { SITE_SETTINGS_QUERYResult } from '@/sanity.types';

type PaymentProps = Extract<
    NonNullable<NonNullable<SITE_SETTINGS_QUERYResult>>,
    { _type: 'siteSettings' }
>;

type PaymentMethod = {
    method: string;
    icon: {
        iconType: 'image' | 'faicon';
        imageIcon?: string;
        faicon?: string;
    };
};

type PaymentListProps = {
    methods: PaymentMethod[];
};

const PaymentListItem: React.FC<{ method: PaymentMethod }> = ({ method }) => {
    return (
        <>
            {method && method.icon.iconType === 'image' ? (
                <div className="w-10 h-10 flex items-center justify-center bg-background rounded-sm">
                    <Image
                        src={method.icon.imageIcon ? urlFor(method.icon.imageIcon).url() : ''}
                        alt={method.method || 'Payment method'}
                        width={32}
                        height={32}
                        quality={50}
                    />
                </div>
            ) : (
                <i className={`${method.icon.faicon || 'fa-solid fa-credit-card'} text-3xl`} aria-label={method.method || 'Payment method'} />
            )}
        </>
    );
};

const PaymentList: React.FC<PaymentListProps> = ({ methods }) => {
    return (
        <ul className="flex flex-wrap gap-4">
            {methods.map((method, index) => (
                <li key={index}>
                    <PaymentListItem method={method} />
                </li>
            ))}
        </ul>
    );
};

const PaymentContainer: React.FC<{ title?: string, paymentMethods: PaymentMethod[] }> = ({ title = 'Способы оплаты', paymentMethods }) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <PaymentList methods={paymentMethods} />
        </div>
    );
};

export default PaymentContainer;
