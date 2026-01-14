import Link from "next/link";
import { Facebook, Instagram, Twitter, PawPrint, Mail, ArrowRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-10 pb-24 md:pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                                <PawPrint className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-500">
                                Petzy
                            </span>
                        </Link>
                        <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
                            Premium supplies for your furry friends. Every pet deserves the best care.
                        </p>
                        <div className="flex gap-3">
                            {["Facebook", "Instagram", "Twitter"].map((social, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                    aria-label={social}
                                >
                                    {i === 0 && <Facebook className="w-4 h-4" />}
                                    {i === 1 && <Instagram className="w-4 h-4" />}
                                    {i === 2 && <Twitter className="w-4 h-4" />}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-neutral-900 mb-4 text-sm tracking-wide">Shop</h3>
                        <ul className="space-y-2.5">
                            {["Dog Essentials", "Cat Supplies", "Best Sellers", "New Arrivals", "Deals of Week"].map((item) => (
                                <li key={item}>
                                    <Link href="/shop" className="text-gray-500 hover:text-black hover:translate-x-1 transition-all duration-300 text-xs font-medium inline-block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help & Support */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-neutral-900 mb-4 text-sm tracking-wide">Support</h3>
                        <ul className="space-y-2.5">
                            {["Track Order", "Returns & Exchanges", "Shipping Policy", "24/7 Support", "Contact Us"].map((item) => (
                                <li key={item}>
                                    <Link href="/shop" className="text-gray-500 hover:text-black hover:translate-x-1 transition-all duration-300 text-xs font-medium inline-block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-bold text-neutral-900 mb-4 text-sm tracking-wide">Stay Connected</h3>
                        <div className="relative mb-6 group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                            <input
                                suppressHydrationWarning
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                            />
                            <button
                                suppressHydrationWarning
                                className="absolute right-1 top-1 p-1.5 bg-black rounded-md text-white hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-sm hover:shadow"
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-[10px]">
                        © 2024 PawfectStore. All rights reserved.
                    </p>
                    <div className="flex gap-3 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {/* Payment Icons Placeholder */}
                        <div className="h-5 w-8 bg-gray-200 rounded"></div>
                        <div className="h-5 w-8 bg-gray-200 rounded"></div>
                        <div className="h-5 w-8 bg-gray-200 rounded"></div>
                        <div className="h-5 w-8 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
