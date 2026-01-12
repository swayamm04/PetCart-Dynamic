import { HeroSection } from "@/components/features/home/HeroSection";
import { CategoryGrid } from "@/components/features/home/CategoryGrid";
import { BentoGridPromotions } from "@/components/features/home/BentoGridPromotions";
import { FeaturedSection } from "@/components/features/home/FeaturedSection";
import { DealCountdown } from "@/components/features/home/DealCountdown";
import { NewArrivals } from "@/components/features/home/NewArrivals";
import { DealOfWeek } from "@/components/features/home/DealOfWeek";
import { ServiceFeatures } from "@/components/features/home/ServiceFeatures";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CategoryGrid />
      <HeroSection />
      <NewArrivals />
      <BentoGridPromotions />
      <DealOfWeek />
      <ServiceFeatures />
      
    </div>
  );
}
