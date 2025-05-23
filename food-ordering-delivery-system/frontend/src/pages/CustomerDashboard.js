import React from "react";
import CustomerHeader from "../components/CustomerHeader";
import BannerSlider from "../components/BannerSlider";
import FoodCategories from "../components/FoodCategories";
import TopRestaurants from "../components/TopRestaurants";
import Footer from "../components/Footer";

export default function CustomerHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <BannerSlider />
        <FoodCategories />
        <TopRestaurants />
      </main>
      <Footer />
    </div>
  );
}
