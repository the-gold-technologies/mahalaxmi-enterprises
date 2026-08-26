"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import DownloadModal from "@/components/DownloadModal";
import { getProductBySlug, getCategoryBySlug } from "@/data/productsData";
import { ArrowLeft, FileText, Droplet } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

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

  const { productDetails, fetchProductBySlug } = useCMSStore();

  useEffect(() => {
    if (productSlug) {
      fetchProductBySlug(productSlug).catch(console.error);
    }
  }, [productSlug, fetchProductBySlug]);

  const cmsProduct = productDetails[productSlug];
  const staticProduct = getProductBySlug(productSlug);
  const product: any = cmsProduct || staticProduct;

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

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct(product.name);
    setIsEnquiryOpen(true);
  };

  const handleOpenDownload = (type: "TDS" | "MSDS") => {
    setDownloadProductName(product.name);
    setDownloadPdfType(type);
    setDownloadPdfUrl(type === "TDS" ? (product.tdsPdfUrl || product.pdfUrl || "") : (product.msdsPdfUrl || product.pdfUrl || ""));
    setIsDownloadOpen(true);
  };

  const hasMultiCols = Boolean(product.tableHeaders && product.tableHeaders.length > 0);
  const colCount = product.tableHeaders?.length || 1;

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

      {/* Clean HP Breadcrumb Bar */}
      <section className="bg-white py-3.5 border-b border-gray-100">
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

      {/* Main Product Details View */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full flex-1">
        {/* Product Heading and Tagline */}
        <div className="border-b border-gray-200 pb-5 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#eb1e25] block mb-1">
                {category.name} {currentGroup ? `• ${currentGroup.title}` : ""}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002b5c] tracking-tight uppercase">
                {product.name}
              </h1>
            </div>

            <Link
              href={`/products/${category.slug}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#002b5c] hover:text-[#eb1e25] transition"
            >
              <ArrowLeft size={16} /> Back to {category.name}
            </Link>
          </div>
        </div>

        {/* Product Info Block */}
        <div className="space-y-8 font-sans">
          {/* Main Description */}
          {product.description && (
            <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs">
              <h2 className="text-base sm:text-lg font-extrabold text-[#002b5c] uppercase mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#eb1e25]" /> Product Description:
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {product.description}
              </p>
            </div>
          )}

          {/* Applications & Performance Benefits (2-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col">
                <h3 className="text-base sm:text-lg font-bold text-[#002b5c] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#eb1e25]" /> Applications:
                </h3>
                <ul className="space-y-2.5">
                  {product.applications.map((app: string, aIdx: number) => (
                    <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="text-[#002b5c] font-bold text-sm leading-none mt-0.5">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Performance Benefits */}
            {product.performanceBenefits && product.performanceBenefits.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col">
                <h3 className="text-base sm:text-lg font-bold text-[#eb1e25] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#002b5c]" /> Performance Benefits:
                </h3>
                <ul className="space-y-2.5">
                  {product.performanceBenefits.map((benefit: string, bIdx: number) => (
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
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs pt-4">
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
                        {product.tableHeaders!.map((hdr: string, hIdx: number) => (
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
                    {product.propertiesTable.map((row: any, rIdx: number) => (
                      <tr
                        key={rIdx}
                        className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                      >
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-b border-r border-slate-200">
                          {row.property}
                        </td>

                        {hasMultiCols ? (
                          row.values ? (
                            row.values.map((v: any, vIdx: number) => (
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
              className="bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-2xs transition cursor-pointer"
            >
              <FileText size={15} /> Download PDF (TDS)
            </button>

            <button
              onClick={() => handleOpenDownload("MSDS")}
              className="bg-[#002b5c] hover:bg-[#001f42] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-2xs transition cursor-pointer"
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

        {/* Sub-Category Teardrop Navigation Grid */}
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
