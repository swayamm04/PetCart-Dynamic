import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import DealsSection from "@/components/DealsSection";
import TrustSignals from "@/components/TrustSignals";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import FloatingCart from "@/components/FloatingCart";
import CartDrawer from "@/components/CartDrawer";
import BottomNav from "@/components/BottomNav";
import CategoriesFull from "@/components/CategoriesFull";
import Orders from "@/components/Orders";
import Profile from "@/components/Profile";
import { useState } from "react";

const Index = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const [targetCategory, setTargetCategory] = useState("");

  const handleCategoryClick = (category: string) => {
    setTargetCategory(category);
    setCurrentTab("categories");
    window.scrollTo(0, 0);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-none">
        <AnnouncementBar />
        <Header />
      </div>

      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        {currentTab === "home" && (
          <>
            <CategoryGrid onCategoryClick={handleCategoryClick} />
            <BannerCarousel />
            <DealsSection />
            <TrustSignals />
            <Testimonials />
          </>
        )}

        {currentTab === "categories" && <CategoriesFull defaultCategory={targetCategory} />}
        {currentTab === "orders" && <Orders />}
        {currentTab === "profile" && <Profile />}

        <Footer />
      </main>

      <div className="flex-none">
        <BottomNav activeTab={currentTab} onTabChange={setCurrentTab} />
      </div>

      <FloatingCart />
      <CartDrawer />
    </div>
  );
};

export default Index;
