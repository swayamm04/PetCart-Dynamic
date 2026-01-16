"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Wallet, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function PaymentPage() {
    const router = useRouter();
    const { totalAmount, clearCart, items } = useCart();
    const { user } = useAuth();
    const [selectedMethod, setSelectedMethod] = useState("Card"); // Default to Card, matching typical Enum
    const [processing, setProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    const handlePayment = async () => {
        if (!user) {
            alert("Please login to place an order");
            router.push('/login');
            return;
        }

        setProcessing(true);

        try {
            const orderData = {
                orderItems: items.map(item => ({
                    product: item.id,
                    quantity: item.quantity,
                    price: item.salePrice || item.price
                })),
                shippingAddress: user.addresses && user.addresses[0] ? {
                    street: user.addresses[0].street,
                    city: user.addresses[0].city,
                    state: user.addresses[0].state,
                    zip: user.addresses[0].zip
                } : {},
                paymentMethod: selectedMethod,
                itemsPrice: totalAmount,
                shippingPrice: 0,
                totalPrice: totalAmount,
                user: { _id: user.id }
            };

            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                setOrderSuccess(true);
                clearCart();
                // Redirect after showing success for a moment
                setTimeout(() => {
                    router.push("/orders");
                }, 3000);
            } else {
                const errorData = await response.json();
                alert(`Order Failed: ${errorData.message || 'Unknown error'}`);
            }

        } catch (error) {
            console.error("Payment Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h1>
                <p className="text-gray-600 mb-8 max-w-md">
                    Thank you for your purchase. Your order has been confirmed and will be delivered soon.
                </p>
                <div className="w-full max-w-sm bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Amount Paid</span>
                        <span className="font-bold">₹{totalAmount.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Payment Method</span>
                        <span className="font-bold uppercase">{selectedMethod}</span>
                    </div>
                </div>
                <Button
                    onClick={() => router.push('/orders')}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold h-12 px-8 rounded-xl"
                >
                    View My Orders
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/checkout" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </Link>
                    <h1 className="text-lg font-bold text-black">Payment</h1>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col gap-1 mb-6 text-center">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Amount to Pay</span>
                        <span className="text-4xl font-black text-gray-900">₹{totalAmount.toFixed(0)}</span>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Select Payment Method</h3>

                    <div className="space-y-3">
                        {/* UPI */}
                        <div
                            onClick={() => setSelectedMethod("UPI")}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedMethod === "UPI" ? "border-yellow-400 bg-yellow-50" : "border-gray-100 hover:border-gray-200"}`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === "UPI" ? "border-yellow-600" : "border-gray-300"}`}>
                                {selectedMethod === "UPI" && <div className="w-3 h-3 bg-yellow-600 rounded-full" />}
                            </div>
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <Wallet className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-bold text-gray-800">UPI / Wallets</span>
                        </div>

                        {/* Card */}
                        <div
                            onClick={() => setSelectedMethod("Card")}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedMethod === "Card" ? "border-yellow-400 bg-yellow-50" : "border-gray-100 hover:border-gray-200"}`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === "Card" ? "border-yellow-600" : "border-gray-300"}`}>
                                {selectedMethod === "Card" && <div className="w-3 h-3 bg-yellow-600 rounded-full" />}
                            </div>
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <CreditCard className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="font-bold text-gray-800">Credit / Debit Card</span>
                        </div>

                        {/* COD */}
                        <div
                            onClick={() => setSelectedMethod("Cash on Delivery")}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedMethod === "Cash on Delivery" ? "border-yellow-400 bg-yellow-50" : "border-gray-100 hover:border-gray-200"}`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === "Cash on Delivery" ? "border-yellow-600" : "border-gray-300"}`}>
                                {selectedMethod === "Cash on Delivery" && <div className="w-3 h-3 bg-yellow-600 rounded-full" />}
                            </div>
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <Truck className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="font-bold text-gray-800">Cash on Delivery</span>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full h-14 bg-black hover:bg-black/90 text-white font-bold text-lg rounded-2xl shadow-lg shadow-black/20"
                >
                    {processing ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                        </span>
                    ) : (
                        `Pay ₹${totalAmount.toFixed(0)}`
                    )}
                </Button>
            </main>
        </div>
    );
}
