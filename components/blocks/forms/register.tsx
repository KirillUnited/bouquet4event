'use client';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import FormRegisterSuccess from "@/components/shared/forms/FormRegisterSuccess";
import { createUserAccount } from "@/lib/userAccount";
import { RegisterDialogOverview } from "@/components/shared/dialog";
import { FlowerSubscriptionWizard, RegisterForm, RegisterFormContainer } from "@/components/shared/forms";
import { ColorVariant, PAGE_QUERYResult } from "@/sanity.types";
import SectionContainer from "@/components/layout/section-container";
import { stegaClean } from "next-sanity";
import { openCheckoutMessage } from "@/lib/messenger";
import {formSchema} from "@/components/shared/forms/lib/validation";

type FormRegisterProps = Extract<
    NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
    { _type: "form-register" }
>;

const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default function Register({
    padding,
    colorVariant,
    title,
    description,
    buttonText,
    successMessage,
    privacyPolicyText,
    goal,
    customGoal
}: FormRegisterProps & { customGoal?: string }) {
    const [formValues, setFormValues] = useState({});

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            phone: '',
            region: 'Москва',
            privacyPolicy: false,
            privacyPolicyData: false
        },
    });

    const { isSubmitting, isSubmitSuccessful } = form.formState;
    const handleSend = useCallback(
        async ({ name, phone, region, date, privacyPolicy, privacyPolicyData }: {
            name: string;
            phone: string;
            region: string;
            date: Date;
            privacyPolicy: boolean;
            privacyPolicyData: boolean
        }) => {
            try {
                const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
                const userLink = `${NEXT_PUBLIC_SITE_URL}/payment/${userId}`;
                const result = await createUserAccount({
                    userId,
                    userDonationLink: userLink,
                    name,
                    phone,
                    region,
                    date,
                    totalAmount: 0, // Начальная сумма 0
                    privacyPolicy,
                    privacyPolicyData
                });

                if (result) {
                    toast.success('Ваш счёт успешно зарегистрирован!');
                    setFormValues(result);
                    form.reset();

                    // Yandex.Metrika target
                    if (typeof window !== "undefined" && typeof (window as any).ym === "function") {
                        const target = goal || customGoal;

                        if (target) {
                            (window as any).ym(103963322, "reachGoal", target);
                            console.log(`Yandex.Metrika: цель ${target} отправлена`);
                        }
                    }

                    return result;
                } else {
                    toast.error('Не удалось создать счёт. Пожалуйста, попробуйте позже.');
                }
            } catch (error: any) {
                toast.error(error.message);
                throw new Error(error.message);
            }
        },
        [form]
    );

    const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
        const result = await handleSend(values);
        await openCheckoutMessage(result);
    });

    const color = stegaClean(colorVariant) as ColorVariant;

    return (
        <>
            {isSubmitSuccessful && (
                <FormRegisterSuccess values={formValues} />
            )}
            <SectionContainer color={color} padding={padding}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RegisterFormContainer
                        title={title || "Зарегистрировать цветочный счёт"}
                        description={description || "Заполните форму, и мы свяжемся с вами в ближайшее время, чтобы обсудить все детали вашей цветочной подписки."}
                    >
                        {/* <Form {...form}>
                            <RegisterForm id="register-section-form" onSubmit={onSubmit} isSubmitting={isSubmitting} formControl={form.control} />
                        </Form> */}
                        <FlowerSubscriptionWizard goal={goal || customGoal} />
                    </RegisterFormContainer>
                    <RegisterDialogOverview />
                </div>
            </SectionContainer>
        </>
    );
}
