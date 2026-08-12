'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import ProductsServicesSection from '@/components/ProductsServicesSection';
import EnterpriseSection from '@/components/EnterpriseSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import LatestVideosSection from '@/components/LatestVideosSection';
import DistributorBanner from '@/components/DistributorBanner';
import LocateDistributorContactSection from '@/components/LocateDistributorContactSection';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';

export default function Home() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState('');

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct('');
    setIsEnquiryOpen(true);
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

      {/* 5. A Future Ready Enterprise Section */}
      <EnterpriseSection />

      {/* 6. Client Testimonials Section */}
      <TestimonialsSection />

      {/* 7. Latest Videos Section */}
      <LatestVideosSection />

      {/* 8. Full-Width Red Distributor Banner */}
      <DistributorBanner onOpenEnquiry={handleOpenEnquiry} />

      {/* 9. Locate Distributor Form & Contact Details Grid */}
      <LocateDistributorContactSection onOpenEnquiry={handleOpenEnquiry} />

      {/* 10. Dark Navy Footer & Sticky Enquiry / Chat Bot Mascot */}
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
