'use client';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormRegisterSuccess from "./register-success";
import { createUserAccount } from "@/lib/createUserAccount";
import { RegisterDialogOverview } from "@/components/shared/dialog";
import { cn } from "@/lib/utils";
import { PhoneInput } from "@/components/shared/forms";

interface RegisterFormProps {
    onSubmit: (event: React.FormEvent) => void;
    isSubmitting: boolean;
    formControl: any; // Adjust the type based on your form control type
}

interface RegisterFormContainerProps {
    className?: string;
    title?: string;
    description?: string;
    children: React.ReactNode;
}

function RegisterFormContainer({ className, title, description, children }: RegisterFormContainerProps) {
    return (
        <div className={cn("flex flex-col gap-8", className)}>
            <DialogHeader>
                <DialogTitle className="text-2xl sm:text-4xl text-balance">
                    Зарегистрировать цветочный счёт
                    {title}
                </DialogTitle>
                <DialogDescription className="text-foreground-85">
                    Заполните форму, и мы свяжемся с вами в ближайшее время,
                    чтобы обсудить все детали вашей цветочной подписки.
                    {description}
                </DialogDescription>
            </DialogHeader>
            {children}
        </div>
    );
}

function RegisterForm({ onSubmit, isSubmitting, formControl }: RegisterFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <div className="space-y-6">
                <FormField
                    control={formControl}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Введите ваше имя" className="mt-1" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <PhoneInput
                    control={formControl}
                    name="phone"
                    required
                    className="mt-1"
                />
                <FormField
                    control={formControl}
                    name="region"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Регион</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="mt-1 w-full">
                                        <SelectValue placeholder="Выберите регион" className="w-full" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Москва">Москва</SelectItem>
                                    <SelectItem value="Московская область">Московская область</SelectItem>
                                    <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                                    <SelectItem value="Другой">Другой регион</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting && <Loader2Icon className="w-6 h-6 mr-2 animate-spin" />}
                    Отправить заявку
                </Button>
            </div>
        </form>
    );
}

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
                // Генерируем уникальный ID пользователя на основе текущего времени и случайного числа
                const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

                // Используем функцию createUserAccount для создания аккаунта в Sanity CMS
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
                <RegisterFormContainer>
                    <Form {...form}>
                        <RegisterForm onSubmit={onSubmit} isSubmitting={isSubmitting} formControl={form.control} />
                    </Form >
                </RegisterFormContainer>
                <RegisterDialogOverview />
            </div >
        )
    );
}
