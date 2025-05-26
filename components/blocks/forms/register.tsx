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
import { set } from "sanity";

interface RegisterFormProps {
    onSubmit: (event: React.FormEvent) => void;
    isSubmitting: boolean;
    formControl: any; // Adjust the type based on your form control type
}

function RegisterForm({ onSubmit, isSubmitting, formControl }: RegisterFormProps) {
    return (
        <div className="flex flex-col gap-8">
            <DialogHeader>
                <DialogTitle className="text-2xl sm:text-4xl">
                    Зарегистрировать цветочный счёт
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                    Заполните форму, и мы свяжемся с вами в ближайшее время,
                    чтобы обсудить все детали вашей цветочной подписки.
                </DialogDescription>
            </DialogHeader>
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
                    <FormField
                        control={formControl}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Телефон</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="+7 (___) ___-__-__" className="mt-1" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
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
        </div>
    );
}

function HowWeWork() {
    return (
        <div className="bg-muted p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-6">Как мы работаем</h3>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md mb-8">
                <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fa-brands fa-whatsapp text-white text-xl"></i>
                    </div>
                    <div>
                        <p className="font-semibold mb-1 text-sm text-black/90">Bouquet for Event | Цветочный счёт</p>
                        <p className="text-gray-600 text-xs">
                            Здравствуйте! Мы получили вашу заявку на создание цветочного счёта. Расскажите, пожалуйста, о предстоящем событии.
                        </p>
                    </div>
                </div>
                <div className="flex items-start mb-4 justify-end">
                    <div>
                        <p className="text-gray-600 text-xs text-right">
                            Здравствуйте! Мы планируем свадьбу 15 июня. Хотели бы организовать цветочную подписку вместо букетов.
                        </p>
                    </div>
                    <div className="w-3 h-3 bg-gray-200 rounded-full flex items-center justify-center ml-2 mt-2 flex-shrink-0"></div>
                </div>
                <div className="flex items-start">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fa-brands fa-whatsapp text-white text-xl"></i>
                    </div>
                    <div>
                        <p className="font-semibold mb-1 text-sm text-black/90">Bouquet for Event | Цветочный счёт</p>
                        <p className="text-gray-600 text-xs">
                            Отлично! Давайте обсудим ваши предпочтения по цветам и периодичности доставки. Какие цветы вы любите?
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <img
                    src="https://readdy.ai/api/search-image?query=happy%20couple%20receiving%20flower%20delivery%20at%20home%2C%20joyful%20moment%2C%20soft%20natural%20lighting%2C%20elegant%20bouquet%2C%20cozy%20home%20interior%2C%20soft%20beige%20background%2C%20high%20quality%20professional%20photography&width=400&height=300&seq=5&orientation=landscape"
                    alt="Счастливая пара получает доставку цветов"
                    className="w-full h-48 object-cover object-top rounded-lg mb-4"
                />
                <p className="text-gray-600 text-sm">
                    После регистрации вы получите персональную ссылку, которой сможете поделиться с гостями
                </p>
            </div>
        </div>
    );
}

export default function FormRegister() {
    const [formValues, setFormValues] = useState({});
    const formSchema = z.object({
        name: z.string().min(1, { message: "Пожалуйста, введите ваше имя" }),
        phone: z.string().min(1, { message: "Пожалуйста, введите ваш телефон" }),
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
                const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, phone, region }),
                });

                const result = await response.json();

                if (response.ok) {
                    toast.success('Ваш счёт успешно зарегистрирован!');
                    setFormValues(result);
                    form.reset();
                } else {
                    toast.error(result.error);
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
                <Form {...form}>
                    <RegisterForm onSubmit={onSubmit} isSubmitting={isSubmitting} formControl={form.control} />
                </Form >
                <HowWeWork />
            </div >
        )
    );
}
