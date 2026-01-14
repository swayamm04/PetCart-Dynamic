import { ShopListing } from "@/components/features/shop/ShopListing";
import { promises as fs } from "fs";
import path from "path";

async function getProducts() {
    const filePath = path.join(process.cwd(), 'src/data/products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export const metadata = {
    title: "Shop - PetShop",
    description: "Browse our collection of pet essentials.",
};

export default async function ShopPage(props: {
    searchParams: Promise<{ category?: string; sort?: string }>;
}) {
    const searchParams = await props.searchParams;
    const activeCategory = searchParams.category;
    const products = await getProducts();

    return <ShopListing activeCategory={activeCategory} products={products} />;
}
