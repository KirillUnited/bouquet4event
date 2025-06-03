import { defineField, defineType } from "sanity";
import { ControlsIcon } from "@sanity/icons";

export const siteSettingsType = defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    icon: ControlsIcon,
    fields: [
        defineField({
            name: "siteContactInfo",
            type: "contactInfo",
        }),
        defineField({
            name: "siteLegalInfo",
            title: "Реквизиты",
            type: "text",
        }),
    ],
    preview: {
        prepare() {
            return {
                title: "Site Settings",
            };
        },
    },
});