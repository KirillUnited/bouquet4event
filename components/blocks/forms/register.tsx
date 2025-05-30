'use client';
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import FormRegisterSuccess from "./register-success";
import { createUserAccount } from "@/lib/createUserAccount";
import { RegisterDialogOverview } from "@/components/shared/dialog";
import { RegisterForm, RegisterFormContainer } from "@/components/shared/forms";

export default function Register() {
    const [formValues, setFormValues] = useState({});
    const formSchema = z.object({
        name: z.string().min(1, { message: "Пожалуйста, введите ваше имя" }),
        phone: z.string()
            .min(1, { message: "Пожалуйста, введите ваш телефон" })
            .regex(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, {
                message: "Телефон должен соответствовать формату +7 (XXX) XXX-XX-XX"
            }),
        region: z.string().min(1, { message: "Пожалуйста, выберите ваш регион" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            phone: '',
            region: 'Москва',
        },
    });

    const { isSubmitting, isSubmitSuccessful } = form.formState;

    const handleSend = useCallback(
        async ({ name, phone, region }: { name: string; phone: string; region: string }) => {
            try {
                const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

                const result = await createUserAccount({
                    userId,
                    name,
                    phone,
                    region,
                    totalAmount: 0 // Начальная сумма 0
                });

                if (result) {
                    toast.success('Ваш счёт успешно зарегистрирован!');
                    setFormValues(result);
                    form.reset();
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
        await handleSend(values);
    });

    return (
        isSubmitSuccessful ? (
            <FormRegisterSuccess values={formValues} />
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RegisterFormContainer
                    title="Зарегистрировать цветочный счёт"
                    description="Заполните форму, и мы свяжемся с вами в ближайшее время,
                    чтобы обсудить все детали вашей цветочной подписки."
                >
                    <Form {...form}>
                        <RegisterForm onSubmit={onSubmit} isSubmitting={isSubmitting} formControl={form.control} />
                    </Form >
                </RegisterFormContainer>
                <RegisterDialogOverview />
            </div >
        )
    );
}
