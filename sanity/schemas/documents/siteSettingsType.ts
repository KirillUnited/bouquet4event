import { defineField, defineType } from "sanity";
import { ControlsIcon } from "@sanity/icons";

export const siteSettingsType = defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    icon: ControlsIcon,
    groups: [
        {
            name: "siteInfo",
            title: "Информация о сайте",
        },
        {
            name: "siteContact",
            title: "Контактная информация",
        },
    ],
    fields: [
        defineField({
            name: "siteContactInfo",
            type: "contactInfo",
            group: "siteContact",
        }),
        defineField({
            name: "siteLegalInfo",
            title: "Реквизиты",
            type: "text",
            group: "siteInfo",
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