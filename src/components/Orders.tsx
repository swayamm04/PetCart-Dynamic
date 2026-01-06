import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const Orders = () => {
    return (
        <div className="bg-gray-50 flex flex-col min-h-[calc(100vh-180px)] mb-20">
            <div className="flex-1 flex flex-col items-center justify-center p-6 py-24 animate-in fade-in duration-300">
                {/* Alter card padding (p-8) and max-width (max-w-sm) below */}
                <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-sm w-full border border-gray-100">
                    {/* Alter icon container size (w-16 h-16) here */}
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                        <Package className="w-8 h-8 text-blue-500" />
                    </div>
                    {/* Alter title font size (text-xl) here */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
                    <p className="text-gray-600 mb-6 text-sm px-2">
                        Looks like you haven't placed any orders yet. <br />
                        Start shopping to fill this page!
                    </p>
                    {/* Alter button padding (py-4) and font size (text-sm/base) here */}
                    <Button className="w-full bg-[#45a049] hover:bg-[#388e3c] text-white rounded-xl py-4 text-sm font-bold shadow-lg shadow-green-100">
                        Start Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Orders;
