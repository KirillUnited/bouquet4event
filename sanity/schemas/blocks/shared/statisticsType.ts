import {defineField, defineType} from "sanity";

export default defineType({
    name: "statistics",
    type: "object",
    title: "Statistics",
    description: "Add statistics or key metrics to display",
    fields: [
        defineField({
            name: "items",
            type: "array",
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
        }),
    ]
});