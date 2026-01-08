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
import LoginOverlay from "@/components/LoginOverlay";
import { useState, useEffect, useCallback, useRef } from "react";

const Index = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const [targetCategory, setTargetCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [profileView, setProfileView] = useState<'main' | 'addresses'>('main');
  const mainRef = useRef<HTMLElement>(null);

  // Reset scroll position on tab or product change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [currentTab, selectedProduct, profileView]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        setCurrentTab(event.state.tab || "home");
        setSelectedProduct(event.state.product || null);
        if (event.state.category) setTargetCategory(event.state.category);
        setProfileView(event.state.profileView || 'main');
      } else {
        // Initial state
        setCurrentTab("home");
        setSelectedProduct(null);
        setProfileView('main');
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Set initial history state if not present
    if (!window.history.state) {
      window.history.replaceState({ tab: "home", profileView: 'main' }, "");
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const changeTab = useCallback((tab: string) => {
    setCurrentTab(tab);
    // Reset profile view when switching to profile tab directly via nav
    const newProfileView = tab === 'profile' ? 'main' : profileView;
    if (tab === 'profile') setProfileView('main');

    window.history.pushState({
      tab,
      category: targetCategory,
      product: selectedProduct,
      profileView: newProfileView
    }, "");
  }, [targetCategory, selectedProduct, profileView]);

  const selectProduct = useCallback((product: string | null) => {
    setSelectedProduct(product);
    if (product) {
      window.history.pushState({ tab: currentTab, category: targetCategory, product, profileView }, "");
    } else {
      window.history.pushState({ tab: currentTab, category: targetCategory, product: null, profileView }, "");
    }
  }, [currentTab, targetCategory, profileView]);

  const handleCategoryClick = (category: string) => {
    setTargetCategory(category);
    setCurrentTab("categories");
    window.history.pushState({ tab: "categories", category, product: null, profileView: 'main' }, "");
  };

  const handleAddressClick = () => {
    setProfileView('addresses');
    setCurrentTab('profile');
    window.history.pushState({ tab: 'profile', category: targetCategory, product: selectedProduct, profileView: 'addresses' }, "");
  };

  const handleProfileViewChange = (view: 'main' | 'addresses') => {
    setProfileView(view);
    window.history.pushState({ tab: 'profile', category: targetCategory, product: selectedProduct, profileView: view }, "");
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-none">
        <AnnouncementBar />
        <Header
          activeTab={currentTab}
          onTabChange={changeTab}
          onAddressClick={handleAddressClick}
        />
      </div>

      <main ref={mainRef} className="flex-1 overflow-hidden relative">
        {currentTab === "home" && (
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <CategoryGrid onCategoryClick={handleCategoryClick} />
            <BannerCarousel onProductClick={selectProduct} />
            <DealsSection onProductClick={selectProduct} />
            <TrustSignals />
            <Testimonials />
            <Footer />
          </div>
        )}

        {currentTab === "categories" && (
          <CategoriesFull
            defaultCategory={targetCategory}
            onProductClick={selectProduct}
          />
        )}

        {currentTab === "orders" && (
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <Orders />
            <Footer />
          </div>
        )}

        {currentTab === "profile" && (
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <Profile view={profileView} onViewChange={handleProfileViewChange} />
            <Footer />
          </div>
        )}
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
      <LoginOverlay />
    </div>
  );
};

export default Index;
