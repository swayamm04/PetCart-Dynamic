import { ShopListing } from "@/components/features/shop/ShopListing";

export const metadata = {
    title: "Shop - PetShop",
    description: "Browse our collection of pet essentials.",
};

export default async function ShopPage(props: {
    searchParams: Promise<{ category?: string; sort?: string }>;
}) {
    const searchParams = await props.searchParams;
    const activeCategory = searchParams.category;

    return <ShopListing activeCategory={activeCategory} />;
}
