import { useState, useEffect, useRef } from "react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Skeleton } from "./ui/skeleton";
import Footer from "./Footer";

interface CategoriesFullProps {
    defaultCategory?: string;
    onProductClick?: (name: string) => void;
}

const CategoriesFull = ({ defaultCategory, onProductClick }: CategoriesFullProps) => {
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory || categories[0].name);
    const [isLoading, setIsLoading] = useState(false);

    const rightContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 600);

        // Reset scroll position on category change
        if (rightContentRef.current) {
            rightContentRef.current.scrollTop = 0;
        }

        return () => clearTimeout(timer);
    }, [selectedCategory]);

    return (
        <div className="h-full bg-white flex overflow-hidden animate-in fade-in duration-300">

            {/* Left Sidebar - Categories */}
            <div className="w-[100px] md:w-1/4 bg-gray-50 h-full overflow-y-auto border-r border-gray-200 hide-scrollbar">
                {categories.map((cat, idx) => {
                    const isActive = selectedCategory === cat.name;
                    return (
                        <div
                            key={idx}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex flex-col items-center justify-center p-3 cursor-pointer transition-all border-b border-gray-100 ${isActive ? "bg-white border-l-4 border-l-[#45a049]" : "hover:bg-gray-100 border-l-4 border-l-transparent"
                                }`}
                        >
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center p-2 mb-1 ${isActive ? "bg-[#E6F4F1]" : "bg-white"}`}>
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-contain mix-blend-multiply"
                                />
                            </div>
                            <span className={`text-[10px] md:text-sm text-center leading-tight ${isActive ? "font-bold text-[#45a049]" : "font-medium text-gray-500"}`}>
                                {cat.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Right Content - Products */}
            <div
                ref={rightContentRef}
                className="flex-1 h-full overflow-y-auto bg-white flex flex-col"
            >
                <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100">
                    <h2 className="text-sm md:text-lg font-bold text-gray-900">
                        {selectedCategory} <span className="text-gray-400 font-normal">({products.filter(p => p.category === selectedCategory).length})</span>
                    </h2>
                </div>

                <div className="flex-1 flex flex-col">
                    {isLoading ? (
                        <div className="p-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <Skeleton className="w-full aspect-square rounded-2xl md:rounded-3xl" />
                                    <div className="space-y-2 px-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                        <Skeleton className="h-4 w-1/4 mt-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.filter(p => p.category === selectedCategory).length > 0 ? (
                        <div className="p-3 pb-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {products
                                .filter(p => p.category === selectedCategory)
                                .map((product, idx) => (
                                    <ProductCard
                                        key={idx}
                                        {...product}
                                        onProductClick={onProductClick}
                                    />
                                ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400 opacity-60">
                            <p className="text-sm font-medium">No products available in this category</p>
                        </div>
                    )}
                </div>
                <Footer />
            </div>

        </div>
    );
};

export default CategoriesFull;
