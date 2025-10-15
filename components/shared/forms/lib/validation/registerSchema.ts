import * as z from "zod";

/**
 * Deprecated form schema, use SubscriptionSchema instead
 */
export const FormSchema = z.object({
    name: z.string().min(1, { message: "Пожалуйста, введите ваше имя" }),
    phone: z.string()
        .min(1, { message: "Пожалуйста, введите ваш телефон" })
        .regex(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, {
            message: "Телефон должен соответствовать формату +7 (XXX) XXX-XX-XX"
        }),
    region: z.string().min(1, { message: "Пожалуйста, выберите ваш регион" }),    
    email: z.string().email('Введите корректный email'),
    password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }),
    eventDate: z.date({
        required_error: "Пожалуйста, введите дату",
    }),
    privacyPolicy: z.boolean().refine(val => val === true, {
        message: "Необходимо согласиться с политикой конфиденциальности"
    }),
});