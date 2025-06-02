import { defineField, defineType } from "sanity";
import { Info } from "lucide-react";
import { extractPlainText } from "../../../../lib/utils";
import { COLS_VARIANTS } from "../shared/layout-variants";

export default defineType({
  name: "split-info-list",
  type: "object",
  icon: Info,
  title: "Split Info List",
  description:
    "Column with list of cards. Each card has a title, content body, image and tags",
  fields: [
    defineField({
      name: "gridColumns",
      type: "string",
      title: "Grid Columns",
      options: {
        list: COLS_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
      initialValue: "grid-cols-4",
    }),
    defineField({
      name: "list",
      type: "array",
      of: [{ type: "split-info" }],
    }),
  ],
  preview: {
    select: {
      title: "list.0.title",
      subtitle: "list.0.body",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "No Title",
        subtitle: extractPlainText(subtitle) || "No Subtitle",
      };
    },
  },
});
