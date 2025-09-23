import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "split-content",
  type: "object",
  icon: TextQuote,
  title: "Split Content",
  description: "Column with tag line, title and content body.",
  groups: [
    {
      title: "Layout",
      name: "layout",
    },
    {
      title: "Content",
      name: "content",
    },
    {
      title: "Info List",
      name: "infoList",
    }
  ],
  fields: [
    defineField({
      name: "sticky",
      type: "boolean",
      description: "Sticky column on desktop",
      initialValue: false,
      group: "layout",
    }),
    defineField({
      name: "padding",
      type: "section-padding",
      group: "layout",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      description: "Select a background color variant",
      group: "layout",
    }),
    defineField({
      name: "tagLine",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "body",
      type: "block-content",
      group: "content",
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
      validation: Rule => Rule.max(4).warning('Maximum of 4 statistics recommended'),
      group: "infoList",
    }),
    defineField({
      name: "infoList",
      type: "split-info-list",
      title: "Info List",
      group: "infoList",
    }),
    defineField({
      name: "footerBody",
      type: "block-content",
      group: "content",
    }),
    defineField({
      name: "link",
      type: "link",
      description:
        "Link to a page or external URL. Leave empty to hide the link.",
      group: "content",
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
