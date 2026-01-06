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
import ProductDetail from "@/components/ProductDetail";
import { useState, useEffect, useCallback, useRef } from "react";

const Index = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const [targetCategory, setTargetCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Reset scroll position on tab or product change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [currentTab, selectedProduct]);
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        setCurrentTab(event.state.tab || "home");
        setSelectedProduct(event.state.product || null);
        if (event.state.category) setTargetCategory(event.state.category);
      } else {
        // Initial state
        setCurrentTab("home");
        setSelectedProduct(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Set initial history state if not present
    if (!window.history.state) {
      window.history.replaceState({ tab: "home" }, "");
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const changeTab = useCallback((tab: string) => {
    setCurrentTab(tab);
    window.history.pushState({ tab, category: targetCategory, product: selectedProduct }, "");
  }, [targetCategory, selectedProduct]);

  const selectProduct = useCallback((product: string | null) => {
    setSelectedProduct(product);
    if (product) {
      window.history.pushState({ tab: currentTab, category: targetCategory, product }, "");
    } else {
      // If we are closing, we might want to go back in history if it was a push
      // But for simplicity in this SPA, we just push a null product state
      window.history.pushState({ tab: currentTab, category: targetCategory, product: null }, "");
    }
  }, [currentTab, targetCategory]);

  const handleCategoryClick = (category: string) => {
    setTargetCategory(category);
    setCurrentTab("categories");
    window.history.pushState({ tab: "categories", category, product: null }, "");
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-none">
        <AnnouncementBar />
        <Header />
      </div>

      <main ref={mainRef} className="flex-1 overflow-y-auto overflow-x-hidden relative">
        {currentTab === "home" && (
          <>
            <CategoryGrid onCategoryClick={handleCategoryClick} />
            <BannerCarousel onProductClick={selectProduct} />
            <DealsSection onProductClick={selectProduct} />
            <TrustSignals />
            <Testimonials />
          </>
        )}

        {currentTab === "categories" && (
          <CategoriesFull
            defaultCategory={targetCategory}
            onProductClick={selectProduct}
          />
        )}
        {currentTab === "orders" && <Orders />}
        {currentTab === "profile" && <Profile />}

        <Footer />
      </main>

      <div className="flex-none">
        <BottomNav activeTab={currentTab} onTabChange={changeTab} />
      </div>

      {selectedProduct && (
        <ProductDetail
          productName={selectedProduct}
          onBack={() => window.history.back()}
        />
      )}
      <FloatingCart />
      <CartDrawer />
    </div>
  );
};

export default Index;
