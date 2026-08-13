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
        slug,
        description,
        rentalPrice,
        minQuantity,
        maxQuantity,
        dimensions,
        material,
        category,
        available,
        featured,

        images[] {
            _key,
            asset
        },

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
        slug,
        description,
        rentalPrice,
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

        images[] {
            _key,
            asset
        },

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
        slug,
        description,
        rentalPrice,
        minQuantity,
        maxQuantity,
        dimensions,
        material,
        category,
        available,
        featured,

        images[] {
            _key,
            asset
        },

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
        slug,
        rentalPrice,
        minQuantity,
        maxQuantity,

        category-> {
            _id,
            title,
            value
        },

        available,
        featured,

        images[] {
            _key,
            asset
        },

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
            }
        }
    }
`;