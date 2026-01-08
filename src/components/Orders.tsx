import { Package, Truck, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";

const Orders = () => {
    const { isAuthenticated, openLogin } = useAuth();
    const { orders } = useOrders();

    if (!isAuthenticated) {
        return (
            <div className="bg-gray-50 flex flex-col min-h-[calc(100vh-180px)] mb-20">
                <div className="flex-1 flex flex-col items-center justify-center p-6 py-24 animate-in fade-in duration-300">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm text-center max-w-sm w-full border border-gray-100">
                        <div className="w-20 h-20 bg-[#EFC41A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Truck className="w-10 h-10 text-[#EFC41A]" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 mb-2">Track Your Orders</h2>
                        <p className="text-gray-500 mb-8 text-sm font-medium">
                            Login to view your order history, track live deliveries, and manage your returns.
                        </p>
                        <Button
                            onClick={openLogin}
                            className="w-full bg-[#45a049] hover:bg-[#388e3c] text-white rounded-2xl py-6 text-base font-black shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
                        >
                            LOGIN TO VIEW
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="bg-gray-50 flex flex-col min-h-[calc(100vh-180px)] mb-20 font-bold">
                <div className="flex-1 flex flex-col items-center justify-center p-6 py-24 animate-in fade-in duration-300">
                    <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-sm w-full border border-gray-100">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Package className="w-8 h-8 text-blue-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
                        <p className="text-gray-600 mb-6 text-sm px-2 font-medium">
                            Looks like you haven't placed any orders yet. <br />
                            Start shopping to fill this page!
                        </p>
                        <Button className="w-full bg-[#45a049] hover:bg-[#388e3c] text-white rounded-xl py-4 text-sm font-bold shadow-lg shadow-green-100">
                            Start Shopping
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 flex flex-col min-h-[calc(100vh-180px)] mb-20 animate-in fade-in duration-300">
            <div className="p-4 space-y-4">
                <h2 className="text-xl font-black text-gray-900 px-1">Your Orders</h2>
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID: {order.id}</p>
                                <p className="text-sm font-black text-gray-900">{order.date}</p>
                            </div>
                            <span className="px-3 py-1 bg-green-50 text-[#45a049] text-[10px] font-black rounded-full uppercase border border-green-100">
                                {order.status}
                            </span>
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl p-2 border border-gray-100">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                </div>
                            ))}
                            {order.items.length > 4 && (
                                <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[10px] font-bold text-gray-400">
                                    +{order.items.length - 4}
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-gray-600 group">
                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-[10px] font-bold truncate max-w-[150px]">
                                    {order.address.area}, {order.address.pincode}
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Total Amount</p>
                                <p className="text-base font-black text-gray-900">₹{order.total.toLocaleString()}</p>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-900 text-xs font-black rounded-xl hover:bg-gray-100 transition-colors uppercase tracking-wider">
                            Order Details <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;


