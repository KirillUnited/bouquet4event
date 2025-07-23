'use client';
import {Form} from "@/components/ui/form";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCallback,} from "react";
import {toast} from "sonner";
import {updateUserAccount} from "@/lib/userAccount";
import {PaymentForm} from "@/components/shared/forms";
import {ColorVariant, PAGE_QUERYResult} from "@/sanity.types";
import SectionContainer from "@/components/layout/section-container";
import {stegaClean} from "next-sanity";
import {sendDonate} from "@/lib/messenger";

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
                                     }: {user: { userId: string }} & FormRegisterProps) {
    const formSchema = z.object({
        date: z.date({
            required_error: "Пожалуйста, введите дату",
        }),
        amount: z.number(),
        email: z.string().email({message: "Пожалуйста, введите корректную электронную почту"}),
        privacyPolicy: z.boolean().refine(val => val, {
            message: "Необходимо согласиться с политикой конфиденциальности"
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 4000,
            email: '',
            privacyPolicy: false
        },
    });

    const {isSubmitting, isSubmitSuccessful} = form.formState;

    const handleSend = useCallback(
        async (values: z.infer<typeof formSchema>) => {
            try {
                const donation = {
                    amount: values.amount,
                    date: values.date.toISOString(),
                    email: values.email
                };

                await updateUserAccount(user.userId, donation);
                await sendDonate({userId: user.userId, ...donation});

                return {success: true};
            } catch (error: any) {
                console.error('Failed to process donation:', error);
                toast.error(error.message || 'Не удалось обработать пожертвование. Пожалуйста, попробуйте снова.');
                throw error;
            }
        },
        []
    );

    const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
        await handleSend(values);
        // TODO: Temporary solution
        await toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Пожалуйста, подождите...',
                success: <b>Счёт успешно пополнен!</b>,
                error: <b>Не удалось пополнить счёт. Пожалуйста, попробуйте позже.</b>,
            },
        );
    });

    const color = stegaClean(colorVariant) as ColorVariant;

    return (
        <>
            <SectionContainer color={color} padding={padding}>
                <Form {...form}>
                    <PaymentForm onSubmit={onSubmit} isSubmitting={isSubmitting} formControl={form.control}/>
                </Form>
            </SectionContainer>
        </>
    );
}
