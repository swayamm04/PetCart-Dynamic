"use client";

import Link from "next/link";
import { PackageX } from "lucide-react";

export function OrdersList() {
    // Mock empty orders for now
    const orders = [];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 min-h-[60vh] flex flex-col items-center justify-center">
            {orders.length === 0 ? (
                <div className="flex flex-col items-center text-center space-y-4 max-w-sm mx-auto p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-1">
                        <PackageX className="w-8 h-8 text-yellow-600" />
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-lg font-black text-black">No Orders Yet</h2>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            Looks like you haven't placed any orders yet.
                            <br />
                            Start shopping to fill this page!
                        </p>
                    </div>

                    <Link
                        href="/shop"
                        className="px-6 py-2 bg-yellow-400 text-black text-xs font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-md shadow-yellow-400/20"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                    {/* Order list would go here */}
                </div>
            )}
        </div>
    );
}
