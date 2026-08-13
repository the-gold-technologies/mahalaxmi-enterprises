"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import DownloadModal from "@/components/DownloadModal";
import { getProductBySlug, getCategoryBySlug, productsData } from "@/data/productsData";
import { ArrowLeft, FileText, Droplet, Search } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const categorySlug = params?.category as string;
  const productSlug = params?.slug as string;

  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadProductName, setDownloadProductName] = useState("");
  const [downloadPdfType, setDownloadPdfType] = useState<"TDS" | "MSDS">("TDS");
  const [downloadPdfUrl, setDownloadPdfUrl] = useState("");

  const product = getProductBySlug(productSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!product || !category) {
    return (
      <main className="min-h-screen bg-white text-gray-800 font-sans flex flex-col justify-between">
        <Navbar
          fontSizeMultiplier={fontSizeMultiplier}
          setFontSizeMultiplier={setFontSizeMultiplier}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-extrabold text-[#002b5c] mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The requested lubricant product could not be located.</p>
          <Link
            href="/products/industrial-oils"
            className="inline-flex items-center gap-2 bg-[#002b5c] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#eb1e25] transition"
          >
            <ArrowLeft size={16} /> Return to All Products
          </Link>
        </div>
        <Footer onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      </main>
    );
  }

  // Find sub-category group for current product
  const currentGroup = category.subCategoryGroups.find((group) =>
    group.products.some((p) => p.slug === product.slug)
  );

  // If current group has multiple products use them, else show top products in category
  const groupProducts = currentGroup ? currentGroup.products : [];
  const siblingProducts =
    groupProducts.length > 1
      ? groupProducts
      : category.products.slice(0, 6);

  const handleOpenDownload = (pdfType: "TDS" | "MSDS") => {
    setDownloadProductName(product.name);
    setDownloadPdfType(pdfType);
    setDownloadPdfUrl(pdfType === "TDS" ? product.pdfUrl : product.msdsUrl);
    setIsDownloadOpen(true);
  };

  const handleOpenEnquiry = (prodName?: string) => {
    if (prodName) setEnquiryProduct(prodName);
    else setEnquiryProduct(product.name);
    setIsEnquiryOpen(true);
  };

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
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-xs md:text-sm text-gray-600 flex items-center gap-2 font-medium flex-wrap">
          <Link href="/" className="text-[#337ab7] hover:underline">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href={`/products/${category.slug}`} className="text-[#337ab7] hover:underline">
            {category.name}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#eb1e25] font-semibold">{product.name}</span>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
        {/* Category Title with Dark Blue Underline Bar (e.g. FILM OIL / COMPRESSOR OILS) */}
        <div className="mb-10 border-b border-gray-200 pb-2">
          <h1 className="text-2xl md:text-3xl font-black text-[#002b5c] uppercase tracking-wider inline-block relative">
            <span className="border-b-4 border-[#002b5c] pb-2">
              {currentGroup?.title || product.subtitle || category.name}
            </span>
          </h1>
        </div>

        {/* Top 3-Column Layout: Left Drum Box, Center Details & Specs, Right Sibling Products Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          {/* Left Column: Product Barrel Frame Container with Zoom Icon */}
          <div className="lg:col-span-5 border border-gray-200 rounded-xs p-6 bg-white shadow-xs relative text-center flex items-center justify-center min-h-[320px]">
            <img
              src={product.containerImage}
              alt={product.name}
              className="max-h-72 object-contain mx-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg";
              }}
            />
            <div className="absolute bottom-3 right-3 bg-gray-100 p-1.5 rounded-xs border border-gray-200 text-gray-500">
              <Search size={14} />
            </div>
          </div>

          {/* Center Column: Product Name, Subtitle, Specifications */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#eb1e25] mb-1">
                {product.name}
              </h2>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {product.subtitle || category.name}
              </p>
            </div>

            {product.specsText && (
              <div className="pt-2">
                <h3 className="text-base font-bold text-[#eb1e25] mb-1">
                  Meets specifications:
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed font-sans">
                  {product.specsText}
                </p>
                <div className="w-14 h-1 bg-[#002b5c] my-3" />
              </div>
            )}
          </div>

          {/* Right Column: Clean Height-Constrained Sibling Sidebar with Scrollbar */}
          <div className="lg:col-span-3 space-y-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-visible">
            {siblingProducts.map((sib) => {
              const isCurrent = sib.slug === product.slug;
              return (
                <Link
                  key={sib.id}
                  href={`/products/${category.slug}/${sib.slug}`}
                  className={`block px-4 py-2.5 text-xs rounded-xs font-bold uppercase transition-all ${
                    isCurrent
                      ? "bg-[#002b5c] text-white shadow-xs"
                      : "bg-[#e9ecef] hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  {sib.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Lower Main Sections: Application Areas, Performance Benefits, Special Features */}
        <div className="max-w-4xl space-y-8 mb-12">
          {/* Application Areas */}
          {product.applicationAreas && (
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-bold text-[#eb1e25]">
                Application areas:
              </h3>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-sans">
                {product.applicationAreas}
              </p>
            </div>
          )}

          {/* Performance Benefits */}
          {product.performanceBenefits && product.performanceBenefits.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-bold text-[#eb1e25]">
                Performance benefits:
              </h3>
              <ul className="space-y-2 pl-1">
                {product.performanceBenefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
                    <span className="text-gray-900 font-bold">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Special Features */}
          {product.specialFeatures && product.specialFeatures.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-bold text-[#eb1e25]">
                Special Features
              </h3>
              <div className="space-y-2 text-xs md:text-sm text-gray-700 leading-relaxed">
                {product.specialFeatures.map((feat, fIdx) => (
                  <p key={fIdx}>{feat}</p>
                ))}
              </div>
            </div>
          )}

          {/* Physico-Chemical Properties Table (Replicating exact table from HP Lubricants screenshot) */}
          {product.propertiesTable && product.propertiesTable.length > 0 && (
            <div className="space-y-3 pt-4">
              <h3 className="text-lg md:text-xl font-bold text-[#eb1e25]">
                Physico-chemical properties
              </h3>
              <div className="overflow-x-auto border border-gray-300 rounded-xs">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="bg-[#002b5c] text-white">
                      <th colSpan={2} className="py-3 px-4 text-center font-extrabold uppercase border-b border-[#002b5c]">
                        {product.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.propertiesTable.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={rIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="py-2.5 px-4 font-semibold text-gray-700 border-b border-r border-gray-200">
                          {row.property}
                        </td>
                        <td className="py-2.5 px-4 text-gray-900 font-bold border-b border-gray-200 text-center">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Red Download PDF & Download MSDS PDF Action Buttons */}
          <div className="pt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleOpenDownload("TDS")}
              className="bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xs flex items-center gap-2 shadow-xs transition cursor-pointer"
            >
              <FileText size={15} /> DOWNLOAD PDF
            </button>

            <button
              onClick={() => handleOpenDownload("MSDS")}
              className="bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xs flex items-center gap-2 shadow-xs transition cursor-pointer"
            >
              <FileText size={15} /> DOWNLOAD MSDS PDF
            </button>

            <button
              onClick={() => handleOpenEnquiry(product.name)}
              className="bg-[#002b5c] hover:bg-[#001f42] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xs transition cursor-pointer"
            >
              INQUIRE PRODUCT
            </button>
          </div>
        </div>

        {/* Sub-Category Teardrop Navigation Grid (Matching HP Lubricants Screenshot 100%) */}
        <div className="mt-20 pt-8">
          <div className="border-t border-gray-200">
            {Array.from({ length: Math.ceil(category.subCategoryGroups.length / 4) }).map((_, rIdx) => {
              const rowItems = category.subCategoryGroups.slice(rIdx * 4, rIdx * 4 + 4);
              return (
                <div
                  key={rIdx}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 items-center py-3.5 border-b border-gray-200"
                >
                  {rowItems.map((subGroup, cIdx) => {
                    const isCurrentGroup = subGroup.title.toLowerCase() === currentGroup?.title.toLowerCase();
                    return (
                      <Link
                        key={cIdx}
                        href={`/products/${category.slug}#subcat-${rIdx * 4 + cIdx}`}
                        className="flex items-center gap-2.5 group transition-colors py-0.5"
                      >
                        <Droplet
                          size={15}
                          className={`shrink-0 transition-colors ${
                            isCurrentGroup
                              ? "text-[#eb1e25] fill-[#eb1e25]"
                              : "text-[#555555] fill-[#555555] group-hover:text-[#eb1e25] group-hover:fill-[#eb1e25]"
                          }`}
                        />
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wide leading-tight transition-colors ${
                            isCurrentGroup
                              ? "text-[#eb1e25]"
                              : "text-[#555555] group-hover:text-[#eb1e25]"
                          }`}
                        >
                          {subGroup.title}
                        </span>
                      </Link>
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
        pdfType={downloadPdfType}
        pdfUrl={downloadPdfUrl}
      />
    </main>
  );
}
