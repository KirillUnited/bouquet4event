import { defineField, defineType } from "sanity";
import { User } from "lucide-react";

export default defineType({
    name: "userAccount",
    title: "Счет пользователя",
    type: "document",
    icon: User,
    fields: [
        defineField({
            name: "userId",
            title: "ID пользователя",
            type: "string",
            description: "Уникальный идентификатор пользователя",
            validation: (Rule) => Rule.required().warning("ID пользователя обязателен"),
        }),
        defineField({
            name: "name",
            title: "Имя пользователя",
            type: "string",
            description: "Полное имя пользователя",
            validation: (Rule) => Rule.required().warning("Имя пользователя обязательно"),
        }),
        defineField({
            name: "phone",
            title: "Телефон",
            type: "string",
            description: "Номер телефона пользователя в международном формате (например, +7XXXXXXXXXX)",
            validation: (Rule) => Rule.required().warning("Телефон обязателен"),
        }),
        defineField({
            name: "region",
            title: "Регион",
            type: "string",
            description: "Регион пользователя (например, Москва, Санкт-Петербург)",
            validation: (Rule) => Rule.required().warning("Регион обязателен"),
        }),
        defineField({
            name: "privacyPolicy",
            title: "Согласие на обработку персональных данных",
            type: "boolean",
            description: "Согласие на обработку персональных данных пользователя",
        }),
        defineField({
            name: "totalAmount",
            title: "Сумма перечисленных денег",
            type: "number",
            description: "Сумма денег, перечисленных на этот счёт (RUB)",
            validation: (Rule) => Rule.required().precision(2),
            initialValue: 0,
        }),
        defineField({
            name: "createdAt",
            title: "Дата создания",
            type: "datetime",
            description: "Дата создания аккаунта пользователя",
            validation: (Rule) => Rule.required(),
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: "donations",
            title: "Пожертвования",
            type: "array",
            description: "Пожертвования пользователя",
            of: [{ 
                type: "object",
                name: "donation",
                fields: [
                    {
                        name: "amount",
                        title: "Сумма пожертвования",
                        type: "number",
                        description: "Сумма пожертвования пользователя",
                    },
                    {
                        name: "date",
                        title: "Дата пожертвования",
                        type: "datetime",
                        description: "Дата пожертвования пользователя",
                    },
                    {
                        name: "email",
                        title: "Email",
                        type: "string",
                        description: "Email пользователя",
                    }
                ]
            }],
        })
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "userId",
            description: "totalAmount",
        },
        prepare({ title, subtitle, description }) {
            return {
                title: title || "Без имени",
                subtitle: `ID: ${subtitle} | Сумма: ${description} RUB`,
            };
        },
    },
});