"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import BlogsHero from "@/app/blogs/components/BlogsHero";
import BlogsBreadcrumb from "@/app/blogs/components/BlogsBreadcrumb";
import BlogsContent from "@/app/blogs/components/BlogsContent";
import SEOMeta from "@/components/SEOMeta";
import { useCMSStore } from "@/store/useCMSStore";

export default function BlogsListingPage() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const { fetchBlogs, fetchPage } = useCMSStore();

  useEffect(() => {
    fetchBlogs().catch(console.error);
    fetchPage("blogs").catch(console.error);
  }, [fetchBlogs, fetchPage]);

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
      <SEOMeta pageSlug="blogs" />

      {/* Header Navigation Bar */}
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Hero Banner */}
      <BlogsHero />

      {/* Breadcrumb Bar */}
      <BlogsBreadcrumb />

      {/* Main Blog Grid & Filter Section */}
      <BlogsContent />

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
