"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import { RegisterFormFieldset } from "@/components/shared/forms";

const Schema = z.object({
  name: z.string().min(1, 'Введите имя'),
  phone: z.string().min(5, 'Введите корректный номер телефона'),
  region: z.string().min(1, 'Введите регион'),
  email: z.string().email('Введите корректный email'),
  password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
});

type FormValues = z.infer<typeof Schema>;

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<FormValues>({ resolver: zodResolver(Schema) });
  const { control, handleSubmit, formState: { errors, isSubmitting } } = form;
  const router = useRouter();
  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: 'same-origin' // Important for cookies
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Registration failed");
      }
      
      const { token } = await res.json();
      
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
        {/* <TextInput control={control} name="name" label="Имя" placeholder="Введите ваше имя" required/>
        <PhoneInput control={control} name="phone" label="Телефон" placeholder="Введите ваш номер телефона" required/>
        <TextInput control={control} name="region" label="Регион" placeholder="Введите ваш регион" required/>
        <TextInput control={control} name="email" label="Email" placeholder="Введите ваш email" required/>
        <TextInput control={control} name="password" label="Пароль" placeholder="Введите ваш пароль" type="password" required/> */}
        <RegisterFormFieldset formControl={control} />
        <Button disabled={isSubmitting}>{isSubmitting ? "Отправка данных..." : "Создать аккаунт"}</Button>
      </form>
    </FormProvider>
  );
}


