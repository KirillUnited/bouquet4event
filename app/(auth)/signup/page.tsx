"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  region: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof Schema>;

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Registration failed");
      return;
    }
    // simplistic redirect
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input placeholder="Name" className="w-full border p-2" {...register("name")} />
      {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
      <input placeholder="Phone" className="w-full border p-2" {...register("phone")} />
      {errors.phone && <span className="text-xs text-red-600">{errors.phone.message}</span>}
      <input placeholder="Region" className="w-full border p-2" {...register("region")} />
      {errors.region && <span className="text-xs text-red-600">{errors.region.message}</span>}
      <input placeholder="Email" className="w-full border p-2" {...register("email")} />
      {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
      <input placeholder="Password" type="password" className="w-full border p-2" {...register("password")} />
      {errors.password && <span className="text-xs text-red-600">{errors.password.message}</span>}
      <button disabled={isSubmitting} className="w-full bg-black text-white py-2">{isSubmitting ? "Submitting..." : "Create account"}</button>
    </form>
  );
}


