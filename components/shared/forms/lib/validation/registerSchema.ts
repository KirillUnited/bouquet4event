import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(1, { message: "Пожалуйста, введите ваше имя" }),
    phone: z.string()
        .min(1, { message: "Пожалуйста, введите ваш телефон" })
        .regex(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, {
            message: "Телефон должен соответствовать формату +7 (XXX) XXX-XX-XX"
        }),
    region: z.string().min(1, { message: "Пожалуйста, выберите ваш регион" }),
    date: z.date({
        required_error: "Пожалуйста, введите дату",
    }),
    privacyPolicy: z.boolean().refine(val => val === true, {
        message: "Необходимо согласиться с политикой конфиденциальности"
    }),
    privacyPolicyData: z.boolean().refine(val => val === true, {
        message: "Необходимо согласиться с обработкой персональных данных"
    }),
});