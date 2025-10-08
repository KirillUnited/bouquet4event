import * as z from 'zod';

// Schema for form validation
export const subscriptionSchema = z.object({
    eventType: z.string().min(1, 'Пожалуйста, выберите тип события'),
    eventDate: z.date().optional(),
    style: z.string().min(1, 'Пожалуйста, выберите стиль букета'),
    duration: z.string().min(1, 'Пожалуйста, выберите длительность подписки'),
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
});