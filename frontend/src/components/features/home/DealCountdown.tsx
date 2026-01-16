"use client";

// import Link from "next/link";
import { PawPrint } from 'lucide-react';

export function DealCountdown() {
    const times = [
        { value: '239', label: 'Day' },
        { value: '07', label: 'Hour' },
        { value: '53', label: 'Min' },
        { value: '29', label: 'Sec' }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden paw-pattern border-t border-neutral-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                    <span className="text-indigo-500 font-bold tracking-widest uppercase text-[10px]">Fresh Flavoured Food</span>
                    <h2 className="text-4xl lg:text-5xl font-semibold text-neutral-900 tracking-tight leading-tight">
                        Up To 25% Off
                        <span className="text-indigo-300"> Discounts</span>
                    </h2>
                    <ul className="space-y-4 pt-4">
                        {['Cat Food', 'Dog Food', 'Rodents Food'].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-base text-neutral-600 font-semibold group cursor-pointer">
                                <PawPrint className="w-4 h-4 text-slate-800 fill-slate-800 group-hover:text-indigo-500 group-hover:fill-indigo-500 transition-colors duration-300" />
                                <span className="group-hover:text-indigo-500 transition-colors duration-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative flex flex-col items-center">
                    <div className="absolute -top-16 right-0 lg:right-10 flex gap-3 z-30">
                        {times.map((time, idx) => (
                            <div key={idx} className="bg-white px-4 py-3 rounded-xl shadow-sm border border-neutral-100 text-center min-w-[70px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <span className="block text-xl font-bold text-neutral-900">{time.value}</span>
                                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">{time.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="relative w-full max-w-md pt-10">
                        <img src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?w=500&h=600&fit=crop" className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 rounded-2xl" alt="Pet Food Products" />

                        <button className="absolute bottom-4 -left-8 z-30 bg-indigo-500 text-white px-8 py-3 rounded-full text-xs font-bold uppercase shadow-lg hover:bg-indigo-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            Grab Deal
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 w-full text-white leading-none">
                <svg className="block w-full h-[50px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
                </svg>
            </div>
        </section>
    );
}
