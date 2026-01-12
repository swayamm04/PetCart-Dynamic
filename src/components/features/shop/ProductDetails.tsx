"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Star, Share2, Heart } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProductDetailsProps {
    id: string;
}

export function ProductDetails({ id }: ProductDetailsProps) {
    const product = products.find((p) => p.id === id);
    const { addToCart, items, updateQuantity, removeFromCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    if (!product) {
        notFound();
    }

    const cartItem = items.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        addToCart(product);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 flex items-center justify-between shadow-sm md:hidden">
                <Link href="/shop" className="p-2 -ml-2 text-gray-600">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex items-center gap-4">
                    <button className="text-gray-600"><Share2 className="w-5 h-5" /></button>
                    <button className="text-gray-600"><Heart className="w-6 h-6" /></button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto md:px-4 md:py-8">
                <div className="flex flex-col md:flex-row gap-0 md:gap-8 bg-white md:rounded-3xl md:shadow-sm md:p-8 md:min-h-[600px] overflow-hidden">

                    {/* Image Section */}
                    <div className="relative w-full aspect-square md:w-1/2 md:aspect-auto bg-white pt-14 md:pt-0">
                        <div className="relative w-full h-[300px] md:h-full flex items-center justify-center p-8">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Discount Badge */}
                        {product.discountPercentage > 0 && (
                            <div className="absolute top-20 left-4 md:top-4 md:left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full z-10">
                                {product.discountPercentage}% OFF
                            </div>
                        )}

                        {/* Pagination Dots (Mock) */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 ">
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 px-4 py-6 md:py-4 md:px-0">
                        {/* Tags */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded cursor-default uppercase tracking-wide">
                                {product.category}
                            </span>
                            <div className="flex items-center text-yellow-500 text-[10px] font-bold">
                                <Star className="w-3 h-3 fill-current mr-1" />
                                4.8 (120 reviews)
                            </div>
                        </div>

                        <h1 className="text-lg md:text-2xl font-black text-black leading-tight mb-2">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
                            <span className="flex items-center gap-1">⏱ 14 mins</span>
                        </div>

                        {/* Price Block */}
                        <div className="mb-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-black">
                                    ₹{product.salePrice.toFixed(0)}
                                </span>
                                {product.discountPercentage > 0 && (
                                    <span className="text-sm text-gray-400 line-through font-medium">
                                        MRP ₹{product.regularPrice.toFixed(0)}
                                    </span>
                                )}
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1">(Inclusive of all taxes)</p>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="font-bold text-black text-sm mb-2">About Product</h3>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                {product.description}
                                <br /><br />
                                Premium quality essentials for your beloved pets. Sourced from trusted partners to ensure safety and durability.
                            </p>
                        </div>

                        {/* Desktop Add to Cart (Hidden on Mobile) */}
                        <div className="hidden md:block mt-auto pt-6 border-t">
                            {quantity === 0 ? (
                                <Button
                                    onClick={handleAddToCart}
                                    className="w-full bg-black hover:bg-black/80 text-white h-12 text-sm font-bold rounded-xl shadow-lg shadow-black/10"
                                >
                                    Add to Cart
                                </Button>
                            ) : (
                                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, quantity - 1)} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-gray-100">
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="font-bold text-lg">{quantity}</span>
                                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-gray-100">
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <div className="font-bold text-base">
                                        ₹{(product.salePrice * quantity).toFixed(0)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Extended Details Section */}
                <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {/* Specifications Mock */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm">
                            <h3 className="font-black text-lg mb-6">Product Specifications</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                {[
                                    { label: "Brand", value: "Petzy Premium" },
                                    { label: "Breed Size", value: "All Breeds" },
                                    { label: "Life Stage", value: "Adult / All Ages" },
                                    { label: "Material/Type", value: product.category === "Food" ? "Organic Ingredients" : "Durable Safe Material" },
                                    { label: "Country of Origin", value: "India" },
                                    { label: "Return Policy", value: "Non-Returnable" }
                                ].map((spec, i) => (
                                    <div key={i} className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500 text-xs font-medium">{spec.label}</span>
                                        <span className="text-black text-xs font-bold">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Mock - Simple Header */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-black text-xl">Ratings & Reviews</h3>
                                <Button variant="outline" size="sm" className="rounded-full">Rate Product</Button>
                            </div>
                            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400 fill-current" />
                                <p className="font-medium">Be the first to review this product!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-12 mb-24 md:mb-12">
                    <h2 className="text-2xl font-black mb-6">Similar Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {products
                            .filter(p => p.category === product.category && p.id !== product.id)
                            .slice(0, 4)
                            .map(related => (
                                <Link key={related.id} href={`/shop/${related.id}`} className="group bg-white p-4 rounded-2xl shadow-sm border border-transparent hover:border-yellow-400 transition-all">
                                    <div className="relative aspect-square mb-3 bg-gray-50 rounded-xl overflow-hidden">
                                        <Image
                                            src={related.image}
                                            alt={related.name}
                                            fill
                                            className="object-contain p-2 group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <h4 className="font-bold text-sm text-black line-clamp-2 mb-1">{related.name}</h4>
                                    <div className="text-green-600 text-xs font-bold mb-2">{related.category}</div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-black">₹{related.salePrice.toFixed(0)}</span>
                                        {related.discountPercentage > 0 && (
                                            <span className="text-xs text-gray-400 line-through">₹{related.regularPrice.toFixed(0)}</span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        {products.filter(p => p.category === product.category && p.id !== product.id).length === 0 && (
                            <p className="text-gray-500 col-span-full">No other similar products found.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40 md:hidden pb-safe">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Price</span>
                        <span className="text-xl font-black text-black">
                            ₹{((quantity || 1) * product.salePrice).toFixed(0)}
                        </span>
                    </div>

                    {quantity === 0 ? (
                        <Button
                            onClick={handleAddToCart}
                            className="flex-1 bg-black hover:bg-black/90 text-white font-bold h-12 rounded-xl text-sm shadow-lg shadow-black/20"
                        >
                            Add to Cart
                        </Button>
                    ) : (
                        <div className="flex items-center bg-black rounded-xl h-12 px-2 shadow-lg shadow-black/20">
                            <button
                                onClick={() => quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, quantity - 1)}
                                className="w-10 h-full flex items-center justify-center text-white"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white font-bold px-4 min-w-[3rem] text-center text-sm">{quantity}</span>
                            <button
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                className="w-10 h-full flex items-center justify-center text-white"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
