import { categories } from "@/data/categories";

interface CategoryGridProps {
  onCategoryClick: (categoryName: string) => void;
}

const CategoryGrid = ({ onCategoryClick }: CategoryGridProps) => {
  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900">Shop By Category</h2>
          <button onClick={() => onCategoryClick(categories[0].name)} className="text-[#45a049] font-bold text-sm hover:underline">See All</button>
        </div>

        {/* Simplified grid with specific blue background cards */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-3 md:gap-8 max-w-6xl mx-auto">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onCategoryClick(cat.name)}
              className="flex flex-col items-center gap-4 cursor-pointer group"
            >
              {/* Card */}
              <div className="w-full aspect-square bg-[#E6F4F1] rounded-2xl md:rounded-[2rem] flex items-center justify-center p-2 md:p-8 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain mix-blend-multiply drop-shadow-lg"
                />
              </div>
              {/* Label */}
              <span className="text-[10px] md:text-sm font-bold text-gray-900 text-center px-1 leading-tight">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
