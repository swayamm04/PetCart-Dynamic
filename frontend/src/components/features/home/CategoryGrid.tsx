"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";

export function CategoryGrid() {
    const categories = [
        { name: 'Dogs', img: '/images/Category/Dog.png', cat: 'dog', href: '/shop?category=Dogs' },
        { name: 'Cats', img: '/images/Category/Cat.png', cat: 'cat', href: '/shop?category=Cats' },
        { name: 'Birds', img: '/images/Category/Bird.png', cat: 'bird', href: '/shop?category=Birds' },
        { name: 'Fish', img: '/images/Category/Fish.png', cat: 'fish', href: '/shop?category=Fish' },
        { name: 'Other', img: '/images/Category/Others.png', cat: 'other', href: '/shop?category=Other' },
    ];

    return (
        <section className="pt-0 pb-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-b-[2rem] relative z-40">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Visual separator line or just padding - Blinkit style is clean */}

                <div className="grid grid-cols-5 gap-4 mt-2">
                    {categories.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="group cursor-pointer block flex flex-col items-center"
                        >
                            <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full">
                                    <div className="w-full h-full bg-gray-200/50 rounded-full absolute animate-blob" style={{ animationDuration: `${4 + idx}s` }}></div>
                                </div>
                                <img src={item.img} alt={item.name} className="relative w-12 h-12 md:w-16 md:h-16 object-cover rounded-full z-10 scale-125" />
                            </div>
                            <h3 className="text-[10px] md:text-sm font-bold text-center text-black leading-tight">{item.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
