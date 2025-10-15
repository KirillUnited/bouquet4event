'use client';

import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {z} from 'zod';
import {createUserAccount} from '@/lib/userAccount';
import {openCheckoutMessage} from '@/lib/messenger';
import {SubscriptionSchema} from '@/components/shared/forms/lib/validation';

export type RegisterFormValues = z.infer<typeof SubscriptionSchema>;

export interface UseRegisterFormProps {
    onSuccess?: (data: any) => void;
    goal?: string;
    customGoal?: string;
}

export const useRegisterForm = ({onSuccess, goal, customGoal}: UseRegisterFormProps = {}) => {
    const [formValues, setFormValues] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(SubscriptionSchema),
        defaultValues: {
            name: '',
            phone: '',
            region: 'Москва',
            privacyPolicy: false,
            eventDate: undefined,
            eventType: '',
            style: '',
            duration: '',
            email: '',
            password: '',
        },
    });

    const handleSend = useCallback(
        async (values: RegisterFormValues) => {
            try {
                setIsSubmitting(true);
                const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
                const userLink = `${process.env.NEXT_PUBLIC_SITE_URL}/payment/${userId}`;

                const result = await createUserAccount({
                    userId,
                    userDonationLink: userLink,
                    name: values.name,
                    phone: values.phone,
                    region: values.region,
                    date: values.eventDate,
                    totalAmount: 0,
                    privacyPolicy: values.privacyPolicy,
                    eventType: values.eventType,
                    style: values.style,
                    duration: values.duration,
                    email: values.email,
                });

                if (result) {
                    toast.success('Ваша заявка успешно отправлена!');
                    setFormValues(result);
                    form.reset();

                    // Yandex.Metrika target
                    if (typeof window !== 'undefined' && typeof (window as any).ym === 'function') {
                        const target = goal || customGoal;
                        if (target) {
                            (window as any).ym(103963322, 'reachGoal', target);
                            console.log(`Yandex.Metrika: цель ${target} отправлена`);
                        }
                    }

                    await openCheckoutMessage(result);
                    onSuccess?.(result);

                    return result;
                } else {
                    throw new Error('Не удалось отправить заявку. Пожалуйста, попробуйте позже.');
                }
            } catch (error: any) {
                toast.error(error.message);
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        },
        [form, goal, customGoal, onSuccess]
    );

    const onSubmit = form.handleSubmit(handleSend);

    return {
        form,
        formValues,
        isSubmitting,
        onSubmit,
        handleSend,
    };
};

export default useRegisterForm;
