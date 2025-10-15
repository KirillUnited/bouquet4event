"use client";
import {FormProvider, useForm} from "react-hook-form";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {RegisterFormFieldset} from "@/components/shared/forms";
import {SubscriptionSchema} from "@/components/shared/forms/lib/validation";
import {useState} from "react";
import useRegisterForm from "@/hooks/useRegisterForm";

type FormValues = z.infer<typeof SubscriptionSchema>;

export default function SignupPage() {
    const [error, setError] = useState<string | null>(null);
    const {form} = useRegisterForm({goal: 'register'});
    const {control, handleSubmit, formState: {isSubmitting}} = form;
    const router = useRouter();
    const onSubmit = async (data: FormValues) => {
        setError(null);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
                credentials: 'same-origin' // Important for cookies
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Registration failed");
            }

            const {token} = await res.json();

            if (!token) {
                throw new Error("No authentication token received");
            }

            // Set the auth token as a secure, httpOnly cookie
            document.cookie = `auth_token=${token}; path=/; max-age=604800; SameSite=Lax; Secure`;

            // Redirect to dashboard after successful registration
            router.push("/account");
        } catch (err: any) {
            setError(err.message || "An error occurred during registration");
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <h1 className="text-2xl font-semibold">Регистрация</h1>
                {error && <p className="text-red-500">{error}</p>}
                <RegisterFormFieldset formControl={control}/>
                <Button disabled={isSubmitting}>{isSubmitting ? "Отправка данных..." : "Создать аккаунт"}</Button>
                <p className="text-sm">Есть аккаунт? <a href="/login"
                                                        className="text-primary hover:underline">Авторизуйтесь</a>
                </p>
            </form>
        </FormProvider>
    );
}


