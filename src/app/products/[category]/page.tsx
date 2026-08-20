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
          <h1 className="text-3xl font-extrabold text-[#002b5c] mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The requested product category could not be found.
          </p>
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
              <div
                key={idx}
                id={`subcat-${idx}`}
                className="flex flex-col space-y-5 scroll-mt-24"
              >
                {/* Header Title with Dark Blue Underline on First Word */}
                <div className="border-b border-gray-200 pb-2">
                  <h2 className="text-lg md:text-xl font-extrabold text-[#002b5c] tracking-wide uppercase inline-block relative">
                    <span className="border-b-4 border-[#002b5c] pb-2">
                      {firstWord}
                    </span>
                    {remainingWords && (
                      <span className="ml-2">{remainingWords}</span>
                    )}
                  </h2>
                </div>

                {/* Sub-category Row Layout: Left Square Image Frame & VIEW MORE Button + Right Pills List */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Left Column: Dark Blue Box with Center Rounded Square Image + VIEW MORE Button */}
                  <div className="flex flex-col space-y-3 shrink-0 w-full sm:w-auto">
                    <div className="group w-full sm:w-[230px] h-[210px] sm:h-[230px] bg-gradient-to-br from-[#002b5c] via-[#0d3b66] to-[#0275d8] rounded-2xl p-2.5 flex items-center justify-center relative overflow-hidden shadow-md border border-blue-900/40">
                      {/* Rounded Square Inner Container with Subtle Border */}
                      <div className="w-full h-full rounded-xl overflow-hidden border border-white/25 shadow-inner relative bg-slate-900/20">
                        <img
                          src={group.coverImage}
                          alt={group.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600";
                          }}
                        />
                        {/* Subtle bottom gradient tint */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                      </div>
                    </div>

                    <Link
                      href={`/products/${category.slug}/${group.products[0]?.slug || ""}`}
                      className="bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-lg text-center transition-all shadow-sm hover:shadow-md inline-flex items-center justify-center gap-1.5 w-full sm:w-[230px]"
                    >
                      <span>VIEW MORE</span>
                      <span className="text-sm">→</span>
                    </Link>
                  </div>

                  {/* Right Column: Uniform Fixed Height Product Pills Container with Vertical Scrollbar */}
                  <div className="flex-1 max-h-[230px] w-full overflow-y-auto space-y-2 pr-1.5 scrollbar-visible">
                    {group.products.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/products/${category.slug}/${prod.slug}`}
                        className="group/item bg-slate-100/80 hover:bg-white text-slate-700 hover:text-[#002b5c] text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-200/90 hover:border-sky-400/60 hover:shadow-sm flex items-center justify-between transition-all uppercase tracking-tight leading-snug"
                      >
                        <span className="truncate pr-2">{prod.name}</span>
                        <span className="text-slate-400 group-hover/item:text-[#eb1e25] transition-transform duration-200 group-hover/item:translate-x-0.5 text-xs">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
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
