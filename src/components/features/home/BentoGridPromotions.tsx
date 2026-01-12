"use client";

import Link from "next/link";

export function BentoGridPromotions() {
    return (
        <section className="py-2 px-2 sm:px-4 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-4 gap-2">

                    {/* Large Item (Top Left - 2x2) */}
                    <div className="col-span-2 row-span-2 bg-indigo-300 rounded-xl p-3 relative overflow-hidden group min-h-[160px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
                        <div className="relative z-10 w-3/4">
                            <p className="text-white/80 font-bold tracking-widest text-[6px] md:text-[8px] mb-1 uppercase">Nature&apos;s Blend</p>
                            <h3 className="text-xs md:text-lg font-semibold text-white tracking-tight mb-3 leading-tight">Natural Freeze<br />Dog Foods</h3>
                            <Link href="/shop" className="inline-block bg-white text-indigo-600 px-3 py-1 rounded-full text-[6px] md:text-[8px] font-bold uppercase tracking-wide hover:bg-indigo-50 transition-all duration-300">Shop Now</Link>
                        </div>
                        <img src="https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400&h=500&fit=crop" className="absolute -right-2 bottom-0 w-[60%] h-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md" alt="Dog Food" />
                    </div>

                    {/* Top Middle (1x1) */}
                    <div className="col-span-1 bg-indigo-300 rounded-xl p-2 relative overflow-hidden group min-h-[75px] cursor-pointer hover:shadow-md transition-shadow duration-300">
                        <div className="relative z-10">
                            <span className="text-white/80 font-bold text-[6px] uppercase tracking-widest block mb-0.5">Petz121</span>
                            <h3 className="text-[8px] md:text-xs font-semibold text-white leading-tight w-full">Accessories</h3>
                        </div>
                        <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop" className="absolute right-[-5px] bottom-[-5px] w-12 h-12 object-contain rounded-lg rotate-[-12deg] group-hover:rotate-0 transition-all duration-300" alt="Accessories" />
                    </div>

                    {/* Right Tall (Far Right - 1x2) */}
                    <div className="col-span-1 row-span-2 bg-neutral-300 rounded-xl p-3 relative overflow-hidden flex flex-col group min-h-[160px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
                        <div className="relative z-10 text-center">
                            <p className="text-white/90 font-bold text-[6px] uppercase tracking-widest mb-1">Offer</p>
                            <h3 className="text-[8px] md:text-sm font-semibold text-white tracking-tight leading-tight mb-2">Up To 25% <br />Off</h3>
                            <Link href="/shop" className="inline-block bg-white text-neutral-500 px-2 py-0.5 rounded-full text-[6px] font-bold uppercase hover:bg-neutral-50 shadow-sm">Shop</Link>
                        </div>
                        <div className="mt-auto relative w-full h-20">
                            <img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=300&h=400&fit=crop" className="absolute left-1/2 -translate-x-1/2 bottom-0 h-full object-contain group-hover:scale-110 transition-transform duration-300" alt="Pets" />
                        </div>
                    </div>

                    {/* Bottom Middle (1x1 - under Top Middle) */}
                    <div className="col-span-1 bg-neutral-300 rounded-xl p-2 relative overflow-hidden group min-h-[75px] cursor-pointer hover:shadow-md transition-shadow duration-300">
                        <div className="relative z-10">
                            <p className="text-neutral-600 font-bold text-[6px] uppercase tracking-widest mb-0.5">Sale</p>
                            <h3 className="text-[8px] md:text-xs font-semibold text-white leading-tight">Best Food</h3>
                        </div>
                        <img src="https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=200&h=200&fit=crop" className="absolute right-[-5px] bottom-[-10px] w-14 h-14 object-contain drop-shadow-sm group-hover:-translate-y-1 transition-transform duration-300" alt="Bowl" />
                    </div>

                </div>
            </div>
        </section>
    );
}
