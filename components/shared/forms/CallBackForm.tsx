'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { openCheckoutMessage } from '@/lib/messenger';
import TextInput from "./ui/TextInput";
import PhoneInput from "@/components/shared/forms/ui/PhoneInput";
import React from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: 'Пожалуйста, введите ваше имя' }),
  phone: z.string()
    .min(1, { message: 'Пожалуйста, введите ваш телефон' })
    .regex(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, {
      message: 'Телефон должен соответствовать формату +7 (XXX) XXX-XX-XX'
    }),
});

export default function CallBackForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userId = `callback_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      
      // Send data to Telegram
      await openCheckoutMessage({
        userId,
        name: values.name,
        phone: values.phone,
        region: 'Обратный звонок',
        date: new Date().toISOString(),
        totalAmount: 0,
        privacyPolicy: true,
        privacyPolicyData: true
      });

      toast.success('Запрос на обратный звонок отправлен! Мы свяжемся с вами в ближайшее время.');
      form.reset();

      // Yandex.Metrika target
      if (typeof window !== "undefined" && typeof (window as any).ym === "function") {
        const target = `obrzvonok`;

        if (target) {
          (window as any).ym(103963322, "reachGoal", target);
          console.log(`Yandex.Metrika: цель ${target} отправлена`);
        }
      }
    } catch (error: any) {
      console.error('Error submitting callback form:', error);
      toast.error('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <TextInput
              control={form.control}
              name="name"
              label="Имя"
              placeholder="Введите ваше имя"
              className="mt-1"
              required
          />
          <PhoneInput
              control={form.control}
              name="phone"
              required
              className="mt-1"
          />
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Заказать звонок'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
