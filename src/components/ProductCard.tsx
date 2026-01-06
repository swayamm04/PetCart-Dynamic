import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";

export interface ProductCardProps {
  name: string;
  image: string;
  regularPrice: number;
  salePrice: number;
  discountPercentage: number;
  unit?: string;
}

const ProductCard = ({ name, image, regularPrice, salePrice, discountPercentage, unit = "1" }: ProductCardProps) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const cartItem = cartItems.find((item) => item.name === name);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart({ id: name, name, price: salePrice, image });
  };

  return (
    <div className="flex flex-col gap-2 w-full animate-in fade-in zoom-in duration-500">

      {/* Visual Image Container (Green Card) */}
      <div className="relative w-full aspect-square bg-[#76B079] rounded-2xl md:rounded-3xl p-4 flex items-center justify-center group overflow-hidden">
        {/* Product Name Top Overlay (Optional per screenshot specific cards, trying to match 'Cabbage' style) */}
        <div className="absolute top-2 left-3 md:top-4 md:left-4 z-10 w-3/4">
          <span className="text-[10px] md:text-xs font-bold text-black/80 block leading-tight truncate">
            {name.split(" -")[0]}
          </span>
        </div>

        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110 z-0 mt-4"
        />

        {/* Add Button / Quantity Selector */}
        <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-20">
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="bg-white text-[#45a049] text-xs font-bold py-1 px-3 md:py-1.5 md:px-5 rounded-lg md:rounded-xl shadow-md uppercase tracking-wide hover:bg-gray-50 active:scale-95 transition-all border border-gray-100"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-[#45a049] rounded-lg md:rounded-xl shadow-md p-0.5 md:p-1">
              <button
                onClick={() => updateQuantity(name, -1)}
                className="w-5 h-5 md:w-7 md:h-7 flex items-center justify-center text-white hover:bg-[#388e3c] rounded-md transition-colors"
              >
                <Minus className="w-3 h-3 md:w-3 md:h-3" />
              </button>
              <span className="text-white font-bold text-xs md:text-sm min-w-[16px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(name, 1)}
                className="w-5 h-5 md:w-7 md:h-7 flex items-center justify-center text-white hover:bg-[#388e3c] rounded-md transition-colors"
              >
                <Plus className="w-3 h-3 md:w-3 md:h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Below */}
      <div className="px-1 space-y-0.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="inline-block px-1.5 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded">
            {unit}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 text-xs md:text-sm truncate">
          {name.split(" ")[0]}
        </h3>

        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
          <Clock className="w-3 h-3" /> 14 mints
        </div>

        <div className="flex flex-col items-start mt-1">
          <span className="text-[10px] font-bold text-blue-600">
            {discountPercentage}% OFF
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-sm md:text-base">
              ₹{salePrice}
            </span>
            <span className="text-[10px] text-gray-400 line-through">
              MRP ₹{regularPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
