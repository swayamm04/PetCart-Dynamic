import React from "react";
import { Home, Grid, ClipboardList, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
    const { isAuthenticated, openLogin } = useAuth();

    const navItems = [
        { id: "home", icon: Home, label: "Home" },
        { id: "categories", icon: Grid, label: "Categories" },
        { id: "orders", icon: ClipboardList, label: "Orders" },
        { id: "profile", icon: User, label: "Profile" },
    ];

    const handleClick = (id: string) => {
        if ((id === "orders" || id === "profile") && !isAuthenticated) {
            openLogin();
        } else {
            onTabChange(id);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 pb-safe px-6 md:hidden z-40 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                        className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? "text-[#45a049] -translate-y-1" : "text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        {isActive ? (
                            // Active Indicator Background
                            <div className="relative">
                                <item.icon className={`w-8 h-8 stroke-[2.5px]`} />
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#45a049] rounded-full"></span>
                            </div>
                        ) : (
                            <item.icon className="w-8 h-8" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;

