"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ProductsServicesSection from "@/components/ProductsServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustedClientsSection from "@/components/TrustedClientsSection";
import LocateDistributorContactSection from "@/components/LocateDistributorContactSection";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";

import SEOMeta from "@/components/SEOMeta";
import { useCMSStore } from "@/store/useCMSStore";

export default function Home() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");



  const { fetchPage } = useCMSStore();

  useEffect(() => {
    fetchPage("home").catch(console.error);
  }, [fetchPage]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };


  return (
    <main className="min-h-screen bg-white text-gray-800">
      <SEOMeta pageSlug="home" isLandingPage={true} />

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

      {/* 8. Contact Details Section */}
      <LocateDistributorContactSection
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* 9. Dark Navy Footer & Sticky Enquiry Button */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />

    </main>
  );
}
