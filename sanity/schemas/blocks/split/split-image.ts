import { defineField, defineType } from "sanity";
import { Image } from "lucide-react";

export default defineType({
  name: "split-image",
  type: "object",
  icon: Image,
  description: "Column with full image.",
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
      name: "caption",
      type: "object",
      fields: [
        defineField({
          name: "title",
          type: "string",
        }),
        defineField({
          name: "description",
          type: "string",
        }),
        defineField({
          name: "icon",
          type: "image",
        }),
      ],
      title: "Caption",
      description: "Caption for the image",
    }),
  ],
  preview: {
    select: {
      title: "image.alt",
    },
    prepare({ title }) {
      return {
        title: title || "No Title",
      };
    },
  },
});
