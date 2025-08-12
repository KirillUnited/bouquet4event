import { defineField, defineType } from "sanity";
import { User } from "lucide-react";

export default defineType({
    name: "userAccount",
    title: "Счет пользователя",
    type: "document",
    icon: User,
    groups: [
        {
            name: "user",
            title: "Пользователь",
            default: true,
        },
        {
            name: "donations",
            title: "Пожертвования",
        },
        {
            name: "meta",
            title: "Мета данные",
        },
    ],
    fields: [
        defineField({
            name: "name",
            title: "Имя пользователя",
            type: "string",
            description: "Полное имя пользователя",
            validation: (Rule) => Rule.required().warning("Имя пользователя обязательно"),
            group: "user",
        }),
        defineField({
            name: "phone",
            title: "Телефон",
            type: "string",
            description: "Номер телефона пользователя в международном формате (например, +7XXXXXXXXXX)",
            validation: (Rule) => Rule.required().warning("Телефон обязателен"),
            group: "user",
        }),
        defineField({
            name: "date",
            title: "Дата мероприятия",
            type: "datetime",
            description: "Дата планируемого мероприятия",
            group: "user",
        }),
        defineField({
            name: "userDonationLink",
            title: "Ссылка на пополнение счета пользователя",
            type: "string",
            description: "Ссылка на пополнение счета пользователя",
            group: "donations",
        }),
        defineField({
            name: "userId",
            title: "ID пользователя",
            type: "string",
            description: "Уникальный идентификатор пользователя",
            validation: (Rule) => Rule.required().warning("ID пользователя обязателен"),
            group: "meta",
        }),
        defineField({
            name: "region",
            title: "Регион",
            type: "string",
            description: "Регион пользователя (например, Москва, Санкт-Петербург)",
            validation: (Rule) => Rule.required().warning("Регион обязателен"),
            group: "user",
        }),
        defineField({
            name: "privacyPolicy",
            title: "Согласие на обработку персональных данных",
            type: "boolean",
            description: "Согласие на обработку персональных данных пользователя",
            group: "meta",
        }),
        defineField({
            name: "totalAmount",
            title: "Сумма перечисленных денег",
            type: "number",
            description: "Сумма денег, перечисленных на этот счёт (RUB)",
            validation: (Rule) => Rule.required().precision(2),
            initialValue: 0,
            group: "donations",
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
                    // {
                    //     name: "email",
                    //     title: "Email",
                    //     type: "string",
                    //     description: "Email пользователя",
                    // },
                    {
                        name: "orderNumber",
                        title: "Номер заказа",
                        type: "string",
                    },
                    {
                        name: "amount",
                        title: "Сумма пожертвования",
                        type: "number",
                        description: "Сумма пожертвования пользователя",
                    },
                    defineField({
                        name: "createdAt",
                        title: "Дата создания пожертвования",
                        type: "datetime",
                        description: "Дата создания пожертвования пользователя",
                        validation: (Rule) => Rule.required(),
                        initialValue: () => new Date().toISOString(),
                    }),
                ]
            }],
            group: "donations",
        }),
        defineField({
            name: "createdAt",
            title: "Дата создания",
            type: "datetime",
            description: "Дата создания аккаунта пользователя",
            validation: (Rule) => Rule.required(),
            initialValue: () => new Date().toISOString(),
            group: "meta",
        }),
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