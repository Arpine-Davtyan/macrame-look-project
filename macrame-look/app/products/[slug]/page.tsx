import { notFound } from "next/navigation";

import { client } from "@/lib/sanity/client";
import { productQuery } from "@/lib/sanity/queries";

import { Product } from "@/lib/types/product";
import ProductDetails from "@/components/products/ProductDetails";


type PageProps = {
    params: Promise<{ slug: string; }>;
};

export default async function ProductPage({
    params,
}: PageProps) {
    const { slug } = await params;

    const product = await client.fetch<Product | null>(
        productQuery,
        { slug },
        {
            next: { revalidate: 60 },
        }
    );

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto mt-10 px-4">
            <ProductDetails product={product} />
        </div>
    );
}