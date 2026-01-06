import React, { useState, useEffect } from "react";
import { Search, X, MapPin } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(products);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!query) {
            setResults(products); // Show popular/all by default or empty
            return;
        }
        const filtered = products.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-white animate-in fade-in duration-200">
            {/* Search Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 shadow-sm">
                <button onClick={onClose} className="p-2 -ml-2 text-gray-500 rounded-full hover:bg-gray-100">
                    <X className="w-6 h-6" />
                </button>
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for products..."
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#45a049] transition-all"
                    />
                </div>
            </div>

            {/* Results Area */}
            <div className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
                {query && <p className="text-xs font-bold text-gray-500 mb-4">{results.length} RESULTS</p>}

                {results.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-20">
                        {results.map((product, idx) => (
                            <ProductCard key={idx} {...product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
                        <Search className="w-12 h-12 mb-2 opacity-20" />
                        <p className="text-sm">No products found for "{query}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchOverlay;
