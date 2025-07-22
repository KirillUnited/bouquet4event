'use client';
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import FormRegisterSuccess from "@/components/shared/forms/FormRegisterSuccess";
import { createUserAccount } from "@/lib/createUserAccount";
import { RegisterDialogOverview } from "@/components/shared/dialog";
import {PaymentForm, RegisterForm, RegisterFormContainer} from "@/components/shared/forms";
import { ColorVariant, PAGE_QUERYResult } from "@/sanity.types";
import SectionContainer from "@/components/layout/section-container";
import { stegaClean } from "next-sanity";

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
    privacyPolicyText
}: FormRegisterProps) {
    const formSchema = z.object({
        date: z.date({
            required_error: "Пожалуйста, введите дату",
        }),
        amount: z.number(),
        email: z.string().email({ message: "Пожалуйста, введите корректную электронную почту" }),
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

    const { isSubmitting, isSubmitSuccessful } = form.formState;

    // const handleSend = useCallback(
    //     async ({ name, amount, privacyPolicy }: { name: string; amount: string; privacyPolicy: boolean }) => {
    //         try {
    //             const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    //
    //             const result = await createUserAccount({
    //                 amount,
    //                 name,
    //                 privacyPolicy
    //             });
    //
    //             if (result) {
    //                 toast.success('Счёт успешно пополнен!');
    //                 form.reset();
    //             } else {
    //                 toast.error('Не удалось пополнить счёт. Пожалуйста, попробуйте позже.');
    //             }
    //         } catch (error: any) {
    //             toast.error(error.message);
    //             throw new Error(error.message);
    //         }
    //     },
    //     [form]
    // );

    const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
        // await handleSend(values);
        console.log(values);
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
                    <PaymentForm onSubmit={onSubmit} isSubmitting={isSubmitting} formControl={form.control} />
                </Form >
            </SectionContainer>
        </>
    );
}
