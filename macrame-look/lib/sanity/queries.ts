export const colorsQuery = `
    *[_type == "standardColor"] | order(title asc) {
        _id,
        title,

        value {
            hex,
            alpha
        }
    }
`;

export const categoriesQuery = `
    *[_type == "category"] | order(title asc) {
        _id,
        title,
        value
    }
`;

export const productsQuery = `
    *[
        _type == "product" &&
        available == true
    ] | order(_createdAt desc) {
        _id,
        title,

        slug {
            current
        },

        description,

        mainImage {
            _key,
            asset
        },

        rentalPrices {
            oneToThreeDays,
            threeToFiveDays,
            fivePlusDays
        },

        minQuantity,
        maxQuantity,
        dimensions,
        material,

        category-> {
            _id,
            title,
            value
        },

        available,
        featured,

        colors[] {
            _key,
            colorType,

            standardColor-> {
                _id,
                title,

                value {
                    hex,
                    alpha
                }
            },

            customName,

            customValue {
                hex,
                alpha
            },

            images[] {
                _key,
                asset
            }
        }
    }
`;

export const productsByCategoryQuery = `
    *[
        _type == "product" &&
        available == true &&
        category->value == $category
    ] | order(_createdAt desc) {
        _id,
        title,

        slug {
            current
        },

        description,

        mainImage {
            _key,
            asset
        },

        rentalPrices {
            oneToThreeDays,
            threeToFiveDays,
            fivePlusDays
        },

        minQuantity,
        maxQuantity,
        dimensions,
        material,

        category-> {
            _id,
            title,
            value
        },

        available,
        featured,

        colors[] {
            _key,
            colorType,

            standardColor-> {
                _id,
                title,

                value {
                    hex,
                    alpha
                }
            },

            customName,

            customValue {
                hex,
                alpha
            },

            images[] {
                _key,
                asset
            }
        }
    }
`;

export const productQuery = `
    *[
        _type == "product" &&
        slug.current == $slug
    ][0] {
        _id,
        title,

        slug {
            current
        },

        description,

        mainImage {
            _key,
            asset
        },

        rentalPrices {
            oneToThreeDays,
            threeToFiveDays,
            fivePlusDays
        },

        minQuantity,
        maxQuantity,
        dimensions,
        material,

        category-> {
            _id,
            title,
            value
        },

        available,
        featured,

        colors[] {
            _key,
            colorType,

            standardColor-> {
                _id,
                title,

                value {
                    hex,
                    alpha
                }
            },

            customName,

            customValue {
                hex,
                alpha
            },

            images[] {
                _key,
                asset
            }
        }
    }
`;

export const featuredProductsQuery = `
    *[
        _type == "product" &&
        available == true &&
        featured == true
    ] | order(_createdAt desc) {
        _id,
        title,

        slug {
            current
        },

        mainImage {
            _key,
            asset
        },

        rentalPrices {
            oneToThreeDays,
            threeToFiveDays,
            fivePlusDays
        },

        minQuantity,
        maxQuantity,

        category-> {
            _id,
            title,
            value
        },

        available,
        featured,

        colors[] {
            _key,
            colorType,

            standardColor-> {
                _id,
                title,
                value {
                    hex,
                    alpha
                }
            },

            customName,

            customValue {
                hex,
                alpha
            },

            images[] {
                _key,
                asset
            }
        }
    }
`;