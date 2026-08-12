"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import EventsHero from "@/app/events/components/EventsHero";
import EventsBreadcrumb from "@/app/events/components/EventsBreadcrumb";
import EventsContent from "@/app/events/components/EventsContent";

export default function EventsPage() {
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

      {/* Top Hero Banner */}
      <EventsHero />

      {/* Breadcrumb Bar */}
      <EventsBreadcrumb />

      {/* Main Content & Photo Gallery */}
      <EventsContent />

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
