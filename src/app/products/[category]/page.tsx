"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import DownloadModal from "@/components/DownloadModal";
import { getCategoryBySlug } from "@/data/productsData";
import { ArrowLeft, Droplet } from "lucide-react";

export default function CategoryProductsPage() {
  const params = useParams();
  const categorySlug = params?.category as string;

  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadProductName, setDownloadProductName] = useState("");
  const [downloadPdfUrl, setDownloadPdfUrl] = useState("");

  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return (
      <main className="min-h-screen bg-white text-gray-800 font-sans flex flex-col justify-between">
        <Navbar
          fontSizeMultiplier={fontSizeMultiplier}
          setFontSizeMultiplier={setFontSizeMultiplier}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-extrabold text-[#002b5c] mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The requested product category could not be found.</p>
          <Link
            href="/products/industrial-oils"
            className="inline-flex items-center gap-2 bg-[#002b5c] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#eb1e25] transition"
          >
            <ArrowLeft size={16} /> Return to All Categories
          </Link>
        </div>
        <Footer onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      </main>
    );
  }

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  const rowsCount = Math.ceil(category.subCategoryGroups.length / 4);

  return (
    <main
      className="min-h-screen bg-white text-gray-800 font-sans flex flex-col justify-between"
      style={{
        fontSize: `${16 * fontSizeMultiplier}px`,
      }}
    >
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Breadcrumbs matching exact HP Lubricants style */}
      <section className="bg-white py-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-xs md:text-sm text-gray-600 flex items-center gap-2 font-medium">
          <Link href="/" className="text-[#337ab7] hover:underline">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#eb1e25] font-semibold">{category.name}</span>
        </div>
      </section>

      {/* Main Content Grid strictly matching HP Lubricants official design */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 w-full">
        {/* Sub-Category Groups Grid (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14">
          {category.subCategoryGroups.map((group, idx) => {
            const words = group.title.split(" ");
            const firstWord = words[0];
            const remainingWords = words.slice(1).join(" ");

            return (
              <div key={idx} id={`subcat-${idx}`} className="flex flex-col space-y-5 scroll-mt-24">
                {/* Header Title with Dark Blue Underline on First Word */}
                <div className="border-b border-gray-200 pb-2">
                  <h2 className="text-lg md:text-xl font-extrabold text-[#002b5c] tracking-wide uppercase inline-block relative">
                    <span className="border-b-4 border-[#002b5c] pb-2">{firstWord}</span>
                    {remainingWords && <span className="ml-2">{remainingWords}</span>}
                  </h2>
                </div>

                {/* Sub-category Row Layout: Left Circular Cutout Image Frame & VIEW MORE Button + Right Pills List */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Left Column: Dark Blue Box with Center Circle Image + VIEW MORE Button */}
                  <div className="flex flex-col space-y-3 shrink-0">
                    <div className="w-[230px] h-[230px] bg-gradient-to-tr from-[#0a2550] via-[#104886] to-[#0275d8] rounded-xs p-3 flex items-center justify-center relative overflow-hidden shadow-xs">
                      <div className="w-44 h-44 rounded-full overflow-hidden border-2 border-white/20 shadow-md">
                        <img
                          src={group.coverImage}
                          alt={group.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600";
                          }}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/products/${category.slug}/${group.products[0]?.slug || ""}`}
                      className="bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-xs text-center transition-colors shadow-xs inline-block min-w-[130px]"
                    >
                      VIEW MORE
                    </Link>
                  </div>

                  {/* Right Column: Uniform Fixed Height Product Pills Container with Vertical Scrollbar */}
                  <div className="flex-1 max-h-[230px] w-full overflow-y-auto space-y-2.5 pr-1.5 scrollbar-visible">
                    {group.products.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/products/${category.slug}/${prod.slug}`}
                        className="bg-[#e9ecef] hover:bg-[#dee2e6] text-[#333333] text-xs font-semibold px-4 py-2.5 rounded-xs block transition-colors uppercase tracking-tight leading-snug"
                      >
                        {prod.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sub-Category Teardrop Navigation Grid (Matching HP Lubricants Screenshot 100%) */}
        <div className="mt-20 pt-8">
          <div className="border-t border-gray-200">
            {Array.from({ length: rowsCount }).map((_, rIdx) => {
              const rowItems = category.subCategoryGroups.slice(rIdx * 4, rIdx * 4 + 4);
              return (
                <div
                  key={rIdx}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 items-center py-3.5 border-b border-gray-200"
                >
                  {rowItems.map((subGroup, cIdx) => {
                    const itemIdx = rIdx * 4 + cIdx;
                    return (
                      <a
                        key={cIdx}
                        href={`#subcat-${itemIdx}`}
                        className="flex items-center gap-2.5 group transition-colors py-0.5"
                      >
                        <Droplet
                          size={15}
                          className="text-[#555555] fill-[#555555] group-hover:text-[#eb1e25] group-hover:fill-[#eb1e25] transition-colors shrink-0"
                        />
                        <span className="text-[11px] font-bold text-[#555555] group-hover:text-[#eb1e25] uppercase tracking-wide leading-tight transition-colors">
                          {subGroup.title}
                        </span>
                      </a>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />

      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        productName={downloadProductName}
        pdfType="TDS"
        pdfUrl={downloadPdfUrl}
      />
    </main>
  );
}
