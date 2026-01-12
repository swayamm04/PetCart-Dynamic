"use client";

import Link from "next/link";
import { Headphones, Sparkles, Truck, Zap, ShieldCheck, Tag } from 'lucide-react';

export function FeaturedSection() {
    const features = [
        { icon: Headphones, text: '24/7 Support' },
        { icon: Sparkles, text: 'Personalized Care' },
        { icon: Truck, text: 'Pet Taxi Facility' },
        { icon: Zap, text: 'Quick Delivery' },
        { icon: ShieldCheck, text: 'Money Back' },
        { icon: Tag, text: 'Lowest Price' },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="absolute inset-4 bg-green-50 rounded-[3rem] rotate-[-6deg] scale-105 -z-10"></div>
                    <div className="relative rounded-[3rem] overflow-hidden">
                        <div className="relative bg-transparent">
                            <img src="https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&h=600&fit=crop" className="relative z-10 w-3/4 mx-auto object-cover rounded-3xl" alt="Happy Dog" />
                            <img src="https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=300&h=400&fit=crop" className="absolute bottom-0 right-10 z-20 w-40 h-auto object-contain drop-shadow-xl animate-float rounded-2xl" alt="Pet Food" />
                        </div>
                    </div>
                </div>
                <div className="space-y-8">
                    <span className="text-indigo-500 font-bold tracking-widest uppercase text-[10px]">100% Organic Pet Food</span>
                    <h2 className="text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
                        Help Your Dog Maintain A Healthier Life
                    </h2>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                        Introducing Petzy&apos;s desirable range of pet food, crafted with love and care. With Petzy, mealtime becomes a delightful experience.
                    </p>
                    <div className="grid grid-cols-2 gap-6 text-sm">
                        {features.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                                <item.icon className="w-5 h-5 text-slate-700 group-hover:text-indigo-500 transition-colors duration-300" />
                                <span className="font-semibold text-neutral-700 group-hover:text-indigo-500 transition-colors duration-300">{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/shop"
                        className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full text-xs font-bold uppercase shadow-lg shadow-indigo-200 hover:-translate-y-1 transition-all duration-300"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
