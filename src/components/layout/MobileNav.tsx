"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ClipboardList, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Home",
            href: "/",
            icon: Home,
        },
        {
            name: "Products",
            href: "/shop",
            icon: LayoutGrid,
        },
        {
            name: "Orders",
            href: "/orders",
            icon: ClipboardList,
        },
        {
            name: "Profile",
            href: "/profile",
            icon: User,
        },
    ];

    // Hide Mobile Nav on Product Details pages (e.g. /shop/123)
    const isProductDetails = /^\/shop\/[^/]+$/.test(pathname || "");

    if (isProductDetails) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-6 md:hidden z-50 pb-safe">
            <div className="flex items-center justify-between">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex flex-col items-center gap-1 relative group"
                        >
                            <div className={cn(
                                "p-1 rounded-xl transition-colors duration-200",
                                isActive ? "text-yellow-600" : "text-gray-400 hover:text-gray-600"
                            )}>
                                <item.icon className={cn("w-7 h-7", isActive && "stroke-[2.5px]")} />
                            </div>

                            {/* Active Dot Indicator */}
                            {isActive && (
                                <div className="absolute -bottom-2 w-1 h-1 bg-yellow-600 rounded-full"></div>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
