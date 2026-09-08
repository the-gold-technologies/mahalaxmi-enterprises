"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import DownloadModal from "@/components/DownloadModal";
import { ArrowLeft, Droplet } from "lucide-react";
import { useCMSStore, CMSProduct, PageSEO, getHeadingTag } from "@/store/useCMSStore";
import SEOMeta from "@/components/SEOMeta";

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

  const { fetchProducts, products, productCategories, pageSEO } = useCMSStore();

  useEffect(() => {
    if (categorySlug) {
      fetchProducts(categorySlug).catch(console.error);
    }
  }, [categorySlug, fetchProducts]);

  // Current category from CMS store
  const category = useMemo(() => {
    if (!productCategories) return null;
    return productCategories.find((c) => c.slug === categorySlug) || null;
  }, [productCategories, categorySlug]);

  const searchParams = useSearchParams();
  const searchQuery = (searchParams?.get("search") || "").trim();

  // Filter and group products dynamically from CMS
  const subCategoryGroups = useMemo(() => {
    if (!products || products.length === 0) return [];

    const categoryProducts = products.filter((p) => {
      const matchCat = !categorySlug || p.categorySlug === categorySlug;
      if (!matchCat) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const name = (p.name || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const sub = (
        (p as any).subCategoryTitle ||
        (p as any).subtitle ||
        ""
      ).toLowerCase();
      return name.includes(q) || desc.includes(q) || sub.includes(q);
    });

    const groupMap = new Map<string, { title: string; coverImage: string; products: CMSProduct[] }>();

    categoryProducts.forEach((p) => {
      const subTitle = (p as any).subCategoryTitle || (p as any).subtitle || (category?.name ? `${category.name} Range` : "Featured Products");
      const cover = (p as any).containerImage || p.coverImage || category?.bannerImage || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600";

      if (!groupMap.has(subTitle)) {
        groupMap.set(subTitle, {
          title: subTitle,
          coverImage: cover,
          products: [],
        });
      }

      const existing = groupMap.get(subTitle)!;
      if (!existing.coverImage && cover) {
        existing.coverImage = cover;
      }
      existing.products.push(p);
    });

    return Array.from(groupMap.values());
  }, [products, categorySlug, category]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  const categoryName = category?.name || categorySlug?.replace(/-/g, " ").toUpperCase() || "Products";
  const currentSEO = pageSEO[`products/${categorySlug}`] || pageSEO["products"];
  const categoryTitle = currentSEO?.title || categoryName;
  const categoryDesc = currentSEO?.metaDescription || category?.description;
  const HeadingTag = getHeadingTag(currentSEO?.headingOptions, "h1");

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans flex flex-col justify-between">
      <SEOMeta pageSlug={`products/${categorySlug}`} />

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
          <span className="text-[#eb1e25] font-semibold">{categoryName}</span>
        </div>
      </section>

      {/* Main Content Grid strictly matching HP Lubricants official design */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 w-full">
        {/* Category H1 Heading from SEO */}
        <div className="mb-8 border-b-2 border-gray-100 pb-4">
          <HeadingTag className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#002b5c] tracking-tight uppercase">
            {categoryTitle}
          </HeadingTag>
          {categoryDesc && (
            <p className="mt-2 text-sm md:text-base text-gray-600 max-w-3xl">
              {categoryDesc}
            </p>
          )}
        </div>
        {/* Search Results Filter Alert Banner */}
        {searchQuery && (
          <div className="mb-8 p-4 sm:p-5 bg-blue-50/80 border border-blue-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#002b5c] bg-white px-2.5 py-0.5 rounded-full border border-blue-100">
                Filtered By Search Keyword
              </span>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                Showing matching results for <span className="font-extrabold text-[#eb1e25]">&ldquo;{searchQuery}&rdquo;</span> in {categoryName}
              </p>
            </div>
            <Link
              href={`/products/${categorySlug}`}
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-red-300 text-xs font-bold text-[#eb1e25] hover:bg-red-50 transition-all uppercase tracking-wider self-start sm:self-auto cursor-pointer"
            >
              Clear Search ×
            </Link>
          </div>
        )}

        {/* Empty State if No Products Match Search */}
        {searchQuery && subCategoryGroups.length === 0 && (
          <div className="py-16 px-6 bg-white rounded-2xl border border-gray-200 text-center max-w-md mx-auto my-8">
            <h3 className="text-base font-bold text-[#002b5c] uppercase">
              No matching products found
            </h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              We couldn&apos;t find any {categoryName} matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Link
                href={`/products/${categorySlug}`}
                className="px-4 py-2 bg-[#eb1e25] text-white text-xs font-bold rounded-lg uppercase tracking-wider hover:bg-[#c4141a] transition-colors"
              >
                View All {categoryName}
              </Link>
              <Link
                href={categorySlug === "industrial-oils" ? "/products/industrial-greases" : "/products/industrial-oils"}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-bold rounded-lg uppercase tracking-wider hover:bg-gray-50 transition-colors"
              >
                Search {categorySlug === "industrial-oils" ? "Greases" : "Industrial Oils"}
              </Link>
            </div>
          </div>
        )}

        {/* Sub-Category Groups Grid (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14">
          {subCategoryGroups.map((group, idx) => {
            const words = group.title.split(" ");
            const firstWord = words[0];
            const remainingWords = words.slice(1).join(" ");
            const anchorSlug = group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

            return (
              <div
                key={idx}
                id={`subcat-${anchorSlug}`}
                className="flex flex-col space-y-5 scroll-mt-28"
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
                        />
                        {/* Subtle bottom gradient tint */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                      </div>
                    </div>

                    {/* Red VIEW MORE Action Link */}
                    <Link
                      href={`/products/${categorySlug}/${group.products[0]?.slug || ""}`}
                      className="bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-lg text-center transition-all shadow-xs hover:shadow-md inline-flex items-center justify-center gap-1.5 w-full sm:w-[230px]"
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
                        href={`/products/${categorySlug}/${prod.slug}`}
                        className="group/item bg-slate-100/80 hover:bg-white text-slate-700 hover:text-[#002b5c] text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-200/90 hover:border-sky-400/60 hover:shadow-2xs flex items-center justify-between transition-all uppercase tracking-tight leading-snug"
                      >
                        <span className="pr-2 leading-relaxed break-words font-semibold">{prod.name}</span>
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

        {/* Bottom Sub-Category Teardrop Navigation Grid */}
        {subCategoryGroups.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="border-t border-gray-200">
              {Array.from({
                length: Math.ceil(subCategoryGroups.length / 4),
              }).map((_, rIdx) => {
                const rowItems = subCategoryGroups.slice(
                  rIdx * 4,
                  rIdx * 4 + 4
                );
                return (
                  <div
                    key={rIdx}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 items-center py-5 border-b border-gray-200"
                  >
                    {rowItems.map((subGroup, cIdx) => {
                      const anchorSlug = subGroup.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                      return (
                        <a
                          key={cIdx}
                          href={`#subcat-${anchorSlug}`}
                          className="flex items-center gap-3.5 group transition-colors py-1.5"
                        >
                        <Droplet
                          size={21}
                          className="text-[#475569] fill-[#475569] shrink-0 group-hover:text-[#eb1e25] group-hover:fill-[#eb1e25] transition-colors"
                        />
                        <span className="text-sm md:text-[0.9375rem] font-normal uppercase text-[#334155] group-hover:text-[#eb1e25] tracking-normal leading-relaxed transition-colors">
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
        )}
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
