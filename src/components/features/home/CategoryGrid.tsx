"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";

export function CategoryGrid() {
    const categories = [
        { name: 'Dogs', img: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=300&h=300&fit=crop', cat: 'dog', href: '/shop?category=dog' },
        { name: 'Cats', img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=300&h=300&fit=crop', cat: 'cat', href: '/shop?category=cat' },
        { name: 'Birds', img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&h=300&fit=crop', cat: 'bird', href: '/shop?category=bird' },
        { name: 'Fishes', img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=300&h=300&fit=crop', cat: 'hamster', href: '/shop?category=hamster' },
    ];

    return (
        <section className="pt-0 pb-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-b-[2rem] relative z-40">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Visual separator line or just padding - Blinkit style is clean */}

                <div className="grid grid-cols-4 gap-4 mt-2">
                    {categories.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="group cursor-pointer block flex flex-col items-center"
                        >
                            <div className="relative w-16 h-16 md:w-24 md:h-24 mb-2 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full">
                                    <div className="w-full h-full bg-gray-200/50 rounded-full absolute animate-blob" style={{ animationDuration: `${4 + idx}s` }}></div>
                                </div>
                                <img src={item.img} alt={item.name} className="relative w-12 h-12 md:w-20 md:h-20 object-cover rounded-full z-10" />
                            </div>
                            <h3 className="text-[10px] md:text-sm font-bold text-center text-black leading-tight">{item.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
