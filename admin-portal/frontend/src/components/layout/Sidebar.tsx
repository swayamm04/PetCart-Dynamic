"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Store,
    Image as ImageIcon,
    PawPrint
} from "lucide-react"

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Package, label: "Products", href: "/products" },
    { icon: ShoppingCart, label: "Orders", href: "/orders" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Package, label: "Inventory", href: "/inventory" },
    { icon: Settings, label: "Settings", href: "/settings" },
]

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        // Clear cookie matching middleware expectation
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        // Clear local storage as well to be safe
        localStorage.removeItem("petshop_admin_user");
        localStorage.removeItem("petshop_admin_token");
        window.location.href = "/login"
    }

    return (
        <div className="flex h-full flex-col gap-2">
            <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-gradient-to-r from-yellow-400 to-yellow-500">
                <Link href="/dashboard"
                    onClick={onNavigate}
                    className="flex items-center gap-3 font-semibold">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-yellow-400 shadow-md">
                        <PawPrint className="w-5 h-5 fill-current" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-lg font-black tracking-tight text-black">Petzy</span>
                        <span className="text-[10px] font-bold text-black/80">Admin Portal</span>
                    </div>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    {sidebarItems.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                onClick={onNavigate}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-yellow-50 hover:text-yellow-700",
                                    pathname === item.href
                                        ? "bg-yellow-100 text-yellow-900 shadow-sm"
                                        : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="mt-auto p-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-all hover:bg-destructive/10"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </div>
    )
}

export function Sidebar() {
    return (
        <div className="flex h-full w-full flex-col border-r bg-muted/40">
            <SidebarContent />
        </div>
    )
}
