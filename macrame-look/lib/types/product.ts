import type React from "react";

export type StandardColor = {
    _id: string;
    title: string;
    value?: {
        hex?: string;
        alpha?: number;
    } | null;
};

export type ProductImage = {
    _key?: string;
    asset: {
        _ref: string;
    };
};

export type ProductColor = {
    _key?: string;
    colorType?: "standard" | "custom";
    standardColor?: StandardColor | null;
    customName?: string;
    customValue?: {
        hex?: string;
        alpha?: number;
    } | null;
    images?: ProductImage[];
};

export type ProductGalleryProps = {
    images: ProductImage[];
    title: string;
};

export type RentalPrices = {
    oneToThreeDays?: number;
    threeToFiveDays?: number;
    fivePlusDays?: number;
};

export type Category = {
    _id: string;
    title: string;
    value: string;
};

export type Product = {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    mainImage: ProductImage;
    description?: string;
    rentalPrices: RentalPrices;
    minQuantity?: number;
    maxQuantity?: number;
    dimensions?: string;
    material?: string;
    category?: Category | null;
    available?: boolean;
    featured?: boolean;
    colors?: ProductColor[];
};

export type RentalModalProps = {
    productId: string;
    productTitle: string;
    productSlug: string;
    rentalPrices: RentalPrices;
    minQuantity: number;
    maxQuantity: number;
    productSize?: string;
    productMaterial?: string;
    colors?: ProductColor[];
    available?: boolean;
};

export type RentalForm = {
    fullName: string;
    phone: string;
    startDate: string;
    endDate: string;
    quantity: number;
    color: string;
    message: string;
    totalPrice: number;
};

export type RentalModalFormProps = {
    rentalPrices: RentalPrices;
    minQuantity: number;
    maxQuantity: number;
    colors?: ProductColor[];
    loading?: boolean;
    form: RentalForm;
    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => void;
    handleSubmit: (
        e: React.FormEvent<HTMLFormElement>,
        totalPrice: number
    ) => void;
};

export type CreateOrderInput = {
    project?: string | null;
    type?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    client_name?: string | null;
    client_phone?: string | null;
    client_message?: string | null;
    product_id?: string | null;
    product_title?: string | null;
    product_slug?: string | null;
    product_color?: string | null;
    product_size?: string | null;
    product_qty?: number | null;
    order_note?: string | null;
    rental_price?: number | null;
    product_material?: string | null;
    active?: boolean | null;
    order_status?: string | null;
    total_price?: number | null;
};