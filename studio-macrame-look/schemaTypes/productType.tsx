import React from "react";
import { defineType } from "sanity";
import { StandardColorInput } from "../components/standardColorInput";

export const productType = defineType({
    name: "product",
    title: "Ապրանքներ",
    type: "document",

    fields: [
        {
            name: "title",
            title: "Վերնագիր",
            type: "string",
            validation: (Rule) => Rule.required(),
        },

        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },

        {
            name: "category",
            title: "Կատեգորիա",
            type: "reference",
            to: [{ type: "category" }],
            validation: (Rule) => Rule.required(),
        },

        {
            name: "images",
            title: "Նկարներ",
            type: "array",
            of: [
                {
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                },
            ],
            validation: (Rule) => Rule.required().min(1),
        },

        {
            name: "description",
            title: "Նկարագրություն",
            type: "text",
            rows: 4,
        },

        {
            name: "rentalPrice",
            title: "Վարձույթի արժեք",
            type: "number",
            description: "Արժեքը՝ մեկ վարձույթի համար",
        },

        {
            name: "minQuantity",
            title: "Մինիմալ քանակ",
            type: "number",
            initialValue: 1,
            validation: (Rule) => Rule.min(1),
        },

        {
            name: "maxQuantity",
            title: "Առկա քանակ",
            type: "number",
            initialValue: 1,
        },

        {
            name: "dimensions",
            title: "Չափսեր",
            type: "string",
            description: "Օր.՝ 200 × 300 սմ",
        },
        
        {
            name: "colors",
            title: "Գույներ",
            type: "array",

            of: [
                {
                    type: "object",

                    fields: [
                        {
                            name: "colorType",
                            title: "Գույնի տեսակ",
                            type: "string",

                            initialValue: "standard",

                            options: {
                                list: [
                                    {
                                        title: "Ստանդարտ գույն",
                                        value: "standard",
                                    },
                                    {
                                        title: "Custom գույն",
                                        value: "custom",
                                    },
                                ],

                                layout: "radio",
                            },
                        },

                        {
                            name: "standardColor",
                            title: "Ստանդարտ գույն",
                            type: "reference",

                            to: [
                                {
                                    type: "standardColor",
                                },
                            ],

                            components: {
                                input: StandardColorInput,
                            },

                            hidden: ({ parent }) =>
                                parent?.colorType !== "standard",

                            validation: (Rule) =>
                                Rule.custom((value, context) => {
                                    const parent = context.parent as
                                        | {
                                            colorType?: string;
                                        }
                                        | undefined;

                                    if (
                                        parent?.colorType === "standard" &&
                                        !value
                                    ) {
                                        return "Ընտրեք գույն";
                                    }

                                    return true;
                                }),
                        },

                        {
                            name: "customName",
                            title: "Գույնի անուն",
                            type: "string",

                            hidden: ({ parent }) =>
                                parent?.colorType !== "custom",

                            validation: (Rule) =>
                                Rule.custom((value, context) => {
                                    const parent = context.parent as
                                        | {
                                            colorType?: string;
                                        }
                                        | undefined;

                                    if (
                                        parent?.colorType ===
                                        "custom" &&
                                        !value
                                    ) {
                                        return "Մուտքագրեք գույնի անունը";
                                    }

                                    return true;
                                }),
                        },

                        {
                            name: "customValue",
                            title: "Երանգ",
                            type: "color",

                            hidden: ({ parent }) =>
                                parent?.colorType !== "custom",

                            validation: (Rule) =>
                                Rule.custom((value, context) => {
                                    const parent = context.parent as
                                        | {
                                            colorType?: string;
                                        }
                                        | undefined;

                                    if (
                                        parent?.colorType ===
                                        "custom" &&
                                        !value
                                    ) {
                                        return "Ընտրեք երանգ";
                                    }

                                    return true;
                                }),
                        },
                    ],

                    preview: {
                        select: {
                            colorType: "colorType",

                            standardColorTitle:
                                "standardColor.title",

                            standardColorHex:
                                "standardColor.value.hex",

                            customName: "customName",

                            customHex:
                                "customValue.hex",
                        },

                        prepare({
                            colorType,
                            standardColorTitle,
                            standardColorHex,
                            customName,
                            customHex,
                        }) {
                            const isCustom =
                                colorType === "custom";

                            const title = isCustom
                                ? customName ||
                                "Custom գույն"
                                : standardColorTitle ||
                                "Ստանդարտ գույն";

                            const hex = isCustom
                                ? customHex
                                : standardColorHex;

                            return {
                                title,

                                subtitle:
                                    hex ||
                                    "Գույն ընտրված չէ",

                                media: (
                                    <div
                                        style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: "50%",
                                            backgroundColor:
                                                hex ||
                                                "#e5e5e5",
                                            border:
                                                "1px solid #ccc",
                                            boxSizing:
                                                "border-box",
                                        }}
                                    />
                                ),
                            };
                        },
                    },
                },
            ],
        },

        {
            name: "material",
            title: "Նյութ",
            type: "string",
        },

        {
            name: "available",
            title: "Առկա է վարձույթի համար",
            type: "boolean",
            initialValue: true,
        },

        {
            name: "featured",
            title: "Ցուցադրել գլխավոր էջում",
            type: "boolean",
            initialValue: false,
        },
    ],
});