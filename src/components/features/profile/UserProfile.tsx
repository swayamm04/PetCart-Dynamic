"use client";

import { useState, useEffect } from "react";
import { User, MapPin, CreditCard, Bell, Shield, Settings, HelpCircle, Info, LogOut, ChevronRight, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function UserProfile() {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
        if (user) {
            setNewName(user.name);
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return null;
    }

    const menuItems = [
        { icon: MapPin, label: "Saved Addresses", href: "#" },
        { icon: CreditCard, label: "Payment Methods", href: "#" },
        { icon: Bell, label: "Notifications", href: "#" },
    ];

    const preferenceItems = [
        { icon: Shield, label: "Privacy & Security", href: "#" },
        { icon: Settings, label: "App Settings", href: "#" },
    ];

    const supportItems = [
        { icon: HelpCircle, label: "Help & Support", href: "#" },
        { icon: Info, label: "About Petzy", href: "#" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">

            {/* User Card */}
            <div className="bg-white px-4 pt-4 pb-6 mb-4 shadow-sm rounded-b-[2rem] relative z-10">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-[#FEFCE8] rounded-3xl p-6 flex items-center justify-between shadow-sm border border-yellow-50">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#FEF9C3] rounded-2xl flex items-center justify-center text-[#CA8A04] font-bold text-2xl shadow-inner">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-black text-[#1E1E1E] uppercase tracking-wide">{user.name}</h2>
                                    <Dialog open={isEditing} onOpenChange={setIsEditing}>
                                        <DialogTrigger asChild>
                                            <button className="text-gray-400 hover:text-yellow-600 transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Name</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <Input
                                                    value={newName}
                                                    onChange={(e) => setNewName(e.target.value)}
                                                    placeholder="Enter full name"
                                                    className="focus:ring-yellow-500"
                                                />
                                                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold" onClick={() => setIsEditing(false)}>
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <p className="text-sm font-semibold text-gray-500 tracking-wider">+91 {user.phone}</p>
                            </div>
                        </div>
                        {/* Decorative Circle */}
                        <div className="w-24 h-24 bg-white/20 rounded-full blur-2xl absolute right-10 top-0 pointer-events-none"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-xl mx-auto px-4 space-y-6">

                {/* Account Section */}
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">My Account</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {menuItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group",
                                    idx !== menuItems.length - 1 && "border-b border-gray-100"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-700">{item.label}</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-600 transition-colors" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Preferences Section */}
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Preferences</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {preferenceItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group",
                                    idx !== preferenceItems.length - 1 && "border-b border-gray-100"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-700">{item.label}</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-600 transition-colors" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Support Section */}
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Support</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {supportItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group",
                                    idx !== supportItems.length - 1 && "border-b border-gray-100"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-700">{item.label}</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-600 transition-colors" />
                            </Link>
                        ))}
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors group cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 group-hover:bg-red-100 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-red-500">Logout</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
