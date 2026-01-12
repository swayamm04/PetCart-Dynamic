import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/features/shop/ProductCard";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    { name: "All", img: "/images/category-all.jpg", value: null },
    { name: 'Dogs', img: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=300&h=300&fit=crop', value: 'Dogs' },
    { name: 'Cats', img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=300&h=300&fit=crop', value: 'Cats' },
    { name: 'Birds', img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&h=300&fit=crop', value: 'Birds' },
    { name: 'Fish', img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=300&h=300&fit=crop', value: 'Fish' },
];

interface ShopListingProps {
    activeCategory?: string;
}

export function ShopListing({ activeCategory }: ShopListingProps) {
    const filteredProducts = activeCategory
        ? products.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())
        : products;

    return (
        <div className="max-w-5xl mx-auto bg-gray-50 min-h-screen">
            <div className="flex">
                {/* Left Sidebar */}
                <aside className="w-24 md:w-32 shrink-0 bg-white border-r h-[calc(100vh-130px)] sticky top-[130px] overflow-y-auto no-scrollbar py-6">
                    <div className="flex flex-col items-center gap-6 px-2">
                        {CATEGORIES.map((cat, idx) => {
                            const isActive = activeCategory === cat.value || (!activeCategory && cat.value === null);
                            return (
                                <Link
                                    key={idx}
                                    href={cat.value ? `/shop?category=${cat.value}` : '/shop'}
                                    className="group flex flex-col items-center gap-2 w-full"
                                >
                                    <div className={cn(
                                        "relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300",
                                        isActive ? "bg-yellow-100 ring-2 ring-yellow-400 ring-offset-2" : "bg-gray-100 group-hover:bg-gray-200"
                                    )}>
                                        {cat.name === "All" ? (
                                            <span className="text-xs font-bold text-gray-500">ALL</span>
                                        ) : (
                                            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden">
                                                <Image
                                                    src={cat.img}
                                                    alt={cat.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <span className={cn(
                                        "text-[10px] md:text-xs font-bold text-center leading-tight max-w-[80px]",
                                        isActive ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                                    )}>
                                        {cat.name}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6">
                    <div className="mb-6 flex items-baseline justify-between border-b pb-4">
                        <h1 className="text-xl md:text-2xl font-black text-black">
                            {activeCategory || "All Products"} <span className="text-gray-400 font-medium text-lg ml-2">({filteredProducts.length})</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No products found</h3>
                            <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-2">
                                We couldn't find any products in this category. Try selecting another category.
                            </p>
                            <Link
                                href="/shop"
                                className="mt-6 px-6 py-2 bg-yellow-400 text-black text-sm font-bold rounded-full hover:bg-yellow-500 transition-colors"
                            >
                                View All Products
                            </Link>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
