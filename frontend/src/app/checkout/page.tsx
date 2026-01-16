"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, ChevronRight, PenLine, Truck, ShieldCheck, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddressForm } from "@/components/features/profile/AddressForm";

export default function CheckoutPage() {
    const { items, totalAmount, totalItems, updateQuantity, removeFromCart } = useCart();
    const { user, updateAddress } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Calculate details
    const totalMRP = items.reduce((sum, item) => sum + ((item.regularPrice || item.price) * item.quantity), 0);
    const totalDiscount = totalMRP - totalAmount;

    // Address
    const selectedAddress = user?.addresses?.[0];

    const handleSaveAddress = async (data: any) => {
        if (selectedAddress) {
            await updateAddress(selectedAddress.id, data);
            setIsEditingAddress(false);
        }
    };

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <Link href="/shop">
                    <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold rounded-xl">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 md:pb-12">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/shop" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </Link>
                    <h1 className="text-lg font-bold text-black">Order Summary</h1>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Address & Items */}
                <div className="md:col-span-2 space-y-6">
                    {/* Address Section */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-gray-900 border-l-4 border-yellow-400 pl-3">
                                Delivery Address
                            </h2>
                            {selectedAddress && (
                                <Link href="/profile?tab=addresses&returnTo=/checkout" className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">
                                    Change Address
                                </Link>
                            )}
                        </div>

                        {selectedAddress ? (
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-gray-900">{user?.name}</span>
                                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                                            {selectedAddress.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                        {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} - <span className="font-bold">{selectedAddress.zip}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 font-medium">
                                        Phone: {user?.phone}
                                    </p>
                                    <div className="mt-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setIsEditingAddress(true)}
                                            className="rounded-xl h-8 text-xs font-bold border-gray-200"
                                        >
                                            Edit Address <PenLine className="w-3 h-3 ml-2" />
                                        </Button>
                                    </div>

                                    {/* Local Edit Dialog */}
                                    <Dialog open={isEditingAddress} onOpenChange={setIsEditingAddress}>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Delivery Address</DialogTitle>
                                            </DialogHeader>
                                            <AddressForm
                                                initialData={selectedAddress}
                                                onSave={handleSaveAddress}
                                                onCancel={() => setIsEditingAddress(false)}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-gray-500 mb-4">No address selected for delivery.</p>
                                <Link href="/profile?tab=addresses&action=add&returnTo=/checkout">
                                    <Button className="bg-black text-white hover:bg-black/90 font-bold rounded-xl w-full sm:w-auto">
                                        Add New Address
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Product List */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h2 className="font-bold text-gray-900 border-l-4 border-yellow-400 pl-3 mb-6">
                            Selected Items ({totalItems})
                        </h2>
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b border-gray-50 last:border-0 pb-6 last:pb-0">
                                    <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <h3 className="font-bold text-sm text-gray-900 line-clamp-2 mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-sm">₹{(item.salePrice || item.price).toFixed(0)}</span>
                                                    {(item.discountPercentage || 0) > 0 && (
                                                        <span className="text-xs text-gray-400 line-through">₹{(item.regularPrice || item.price).toFixed(0)}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center border border-gray-200 rounded-lg bg-white h-8">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600 rounded-l-lg"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600 rounded-r-lg"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {(item.discountPercentage || 0) > 0 && (
                                            <p className="text-[10px] text-green-600 font-bold mt-2">
                                                You saved ₹{(((item.regularPrice || item.price) - (item.salePrice || item.price)) * item.quantity).toFixed(0)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Price Details */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="font-bold text-gray-900 border-l-4 border-yellow-400 pl-3 mb-6">
                            Bill Details
                        </h2>

                        <div className="space-y-3 text-sm mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Total MRP</span>
                                <span>₹{totalMRP.toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between text-green-600 font-medium">
                                <span>Discount on MRP</span>
                                <span>-₹{totalDiscount.toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Fee</span>
                                <span className="text-green-600 font-bold">Free</span>
                            </div>
                            <div className="h-px bg-gray-100 my-2"></div>
                            <div className="flex justify-between text-base font-black text-gray-900">
                                <span>Total Amount</span>
                                <span>₹{totalAmount.toFixed(0)}</span>
                            </div>
                        </div>

                        {totalDiscount > 0 && (
                            <div className="bg-green-50 text-green-700 text-xs font-bold p-3 rounded-xl flex items-center gap-2 mb-6">
                                <ShieldCheck className="w-4 h-4" />
                                <span>You are saving ₹{totalDiscount.toFixed(0)} on this order</span>
                            </div>
                        )}

                        <Button
                            onClick={() => router.push('/checkout/payment')}
                            disabled={!selectedAddress}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold h-12 rounded-xl text-base shadow-lg shadow-yellow-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue to Payment
                        </Button>

                        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-400">
                            <Truck className="w-3 h-3" />
                            <span>Safe and Secure Delivery</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
