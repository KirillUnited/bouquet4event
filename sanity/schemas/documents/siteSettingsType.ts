import { defineField, defineType } from "sanity";
import { ControlsIcon } from "@sanity/icons";
import { CreditCardIcon } from "lucide-react";

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
            type: 'array',
            title: 'Payment Method',
            icon: CreditCardIcon,
            of: [{
                type: 'object',
                icon: CreditCardIcon,
                fields: [
                    {
                        name: 'method',
                        type: 'string',
                        icon: CreditCardIcon,
                        options: {
                            list: [
                                { title: 'Card', value: 'creditCard' },
                                { title: 'Bank Transfer', value: 'bankTransfer' },
                            ],
                        }
                    },
                    {
                        name: 'icon',
                        type: 'object',
                        title: 'Payment Method Icon',
                        fields: [
                            {
                                name: 'iconType',
                                type: 'string',
                                title: 'Icon Type',
                                options: {
                                    list: [
                                        { title: 'Font Awesome Icon', value: 'faicon' },
                                        { title: 'Upload Image', value: 'image' }
                                    ]
                                }
                            },
                            {
                                name: 'faicon',
                                type: 'string',
                                title: 'Font Awesome Icon Class Name',
                                description: 'Enter the Font Awesome icon class name (e.g. "fa-solid fa-heart")',
                                hidden: ({ parent }) => parent?.iconType !== 'faicon'
                            },
                            {
                                name: 'imageIcon',
                                type: 'image',
                                title: 'Icon Image',
                                options: {
                                    hotspot: true
                                },
                                hidden: ({ parent }) => parent?.iconType !== 'image'
                            }
                        ]
                    }
                ],
            }],
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