'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { createUserAccount } from '@/lib/userAccount';
import { openCheckoutMessage } from '@/lib/messenger';

export const formSchema = z.object({
  name: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
  phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
  region: z.string().default('Москва'),
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: 'Необходимо принять политику конфиденциальности',
  }),
  privacyPolicyData: z.boolean().refine(val => val === true, {
    message: 'Необходимо дать согласие на обработку персональных данных',
  }),
  eventDate: z.date().optional(),
  eventType: z.string().optional(),
  style: z.string().optional(),
  duration: z.string().optional(),
  email: z.string().email('Введите корректный email').optional(),
});

export type RegisterFormValues = z.infer<typeof formSchema>;

export interface UseRegisterFormProps {
  onSuccess?: (data: any) => void;
  goal?: string;
  customGoal?: string;
}

export const useRegisterForm = ({ onSuccess, goal, customGoal }: UseRegisterFormProps = {}) => {
  const [formValues, setFormValues] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      region: 'Москва',
      privacyPolicy: false,
      privacyPolicyData: false,
      eventDate: undefined,
      eventType: '',
      style: '',
      duration: '',
      email: '',
    },
  });

  const handleSend = useCallback(
    async (values: RegisterFormValues) => {
      try {
        setIsSubmitting(true);
        const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const userLink = `${process.env.NEXT_PUBLIC_SITE_URL}/payment/${userId}`;

        const result = await createUserAccount({
          userId,
          userDonationLink: userLink,
          name: values.name,
          phone: values.phone,
          region: values.region,
          date: values.eventDate || new Date(),
          totalAmount: 0,
          privacyPolicy: values.privacyPolicy,
          privacyPolicyData: values.privacyPolicyData,
          eventType: values.eventType,
          style: values.style,
          duration: values.duration,
          email: values.email,
        });

        if (result) {
          toast.success('Ваша заявка успешно отправлена!');
          setFormValues(result);
          form.reset();

          // Yandex.Metrika target
          if (typeof window !== 'undefined' && typeof (window as any).ym === 'function') {
            const target = goal || customGoal;
            if (target) {
              (window as any).ym(103963322, 'reachGoal', target);
              console.log(`Yandex.Metrika: цель ${target} отправлена`);
            }
          }

          await openCheckoutMessage(result);
          onSuccess?.(result);
          return result;
        } else {
          throw new Error('Не удалось отправить заявку. Пожалуйста, попробуйте позже.');
        }
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, goal, customGoal, onSuccess]
  );

  const onSubmit = form.handleSubmit(handleSend);

  return {
    form,
    formValues,
    isSubmitting,
    onSubmit,
    handleSend,
  };
};

export default useRegisterForm;
