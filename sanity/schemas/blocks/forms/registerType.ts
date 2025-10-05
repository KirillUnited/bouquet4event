import { defineField, defineType } from "sanity";
import { UserPlus } from "lucide-react";
import { STACK_ALIGN } from "../shared/layout-variants";

export default defineType({
    name: "form-register",
    type: "object",
    title: "Форма для оформления подписки",
    description: "Регистрация для оформления подписки",
    icon: UserPlus,
    groups: [
        {
            name: "layout",
            title: "Layout",
        },
        {
            name: "content",
            title: "Content",
        },
        {
          name: "form",
          title: "Form",
        },
        {
            name: "SEM",
            title: "SEO/Marketing",
        }
    ],
    fields: [
        defineField({
            name: "padding",
            type: "section-padding",
            group: "layout",
        }),
        defineField({
            name: "colorVariant",
            type: "color-variant",
            title: "Color Variant",
            description: "Select a background color variant",
            group: "layout",
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
            group: "layout",
        }),
        defineField({
            name: "title",
            type: "string",
            title: "Form Title",
            initialValue: "Зарегистрировать цветочный счёт",
            group: "content",
        }),
        defineField({
            name: "description",
            type: "text",
            title: "Form Description",
            initialValue: "Заполните форму, и мы свяжемся с вами в ближайшее время, чтобы обсудить все детали вашей цветочной подписки.",
            group: "content",
        }),
        defineField({
           name: 'form',
           title: 'Форма регистрации',
           type: 'wizardForm',
           group: 'form'
        }),
        defineField({
            name: "privacyPolicyText",
            type: "text",
            title: "Privacy Policy Text",
            initialValue: "Я согласен с политикой конфиденциальности",
            group: "form",
        }),
        defineField({
            name: "buttonText",
            type: "string",
            title: "Submit Button Text",
            initialValue: "Зарегистрироваться",
            group: "form",
        }), 
        defineField({
            name: "successMessage",
            type: "text",
            title: "Success Message",
            initialValue: "Ваш счёт успешно зарегистрирован!",
            group: "form",
        }),
        defineField({
            name: "goal",
            title: "Цель в Яндекс.Метрике",
            type: "yandexGoal",
            group: "SEM",
        }),
    ],
    preview: {
        select: {
            title: 'title'
        },
        prepare({title}) {
            return {
                title: "Forms",
                subtitle: title
            };
        },
    },
});