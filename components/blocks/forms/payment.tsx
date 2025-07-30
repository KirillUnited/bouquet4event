'use client';
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, } from "react";
import { toast } from "sonner";
import { updateUserAccount } from "@/lib/userAccount";
import { PaymentForm } from "@/components/shared/forms";
import { ColorVariant, PAGE_QUERYResult } from "@/sanity.types";
import SectionContainer from "@/components/layout/section-container";
import { stegaClean } from "next-sanity";
import { sendDonateMessage } from "@/lib/messenger";

type FormRegisterProps = Extract<
    NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
    { _type: "form-register" }
>;

export default function PaymentBlock({
    padding,
    colorVariant,
    title,
    description,
    buttonText,
    successMessage,
    privacyPolicyText,
    user
}: { user: { userId: string } } & FormRegisterProps) {
    const formSchema = z.object({
        amount: z.number(),
        email: z.string().email({ message: "Пожалуйста, введите корректную электронную почту" }),
        privacyPolicy: z.boolean().refine(val => val, {
            message: "Необходимо согласиться с политикой конфиденциальности"
        }),
        privacyPolicyData: z.boolean().refine(val => val === true, {
            message: "Необходимо согласиться с обработкой персональных данных"
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 4000,
            email: '',
            privacyPolicy: false,
            privacyPolicyData: false
        },
    });

    const { isSubmitting, isSubmitSuccessful } = form.formState;
    const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
        try {
            const orderNumber = `${user.userId}_${Math.floor(Math.random() * 1000)}`;
            const donation = {
                orderNumber,
                amount: values.amount*100,
                email: values.email
            };

            // 🔥 Отправляем данные на сервер (API), чтобы получить ссылку оплаты
            const res = await fetch('/api/gateway', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderNumber,
                    amount: donation.amount,
                    email: donation.email
                }),
            });

            const data = await res.json();

            if (data.formUrl) {
                await updateUserAccount(user.userId, donation);
                await sendDonateMessage({ userId: user.userId, ...donation });
                window.location.href = data.formUrl;
            } else {
                toast.error(`Ошибка оплаты: ${data.errorMessage || 'Неизвестная ошибка'}`);
            }

        } catch (error: any) {
            toast.error(error.message || 'Не удалось обработать платёж.');
        }
    });

    const color = stegaClean(colorVariant) as ColorVariant;

    return (
        <>
            <SectionContainer color={color} padding={padding}>
                <div className="max-w-2xl mx-auto text-center mb-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-foreground/75 text-pretty">
                                {description}
                            </p>
                        )}
                    </div>
                    <img
                        src="https://readdy.ai/api/search-image?query=elegant%20wedding%20couple%20portrait%2C%20romantic%20atmosphere%2C%20soft%20natural%20lighting%2C%20bride%20with%20bouquet%2C%20groom%20in%20suit%2C%20soft%20beige%20background%2C%20high%20quality%20professional%20photography&width=600&height=400&seq=6&orientation=landscape"
                        alt="Свадебная пара"
                        className="w-full h-64 object-cover object-top rounded-lg mt-6"
                    />
                </div>
                <Form {...form}>
                    <PaymentForm onSubmit={onSubmit} isSubmitting={isSubmitting} formControl={form.control} />
                </Form>
            </SectionContainer>
        </>
    );
}
