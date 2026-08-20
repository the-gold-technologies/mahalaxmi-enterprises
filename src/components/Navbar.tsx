"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Plus,
  Minus,
  Layers,
} from "lucide-react";
import { productsData } from "@/data/productsData";

interface NavbarProps {
  fontSizeMultiplier: number;
  setFontSizeMultiplier: React.Dispatch<React.SetStateAction<number>>;
  language: "EN" | "HI";
  setLanguage: (lang: "EN" | "HI") => void;
}

export default function Navbar({
  fontSizeMultiplier,
  setFontSizeMultiplier,
  language,
  setLanguage,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeHoverCategory, setActiveHoverCategory] = useState<string>(
    productsData[0]?.slug || "automotive-oils",
  );
  const [activeTab, setActiveTab] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const increaseFont = () => {
    if (fontSizeMultiplier < 1.25) setFontSizeMultiplier((prev) => prev + 0.08);
  };

  const decreaseFont = () => {
    if (fontSizeMultiplier > 0.85) setFontSizeMultiplier((prev) => prev - 0.08);
  };

  const navItems = [
    { name: "HOME", link: "/" },
    { name: "ABOUT US", link: "/about-us" },
    {
      name: "PRODUCTS & SERVICES",
      link: "/products",
      isMegaMenu: true,
    },
    { name: "EVENTS & GALLERY", link: "/events" },
    { name: "BLOGS", link: "/blogs" },
    { name: "CONTACT US", link: "/contact-us" },
  ];

  const checkIsActive = (item: { name: string; link: string }) => {
    if (item.link === "/") {
      return pathname === "/" && (!activeTab || activeTab === "HOME");
    }
    if (item.link.startsWith("/") && item.link !== "/") {
      return pathname === item.link || pathname.startsWith(item.link + "/");
    }
    return activeTab === item.name;
  };

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const activeCategoryData =
    productsData.find((c) => c.slug === activeHoverCategory) || productsData[0];

  return (
    <header className="relative z-50 bg-white shadow-md">
      {/* Top Header Utility Bar - Desktop & Tablet */}
      <div className="hidden md:flex lg:absolute lg:right-10 lg:top-3 z-10 justify-end px-4 py-2 md:py-0">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 text-xs text-[#337ab7]">
            <button
              onClick={() => setLanguage("EN")}
              className={`hover:underline cursor-pointer ${language === "EN" ? "font-bold text-[#eb1e25]" : ""}`}
            >
              English
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => setLanguage("HI")}
              className={`hover:underline cursor-pointer ${language === "HI" ? "font-bold text-[#eb1e25]" : ""}`}
            >
              हिन्दी
            </button>
          </div>

          <form className="flex items-center font-sans">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none border font-sans border-[#CCCCCC] border-r-0 px-2.5 text-[12px] sm:text-[13px] py-1 h-[28px] sm:h-[30px] w-[110px] sm:w-[140px] focus:w-[160px] transition-all"
            />
            <button
              type="submit"
              className="bg-[#eb1e25] text-white h-[28px] sm:h-[30px] px-2 border border-[#eb1e25] flex items-center justify-center hover:bg-[#c4141a] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search size={14} className="font-bold stroke-[2.5]" />
            </button>
          </form>

          <div className="flex items-center gap-1">
            <span className="text-gray-600 text-xs font-sans">Text</span>
            <button
              onClick={increaseFont}
              className="bg-[#002b5c] text-white p-0.5 flex items-center justify-center hover:bg-opacity-90 cursor-pointer"
              title="Increase Font Size"
              type="button"
            >
              <Plus size={12} strokeWidth={3} />
            </button>
            <button
              onClick={decreaseFont}
              className="bg-[#002b5c] text-white p-0.5 flex items-center justify-center hover:bg-opacity-90 cursor-pointer"
              title="Decrease Font Size"
              type="button"
            >
              <Minus size={12} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Top Utility Bar (< md) */}
      <div className="md:hidden flex justify-between items-center px-3 py-1.5 bg-[#f8fafc] border-b border-gray-200/70 text-xs">
        <div className="flex items-center gap-1.5 text-[#337ab7]">
          <button
            onClick={() => setLanguage("EN")}
            className={`cursor-pointer ${language === "EN" ? "font-bold text-[#eb1e25]" : ""}`}
          >
            English
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setLanguage("HI")}
            className={`cursor-pointer ${language === "HI" ? "font-bold text-[#eb1e25]" : ""}`}
          >
            हिन्दी
          </button>
        </div>

        <div className="flex items-center gap-2">
          <form className="flex items-center font-sans">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none border border-[#CCCCCC] border-r-0 px-2 text-[11px] h-[26px] w-[90px]"
            />
            <button
              type="submit"
              className="bg-[#eb1e25] text-white h-[26px] px-1.5 border border-[#eb1e25] flex items-center justify-center cursor-pointer"
              aria-label="Search"
            >
              <Search size={12} />
            </button>
          </form>

          <div className="flex items-center gap-1">
            <span className="text-gray-500 text-[11px]">Text</span>
            <button
              onClick={increaseFont}
              className="bg-[#002b5c] text-white p-0.5 rounded-xs"
              title="Increase Font Size"
              type="button"
            >
              <Plus size={10} strokeWidth={3} />
            </button>
            <button
              onClick={decreaseFont}
              className="bg-[#002b5c] text-white p-0.5 rounded-xs"
              title="Decrease Font Size"
              type="button"
            >
              <Minus size={10} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center py-2.5 sm:py-4 px-4 lg:px-10 lg:pt-10">
        {/* Logo */}
        <Link href="/" className="flex items-center py-1">
          <img
            src="/mahalaxmi png logo .png"
            alt="MAHALAXMI ENTERPRISES"
            className="h-11 sm:h-14 lg:h-16 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://www.hplubricants.in/sites/default/files/fevicon.png";
            }}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item, idx) => {
            const isActive = checkIsActive(item);
            return (
              <div
                key={idx}
                className="relative py-2"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.link}
                  onClick={() => setActiveTab(item.name)}
                  className={`text-[14px] font-sans font-medium tracking-normal transition flex items-center gap-1 ${
                    isActive
                      ? "text-[#eb1e25] font-bold"
                      : "text-[#37474f] hover:text-[#eb1e25]"
                  }`}
                >
                  {item.name}
                  {item.isMegaMenu && (
                    <ChevronDown
                      size={14}
                      className={
                        isActive
                          ? "text-[#eb1e25]"
                          : "text-gray-500 group-hover:text-[#eb1e25]"
                      }
                    />
                  )}
                </Link>

                {/* Clean 2-Column Mega Menu (Pre-populated with first category, zero empty boxes) */}
                {item.isMegaMenu && openDropdown === item.name && (
                  <div className="absolute top-full left-0 -ml-12 w-[560px] bg-white shadow-2xl border border-gray-100 rounded-2xl p-4 z-50 grid grid-cols-12 gap-4 animate-in fade-in zoom-in-95 duration-150">
                    {/* Left Column: Categories List */}
                    <div className="col-span-5 border-r border-gray-100 pr-2.5 space-y-1">
                      <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider px-3 py-1 mb-1 flex items-center gap-1.5">
                        <Layers size={13} className="text-[#eb1e25]" />{" "}
                        Categories
                      </div>
                      {productsData.map((cat) => {
                        const isCatActive = activeHoverCategory === cat.slug;
                        return (
                          <div
                            key={cat.slug}
                            onMouseEnter={() =>
                              setActiveHoverCategory(cat.slug)
                            }
                            className="block"
                          >
                            <Link
                              href={`/products/${cat.slug}`}
                              className={`flex items-center justify-between px-3 py-2.5 text-xs font-bold transition-all duration-150 cursor-pointer ${
                                isCatActive
                                  ? "bg-[#002b5c] text-white border-l-4 border-[#eb1e25] rounded-r-lg rounded-l-xs shadow-xs"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-[#eb1e25] rounded-lg"
                              }`}
                            >
                              <span>{cat.name}</span>
                              <ChevronRight
                                size={14}
                                className={
                                  isCatActive
                                    ? "text-[#eb1e25]"
                                    : "text-gray-400"
                                }
                              />
                            </Link>
                          </div>
                        );
                      })}
                    </div>

                    {/* Right Column: Pre-populated Sub-Products List */}
                    <div className="col-span-7 pl-1 flex flex-col justify-between">
                      <div
                        key={activeCategoryData.slug}
                        className="animate-in fade-in duration-150 space-y-2"
                      >
                        <div className="text-[11px] font-extrabold text-[#002b5c] uppercase tracking-wider px-2 py-1 border-b border-gray-100 flex items-center justify-between">
                          <span>{activeCategoryData.name}</span>
                          <span className="text-[10px] text-[#eb1e25] font-bold bg-red-50 px-2 py-0.5 rounded">
                            {activeCategoryData.products.length} Products
                          </span>
                        </div>
                        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                          {activeCategoryData.products.map((prod) => (
                            <Link
                              key={prod.id}
                              href={`/products/${prod.categorySlug}/${prod.slug}`}
                              className="block px-3 py-2 text-xs font-medium text-gray-700 hover:bg-red-50 hover:text-[#eb1e25] rounded-lg transition-all duration-150 group border border-transparent hover:border-red-100"
                            >
                              <div className="font-bold text-[#002b5c] group-hover:text-[#eb1e25] transition-colors">
                                {prod.name}
                              </div>
                              {prod.subtitle && (
                                <div className="text-[10px] text-gray-500 font-normal">
                                  {prod.subtitle}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-gray-800 p-2 focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Full Screen Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col lg:hidden animate-in fade-in slide-in-from-top-4 duration-200 overflow-y-auto">
          {/* Header Bar inside Mobile Overlay */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-xs">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <img
                src="/mahalaxmi png logo .png"
                alt="Mahalaxmi Enterprises"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://www.hplubricants.in/sites/default/files/fevicon.png";
                }}
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-800 hover:text-[#eb1e25] focus:outline-none cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close Menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Body Content inside Overlay */}
          <div className="flex-1 px-6 py-6 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              {/* Main Navigation Links */}
              <nav className="flex flex-col gap-1">
                {navItems.map((item, idx) => {
                  const isActive = checkIsActive(item);
                  if (item.isMegaMenu) {
                    return (
                      <div key={idx} className="border-b border-gray-100 pb-2">
                        <button
                          type="button"
                          onClick={() =>
                            setMobileProductsOpen(!mobileProductsOpen)
                          }
                          className={`w-full flex items-center justify-between text-base font-extrabold py-2.5 transition-colors text-left cursor-pointer ${
                            isActive || mobileProductsOpen
                              ? "text-[#eb1e25]"
                              : "text-[#002b5c] hover:text-[#eb1e25]"
                          }`}
                        >
                          <span>{item.name}</span>
                          {mobileProductsOpen ? (
                            <ChevronDown
                              size={20}
                              className="text-[#eb1e25] transition-transform"
                            />
                          ) : (
                            <ChevronRight
                              size={20}
                              className="text-gray-400 transition-transform"
                            />
                          )}
                        </button>

                        {/* Collapsible Sub-Categories for PRODUCTS & SERVICES */}
                        {mobileProductsOpen && (
                          <div className="pl-3 mt-1 flex flex-col gap-1.5 border-l-2 border-[#eb1e25]/70 bg-gray-50/80 p-3 rounded-r-lg animate-in fade-in duration-150">
                            <span className="text-[11px] font-bold uppercase text-gray-400 tracking-wider">
                              Product Categories
                            </span>
                            {productsData.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/products/${cat.slug}`}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileProductsOpen(false);
                                }}
                                className="text-xs text-gray-700 hover:text-[#eb1e25] font-semibold py-1.5 px-2 rounded hover:bg-white flex items-center justify-between transition-colors"
                              >
                                <span>{cat.name}</span>
                                <ChevronRight
                                  size={14}
                                  className="text-gray-400"
                                />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={idx} className="border-b border-gray-100 pb-2">
                      <Link
                        href={item.link}
                        onClick={() => {
                          setActiveTab(item.name);
                          setMobileMenuOpen(false);
                          setMobileProductsOpen(false);
                        }}
                        className={`flex items-center justify-between text-base font-extrabold py-2.5 transition-colors ${
                          isActive
                            ? "text-[#eb1e25]"
                            : "text-[#002b5c] hover:text-[#eb1e25]"
                        }`}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions inside Overlay */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#eb1e25] hover:bg-[#c4141a] text-white font-extrabold py-3 rounded-lg text-center text-sm uppercase tracking-wider shadow-md transition-colors"
              >
                CONTACT US / LOCATE DEALER
              </Link>
              <div className="text-center text-xs text-gray-500 font-medium">
                Direct Contact:{" "}
                <span className="font-bold text-gray-800">+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
