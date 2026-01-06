import { Search, ShoppingBag, MapPin, ChevronDown, User, Grid } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SearchOverlay from "./SearchOverlay";

const Header = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
            <a href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group">
              <div className="bg-[#EFC41A] p-1 rounded-md">
                <div className="bg-black text-[#EFC41A] p-0.5 rounded-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase">HomeRun</span>
            </a>

            {/* Right: Actions */}
            <div className="flex items-center gap-5">
              <button className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-[#EFC41A] transition-colors">
                English <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-[#EFC41A] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative hover:text-[#EFC41A] transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#EFC41A] text-[10px] font-bold text-black rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
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
