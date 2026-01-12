"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function CartNotification() {
    const { totalItems, totalAmount, toggleCart } = useCart();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (totalItems > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [totalItems]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-20 left-0 right-0 z-50 px-4 md:bottom-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[50%]">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-3 rounded-xl shadow-lg shadow-yellow-500/20 flex items-center justify-between animate-in slide-in-from-bottom-2 fade-in">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                        <ShoppingBag className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-black/70 uppercase tracking-wide">Your Cart</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xs font-bold text-black/70">{totalItems} Items •</span>
                            <span className="text-lg font-black leading-none text-black">₹{totalAmount.toFixed(0)}</span>
                        </div>
                    </div>
                </div>

                <button onClick={toggleCart} className="flex items-center gap-2 font-bold text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80 transition-colors shadow-md shadow-black/10">
                    View Cart
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
