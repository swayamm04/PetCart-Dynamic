"use client";

import Link from "next/link";
import { PackageX, ShoppingBag, Truck, CheckCircle2, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface OrderItem {
    product: {
        _id: string;
        name: string;
        image: string;
        price: number;
    };
    quantity: number;
    price: number;
    _id: string;
}

interface Order {
    _id: string;
    totalAmount: number;
    status: string;
    paymentMethod: string;
    createdAt: string;
    items: OrderItem[];
}

export function OrdersList() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const response = await fetch(`${API_URL}/orders/myorders/${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, API_URL]);

    if (!user) return null;

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs font-bold text-gray-500">Loading Orders...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 min-h-[80vh]">
            <h1 className="text-2xl font-black mb-6">My Orders</h1>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center text-center space-y-4 max-w-sm mx-auto p-8 bg-white rounded-3xl border border-gray-100 shadow-sm mt-10">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                        <PackageX className="w-10 h-10 text-yellow-600" />
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-lg font-black text-black">No Orders Yet</h2>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            Looks like you haven&apos;t placed any orders yet.
                            <br />
                            Start shopping to fill this page!
                        </p>
                    </div>

                    <Link
                        href="/shop"
                        className="px-8 py-3 bg-yellow-400 text-black text-sm font-bold rounded-xl hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/20"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            {/* Order Header */}
                            <div className="p-4 border-b border-gray-50 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Order Placed</p>
                                    <p className="text-xs font-bold text-gray-900">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Total</p>
                                    <p className="text-xs font-bold text-gray-900">₹{order.totalAmount.toFixed(0)}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Payment</p>
                                    <p className="text-xs font-bold text-gray-900">{order.paymentMethod}</p>
                                </div>
                                <div className="ml-auto">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide
                                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                'bg-blue-100 text-blue-700'}`}>
                                        {order.status === 'Delivered' && <CheckCircle2 className="w-3 h-3" />}
                                        {order.status === 'Pending' && <Clock className="w-3 h-3" />}
                                        {order.status === 'Processing' && <ShoppingBag className="w-3 h-3" />}
                                        {order.status === 'Shipped' && <Truck className="w-3 h-3" />}
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-4 space-y-4">
                                {order.items.map((item) => (
                                    <div key={item._id} className="flex gap-4 items-center">
                                        <div className="relative w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                            {item.product?.image && (
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm text-gray-900 line-clamp-1 mb-1">
                                                {item.product?.name || "Product Unavailable"}
                                            </h4>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span className="font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600">Qty: {item.quantity}</span>
                                                <span>×</span>
                                                <span className="font-bold text-gray-900">₹{item.price.toFixed(0)}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-sm text-gray-900">
                                                ₹{(item.price * item.quantity).toFixed(0)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
