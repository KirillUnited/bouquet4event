import { defineField, defineType } from 'sanity'
import { ChartBarIcon } from 'lucide-react'
import { count } from '@/lib/utils'

export default defineType({
    name: 'breadcrumbs',
    title: 'Breadcrumbs',
    icon: ChartBarIcon,
    type: 'object',
    fields: [
        defineField({
            name: "padding",
            type: "section-padding",
        }),
        defineField({
            name: "colorVariant",
            type: "color-variant",
            title: "Color Variant",
            description: "Select a background color variant",
        }),
        defineField({
            name: 'crumbs',
            type: 'array',
            of: [{ type: 'link' }],
            description: 'Current page is automatically included',
        }),
        defineField({
            name: 'hideCurrent',
            title: 'Hide current page',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            crumbs: 'crumbs',
        },
        prepare: ({ crumbs }) => ({
            title: count(crumbs, 'crumb') + ' + Current page',
            subtitle: 'Breadcrumbs',
        }),
    },
})