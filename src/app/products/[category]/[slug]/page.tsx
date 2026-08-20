"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import DownloadModal from "@/components/DownloadModal";
import { getProductBySlug, getCategoryBySlug } from "@/data/productsData";
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

  // Sibling products from current sub-category group
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

  const hasMultiCols = Boolean(product.tableHeaders && product.tableHeaders.length > 0);
  const colCount = hasMultiCols ? product.tableHeaders!.length : 1;

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
        {/* Category Title with Dark Blue Underline Bar */}
        <div className="mb-8 border-b border-gray-200 pb-3 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] uppercase tracking-wider inline-block relative">
            <span className="border-b-4 border-[#002b5c] pb-3 inline-block">
              {currentGroup?.title || product.subtitle || category.name}
            </span>
          </h1>
          <span className="text-xs font-bold uppercase tracking-widest text-[#eb1e25] bg-red-50 px-3 py-1 rounded-full border border-red-100 hidden sm:inline-block">
            Industrial Grade
          </span>
        </div>

        {/* Top Product Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Product Image Frame Container */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-slate-50 via-slate-50/60 to-slate-100/90 border border-slate-200/80 p-6 relative flex items-center justify-center min-h-[320px] group shadow-inner">
              <img
                src={product.containerImage}
                alt={product.name}
                className="max-h-72 object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg";
                }}
              />
              <div className="absolute bottom-3.5 right-3.5 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-slate-200 text-slate-500 shadow-xs">
                <Search size={15} />
              </div>
            </div>

            {/* Center Column: Product Name, Subtitle, Specifications & Quick CTAs */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
              <div>
                <span className="text-[11px] font-extrabold text-[#eb1e25] uppercase tracking-wider block mb-1">
                  {product.subtitle || currentGroup?.title || category.name}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002b5c] tracking-tight mb-2">
                  {product.name}
                </h2>
                <div className="w-12 h-1 bg-[#002b5c] rounded-full mb-4" />

                {/* Specifications or Key Highlights */}
                {product.specsText ? (
                  <div className="bg-slate-50 border-l-4 border-[#eb1e25] rounded-r-xl p-3.5 shadow-xs mb-4">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#eb1e25] mb-1">
                      Meets Specifications:
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      {product.specsText}
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-50 border-l-4 border-[#002b5c] rounded-r-xl p-3.5 shadow-xs mb-4">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#002b5c] mb-1">
                      Key Application:
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      {product.applicationAreas}
                    </p>
                  </div>
                )}

                {/* Quick Info Badges */}
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 font-medium">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    📦 20L / 50L / 210L Barrel
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200 font-semibold">
                    ✓ In Stock & Ready to Dispatch
                  </span>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleOpenEnquiry(product.name)}
                  className="bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  Inquire Product
                </button>
                <button
                  onClick={() => handleOpenDownload("TDS")}
                  className="bg-[#002b5c] hover:bg-[#001f42] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText size={14} /> TDS
                </button>
              </div>
            </div>

            {/* Right Column: Sibling Products Sidebar */}
            <div className="lg:col-span-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#002b5c] block mb-3 pb-2 border-b border-slate-200">
                In This Series ({siblingProducts.length})
              </span>
              <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-visible">
                {siblingProducts.map((sib) => {
                  const isCurrent = sib.slug === product.slug;
                  return (
                    <Link
                      key={sib.id}
                      href={`/products/${category.slug}/${sib.slug}`}
                      className={`block px-3.5 py-2 text-xs rounded-xl font-bold uppercase transition-all flex items-center justify-between ${
                        isCurrent
                          ? "bg-[#002b5c] text-white shadow-xs"
                          : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-100"
                      }`}
                    >
                      <span className="truncate">{sib.name}</span>
                      {isCurrent && <span className="text-xs text-sky-300">●</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Lower Main Sections: Description, Application Areas, Performance Benefits */}
        <div className="space-y-6 mb-12">
          {/* Description */}
          {product.description && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-[#002b5c] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#eb1e25]" /> Description
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {product.description}
              </p>
            </div>
          )}

          {/* Application Areas & Performance Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Application Areas */}
            {product.applicationAreas && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col">
                <h3 className="text-base sm:text-lg font-bold text-[#eb1e25] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#002b5c]" /> Application Areas:
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {product.applicationAreas}
                </p>
              </div>
            )}

            {/* Performance Benefits */}
            {product.performanceBenefits && product.performanceBenefits.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col">
                <h3 className="text-base sm:text-lg font-bold text-[#eb1e25] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#002b5c]" /> Performance Benefits:
                </h3>
                <ul className="space-y-2.5">
                  {product.performanceBenefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="text-[#eb1e25] font-bold text-sm leading-none mt-0.5">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Physico-Chemical Properties Table */}
          {product.propertiesTable && product.propertiesTable.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs pt-4">
              <div className="px-6 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-[#002b5c] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#eb1e25]" /> Physico-Chemical Properties
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="bg-[#002b5c] text-white">
                      <th
                        colSpan={hasMultiCols ? colCount + 1 : 2}
                        className="py-3 px-4 text-center font-extrabold uppercase border-b border-[#002b5c]"
                      >
                        {product.name}
                      </th>
                    </tr>
                    {hasMultiCols && (
                      <tr className="bg-[#002b5c] text-white border-t border-white/20">
                        <th className="py-2 px-4 border-r border-white/20"></th>
                        {product.tableHeaders!.map((hdr, hIdx) => (
                          <th
                            key={hIdx}
                            className="py-2 px-4 text-center font-bold border-r border-white/20 last:border-r-0"
                          >
                            {hdr}
                          </th>
                        ))}
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {product.propertiesTable.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                      >
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-b border-r border-slate-200">
                          {row.property}
                        </td>

                        {hasMultiCols ? (
                          row.values ? (
                            row.values.map((v, vIdx) => (
                              <td
                                key={vIdx}
                                className="py-2.5 px-4 text-slate-900 font-bold border-b border-r border-slate-200 last:border-r-0 text-center"
                              >
                                {v}
                              </td>
                            ))
                          ) : (
                            <td
                              colSpan={colCount}
                              className="py-2.5 px-4 text-slate-900 font-bold border-b border-slate-200 text-center"
                            >
                              {row.value}
                            </td>
                          )
                        ) : (
                          <td className="py-2.5 px-4 text-slate-900 font-bold border-b border-slate-200 text-center">
                            {row.value}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action Buttons: TDS, MSDS, & Inquire */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpenDownload("TDS")}
              className="bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-xs transition cursor-pointer"
            >
              <FileText size={15} /> Download PDF (TDS)
            </button>

            <button
              onClick={() => handleOpenDownload("MSDS")}
              className="bg-[#002b5c] hover:bg-[#001f42] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-xs transition cursor-pointer"
            >
              <FileText size={15} /> Download MSDS PDF
            </button>

            <button
              onClick={() => handleOpenEnquiry(product.name)}
              className="bg-slate-800 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition cursor-pointer"
            >
              Inquire Product
            </button>
          </div>
        </div>

        {/* Sub-Category Teardrop Navigation Grid with Reduced Top Gap & Slightly Larger Font Size */}
        <div className="mt-8 pt-2">
          <div className="border-t border-gray-200">
            {Array.from({ length: Math.ceil(category.subCategoryGroups.length / 4) }).map((_, rIdx) => {
              const rowItems = category.subCategoryGroups.slice(rIdx * 4, rIdx * 4 + 4);
              return (
                <div
                  key={rIdx}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 items-center py-5 border-b border-gray-200"
                >
                  {rowItems.map((subGroup, cIdx) => {
                    const isCurrentGroup = Boolean(
                      currentGroup?.title &&
                        subGroup.title.trim().toLowerCase() === currentGroup.title.trim().toLowerCase()
                    );
                    return (
                      <Link
                        key={cIdx}
                        href={`/products/${category.slug}#subcat-${rIdx * 4 + cIdx}`}
                        className="flex items-center gap-3.5 group transition-colors py-1.5"
                      >
                        <Droplet
                          size={21}
                          className={`shrink-0 transition-colors ${
                            isCurrentGroup
                              ? "text-[#eb1e25] fill-[#eb1e25]"
                              : "text-[#475569] fill-[#475569] group-hover:text-[#eb1e25] group-hover:fill-[#eb1e25]"
                          }`}
                        />
                        <span
                          className={`text-sm md:text-[15px] font-normal uppercase tracking-normal leading-relaxed transition-colors ${
                            isCurrentGroup
                              ? "text-[#eb1e25] font-semibold"
                              : "text-[#334155] group-hover:text-[#eb1e25]"
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
