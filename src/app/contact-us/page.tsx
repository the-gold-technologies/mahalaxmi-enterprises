"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";

import ContactHero from "@/app/contact-us/components/ContactHero";
import ContactBreadcrumb from "@/app/contact-us/components/ContactBreadcrumb";
import ContactFormSection from "@/app/contact-us/components/ContactFormSection";
import SEOMeta from "@/components/SEOMeta";
import { useCMSStore } from "@/store/useCMSStore";

export default function ContactUsPage() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const { fetchContactUs, fetchPage } = useCMSStore();

  useEffect(() => {
    fetchContactUs().catch(console.error);
    fetchPage("contact-us").catch(console.error);
  }, [fetchContactUs, fetchPage]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <SEOMeta pageSlug="contact-us" />

      {/* Header Navigation Bar */}
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Top Hero Banner */}
      <ContactHero />

      {/* Breadcrumb Bar */}
      <ContactBreadcrumb />

      {/* Main Content & Contact Form */}
      <ContactFormSection />

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
