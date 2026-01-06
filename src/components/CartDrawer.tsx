import React from "react";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const CartDrawer = () => {
    const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-full md:max-w-md flex flex-col p-0 bg-white">

                {/* Header */}
                <SheetHeader className="p-4 border-b border-gray-100 items-start text-left">
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-[#45a049]" />
                        Your Cart <span className="text-[#45a049] font-bold">({cartItems.length} items)</span>
                    </SheetTitle>
                </SheetHeader>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                            <ShoppingBag className="w-16 h-16 text-gray-300" />
                            <p className="text-gray-500 font-medium">Your cart is empty</p>
                            <Button variant="outline" onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
                                {/* Image */}
                                <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">{item.name}</h4>
                                        <span className="text-xs text-gray-500 font-medium mt-1">Unit Price: ₹{item.price}</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg h-7 w-20 shadow-sm">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-6 h-full flex items-center justify-center text-gray-500 hover:text-[#45a049] hover:bg-green-50 rounded-l-lg transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="flex-1 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-6 h-full flex items-center justify-center text-gray-500 hover:text-[#45a049] hover:bg-green-50 rounded-r-lg transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        {/* Total & Remove */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <SheetFooter className="p-4 bg-gray-50 border-t border-gray-200 sm:flex-col sm:space-x-0">
                        <div className="space-y-4 w-full">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Delivery</span>
                                    <span className="text-[#45a049] font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                                    <span>Total Amount</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                            <Button className="w-full bg-[#45a049] hover:bg-[#388e3c] text-white font-bold h-12 text-base shadow-lg rounded-xl">
                                Proceed to Buy
                            </Button>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default CartDrawer;
