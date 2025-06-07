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
        defineField({
            name: 'paymentMethod',
            type: 'object',
            title: 'Payment Method',
            fields: [
                {
                    name: 'method',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Card', value: 'creditCard' },
                            { title: 'Bank Transfer', value: 'bankTransfer' },
                        ],
                    }
                },
                {
                    name: 'icon',
                    type: 'image',
                    title: 'Payment Method Icon',
                    fields: [
                        {
                            name: 'faicon',
                            type: 'string',
                            title: 'Font Awesome Icon Class Name',
                            description: 'Enter the Font Awesome icon class name (e.g. "fa-solid fa-heart")',
                        },
                    ],
                    options: {
                        hotspot: true
                    }
                }
            ]
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