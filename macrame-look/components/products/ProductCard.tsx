import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { Product } from "@/lib/types/product";
import ProductColors from "./ProductColors";

const ProductCard = ({ product }: { product: Product }) => {
    const image = product.images?.[0];

    return (
        <Link
            key={product._id}
            href={`/products/${product.slug?.current}`}
            className="group product-card"
        >
            <div className="product-card-image-box">
                {image && (
                    <Image
                        src={urlFor(image).width(700).height(700).url()}
                        alt={
                            product.title
                        }
                        fill
                        sizes="
                            (max-width: 640px) 50vw,
                            (max-width: 768px) 33vw,
                            (max-width: 1024px) 25vw,
                            20vw
                        "
                        className="product-card-image"
                    />
                )}
            </div>

            {/* Content */}
            <div className="px-3 py-3">
                <p className="product-card-title">
                    {product.title}
                </p>

                {product.rentalPrice !== undefined && (
                    <p className="product-card-text">
                        {product.rentalPrice.toLocaleString(
                            "hy-AM"
                        )}{" "}
                        ֏ / օր
                    </p>
                )}

                <div className="mt-4">
                    <ProductColors colors={product.colors} />
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
