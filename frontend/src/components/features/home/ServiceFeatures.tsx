import { Truck, Wallet, Headset, ArrowLeftRight } from "lucide-react";

export function ServiceFeatures() {
    const features = [
        {
            icon: Truck,
            title: "Free Shipping",
            desc: "On all orders over $49",
            bg: "bg-orange-50",
            iconColor: "text-orange-500"
        },
        {
            icon: Wallet,
            title: "Quick Payment",
            desc: "100% secure payment",
            bg: "bg-orange-50",
            iconColor: "text-orange-500"
        },
        {
            icon: Headset,
            title: "24/7 Support",
            desc: "Ready to help you anytime",
            bg: "bg-orange-50",
            iconColor: "text-orange-500"
        },
        {
            icon: ArrowLeftRight,
            title: "Easy Returns",
            desc: "30 days return policy",
            bg: "bg-orange-50",
            iconColor: "text-orange-500"
        }
    ];

    return (
        <section className="py-4 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 lg:gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-row items-center text-left gap-3 cursor-default">
                            <div className={`w-8 h-8 rounded-full ${feature.bg} flex items-center justify-center shrink-0`}>
                                <feature.icon className={`w-3.5 h-3.5 ${feature.iconColor}`} strokeWidth={2} />
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-900 text-[10px] uppercase tracking-wider">{feature.title}</h3>
                                <p className="text-[9px] text-gray-500 leading-tight mt-0.5">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
