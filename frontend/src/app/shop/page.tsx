import { ShopListing } from "@/components/features/shop/ShopListing";
import { Product } from "@/types/product";


export const metadata = {
    title: "Shop - PetShop",
    description: "Browse our collection of pet essentials.",
};

export default async function ShopPage(props: {
    searchParams: Promise<{ category?: string; sort?: string; search?: string }>;
}) {
    const searchParams = await props.searchParams;
    const activeCategory = searchParams.category;
    const searchQuery = searchParams.search;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    // Fetch from Backend
    let products = [];
    try {
        const query = searchQuery ? `?keyword=${searchQuery}` : '';
        const res = await fetch(`${API_URL}/products${query}`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            // Map for frontend compatibility
            products = data.map((p: Product & { _id?: string }) => ({
                ...p,
                id: p._id,
                regularPrice: p.price,
                discountPercentage: p.salePrice ? Math.round(((p.price - p.salePrice) / p.price) * 100) : 0,
                inStock: p.stock > 0
            }));
        }
    } catch (e) {
        console.error("Failed to fetch shop products", e);
    }

    return <ShopListing activeCategory={activeCategory} products={products} />;
}
