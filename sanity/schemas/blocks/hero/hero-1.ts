import {defineField, defineType} from "sanity";
import {LayoutTemplate} from "lucide-react";
import {media} from "../media/media";

export default defineType({
    name: "hero-1",
    title: "Hero 1",
    type: "object",
    icon: LayoutTemplate,
    groups: [
        {
            name: "content",
        },
        {
            name: "media",
        },
        {
            name: "settings",
        }
    ],
    fields: [
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
            name: "media",
            title: "Media",
            type: "media",
            group: "media",
        }),
        defineField({
            name: "links",
            type: "array",
            of: [{type: "link"}],
            validation: (rule) => rule.max(2),
            group: "content",
        }),
        defineField({
            name: "statistics",
            type: "statistics",
            group: "content",
        }),
    ],
    preview: {
        select: {
            title: "title",
            media: "media.image"
        },
        prepare({title, media}) {
            return {
                title: "Hero 1",
                subtitle: title,
                media,
            };
        },
    },
});
