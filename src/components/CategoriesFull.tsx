import { useState } from "react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

interface CategoriesFullProps {
    defaultCategory?: string;
}

const CategoriesFull = ({ defaultCategory }: CategoriesFullProps) => {
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory || categories[0].name);

    return (
        <div className="min-h-[calc(100vh-180px)] bg-white flex overflow-hidden animate-in fade-in duration-300 mb-20">

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
            <div className="flex-1 h-full overflow-y-auto bg-white">
                <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100">
                    <h2 className="text-sm md:text-lg font-bold text-gray-900">
                        {selectedCategory} <span className="text-gray-400 font-normal">({products.length})</span>
                    </h2>
                </div>

                <div className="p-3 pb-32">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {products.map((product, idx) => (
                            <ProductCard key={idx} {...product} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CategoriesFull;
