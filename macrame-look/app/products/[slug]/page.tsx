import { notFound } from "next/navigation";

import { client } from "@/lib/sanity/client";

import ProductGallery from "@/components/products/ProductGallery";
import ProductColors from "@/components/products/ProductColors";

import { productQuery } from "@/lib/sanity/queries";
import { Product } from "@/lib/types/product";
import RentalModal from "@/components/products/RentalModal";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProductDetailsPage({
    params,
}: PageProps) {
    const { slug } = await params;

    const product: Product | null = await client.fetch(
        productQuery,
        { slug },
        {
            next: {
                revalidate: 60,
            },
        }
    );

    if (!product) {
        notFound();
    }

    return (
        <main className="container mx-auto mt-30 mb-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 xl:gap-20">
                <div className="min-w-0">
                    <ProductGallery
                        images={product.images}
                        title={product.title}
                    />
                </div>

                <div className="flex flex-col">
                    {/* Title */}
                    <h4>{product.title}</h4>
                    <div className="divider mb-5" />

                    {product.rentalPrice !== undefined && (
                        <p className="simple-text font-dm-sans mb-5">
                            {product.rentalPrice.toLocaleString("hy-AM")}{" "}֏ / օր
                        </p>
                    )}

                    {/* Description */}
                    {product.description && (
                        <p className="simple-text font-dm-sans font-normal mb-5">
                            {product.description}
                        </p>
                    )}

                    {product.dimensions && (
                        <div className="data-item">
                            <span className="font-semibold">
                                Չափս:
                            </span>

                            <span>{product.dimensions}</span>
                        </div>
                    )}

                    {product.material && (
                        <div className="data-item">
                            <span className="font-semibold">
                                Նյութ:
                            </span>

                            <span>{product.material}</span>
                        </div>
                    )}

                    {product.material && (
                        <div className="data-item">
                            <span className="font-semibold">
                                Մինիմալ քանակ:
                            </span>

                            <span>{product.minQuantity} հատ</span>
                        </div>
                    )}

                    {product.colors && (
                        <div className="data-item">
                            <span className="font-semibold">
                                Գույն:
                            </span>

                            <ProductColors colors={product.colors} />
                        </div>
                    )}

                    {product.available && (
                        <RentalModal
                            productId={product._id}
                            productTitle={product.title}
                            productSlug={product.slug.current}
                            rentalPrice={product.rentalPrice}
                            colors={product.colors}
                            minQuantity={product.minQuantity ?? 1}
                            maxQuantity={product.maxQuantity ?? 1}
                            productSize={product.dimensions}
                            productMaterial={product.material}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}