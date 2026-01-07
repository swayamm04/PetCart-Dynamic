import { Search, ShoppingBag, MapPin, ChevronDown, User, Grid } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SearchOverlay from "./SearchOverlay";

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "categories", label: "Categories" },
    { id: "orders", label: "Orders" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">

            {/* Left: 60 Mins Badge & Location */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-center justify-center bg-[#45a049] text-white w-10 h-10 rounded-lg leading-none">
                <span className="text-sm font-bold">60</span>
                <span className="text-[9px] uppercase font-bold">Mins</span>
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Deliver To</span>
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#45a049] transition-colors">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-sm font-bold text-gray-900">560035</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Center: Brand Logo */}
            <a href="/" className="flex flex-col items-center gap-1 group">
              <div className="bg-[#EFC41A] p-1 rounded-md">
                <div className="bg-black text-[#EFC41A] p-0.5 rounded-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase">HomeRun</span>
            </a>

            {/* Desktop Navigation - Hidden as requested */}
            <nav className="hidden items-center gap-8 ml-12">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange?.(item.id)}
                  className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative py-1 ${activeTab === item.id
                    ? "text-[#45a049]"
                    : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#45a049] rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => onTabChange?.("orders")}
                className="hidden md:flex items-center gap-1 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:text-[#45a049]"
              >
                My Orders
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-[#45a049] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative hover:text-[#45a049] transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    key={cartCount}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#EFC41A] text-[10px] font-bold text-black rounded-full flex items-center justify-center animate-pop"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onTabChange?.("profile")}
                className="hidden md:flex hover:text-[#45a049] transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
