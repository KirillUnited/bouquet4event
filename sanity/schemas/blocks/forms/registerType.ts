import { defineField, defineType } from "sanity";
import { UserPlus } from "lucide-react";
import { STACK_ALIGN } from "../shared/layout-variants";

export default defineType({
    name: "form-register",
    type: "object",
    title: "Form: Register",
    description: "A registration form for creating flower subscription accounts.",
    icon: UserPlus,
    fields: [
        defineField({
            name: "padding",
            type: "section-padding",
        }),
        defineField({
            name: "colorVariant",
            type: "color-variant",
            title: "Color Variant",
            description: "Select a background color variant",
        }),
        defineField({
            name: "stackAlign",
            type: "string",
            title: "Stack Layout Alignment",
            options: {
                list: STACK_ALIGN.map(({ title, value }) => ({ title, value })),
                layout: "radio",
            },
            initialValue: "left",
        }),
        defineField({
            name: "title",
            type: "string",
            title: "Form Title",
            initialValue: "Зарегистрировать цветочный счёт",
        }),
        defineField({
            name: "description",
            type: "text",
            title: "Form Description",
            initialValue: "Заполните форму, и мы свяжемся с вами в ближайшее время, чтобы обсудить все детали вашей цветочной подписки.",
        }),
        defineField({
            name: "privacyPolicyText",
            type: "text",
            title: "Privacy Policy Text",
            initialValue: "Я согласен с политикой конфиденциальности",
        }),
        defineField({
            name: "buttonText",
            type: "string",
            title: "Submit Button Text",
            initialValue: "Зарегистрироваться",
        }),
        defineField({
            name: "successMessage",
            type: "text",
            title: "Success Message",
            initialValue: "Ваш счёт успешно зарегистрирован!",
        }),
        defineField({
            name: "goal",
            title: "Цель в Яндекс.Метрике",
            type: "yandexGoal",
        }),
    ],
    preview: {
        prepare() {
            return {
                title: "Registration Form",
            };
        },
    },
});