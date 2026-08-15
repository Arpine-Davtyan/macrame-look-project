import { client } from "@/lib/sanity/client";

import { categoriesQuery, productsQuery, productsByCategoryQuery } from "@/lib/sanity/queries";
import ProductCard from "@/components/products/ProductCard";
import { Category, Product } from "@/lib/types/product";

type ProductsPageProps = {
    searchParams: Promise<{
        category?: string;
    }>;
};

export default async function ProductsPage({
    searchParams,
}: ProductsPageProps) {
    const { category } = await searchParams;

    const [products, categories] = await Promise.all([
        category
            ? client.fetch<Product[]>(
                productsByCategoryQuery,
                {
                    category,
                }
            )
            : client.fetch<Product[]>(
                productsQuery
            ),

        client.fetch<Category[]>(
            categoriesQuery
        ),
    ]);

    const title = category
        ? categories.find(
            (item) =>
                item.value === category
        )?.title ?? category
        : "Բոլորը";

    return (
        <div className="container mx-auto mt-10">
            <div>
                <h2>{title}</h2>

                <div className="divider" />

                {products.length === 0 ? (
                    <p className="text-ink">
                        Այս կատեգորիայում ապրանքներ չկան։
                    </p>
                ) : (
                    <div className="products-row my-3">
                        {products
                            .slice(0, 5)
                            .map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}