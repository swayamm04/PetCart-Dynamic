"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface BannerData {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
    buttonColor: string;
    type: "standard" | "full";
}

const BANNER_DATA: BannerData[] = [
    {
        id: 1,
        title: "Pet Essentials",
        subtitle: "Delivered in 60 Mins*",
        description: "Genuine Supplies at Low Prices.",
        image: "/images/Banner/hero-banner-1.png",
        bgColor: "#F5F5F5",
        textColor: "#1A1A1A",
        accentColor: "#000000",
        buttonColor: "#000000",
        type: "full"
    },
    {
        id: 2,
        title: "Premium Food",
        subtitle: "For Your Furry Friends",
        description: "Healthy & Tasty Options Available.",
        image: "/images/Banner/hero-banner-2.png",
        bgColor: "#EBEBEB",
        textColor: "#000000",
        accentColor: "#333333",
        buttonColor: "#333333",
        type: "full"
    },
    {
        id: 3,
        title: "Toys & Gear",
        subtitle: "For Endless Fun",
        description: "Best Quality Accessories.",
        image: "/images/Banner/hero-banner-3.png",
        bgColor: "#FAFAFA",
        textColor: "#171717",
        accentColor: "#000000",
        buttonColor: "#000000",
        type: "full"
    }
];

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % BANNER_DATA.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNER_DATA.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNER_DATA.length) % BANNER_DATA.length);

    return (
        <div className="w-full px-4 pt-4 pb-2 md:pt-6 md:px-6 max-w-5xl mx-auto">
            {/* Banner Card Container */}
            <section className="relative w-full h-[150px] md:h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-black/5 group">
                {BANNER_DATA.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out flex items-center ${banner.type === "full" ? "justify-start px-8 md:px-12" : "flex-row justify-between px-6 md:px-10 lg:px-20"
                            } ${index === currentSlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"}`}
                        style={{ backgroundColor: banner.bgColor }}
                    >
                        {/* Background Image for Full Width */}
                        {banner.type === "full" && (
                            <div className="absolute inset-0 w-full h-full z-0">
                                <Image
                                    src={banner.image}
                                    alt={`${banner.title} ${banner.subtitle}`}
                                    fill
                                    className="object-cover object-center"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
                            </div>
                        )}

                        {/* Text Content */}
                        <div className={`relative z-10 flex-1 space-y-2 md:space-y-3 ${banner.type === "full" ? "max-w-[80%] md:max-w-[60%]" : "max-w-[60%]"
                            } transition-all duration-1000 delay-300 ${index === currentSlide ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}>
                            <div>
                                <h1 className="text-lg md:text-2xl lg:text-4xl font-black leading-tight tracking-tight text-[#1A1A1A]">
                                    {banner.title} <br />
                                    <span className="font-bold text-sm md:text-lg lg:text-xl opacity-70 block mt-1">{banner.subtitle}</span>
                                </h1>
                                <p className="text-[10px] md:text-sm lg:text-base text-gray-600 mt-1 md:mt-2 font-medium max-w-sm leading-relaxed">
                                    {banner.description}
                                </p>
                            </div>

                            <button
                                className="px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs lg:text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 shadow-md flex items-center gap-1.5 group/btn"
                                style={{ backgroundColor: banner.buttonColor }}
                                suppressHydrationWarning
                            >
                                Shop Now <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">➜</span>
                            </button>
                        </div>

                        {/* Standard Image Area (Right Side) */}
                        {banner.type === "standard" && (
                            <div className={`relative w-[40%] h-[85%] md:h-[90%] transition-all duration-1000 delay-500 ${index === currentSlide ? "translate-x-0 opacity-100 scale-100" : "translate-x-10 opacity-0 scale-95"}`}>
                                {/* Floating Animation Wrapper */}
                                <div className="w-full h-full animate-[float_6s_ease-in-out_infinite]">
                                    <Image
                                        src={banner.image}
                                        alt={`${banner.title} ${banner.subtitle}`}
                                        fill
                                        className="object-contain object-center drop-shadow-xl"
                                        priority={index === 0}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Navigation Buttons (Desktop Only, revealed on hover) */}
                <button
                    onClick={prevSlide}
                    className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/40 hover:bg-white/90 backdrop-blur-md items-center justify-center transition-all shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-300"
                    aria-label="Previous slide"
                    suppressHydrationWarning
                >
                    <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                <button
                    onClick={nextSlide}
                    className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/40 hover:bg-white/90 backdrop-blur-md items-center justify-center transition-all shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 duration-300"
                    aria-label="Next slide"
                    suppressHydrationWarning
                >
                    <ChevronRight className="w-5 h-5 text-black" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                    {BANNER_DATA.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide
                                ? "w-6 bg-black/80"
                                : "w-1.5 bg-black/20 hover:bg-black/40"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                            suppressHydrationWarning
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
