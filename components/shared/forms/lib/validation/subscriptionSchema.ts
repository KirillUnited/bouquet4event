import * as z from 'zod';

// Schema for form validation
export const subscriptionSchema = z.object({
    eventType: z.string().min(1, 'Пожалуйста, выберите тип события'),
    eventDate: z.date().optional(),
    style: z.string().min(1, 'Пожалуйста, выберите стиль букета'),
    duration: z.string().min(1, 'Пожалуйста, выберите длительность подписки'),
    name: z.string().min(2, 'Имя должно содержать хотя бы 2 символа'),
    phone: z.string().min(10, 'Введите корректный номер телефона'),
    email: z.string().email('Введите корректный email'),
    privacyPolicy: z.boolean().refine(val => val === true, {
        message: "Необходимо согласиться с политикой конфиденциальности"
    }),
    privacyPolicyData: z.boolean().refine(val => val === true, {
        message: "Необходимо согласиться с обработкой персональных данных"
    }),
});