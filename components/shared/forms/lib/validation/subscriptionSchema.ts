import * as z from 'zod';

// Schema for form validation
export const SubscriptionSchema = z.object({
    eventType: z.string().optional(),
    eventDate: z.date().optional(),
    style: z.string().optional(),
    duration: z.string().optional(),
    name: z.string().min(2, 'Имя должно содержать хотя бы 2 символа'),
    phone: z.string()
        .min(1, { message: "Пожалуйста, введите ваш телефон" })
        .regex(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, {
            message: "Введите корректный номер телефона"
        }),
    region: z.string().min(1, { message: "Пожалуйста, выберите ваш регион" }),
    email: z.string().email('Введите корректный email'),
    privacyPolicy: z.boolean().refine(val => val === true, {
        message: "Необходимо согласиться с политикой конфиденциальности"
    }),
    password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }),
});