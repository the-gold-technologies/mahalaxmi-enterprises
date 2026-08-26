"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ProductsServicesSection from "@/components/ProductsServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustedClientsSection from "@/components/TrustedClientsSection";
import DistributorBanner from "@/components/DistributorBanner";
import LocateDistributorContactSection from "@/components/LocateDistributorContactSection";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import DistributorModal from "@/components/DistributorModal";
import { useCMSStore } from "@/store/useCMSStore";

export default function Home() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const [isDistributorOpen, setIsDistributorOpen] = useState(false);
  const [distributorType, setDistributorType] = useState("Industrial Lube Distributor (ILD)");

  const { fetchPage } = useCMSStore();

  useEffect(() => {
    fetchPage("home").catch(console.error);
  }, [fetchPage]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  const handleOpenDistributor = (type?: string) => {
    if (type) setDistributorType(type);
    setIsDistributorOpen(true);
  };

  return (
    <main
      className="min-h-screen bg-white text-gray-800"
      style={{
        fontSize: `${16 * fontSizeMultiplier}px`,
      }}
    >
      {/* 1. Top Header Utility & Navigation Bar */}
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* 2. Full-Width Hero Slider */}
      <HeroSlider />

      {/* 3. About HP Lubricants Section */}
      <AboutSection />

      {/* 4. Our Products and Services Section */}
      <ProductsServicesSection onSelectCategory={() => handleOpenEnquiry()} />

      {/* 6. Client Testimonials Section */}
      <TestimonialsSection />

      {/* 6.5. Trusted Clients & Partners Infinite Marquee Section */}
      <TrustedClientsSection />

      {/* 7. Full-Width Red Distributor Banner */}
      <DistributorBanner
        onOpenEnquiry={handleOpenEnquiry}
        onOpenDistributor={handleOpenDistributor}
      />

      {/* 8. Locate Distributor Form & Contact Details Grid */}
      <LocateDistributorContactSection
        onOpenEnquiry={handleOpenEnquiry}
        onOpenDistributor={handleOpenDistributor}
      />

      {/* 9. Dark Navy Footer & Sticky Enquiry Button */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />

      {/* Distributor Leaders Modal */}
      <DistributorModal
        isOpen={isDistributorOpen}
        onClose={() => setIsDistributorOpen(false)}
        initialType={distributorType}
      />
    </main>
  );
}
