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
    Store
} from "lucide-react"

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Package, label: "Products", href: "/products" },
    { icon: ShoppingCart, label: "Orders", href: "/orders" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Settings, label: "Settings", href: "/settings" },
]

export function SidebarContent() {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        // Clear cookie
        document.cookie = "admin_session=; path=/; max-age=0"
        router.push("/login")
        router.refresh()
    }

    return (
        <div className="flex h-full flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <Store className="h-6 w-6 text-primary" />
                    <span>Admin Console</span>
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
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    pathname === item.href
                                        ? "bg-muted text-primary"
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
        <div className="flex h-screen w-full flex-col border-r bg-muted/40">
            <SidebarContent />
        </div>
    )
}
