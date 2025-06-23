import { defineField, defineType } from "sanity";
import { LayoutGrid } from "lucide-react";

export default defineType({
  name: "grid-product",
  type: "object",
  icon: LayoutGrid,
  fields: [
    defineField({
      name: "product",
      type: "reference",
      title: "Product",
      description: "Select a product to link to.",
      to: [{ type: "product" }],
    }),
  ],
  preview: {
    select: {
      title: "product.title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: "Grid Card",
        subtitle: title || "No title",
        media,
      };
    },
  },
});
