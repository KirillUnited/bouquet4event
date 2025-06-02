import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "split-content",
  type: "object",
  icon: TextQuote,
  title: "Split Content",
  description: "Column with tag line, title and content body.",
  fields: [
    defineField({
      name: "sticky",
      type: "boolean",
      description: "Sticky column on desktop",
      initialValue: false,
    }),
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      description: "Select a background color variant",
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
    defineField({
      name: "statistics",
      type: "array",
      title: "Statistics",
      description: "Add statistics or key metrics to display",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "value",
              type: "string",
              title: "Value",
              description: "The numerical value or metric (e.g. '100+' or '2M')"
            },
            {
              name: "label",
              type: "string",
              title: "Label",
              description: "Description of the statistic"
            },
            {
              name: "highlight",
              type: "boolean",
              title: "Highlight",
              description: "Whether to visually emphasize this statistic",
              initialValue: false
            }
          ]
        }
      ],
      validation: Rule => Rule.max(4).warning('Maximum of 4 statistics recommended')
    }),
    defineField({
      name: "link",
      type: "link",
      description:
        "Link to a page or external URL. Leave empty to hide the link.",
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
