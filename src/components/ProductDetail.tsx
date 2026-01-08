import React, { useState } from "react";
import { ChevronLeft, Share2, Heart, Clock, ShieldCheck, Truck, RefreshCw, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { products } from "@/data/products";

interface ProductDetailProps {
    productName: string;
    onBack: () => void;
}

const ProductDetail = ({ productName, onBack }: ProductDetailProps) => {
    const product = products.find(p => p.name === productName);
    const { cartItems, addToCart, updateQuantity, setIsCartOpen } = useCart();
    const { isAuthenticated, openLogin } = useAuth();

    if (!product) return null;

    const cartItem = cartItems.find((item) => item.name === product.name);
    const quantity = cartItem?.quantity || 0;

    const handleAdd = () => {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
        addToCart({ id: product.name, name: product.name, price: product.salePrice, image: product.image });
    };

    const handleUpdateQuantity = (delta: number) => {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
        updateQuantity(product.name, delta);
    }

    return (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-3 md:p-4 sticky top-0 bg-white z-10 border-b shadow-sm">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Heart className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Gallery */}
                <div className="relative w-full aspect-square md:aspect-[16/9] bg-[#76B079] flex items-center justify-center p-6 md:p-12">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain drop-shadow-2xl animate-in zoom-in-75 duration-500"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/40"}`} />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-[#45a049]/10 text-[#45a049] text-[9px] md:text-[10px] font-bold rounded uppercase">
                                {product.unit} Unit
                            </span>
                            <span className="flex items-center gap-1 text-[9px] md:text-[10px] text-gray-500 font-medium">
                                <Clock className="w-3 h-3" /> 14 mints
                            </span>
                        </div>
                        <h1 className="text-lg md:text-2xl font-black text-gray-900 leading-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-4">
                            <span className="text-xl md:text-2xl font-black text-gray-900">₹{product.salePrice}</span>
                            <span className="text-xs md:text-sm text-gray-400 line-through">MRP ₹{product.regularPrice}</span>
                            <span className="px-1.5 py-0.5 md:px-2 bg-blue-100 text-blue-600 text-[10px] md:text-xs font-bold rounded-full">
                                {product.discountPercentage}% OFF
                            </span>
                        </div>
                        <p className="text-[9px] md:text-[10px] text-gray-400 font-medium">(inclusive of all taxes)</p>
                    </div>

                    <div className="h-px bg-gray-100 w-full" />

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                            <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase mb-0.5 md:mb-1">Brand</p>
                            <p className="font-bold text-gray-900 text-sm md:text-base">UltraTech</p>
                        </div>
                        <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                            <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase mb-0.5 md:mb-1">Grade</p>
                            <p className="font-bold text-gray-900 text-sm md:text-base">Grade A</p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 md:space-y-4 pt-2">
                        <h3 className="font-black text-gray-900 uppercase tracking-wider text-[10px] md:text-xs">Why buy from HomeRun?</h3>
                        <div className="grid gap-2 md:gap-3">
                            {[
                                { icon: ShieldCheck, title: "Verified Quality", desc: "Sourced directly from manufacturers" },
                                { icon: Truck, title: "60-Min Delivery", desc: "Fastest delivery in Shimoga" },
                                { icon: RefreshCw, title: "Easy Returns", desc: "Hassle-free 7-day return policy" }
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-3 md:gap-4 p-2 md:p-3 bg-white rounded-xl md:rounded-2xl border border-gray-50 shadow-sm">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 rounded-lg md:rounded-xl flex items-center justify-center text-[#45a049] shrink-0">
                                        <feature.icon className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-xs md:text-sm">{feature.title}</p>
                                        <p className="text-[10px] md:text-xs text-gray-500 leading-tight">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* People Also Bought */}
                    <div className="pt-4 md:pt-6 pb-24 md:pb-20">
                        <h3 className="font-black text-gray-900 uppercase tracking-wider text-[10px] md:text-xs mb-3 md:mb-4">People also bought</h3>
                        <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2">
                            {products.filter(p => p.name !== product.name).slice(0, 4).map((p, i) => (
                                <div key={i} className="min-w-[100px] md:min-w-[120px] w-[100px] md:w-[120px] space-y-2">
                                    <div className="aspect-square bg-gray-50 rounded-xl md:rounded-2xl p-2 flex items-center justify-center border border-gray-100">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] md:text-[10px] font-bold text-gray-900 truncate">{p.name}</p>
                                        <p className="text-[9px] md:text-[10px] font-black text-gray-900">₹{p.salePrice}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Add Section */}
            <div className="p-3 md:p-4 bg-white border-t border-gray-100 flex items-center gap-3 md:gap-4 bottom-nav-safe">
                <div className="flex-1">
                    <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase">Total Price</p>
                    <p className="text-lg md:text-xl font-black text-gray-900">₹{product.salePrice * (quantity || 1)}</p>
                </div>

                {quantity === 0 ? (
                    <Button
                        onClick={handleAdd}
                        className="bg-[#45a049] hover:bg-[#388e3c] text-white rounded-xl px-8 py-4 md:px-12 md:py-6 text-sm md:text-base font-bold shadow-lg shadow-green-100"
                    >
                        Add to Cart
                    </Button>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-3 md:gap-4 bg-[#45a049] rounded-xl px-3 py-2 md:px-4 md:py-3 shadow-lg shadow-green-100">
                            <button
                                onClick={() => handleUpdateQuantity(-1)}
                                className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-white"
                            >
                                <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <span className="text-white font-bold text-base md:text-lg min-w-[20px] md:min-w-[24px] text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={() => handleUpdateQuantity(1)}
                                className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-white"
                            >
                                <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                        </div>
                        <Button
                            onClick={() => setIsCartOpen(true)}
                            className="bg-black hover:bg-gray-800 text-white rounded-xl px-4 py-2 md:px-6 md:py-3 h-[40px] md:h-[48px] font-bold shadow-lg flex items-center gap-2"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span className="text-xs md:text-sm">View Cart</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
