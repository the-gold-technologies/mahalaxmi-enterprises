"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import EventsHero from "@/app/events/components/EventsHero";
import EventsBreadcrumb from "@/app/events/components/EventsBreadcrumb";
import EventsContent from "@/app/events/components/EventsContent";
import SEOMeta from "@/components/SEOMeta";
import { useCMSStore } from "@/store/useCMSStore";

export default function EventsPage() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const { fetchEvents, fetchPage } = useCMSStore();

  useEffect(() => {
    fetchEvents().catch(console.error);
    fetchPage("events").catch(console.error);
  }, [fetchEvents, fetchPage]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <SEOMeta pageSlug="events" />

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
