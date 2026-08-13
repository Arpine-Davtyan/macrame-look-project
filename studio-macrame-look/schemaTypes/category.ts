import { defineField, defineType } from "sanity";

export const categoryType = defineType({
    name: "category",
    title: "Կատեգորիաներ",
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
            title: "Value",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ],
});