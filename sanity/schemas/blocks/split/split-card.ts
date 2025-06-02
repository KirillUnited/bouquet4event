import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "split-card",
  type: "object",
  icon: TextQuote,
  title: "Split Card",
  description:
    "Column with tag line, title and content body. Part of a split cards.",
  fields: [
    defineField({
      name: "image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "icon",
      type: "string",
      title: "Font Awesome Icon",
      description: "Enter the Font Awesome icon class name (e.g. 'fa-solid fa-heart')",
    }),
    defineField({
      name: "tagLine",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No Title",
      };
    },
  },
});
