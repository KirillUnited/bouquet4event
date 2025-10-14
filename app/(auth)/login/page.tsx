"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type FormValues = z.infer<typeof Schema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: 'same-origin' // Important for cookies
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Login failed");
      }
      
      const { token } = await res.json();
      
      // Set the auth token as a secure, httpOnly cookie
      document.cookie = `auth_token=${token}; path=/; max-age=604800; SameSite=Lax; Secure`;
      
      // Redirect to dashboard after successful login
      window.location.href = "/account";
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-2xl font-semibold">Вход в аккаунт</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input placeholder="Email" className="w-full border p-2" {...register("email")} />
      {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
      <input placeholder="Password" type="password" className="w-full border p-2" {...register("password")} />
      {errors.password && <span className="text-xs text-red-600">{errors.password.message}</span>}
      <button disabled={isSubmitting} className="w-full bg-black text-white py-2">{isSubmitting ? "Авторизация..." : "Войти в аккаунт"}</button>
    </form>
  );
}


