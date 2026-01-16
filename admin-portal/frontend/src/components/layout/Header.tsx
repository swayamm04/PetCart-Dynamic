"use client"

import { Bell, Search, Menu, LogOut, User as UserIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SidebarContent } from "@/components/layout/Sidebar"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    return (
        <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-6">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="p-1 md:hidden shrink-0"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-0 w-[240px]">
                    <SidebarContent onNavigate={() => setOpen(false)} />
                </SheetContent>
            </Sheet>

            <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-1 sm:flex-initial">
                    {(pathname.startsWith('/products') || pathname.startsWith('/users')) && (
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search..."
                                onChange={(e) => {
                                    const params = new URLSearchParams(window.location.search);
                                    if (e.target.value) {
                                        params.set('search', e.target.value);
                                    } else {
                                        params.delete('search');
                                    }
                                    router.push(`${pathname}?${params.toString()}`);
                                }}
                                className="pl-8 h-9 w-full md:w-[200px] lg:w-[300px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>
                    )}
                </div>
                {/* Notification Bell Hidden as requested */}
                {/* <button className="rounded-full bg-secondary p-2 hover:bg-secondary/80">
                    <Bell className="h-4 w-4 text-secondary-foreground" />
                    <span className="sr-only">Notifications</span>
                </button> */}
            </div>
        </header>
    )
}
