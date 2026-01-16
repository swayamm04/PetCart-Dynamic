"use client";

import Link from "next/link";

export function BentoGridPromotions() {
    return (
        <section className="py-2 px-2 sm:px-4 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-4 gap-2">

                    {/* Large Item (Top Left - 2x2) */}
                    <div className="col-span-2 row-span-2 bg-indigo-300 rounded-xl p-3 relative overflow-hidden group min-h-[160px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
                        <img src="/images/Banner/hero-banner-1.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Dog Food" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-0"></div>
                        <div className="relative z-10 w-3/4">
                            <p className="text-white/90 font-bold tracking-widest text-[6px] md:text-[8px] mb-1 uppercase">Nature&apos;s Blend</p>
                            <h3 className="text-xs md:text-lg font-semibold text-white tracking-tight mb-3 leading-tight drop-shadow-md">Natural Freeze<br />Dog Foods</h3>
                            <Link href="/shop" className="inline-block bg-white/90 backdrop-blur-sm text-indigo-900 px-3 py-1 rounded-full text-[6px] md:text-[8px] font-bold uppercase tracking-wide hover:bg-white transition-all duration-300 shadow-sm">Shop Now</Link>
                        </div>
                    </div>

                    {/* Top Middle (1x1) */}
                    <div className="col-span-1 bg-indigo-300 rounded-xl p-2 relative overflow-hidden group min-h-[75px] cursor-pointer hover:shadow-md transition-shadow duration-300">
                        <img src="/images/Category/Others.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Accessories" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-0"></div>
                        <div className="relative z-10">
                            <span className="text-white/90 font-bold text-[6px] uppercase tracking-widest block mb-0.5">Petz121</span>
                            <h3 className="text-[8px] md:text-xs font-semibold text-white leading-tight w-full drop-shadow-sm">Accessories</h3>
                        </div>
                    </div>

                    {/* Right Tall (Far Right - 1x2) */}
                    <div className="col-span-1 row-span-2 bg-neutral-300 rounded-xl p-3 relative overflow-hidden flex flex-col group min-h-[160px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
                        <img src="/images/Banner/hero-banner-2.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Pets" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 z-0"></div>
                        <div className="relative z-10 text-center">
                            <p className="text-white/90 font-bold text-[6px] uppercase tracking-widest mb-1">Offer</p>
                            <h3 className="text-[8px] md:text-sm font-semibold text-white tracking-tight leading-tight mb-2 drop-shadow-md">Up To 25% <br />Off</h3>
                            <Link href="/shop" className="inline-block bg-white/90 backdrop-blur-sm text-neutral-800 px-2 py-0.5 rounded-full text-[6px] font-bold uppercase hover:bg-white shadow-sm">Shop</Link>
                        </div>
                    </div>

                    {/* Bottom Middle (1x1 - under Top Middle) */}
                    <div className="col-span-1 bg-neutral-300 rounded-xl p-2 relative overflow-hidden group min-h-[75px] cursor-pointer hover:shadow-md transition-shadow duration-300">
                        <img src="/images/Category/Dog.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Bowl" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-0"></div>
                        <div className="relative z-10">
                            <p className="text-white/90 font-bold text-[6px] uppercase tracking-widest mb-0.5">Sale</p>
                            <h3 className="text-[8px] md:text-xs font-semibold text-white leading-tight drop-shadow-sm">Best Food</h3>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
