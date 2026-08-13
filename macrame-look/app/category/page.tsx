import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { client } from "@/lib/sanity/client";
import { categoriesQuery, featuredProductsQuery } from "@/lib/sanity/queries";
import { Product } from "@/lib/types/product";
import ProductCard from "@/components/products/ProductCard";

type Category = {
    _id: string;
    title: string;
    value: string;
};

export default async function ProductsByCategory() {
    const [products, categories] = await Promise.all([
        client.fetch<Product[]>(
            featuredProductsQuery,
            {},
            {
                next: {
                    revalidate: 60,
                },
            }
        ),

        client.fetch<Category[]>(
            categoriesQuery,
            {},
            {
                next: {
                    revalidate: 60,
                },
            }
        ),
    ]);

    return (
        <section className="section">
            <div className="container">
                {categories.map((category) => {
                    const categoryProducts = products
                        .filter(
                            (product) =>
                                product.category?.value ===
                                category.value
                        )
                        .slice(0, 5);

                    if (!categoryProducts.length) {
                        return null;
                    }

                    return (
                        <div
                            key={category._id}
                            className="category-row"
                        >
                            {/* Category heading */}
                            <div className="category-head">
                                <div>
                                    <h2>{category.title}</h2>

                                    <div className="divider" />
                                </div>

                                <Link
                                    href={`/products?category=${category.value}`}
                                    className="view-more"
                                >
                                    Դիտել բոլորը
                                    <ArrowRightIcon size={13} />
                                </Link>
                            </div>

                            {/* Products */}
                            <div className="products-row">
                                {categoryProducts
                                    .filter(
                                        (product) =>
                                            product.category?.value === category.value
                                    )
                                    .slice(0, 5)
                                    .map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                        />
                                    ))}
                            </div>

                            {/* Mobile */}
                            <div className="mt-5 flex justify-center sm:hidden">
                                <Link
                                    href={`/products?category=${category.value}`}
                                    className="flex items-center gap-1 text-xs text-light-purple"
                                >
                                    Դիտել բոլորը
                                    <ArrowRightIcon size={13} />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}