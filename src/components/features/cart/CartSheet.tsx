"use client";

import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartSheet() {
    const { items, isCartOpen, toggleCart, updateQuantity, removeFromCart, totalAmount, totalItems } = useCart();

    return (
        <Sheet open={isCartOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-white">
                <SheetHeader className="px-6 py-4 border-b">
                    <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                        <ShoppingBag className="w-5 h-5 text-yellow-500" />
                        Your Cart <span className="text-yellow-500">({totalItems} items)</span>
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-8">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <ShoppingBag className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-lg font-semibold text-gray-900">Your cart is empty</p>
                        <p className="text-sm text-gray-500 text-center">Looks like you haven't added anything to your cart yet.</p>
                        <Button
                            onClick={toggleCart}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                        >
                            Start Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Cart Items List */}
                        <ScrollArea className="flex-1 px-6">
                            <div className="py-6 space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs text-gray-500">Unit Price: ₹{item.salePrice}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center border border-gray-200 rounded-md bg-white">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                {/* Price & Delete */}
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold text-gray-900">₹{(item.salePrice * item.quantity).toFixed(0)}</span>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Footer Summary */}
                        <div className="border-t bg-gray-50 p-6 space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{totalAmount.toFixed(0)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>Delivery</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                                    <span>Total Amount</span>
                                    <span>₹{totalAmount.toFixed(0)}</span>
                                </div>
                            </div>

                            <Button className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg">
                                Proceed to Buy
                            </Button>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
