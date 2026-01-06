import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const DealsSection = () => {
  return (
    <section className="py-8 bg-[#FFF9F0]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">
            Todays Best Deal
          </h2>
          <a href="#" className="text-[#45a049] font-bold text-sm hover:underline">See All</a>
        </div>

        {/* Horizontal Scroll List */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:flex-wrap md:grid md:grid-cols-5 md:overflow-visible scrollbar-hide">
          {products.map((product, index) => (
            <div key={index} className="min-w-[140px] w-[140px] md:min-w-[180px] md:w-[180px] flex-shrink-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
