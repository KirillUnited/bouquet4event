import { PhoneIcon } from 'lucide-react';
import { MailIcon } from "lucide-react";
import { ContactIcon } from "lucide-react";
import { MapIcon } from 'lucide-react';
import { ClockIcon } from 'lucide-react';
import { WebcamIcon } from 'lucide-react';
import { defineField, defineType } from "sanity";

export const contactInfoType = defineType({
    name: "contactInfo",
    title: "Contact Information",
    type: "object",
    icon: ContactIcon,
    fields: [
        defineField({
            name: "phones",
            title: "Phones",
            type: "array",
            of: [{
                type: "object",
                fields: [
                    defineField({ name: "number", type: "string", title: "Phone Number" }),
                    defineField({ name: "text", type: "string", title: "Display Text" }),
                    defineField({ name: "link", type: "string", title: "Link" })
                ],
                icon: PhoneIcon,
            }],
        }),
        defineField({
            name: "emails",
            title: "Emails",
            type: "array",
            of: [{
                type: "object",
                fields: [
                    defineField({ name: "email", type: "string", title: "Email", validation: (Rule) => Rule.email().error("Invalid email format") }),
                    defineField({ name: "text", type: "string", title: "Display Text" }),
                    defineField({ name: "link", type: "string", title: "Link" })
                ],
                icon: MailIcon,
            }],
        }),
        defineField({
            name: "address",
            title: "Адрес",
            type: "array",
            of: [{
                type: "object",
                fields: [
                    defineField({ name: "location", type: "string", title: "Локация" }),
                    defineField({ name: "text", type: "string", title: "Текст" }),
                    defineField({ name: "link", type: "url", title: "Ссылка на карту" }),
                    defineField({ name: "mapEmbed", type: "text", title: "Виджет с картой" }),
                ],
                icon: MapIcon,
            }],
        }),
        defineField({
            name: "workingHours",
            title: "Рабочие часы",
            type: "string",
            icon: ClockIcon,
        }),
        defineField({
            name: "socialLinks",
            title: "Социальные сети",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "platform",
                            type: "string",
                            title: "Platform",
                            options: {
                                list: [
                                    { title: "Instagram", value: "instagram" },
                                    { title: "Telegram", value: "telegram" },
                                    { title: "Viber", value: "viber" },
                                    { title: "WhatsApp", value: "whatsapp" }
                                ]
                            }
                        }),
                        defineField({ name: "url", type: "url", title: "URL" })
                    ],
                    icon: WebcamIcon,
                },
            ],
        }),
    ],
});