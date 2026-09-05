"use client";

import { useState } from "react";
import { Product, ProductColor } from "@/lib/types/product";

import ProductGallery from "@/components/products/ProductGallery";
import ProductColors from "@/components/products/ProductColors";
import RentalModal from "./RentalModal";

type ProductDetailsProps = {
    product: Product;
};

export default function ProductDetails({
    product,
}: ProductDetailsProps) {
    const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);

    const [galleryImages, setGalleryImages] = useState(
        product.mainImage ? [product.mainImage] : []
    );

    const handleColorSelect = (color: ProductColor) => {
        setSelectedColor(color);

        if (color.images?.length) {
            setGalleryImages(color.images);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US").format(price);
    };

    return (
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14 xl:gap-20">

            <div className="min-w-0">
                <ProductGallery
                    images={galleryImages}
                    title={product.title}
                />
            </div>

            <div className="flex flex-col">
                <h4>{product.title}</h4>
                <div className="divider mb-5" />

                {product.rentalPrices && (
                    <div className="simple-text font-dm-sans mb-5 space-y-1">
                        {product.rentalPrices.oneToThreeDays !== undefined && (
                            <h4>
                                {formatPrice(product.rentalPrices.oneToThreeDays)} ֏ / օր
                            </h4>
                        )}

                        {product.rentalPrices.threeToFiveDays !== undefined && (
                            <p className="simple-text text-xs font-dm-sans font-normal">
                                <span className="font-semibold mr-1">
                                    4-5 օր:
                                </span>
                                {formatPrice(product.rentalPrices.threeToFiveDays)} ֏ / օր
                            </p>
                        )}

                        {product.rentalPrices.fivePlusDays !== undefined && (
                            <p className="simple-text text-xs font-dm-sans font-normal">
                                <span className="font-semibold mr-1">
                                    5-ից ավելի օր:
                                </span>
                                {formatPrice(product.rentalPrices.fivePlusDays)} ֏ / օր
                            </p>
                        )}
                    </div>
                )}

                {product.colors && product.colors.length > 0 && (
                    <div className="data-item">
                        <span className="font-semibold">Գույն:</span>

                        <ProductColors
                            colors={product.colors}
                            selectedColor={selectedColor}
                            onSelectColor={handleColorSelect}
                        />
                    </div>
                )}

                {product.dimensions && (
                    <div className="data-item">
                        <span className="font-semibold">Չափս:</span>
                        <span>{product.dimensions}</span>
                    </div>
                )}

                {product.material && (
                    <div className="data-item">
                        <span className="font-semibold">Նյութ:</span>
                        <span>{product.material}</span>
                    </div>
                )}

                {product.minQuantity !== undefined && (
                    <div className="data-item">
                        <span className="font-semibold">Մինիմալ քանակ:</span>
                        <span>{product.minQuantity} հատ</span>
                    </div>
                )}

                {product.description && (
                    <p className="simple-text font-dm-sans font-normal mt-5 mb-3">
                        {product.description}
                    </p>
                )}

                {product.available && (
                    <RentalModal
                        productId={product._id}
                        productTitle={product.title}
                        productSlug={product.slug.current}
                        rentalPrices={product.rentalPrices}
                        colors={product.colors}
                        minQuantity={product.minQuantity ?? 1}
                        maxQuantity={product.maxQuantity ?? 1}
                        productSize={product.dimensions}
                        productMaterial={product.material}
                    />
                )}
            </div>
        </div>
    );
}