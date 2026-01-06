import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const banners = [
    {
        id: 1,
        title: "Super Saver Deal",
        subtitle: "Flat 20% OFF on all Paints",
        bg: "bg-gradient-to-r from-blue-500 to-blue-600",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
        textColor: "text-white"
    },
    {
        id: 2,
        title: "Construction Essentials",
        subtitle: "Cement, Sand & Aggregates delivered in 60 mins",
        bg: "bg-gradient-to-r from-[#EFC41A] to-orange-500",
        image: "https://images.unsplash.com/photo-1518709766631-a6a7bf<ctrl61>45a674?w=800&q=80",
        textColor: "text-white"
    },
    {
        id: 3,
        title: "Home Renovation",
        subtitle: "Upgrade your Electricals & Lighting",
        bg: "bg-gradient-to-r from-green-500 to-emerald-600",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        textColor: "text-white"
    }
];

const BannerCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        // Auto-swipe every 4 seconds
        const intervalId = setInterval(() => {
            scrollNext();
        }, 4000);

        return () => clearInterval(intervalId);
    }, [emblaApi, scrollNext]);

    return (
        <section className="py-2 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-lg" ref={emblaRef}>
                    <div className="flex">
                        {banners.map((banner) => (
                            <div key={banner.id} className="flex-[0_0_100%] min-w-0 relative">
                                <div className={`${banner.bg} p-4 md:p-12 h-40 md:h-80 flex flex-row items-center justify-between gap-2 md:gap-8 rounded-2xl md:rounded-3xl`}>

                                    {/* Text Content */}
                                    <div className="flex-1 text-left z-10">
                                        <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-semibold text-white mb-2 border border-white/30">
                                            Limited Time Offer
                                        </span>
                                        <h2 className={`text-xl md:text-5xl font-bold ${banner.textColor} mb-1 md:mb-4 leading-tight`}>
                                            {banner.title}
                                        </h2>
                                        <p className={`text-xs md:text-xl ${banner.textColor}/90 mb-3 md:mb-8 font-medium line-clamp-2`}>
                                            {banner.subtitle}
                                        </p>
                                        <Button className="h-8 md:h-10 text-xs md:text-base bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-full px-4 md:px-8">
                                            Shop Now <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                                        </Button>
                                    </div>

                                    {/* Image/Decoration */}
                                    <div className="w-1/3 md:w-1/2 h-full relative flex items-center justify-center">
                                        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl md:blur-3xl transform scale-75"></div>
                                        <img
                                            src={banner.image}
                                            alt={banner.title}
                                            className="relative z-10 w-full h-full object-contain mix-blend-overlay drop-shadow-lg opacity-90"
                                        />
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerCarousel;
