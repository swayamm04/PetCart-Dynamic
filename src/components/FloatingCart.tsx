import React from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const FloatingCart = () => {
    const { cartItems, cartCount, cartTotal, setIsCartOpen } = useCart();

    if (cartItems.length === 0) return null;

    return (
        <div className="fixed bottom-20 left-4 right-4 z-50 md:hidden animate-in slide-in-from-bottom-5 duration-300">
            <div
                onClick={() => setIsCartOpen(true)}
                className="bg-[#45a049] text-white rounded-2xl p-3 shadow-2xl flex items-center justify-between cursor-pointer hover:bg-[#388e3c] transition-colors"
            >

                {/* Left Side: Items & Icon */}
                <div className="flex items-center gap-3 pl-2">
                    <div className="bg-white/20 p-2 rounded-full">
                        <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="font-bold text-sm">{cartCount} ITEMS</span>
                        <span className="text-[10px] opacity-90">₹{cartTotal.toLocaleString()}</span>
                    </div>
                </div>

                {/* Right Side: View Cart */}
                <div className="flex items-center gap-2 pr-2">
                    <span className="font-bold text-sm">View Cart</span>
                    <ArrowRight className="w-5 h-5 bg-white/20 rounded-full p-1" />
                </div>
            </div>
        </div>
    );
};

export default FloatingCart;
