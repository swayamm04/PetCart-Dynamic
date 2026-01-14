"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Menu, PawPrint, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

import { products } from "@/data/products";

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();
    const { toggleCart, totalItems } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    // Hide search on Profile and Orders pages
    const isSearchVisible = !['/profile', '/orders'].some(path => pathname?.startsWith(path));

    // Check if on product details page
    const isProductDetails = /^\/shop\/[^/]+$/.test(pathname || "");

    const searchSuggestions = [
        "Search 'healthy snacks'",
        "Search 'dog food'",
        "Search 'cat toys'",
        "Search 'bird feed'",
        "Search 'shampoo'"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setSuggestionIndex((prev) => (prev + 1) % searchSuggestions.length);
                setIsFading(false);
            }, 500); // Wait for fade out to complete
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    // Updated: Move filtering to onChange to decouple showing logic
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim().length > 0) {
            const matches = products
                .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
                .map(p => p.name)
                .slice(0, 5);
            setSuggestions(matches);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const [tipIndex, setTipIndex] = useState(0);
    const [isTipFading, setIsTipFading] = useState(false);

    const petTips = [
        "Fresh water is essential for your pet's health",
        "Regular grooming keeps your pet happy",
        "Daily walks improve dog's mental health",
        "Cats need vertical space to explore",
        "Check your pet's paws after walks"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTipFading(true);
            setTimeout(() => {
                setTipIndex((prev) => (prev + 1) % petTips.length);
                setIsTipFading(false);
            }, 500);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/shop" },
        { name: "Orders", href: "/orders", protected: true },
        { name: "Profile", href: "/profile", protected: true },
    ];

    const handleProtectedNavigation = (e: React.MouseEvent, href: string) => {
        if (!user) {
            e.preventDefault();
            router.push("/login");
        }
    };

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            performSearch(searchQuery);
        }
    };

    const performSearch = (query: string) => {
        setShowSuggestions(false);
        setSearchQuery(query); // Update input if clicked from suggestion
        if (query.trim()) {
            router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
        } else {
            router.push('/shop');
        }
    };

    return (
        <>
            {/* Top Bar */}
            {/* Top Bar - Hidden on mobile product details */}
            <div className={`bg-yellow-500/90 text-black py-1.5 border-none relative z-50 ${isProductDetails ? 'hidden md:block' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative flex justify-center items-center">


                    <div className="flex items-center justify-center">
                        <span
                            className="transition-opacity duration-500 text-[10px] font-semibold tracking-wide text-center"
                            style={{ opacity: isTipFading ? 0 : 1 }}
                        >
                            {petTips[tipIndex]}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className={`sticky top-0 z-50 bg-gradient-to-r from-yellow-400 to-yellow-500 border-none shadow-none ${isProductDetails ? 'hidden md:block' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300">
                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-yellow-400 shadow-lg">
                                <PawPrint className="w-6 h-6 fill-current" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl font-black tracking-tight text-black">Petzy</span>
                                <span className="text-[10px] font-bold text-black/70">Instant</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8 mx-4">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => link.protected ? handleProtectedNavigation(e, link.href) : null}
                                        className={`text-sm font-bold uppercase tracking-wide transition-colors relative group ${isActive ? "text-black" : "text-black/60 hover:text-black"
                                            }`}
                                    >
                                        {link.name}
                                        <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-black transform transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                            }`} />
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Search Bar (Desktop) - Conditional */}
                        {isSearchVisible ? (
                            <div className="hidden lg:flex flex-1 max-w-lg relative group">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
                                    onClick={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click
                                    // Add onKeyDown listener here
                                    onKeyDown={handleSearch}
                                    className="w-full border-none rounded-xl py-3 pl-10 pr-12 text-sm font-medium focus:outline-none shadow-lg shadow-black/5 relative z-10 bg-transparent"
                                />
                                {/* Dynamic Placeholder */}
                                {!searchQuery && (
                                    <div className="absolute left-10 top-1/2 -translate-y-1/2 text-black/40 text-sm font-medium pointer-events-none transition-opacity duration-500 z-30" style={{ opacity: isFading ? 0 : 1 }}>
                                        {searchSuggestions[suggestionIndex]}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-white rounded-xl shadow-lg shadow-black/5 -z-0"></div>

                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 group-focus-within:text-black transition-colors duration-300 z-20" />

                                {/* Suggestions Dropdown */}
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-20 border border-gray-100">
                                        {suggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onMouseDown={(e) => {
                                                    e.preventDefault(); // Prevent focus loss
                                                    performSearch(suggestion);
                                                }}
                                                className="w-full text-left px-4 py-3 text-sm hover:bg-yellow-50 hover:text-yellow-700 transition-colors flex items-center gap-2 group"
                                            >
                                                <Search className="w-4 h-4 text-gray-400 group-hover:text-yellow-500" />
                                                <span className="font-medium text-gray-700 group-hover:text-yellow-900">{suggestion}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden lg:flex flex-1" /> // Spacer to keep alignment if needed, or just null
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {user ? (
                                <Link href="/profile" className="flex items-center gap-2 text-xs font-bold text-black hover:text-white transition-colors duration-300">
                                    <span className="font-semibold">Hello {user.name.split(' ')[0]}</span>
                                </Link>
                            ) : (
                                <Link href="/login" className="flex items-center gap-2 text-xs font-bold text-black hover:text-white transition-colors duration-300">
                                    <span className="font-bold">Login</span>
                                </Link>
                            )}


                            <button
                                onClick={toggleCart}
                                className="relative p-2 bg-black/10 rounded-full hover:bg-black/20 text-black"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Trigger - Removed as requested, replaced by Bottom Nav */}
                        </div>
                    </div>

                    {/* Search Bar (Mobile - Below) - Conditional */}
                    {isSearchVisible && (
                        <div className="md:hidden mt-4 relative group pb-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
                                    onClick={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    // Add onKeyDown listener here
                                    onKeyDown={handleSearch}
                                    className="w-full border-none rounded-xl py-3 pl-10 pr-10 text-sm font-semibold focus:outline-none shadow-lg shadow-black/5 text-neutral-800 relative z-10 bg-transparent"
                                />
                                {/* Dynamic Placeholder Mobile */}
                                {!searchQuery && (
                                    <div className="absolute left-10 top-1/2 -translate-y-1/2 text-neutral-400 text-sm font-semibold pointer-events-none transition-opacity duration-500 z-30" style={{ opacity: isFading ? 0 : 1 }}>
                                        {searchSuggestions[suggestionIndex]}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-white rounded-xl shadow-lg shadow-black/5 -z-0"></div>

                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 z-20" />

                                {/* Suggestions Dropdown (Mobile) */}
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-20 border border-gray-100">
                                        {suggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onMouseDown={(e) => {
                                                    e.preventDefault(); // Prevent focus loss
                                                    performSearch(suggestion);
                                                }}
                                                className="w-full text-left px-4 py-3 text-sm hover:bg-yellow-50 hover:text-yellow-700 transition-colors flex items-center gap-2 group"
                                            >
                                                <Search className="w-4 h-4 text-gray-400 group-hover:text-yellow-500" />
                                                <span className="font-medium text-gray-700 group-hover:text-yellow-900">{suggestion}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header >
            {/* End Main Header */}
        </>
    );
}
