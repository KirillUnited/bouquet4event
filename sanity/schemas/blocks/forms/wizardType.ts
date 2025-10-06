import { defineField, defineType } from 'sanity'
import { Calendar, Clock, Gift, Palette, List } from 'lucide-react'

// Custom option type that can be reused
export const optionType = defineType({
    name: 'option',
    title: 'Option',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Display Text',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'emoji',
            title: 'Emoji (optional)',
            type: 'string',
            description: 'Add an emoji to display before the option'
        }),
        defineField({
            name: 'description',
            title: 'Description (optional)',
            type: 'string',
            description: 'Additional text shown below the option'
        })
    ],
    preview: {
        select: {
            title: 'title',
            emoji: 'emoji',
            subtitle: 'value'
        },
        prepare({ title, emoji, subtitle }) {
            return {
                title: `${emoji ? emoji + ' ' : ''}${title}`,
                subtitle: subtitle
            }
        }
    }
})

// Custom field type for dynamic options
export const customFieldType = defineType({
    name: 'customField',
    title: 'Custom Field',
    type: 'object',
    fields: [
        defineField({
            name: 'fieldType',
            title: 'Field Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Radio Buttons', value: 'radio' },
                    { title: 'Dropdown', value: 'dropdown' },
                    { title: 'Checkbox', value: 'checkbox' },
                    { title: 'Text Input', value: 'text' },
                    { title: 'Date Picker', value: 'date' }
                ],
                layout: 'radio'
            },
            initialValue: 'radio',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'name',
            title: 'Field Name',
            type: 'string',
            description: 'Unique identifier for this field (used in form submission)',
            validation: Rule => Rule.required().regex(/^[a-zA-Z0-9_]+$/, {
                name: 'alphanumeric and underscores only'
            })
        }),
        defineField({
            name: 'label',
            title: 'Field Label',
            type: 'string',
            description: 'Display label for the field',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'options',
            title: 'Options',
            type: 'array',
            of: [{ type: 'option' }],
            hidden: ({ parent }) => !['radio', 'dropdown', 'checkbox'].includes(parent?.fieldType)
        }),
        defineField({
            name: 'isRequired',
            title: 'Required Field',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'defaultValue',
            title: 'Default Value',
            type: 'string',
            description: 'Default value for the field'
        })
    ],
    preview: {
        select: {
            title: 'label',
            type: 'fieldType',
            required: 'isRequired'
        },
        prepare({ title, type, required }) {
            return {
                title,
                subtitle: `${type} ${required ? '(required)' : '(optional)'}`
            }
        }
    }
})

export default defineType({
    name: 'wizardForm',
    title: 'Wizard Form',
    type: 'object',
    fields: [
        defineField({
            name: 'steps',
            title: 'Form Steps',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'step',
                    title: 'Step',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Step Title',
                            type: 'string',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'description',
                            title: 'Step Description',
                            type: 'text',
                            rows: 2
                        }),
                        defineField({
                            name: 'fields',
                            title: 'Fields',
                            type: 'array',
                            of: [{ type: 'customField' }]
                        })
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            fieldCount: 'fields.length'
                        },
                        prepare({ title, fieldCount }) {
                            return {
                                title: title || 'Untitled Step',
                                subtitle: `${fieldCount || 0} field(s)`
                            }
                        }
                    }
                }
            ]
        })
    ],
    preview: {
        select: {
            steps: 'steps'
        },
        prepare({ steps = [] }) {
            return {
                title: 'Wizard Form',
                subtitle: `${steps.length} step(s)`,
                media: List
            }
        }
    }
})