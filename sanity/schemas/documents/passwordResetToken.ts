import { defineField, defineType } from "sanity";
import { Key } from "lucide-react";

export default defineType({
    name: "passwordResetToken",
    title: "Токен сброса пароля",
    type: "document",
    icon: Key,
    fields: [
        defineField({
            name: "userId",
            title: "ID пользователя",
            type: "string",
            validation: (Rule) => Rule.required().error("userId обязателен"),
        }),
        defineField({
            name: "token",
            title: "Токен",
            type: "string",
            validation: (Rule) => Rule.required().error("token обязателен"),
        }),
        defineField({
            name: "expiresAt",
            title: "Действителен до",
            type: "datetime",
            validation: (Rule) => Rule.required().error("expiresAt обязателен"),
        }),
        defineField({
            name: "createdAt",
            title: "Дата создания",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: "userId",
            subtitle: "expiresAt",
        },
    },
});


