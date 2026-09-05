import React from "react";
import { defineType } from "sanity";

import { StandardColorInput } from "../components/standardColorInput";
import { ColorImagesInput } from "../components/colorImagesInput";

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
            name: "mainImage",
            title: "Գլխավոր նկար",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: () => Math.random().toString(36).substring(2, 16),
                maxLength: 20,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "category",
            title: "Կատեգորիա",
            type: "reference",
            to: [
                {
                    type: "category",
                },
            ],
            validation: (Rule) => Rule.required(),
        },
        {
            name: "description",
            title: "Նկարագրություն",
            type: "text",
            rows: 4,
        },
        {
            name: "rentalPrices",
            title: "Վարձույթի արժեքներ",
            type: "object",
            fields: [
                {
                    name: "oneToThreeDays",
                    title: "1–3 օր",
                    type: "number",
                    validation: (Rule) => Rule.required().min(0),
                },
                {
                    name: "threeToFiveDays",
                    title: "3–5 օր",
                    type: "number",
                    validation: (Rule) => Rule.required().min(0),
                },
                {
                    name: "fivePlusDays",
                    title: "5+ օր",
                    type: "number",
                    validation: (Rule) => Rule.required().min(0),
                },
            ],
            validation: (Rule) => Rule.required(),
        },
        {
            name: "minQuantity",
            title: "Մինիմալ քանակ",
            type: "number",
            initialValue: 1,
            validation: (Rule) => Rule.required().min(1),
        },
        {
            name: "maxQuantity",
            title: "Առկա քանակ",
            type: "number",
            initialValue: 1,
            validation: (Rule) => Rule.required().min(0),
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
                            validation: ( Rule ) => Rule.required(),
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
                            hidden: ({
                                parent,
                            }) =>
                                parent?.colorType !== "standard",

                            validation: (
                                Rule
                            ) =>
                                Rule.custom(
                                    (
                                        value,
                                        context
                                    ) => {
                                        const parent =
                                            context.parent as
                                            | {
                                                colorType?: string;
                                            }
                                            | undefined;
                                        if (
                                            parent?.colorType ===
                                            "standard" &&
                                            !value
                                        ) {
                                            return "Ընտրեք գույն";
                                        }
                                        return true;
                                    }
                                ),
                        },
                        {
                            name: "customName",
                            title: "Գույնի անուն",
                            type: "string",
                            hidden: ({
                                parent,
                            }) =>
                                parent?.colorType !== "custom",
                            validation: (
                                Rule
                            ) =>
                                Rule.custom(
                                    (
                                        value,
                                        context
                                    ) => {
                                        const parent =
                                            context.parent as
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
                                    }
                                ),
                        },
                        {
                            name: "customValue",
                            title: "Երանգ",
                            type: "color",
                            hidden: ({
                                parent,
                            }) =>
                                parent?.colorType !== "custom",
                            validation: (
                                Rule
                            ) =>
                                Rule.custom(
                                    (
                                        value,
                                        context
                                    ) => {
                                        const parent =
                                            context.parent as
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
                                    }
                                ),
                        },
                        {
                            name: "images",
                            title: "Նկարներ այս գույնի համար",
                            type: "array",
                            of: [
                                {
                                    type: "image",
                                    options: {
                                        hotspot: true,
                                    },
                                },
                            ],
                            options: {
                                layout: "grid",
                            },
                            components: {
                                input: ColorImagesInput,
                            },
                            validation: (Rule) => Rule.optional(),
                        },
                    ],
                    preview: {
                        select: {
                            colorType: "colorType",
                            standardColorTitle: "standardColor.title",
                            standardColorHex: "standardColor.value.hex",
                            customName: "customName",
                            customHex: "customValue.hex",
                            images: "images",
                        },

                        prepare({
                            colorType,
                            standardColorTitle,
                            standardColorHex,
                            customName,
                            customHex,
                            images,
                        }) {
                            const isCustom = colorType === "custom";

                            const title =
                                isCustom
                                    ? customName ||
                                    "Custom գույն"
                                    : standardColorTitle ||
                                    "Ստանդարտ գույն";

                            const hex = isCustom ? customHex : standardColorHex;

                            return {
                                title,
                                subtitle: hex || "Գույն ընտրված չէ",
                                media:
                                    images?.[0] ||
                                    (
                                        <div
                                            style={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: "50%",
                                                backgroundColor: hex || "#e5e5e5",
                                                border: "1px solid #ccc",
                                                boxSizing: "border-box",
                                            }}
                                        />
                                    ),
                            };
                        },
                    },
                },
            ],

            validation: (Rule) => Rule.required().min(1),
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