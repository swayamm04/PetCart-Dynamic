"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ProductCard } from "@/components/features/shop/ProductCard";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

const CATEGORIES = [
    { name: "All", img: "/images/Category/All.png", value: null },
    { name: 'Dogs', img: '/images/Category/dog.png', value: 'Dogs' },
    { name: 'Cats', img: '/images/Category/cat.png', value: 'Cats' },
    { name: 'Birds', img: '/images/Category/bird.png', value: 'Birds' },
    { name: 'Fish', img: '/images/Category/fish.png', value: 'Fish' },
    { name: 'Other', img: '/images/Category/others.png', value: 'Other' },
];

const PRODUCT_TYPES = ['Food', 'Accessory', 'Medicine'];

interface ShopListingProps {
    activeCategory?: string;
    products: Product[];
}

import { useSearchParams } from "next/navigation";

export function ShopListing({ activeCategory, products }: ShopListingProps) {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

    const filteredProducts = products.filter((p) => {
        const matchesCategory = activeCategory
            ? p.category.toLowerCase() === activeCategory.toLowerCase()
            : true;
        const matchesType = selectedType
            ? p.type === selectedType
            : true;
        const matchesSearch = searchQuery
            ? p.name.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery)
            : true;

        return matchesCategory && matchesType && matchesSearch;
    });

    const toggleType = (type: string) => {
        setIsTypeDropdownOpen(false); // Close dropdown on selection
        setSelectedType(prev => prev === type ? null : type);
    };

    return (
        <div className="max-w-5xl mx-auto bg-gray-50 min-h-screen">
            <div className="flex">
                {/* Left Sidebar */}
                <aside className="w-24 md:w-48 shrink-0 bg-white border-r h-[calc(100vh-130px)] sticky top-[130px] overflow-y-auto no-scrollbar py-6 flex flex-col gap-8">
                    {/* Categories */}
                    <div className="flex flex-col items-center gap-6 px-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</h3>
                        {CATEGORIES.map((cat, idx) => {
                            const isActive = activeCategory === cat.value || (!activeCategory && cat.value === null);
                            return (
                                <Link
                                    key={idx}
                                    href={cat.value ? `/shop?category=${cat.value}` : '/shop'}
                                    className="group flex flex-col items-center gap-2 w-full"
                                >
                                    <div className={cn(
                                        "relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300",
                                        isActive ? "bg-yellow-100 ring-2 ring-yellow-400 ring-offset-2" : "bg-gray-100 group-hover:bg-gray-200"
                                    )}>
                                        {cat.name === "All" ? (
                                            <span className="text-[10px] font-bold text-gray-500">ALL</span>
                                        ) : (
                                            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
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
                        <div>
                            <h1 className="text-xl md:text-2xl font-black text-black">
                                {activeCategory || "All Products"}
                                <span className="text-gray-400 font-medium text-lg ml-2">({filteredProducts.length})</span>
                            </h1>
                            {selectedType && (
                                <div className="flex gap-2 mt-2">
                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-yellow-100 text-yellow-800 text-xs font-bold">
                                        {selectedType}
                                        <button
                                            onClick={() => setSelectedType(null)}
                                            className="ml-1 hover:text-yellow-900"
                                        >
                                            ×
                                        </button>
                                    </span>
                                    <button
                                        onClick={() => setSelectedType(null)}
                                        className="text-xs text-gray-500 hover:text-black underline ml-2"
                                    >
                                        Clear
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Type Filter Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-sm font-medium">Type</span>
                                <svg
                                    className={cn(
                                        "w-4 h-4 transition-transform",
                                        isTypeDropdownOpen ? "rotate-180" : ""
                                    )}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isTypeDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 py-1">
                                    {PRODUCT_TYPES.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => toggleType(type)}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between group"
                                        >
                                            <span className={cn(
                                                "font-medium",
                                                selectedType === type ? "text-yellow-600" : "text-gray-700"
                                            )}>
                                                {type}
                                            </span>
                                            {selectedType === type && (
                                                <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
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
                                We couldn&apos;t find any products in this category with the selected filters.
                            </p>
                            <button
                                onClick={() => setSelectedType(null)}
                                className="mt-6 px-6 py-2 bg-yellow-400 text-black text-sm font-bold rounded-full hover:bg-yellow-500 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
