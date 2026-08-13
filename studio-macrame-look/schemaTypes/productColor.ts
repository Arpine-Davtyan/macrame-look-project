import { defineField, defineType } from "sanity";

export const productColorType = defineType({
    name: "productColor",
    title: "Գույն",
    type: "object",

    fields: [
        defineField({
            name: "hex",
            title: "HEX",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ],
});