import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, CreditCard, Wallet, Truck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
    const [address, setAddress] = useState({
        pincode: "",
        houseNo: "",
        area: "",
        landmark: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("upi");

    const deliveryFee = 0;
    const finalTotal = cartTotal + deliveryFee;

    const handlePlaceOrder = () => {
        // Mock order placement
        toast.success("Order placed successfully!", {
            description: "Your order will be delivered within 60 mins."
        });
        clearCart();
        setStep(3);
    };

    if (cartItems.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Truck className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-500 mb-8">Add components to your cart to start building.</p>
                <Button onClick={() => navigate("/")} className="bg-[#45a049] hover:bg-[#388e3c]">
                    Return to Shopping
                </Button>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-[#45a049]" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
                <p className="text-gray-500 mb-8 max-w-sm">Thank you for your order. We've received it and are preparing your items for delivery.</p>
                <div className="space-y-3 w-full max-w-xs">
                    <Button onClick={() => navigate("/")} className="w-full bg-[#45a049] hover:bg-[#388e3c] h-12 rounded-xl font-bold">
                        Continue Shopping
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
            {/* Header */}
            <header className="bg-white p-4 sticky top-0 z-50 flex items-center gap-4 border-b border-gray-100">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold">Checkout</h1>
            </header>

            <div className="max-w-xl mx-auto w-full p-4 space-y-4">
                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-4 py-4">
                    <div className={`flex flex-col items-center gap-1 ${step >= 1 ? "text-[#45a049]" : "text-gray-400"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step >= 1 ? "border-[#45a049] bg-green-50" : "border-gray-300"}`}>1</div>
                        <span className="text-[10px] font-bold uppercase">Address</span>
                    </div>
                    <div className={`h-0.5 w-12 ${step >= 2 ? "bg-[#45a049]" : "bg-gray-200"}`} />
                    <div className={`flex flex-col items-center gap-1 ${step >= 2 ? "text-[#45a049]" : "text-gray-400"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step >= 2 ? "border-[#45a049] bg-green-50" : "border-gray-300"}`}>2</div>
                        <span className="text-[10px] font-bold uppercase">Payment</span>
                    </div>
                </div>

                {step === 1 ? (
                    /* Address Form */
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-5 h-5 text-[#45a049]" />
                            <h2 className="font-bold">Delivery Address</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Pincode</label>
                                <input
                                    type="text"
                                    value={address.pincode}
                                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                    placeholder="Enter 6-digit pincode"
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#45a049] transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">House No / Flat / Floor</label>
                                <input
                                    type="text"
                                    value={address.houseNo}
                                    onChange={(e) => setAddress({ ...address, houseNo: e.target.value })}
                                    placeholder="e.g. Flat 101, Building B"
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#45a049] transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Area / Colony</label>
                                <textarea
                                    rows={3}
                                    value={address.area}
                                    onChange={(e) => setAddress({ ...address, area: e.target.value })}
                                    placeholder="Enter your full area address"
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#45a049] transition-all resize-none"
                                />
                            </div>
                        </div>
                        <Button
                            onClick={() => setStep(2)}
                            disabled={!address.pincode || !address.houseNo}
                            className="w-full bg-[#45a049] hover:bg-[#388e3c] h-12 rounded-xl font-bold mt-4"
                        >
                            Select Payment Method
                        </Button>
                    </div>
                ) : (
                    /* Payment Selection */
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="w-5 h-5 text-[#45a049]" />
                            <h2 className="font-bold">Payment Method</h2>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={() => setPaymentMethod("upi")}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${paymentMethod === "upi" ? "border-[#45a049] bg-green-50" : "border-gray-100"}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <Wallet className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold">UPI Options</p>
                                        <p className="text-[10px] text-gray-500">Google Pay, PhonePe, Paytm</p>
                                    </div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "upi" ? "border-[#45a049]" : "border-gray-200"}`}>
                                    {paymentMethod === "upi" && <div className="w-2.5 h-2.5 bg-[#45a049] rounded-full" />}
                                </div>
                            </button>

                            <button
                                onClick={() => setPaymentMethod("cod")}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${paymentMethod === "cod" ? "border-[#45a049] bg-green-50" : "border-gray-100"}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                                        <Truck className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold">Cash on Delivery</p>
                                        <p className="text-[10px] text-gray-500">Pay when your order arrives</p>
                                    </div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-[#45a049]" : "border-gray-200"}`}>
                                    {paymentMethod === "cod" && <div className="w-2.5 h-2.5 bg-[#45a049] rounded-full" />}
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* Order Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                    <h2 className="font-bold flex items-center gap-2">
                        Order Summary <span className="text-[#45a049] text-sm">({cartItems.length} items)</span>
                    </h2>
                    <div className="space-y-2">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-gray-600 truncate max-w-[200px]">{item.name} x {item.quantity}</span>
                                <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                        <div className="pt-3 border-t border-gray-50 space-y-2">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Delivery Fee</span>
                                <span className="text-[#45a049] font-medium">FREE</span>
                            </div>
                            <div className="flex justify-between text-base font-black text-gray-900 pt-1">
                                <span>Total Payable</span>
                                <span>₹{finalTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {step === 2 && (
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50">
                        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">Total to pay</p>
                                <p className="text-xl font-black text-gray-900">₹{finalTotal.toLocaleString()}</p>
                            </div>
                            <Button
                                onClick={handlePlaceOrder}
                                className="flex-1 bg-[#45a049] hover:bg-[#388e3c] h-12 rounded-xl font-black text-base shadow-lg shadow-green-100"
                            >
                                PLACE ORDER
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
