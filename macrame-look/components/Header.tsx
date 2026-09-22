import { categoriesQuery } from "@/lib/sanity/queries";
import Navbar from "./Navbar";
import { Category } from "@/lib/types/product";
import { client } from "@/lib/sanity/client";

const Header = async () => {
    const categories = await client.fetch<Category[]>(
        categoriesQuery,
        {},
        {
            next: { revalidate: 60 },
        }
    );

    return (
        <header>
            <Navbar categories={categories} />
        </header>
    );
};

export default Header;