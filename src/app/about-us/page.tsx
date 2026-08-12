"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import AboutHpclHero from "@/app/about-us/components/AboutHpclHero";
import AboutBreadcrumb from "@/app/about-us/components/AboutBreadcrumb";
import AboutMahalaxmiContent from "@/app/about-us/components/AboutMahalaxmiContent";
import LubesHeadquarterSection from "@/app/about-us/components/LubesHeadquarterSection";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";

export default function AboutUsPage() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  return (
    <main
      className="min-h-screen bg-white text-gray-800 font-sans"
      style={{
        fontSize: `${16 * fontSizeMultiplier}px`,
      }}
    >
      {/* Header Navigation Bar */}
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Top Hero Banner (Full-Width) */}
      <AboutHpclHero />

      {/* Breadcrumb Bar */}
      <AboutBreadcrumb currentPage="About Us" />

      {/* 1. Mahalaxmi Enterprises About & Why Choose Us Section */}
      <AboutMahalaxmiContent />

      {/* 2. Lubes Marketing Headquarter (Full-Width) */}
      <LubesHeadquarterSection />

      {/* Footer & Enquiry Modal */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />
    </main>
  );
}
