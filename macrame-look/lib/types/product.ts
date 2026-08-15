export type StandardColor = {
    _id: string;
    title: string;
    value?: {
        hex?: string;
        alpha?: number;
    } | null;
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
};

export type ProductImage = {
    _key?: string;

    asset: {
        _ref: string;
    };
};

export type ProductGalleryProps = {
    images: ProductImage[];
    title: string;
};

export type Product = {
    _id: string;
    title: string;

    slug: {
        current: string;
    };

    description?: string;
    rentalPrice?: number;
    minQuantity?: number;
    maxQuantity?: number;
    dimensions?: string;
    material?: string;

    category?: {
        _id: string;
        title: string;
        value: string;
    } | null;

    available?: boolean;
    featured?: boolean;

    colors?: ProductColor[];

    images: ProductImage[];
};

export type RentalModalProps = {
    productId: string;
    productTitle: string;
    productSlug: string;
    rentalPrice?: number;
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

    quantity: number;

    color: string;

    message: string;
};

export type RentalModalFormProps = {
    rentalPrice?: number;

    minQuantity: number;
    maxQuantity: number;

    colors?: ProductColor[];

    form: RentalForm;

    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => void;

    handleSubmit: (
        e: React.FormEvent<HTMLFormElement>
    ) => void;
};

export type CreateOrderInput = {
    project?: string | null;
    type?: string | null;
    order_date?: string | null;
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
    rental_price?: number;
    product_material?: string | null;
    active?: boolean | null;
    order_status?: string | null;
};

export type Category = {
    _id: string;
    title: string;
    value: string;
};