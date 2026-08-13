import { defineField, defineType } from "sanity";

export const standardColorType = defineType({
    name: "standardColor",
    title: "Ստանդարտ գույներ",
    type: "document",

    fields: [
        defineField({
            name: "title",
            title: "Անուն",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "value",
            title: "Գույն",
            type: "color",
            validation: (Rule) => Rule.required(),
        }),
    ],

    preview: {
        select: {
            title: "title",
            value: "value",
        },

        prepare({ title, value }) {
            return {
                title,
                subtitle: value?.hex,
            };
        },
    },
});