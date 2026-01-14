"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SidebarContent } from "@/components/layout/Sidebar"

export function Header() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <Sheet>
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
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search..."
                            className="pl-8 h-9 w-full md:w-[200px] lg:w-[300px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                </div>
                <button className="rounded-full bg-secondary p-2 hover:bg-secondary/80">
                    <Bell className="h-4 w-4 text-secondary-foreground" />
                    <span className="sr-only">Notifications</span>
                </button>
                <div className="h-8 w-8 rounded-full bg-primary/10"></div>
            </div>
        </header>
    )
}
