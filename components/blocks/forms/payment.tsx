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
        date: z.date({
            required_error: "Пожалуйста, введите дату",
        }),
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

    const handleSend = useCallback(
        async (values: z.infer<typeof formSchema>) => {
            try {
                const donation = {
                    amount: values.amount,
                    date: values.date.toISOString(),
                    email: values.email
                };

                await updateUserAccount(user.userId, donation);

                return { success: true, donation };
            } catch (error: any) {
                console.error('Failed to process donation:', error);
                toast.error(error.message || 'Не удалось обработать пожертвование. Пожалуйста, попробуйте снова.');
                throw error;
            }
        },
        []
    );

    const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
        const { success, donation } = await handleSend(values);
        await sendDonateMessage({ userId: user.userId, ...donation });
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
