"use client";
import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {TextInput} from "@/components/shared/forms";
import {Button} from "@/components/ui/button";
import {LockIcon, MailIcon} from "lucide-react";

const Schema = z.object({
    email: z.string().email('Введите корректный email'),
    password: z.string().min(6, {message: "Пароль должен быть не менее 6 символов"}),
});
type FormValues = z.infer<typeof Schema>;

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const form = useForm<FormValues>({
        resolver: zodResolver(Schema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const {handleSubmit, formState: {errors, isSubmitting}, control} = form;

    const onSubmit = async (data: FormValues) => {
        setError(null);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
                credentials: 'same-origin' // Important for cookies
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Login failed");
            }

            const {token} = await res.json();

            // Set the auth token as a secure, httpOnly cookie
            document.cookie = `auth_token=${token}; path=/; max-age=604800; SameSite=Lax; Secure`;

            // Redirect to dashboard after successful login
            window.location.href = "/account";
        } catch (err: any) {
            setError(err.message || "An error occurred during login");
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <h1 className="text-2xl font-semibold">Вход в аккаунт</h1>
                {error && <p className="text-red-500">{error}</p>}
                <TextInput control={control} name="email" label="Email" placeholder="email@domain.com" required
                           icon={<MailIcon size={16}/>}/>
                <TextInput control={control} name="password" label="Пароль" placeholder="Введите пароль" type="password"
                           required icon={<LockIcon size={16}/>}/>
                <Button disabled={isSubmitting}>{isSubmitting ? "Авторизация..." : "Войти в аккаунт"}</Button>
                <p className="text-sm">Нет аккаунта? <a href="/signup"
                                                        className="text-primary hover:underline">Зарегистрируйтесь</a>
                </p>
            </form>
        </FormProvider>
    );
}


