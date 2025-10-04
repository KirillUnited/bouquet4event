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
              name: "label",
              title: "Название",
              type: "string",
              validation: (rule) => rule.required().error("Menu item label is required"),
            }),
            defineField({
              name: "href",
              title: "Ссылка",
              type: "string",
              validation: (rule) => rule.required().error("Ссылка на элемент меню обязательна"),
            }),
            defineField({
              name: "target",
              title: "Открывать в новой вкладке",
              type: "boolean",
              initialValue: false,
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
              subtitle: "href",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Элемент меню",
                subtitle: subtitle || "Нет ссылки",
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
