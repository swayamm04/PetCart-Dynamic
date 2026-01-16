"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { user } = useAuth();
    const { addToCart, items, updateQuantity, removeFromCart } = useCart();
    const router = useRouter();

    const cartItem = items.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <div className="group relative flex flex-col gap-2 h-full">
            {/* Image Container with ADD Button */}
            <div className="relative aspect-square bg-[#F5F5F5] rounded-xl overflow-hidden shrink-0">
                <Link href={`/shop/${product.id}`} className="block w-full h-full relative">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100px, 150px"
                    />
                </Link>

                {/* Discount Badge */}
                {(product.discountPercentage || 0) > 0 && (
                    <div className="absolute top-0 left-0 bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg pointer-events-none">
                        {product.discountPercentage}% OFF
                    </div>
                )}

                {/* ADD Button or Quantity Control */}
                {quantity === 0 ? (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // Stop propagation to Link
                            if (!user) {
                                router.push("/login");
                            } else {
                                addToCart(product);
                            }
                        }}
                        className="absolute bottom-2 right-2 bg-white text-black text-xs font-bold px-3 py-1 rounded-md shadow-sm border border-gray-200 hover:bg-yellow-400 transition-colors uppercase tracking-wide z-10"
                        suppressHydrationWarning
                    >
                        ADD
                    </button>
                ) : (
                    <div className="absolute bottom-2 right-2 flex items-center bg-yellow-400 rounded-md shadow-sm overflow-hidden z-10">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (quantity === 1) {
                                    removeFromCart(product.id);
                                } else {
                                    updateQuantity(product.id, quantity - 1);
                                }
                            }}
                            className="w-7 h-6 flex items-center justify-center text-black hover:bg-yellow-500 transition-colors"
                        >
                            -
                        </button>
                        <span className="text-black text-xs font-bold px-1 min-w-[1.5rem] text-center">{quantity}</span>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateQuantity(product.id, quantity + 1);
                            }}
                            className="w-7 h-6 flex items-center justify-center text-black hover:bg-yellow-500 transition-colors"
                        >
                            +
                        </button>
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="space-y-1 flex flex-col flex-1">
                {/* Time / Weight (Mock data for now) */}
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                    <span className="bg-gray-50 px-1 rounded">1 day</span>
                </div>

                {/* Name - Fixed height to ensure alignment */}
                <Link href={`/shop/${product.id}`} className="font-semibold text-[10px] md:text-xs text-neutral-900 leading-tight line-clamp-2 h-7 md:h-8 overflow-hidden block" title={product.name}>
                    {product.name}
                </Link>

                {/* Unit (Mock) */}
                <div className="text-[9px] text-gray-500">1 kg</div>

                {/* Price - Pushed to bottom if needed, but fixed name height helps enough */}
                <div className="flex items-baseline justify-between pt-1 mt-auto">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-neutral-900">
                            ₹{(product.salePrice || product.price).toFixed(0)}
                        </span>
                        {(product.discountPercentage || 0) > 0 && (
                            <span className="text-[10px] text-gray-400 line-through">
                                ₹{(product.regularPrice || product.price).toFixed(0)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
