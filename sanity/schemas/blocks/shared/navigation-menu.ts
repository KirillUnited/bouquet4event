import { defineField, defineType } from "sanity";
import { Menu } from "lucide-react";

export default defineType({
  name: "navigation-menu",
  title: "Меню навигации",
  type: "object",
  icon: Menu,
  fields: [
    defineField({
      name: "title",
      title: "Название меню",
      type: "string",
      description: "Внутреннее название для этого меню навигации",
      validation: (rule) => rule.required().error("Menu title is required"),
    }),
    defineField({
      name: "menuItems",
      title: "Элементы меню",
      type: "array",
      of: [
         {
           type: "object",
           name: "menuItem",
           title: "Элемент меню",
           fields: [
             defineField({
               name: "linkType",
               title: "Тип ссылки",
               type: "string",
               options: {
                 list: [
                   { title: "Внутренняя страница", value: "page" },
                   { title: "Внешняя ссылка", value: "external" },
                 ],
                 layout: "radio",
               },
               initialValue: "external",
               validation: (rule) => rule.required().error("Тип ссылки обязателен"),
             }),
             defineField({
               name: "label",
               title: "Название",
               type: "string",
               hidden: ({ parent }) => parent?.linkType === "page",
               validation: (rule) => rule.required().error("Название элемента меню обязательно"),
             }),
             defineField({
               name: "pageReference",
               title: "Страница",
               type: "reference",
               to: [{ type: "page" }],
               hidden: ({ parent }) => parent?.linkType !== "page",
               validation: (rule) => 
                 rule.custom((value, context) => {
                   const parent = context.parent as any;
                   if (parent?.linkType === "page" && !value) {
                     return "Выберите страницу";
                   }
                   return true;
                 }),
             }),
             defineField({
               name: "href",
               title: "Ссылка",
               type: "string",
               description: "Введите URL (например: /about, https://example.com)",
               hidden: ({ parent }) => parent?.linkType !== "external",
               validation: (rule) => 
                 rule.custom((value, context) => {
                   const parent = context.parent as any;
                   if (parent?.linkType === "external" && !value) {
                     return "Ссылка обязательна для внешних ссылок";
                   }
                   return true;
                 }),
             }),
             defineField({
               name: "target",
               title: "Открывать в новой вкладке",
               type: "boolean",
               initialValue: false,
               hidden: ({ parent }) => parent?.linkType === "page",
             }),
             defineField({
               name: "description",
               title: "Описание",
               type: "string",
               description: "Необязательное описание для элемента меню",
             }),
           ],
          preview: {
            select: {
              title: "label",
              href: "href",
              linkType: "linkType",
              pageTitle: "pageReference.title",
              pageSlug: "pageReference.slug.current",
            },
            prepare({ title, href, linkType, pageTitle, pageSlug }) {
              let subtitle = "Нет ссылки";
              
              if (linkType === "page" && pageTitle) {
                subtitle = `Страница: ${pageTitle}`;
              } else if (linkType === "external" && href) {
                subtitle = href;
              }
              
              return {
                title: title || "Элемент меню",
                subtitle,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.max(10).error("Максимум 10 элементов меню"),
      options: {
        layout: "list",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      itemCount: "menuItems.length",
    },
    prepare({ title, itemCount }) {
      return {
        title: title || "Меню навигации",
        subtitle: `${itemCount || 0} menu items`,
      };
    },
  },
});
