"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
                <AnimatePresence mode="wait">
                    <motion.div
                        key={BANNER_DATA[currentSlide].id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute inset-0 w-full h-full flex items-center ${BANNER_DATA[currentSlide].type === "full"
                            ? "justify-start px-8 md:px-12"
                            : "flex-row justify-between px-6 md:px-10 lg:px-20"
                            }`}
                        style={{ backgroundColor: BANNER_DATA[currentSlide].bgColor }}
                    >
                        {/* Background Image for Full Width */}
                        {BANNER_DATA[currentSlide].type === "full" && (
                            <div className="absolute inset-0 w-full h-full z-0">
                                <Image
                                    src={BANNER_DATA[currentSlide].image}
                                    alt={`${BANNER_DATA[currentSlide].title} ${BANNER_DATA[currentSlide].subtitle}`}
                                    fill
                                    className="object-cover object-center"
                                    priority={true}
                                />
                                <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
                            </div>
                        )}

                        {/* Text Content */}
                        <div className={`relative z-10 flex-1 space-y-2 md:space-y-3 ${BANNER_DATA[currentSlide].type === "full" ? "max-w-[80%] md:max-w-[60%]" : "max-w-[60%]"
                            }`}>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <h1 className="text-lg md:text-2xl lg:text-4xl font-black leading-tight tracking-tight text-[#1A1A1A]">
                                    {BANNER_DATA[currentSlide].title} <br />
                                    <span className="font-bold text-sm md:text-lg lg:text-xl opacity-70 block mt-1">
                                        {BANNER_DATA[currentSlide].subtitle}
                                    </span>
                                </h1>
                                <p className="text-[10px] md:text-sm lg:text-base text-gray-600 mt-1 md:mt-2 font-medium max-w-sm leading-relaxed">
                                    {BANNER_DATA[currentSlide].description}
                                </p>
                            </motion.div>

                            <Link href="/shop">
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs lg:text-sm font-bold text-white shadow-md flex items-center gap-1.5 group/btn hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                                    style={{ backgroundColor: BANNER_DATA[currentSlide].buttonColor }}
                                    suppressHydrationWarning
                                >
                                    Shop Now
                                    <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">➜</span>
                                </motion.button>
                            </Link>
                        </div>

                        {/* Standard Image Area would go here if needed, mirroring structure above */}
                    </motion.div>
                </AnimatePresence>

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
