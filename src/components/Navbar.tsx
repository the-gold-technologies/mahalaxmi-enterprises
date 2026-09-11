"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Plus,
  Minus,
  Layers,
  Droplet,
} from "lucide-react";
import { useCMSStore, CMSProduct } from "@/store/useCMSStore";
import { changeLanguage, useLanguage } from "@/components/GoogleTranslator";

interface NavbarProps {
  fontSizeMultiplier?: number;
  setFontSizeMultiplier?: React.Dispatch<React.SetStateAction<number>>;
  language?: "EN" | "HI";
  setLanguage?: (lang: "EN" | "HI") => void;
}

interface ProductSubCategoryItem {
  title: string;
  categorySlug: string;
  anchor: string;
}

const DEFAULT_PRODUCT_CATEGORIES: ProductSubCategoryItem[] = [
  {
    title: "COMPRESSOR OILS",
    categorySlug: "industrial-oils",
    anchor: "compressor-oils",
  },
  {
    title: "CYLINDER OIL",
    categorySlug: "industrial-oils",
    anchor: "cylinder-oil",
  },
  { title: "FILM OIL", categorySlug: "industrial-oils", anchor: "film-oil" },
  {
    title: "GENERAL PURPOSE MACHINERY OILS",
    categorySlug: "industrial-oils",
    anchor: "general-purpose-machinery-oils",
  },
  {
    title: "HYDRAULIC OILS",
    categorySlug: "industrial-oils",
    anchor: "hydraulic-oils",
  },
  {
    title: "MACHINERY OILS",
    categorySlug: "industrial-oils",
    anchor: "machinery-oils",
  },
  {
    title: "OPEN GEAR COMPOUNDS",
    categorySlug: "industrial-oils",
    anchor: "open-gear-compounds",
  },
  {
    title: "PNEUMATIC TOOL OILS",
    categorySlug: "industrial-oils",
    anchor: "pneumatic-tool-oils",
  },
  {
    title: "REFRIGERATION COMPRESSOR OILS",
    categorySlug: "industrial-oils",
    anchor: "refrigeration-compressor-oils",
  },
  {
    title: "SPINDLE OILS",
    categorySlug: "industrial-oils",
    anchor: "spindle-oils",
  },
  {
    title: "STENTER OILS",
    categorySlug: "industrial-oils",
    anchor: "stenter-oils",
  },
  {
    title: "SUGAR MILL BEARING OILS",
    categorySlug: "industrial-oils",
    anchor: "sugar-mill-bearing-oils",
  },
  {
    title: "TRANSFORMER OILS",
    categorySlug: "industrial-oils",
    anchor: "transformer-oils",
  },
  {
    title: "TURBINE OILS",
    categorySlug: "industrial-oils",
    anchor: "turbine-oils",
  },
  {
    title: "WIRE ROPE LUBRICANTS",
    categorySlug: "industrial-oils",
    anchor: "wire-rope-lubricants",
  },
  {
    title: "INDUSTRIAL GREASES",
    categorySlug: "industrial-greases",
    anchor: "industrial-greases",
  },
];

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
  const [activeHoverCategory, setActiveHoverCategory] =
    useState<string>("compressor-oils");
  const [activeTab, setActiveTab] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchDropdownRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { products, fetchProducts, globalSEO, fetchGlobalSEO } = useCMSStore();

  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim() || !products) return [];
    const q = searchQuery.toLowerCase().trim();
    return products
      .filter((p) => {
        const name = (p.name || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const sub = (
          (p as any).subCategoryTitle ||
          (p as any).subtitle ||
          ""
        ).toLowerCase();
        return name.includes(q) || desc.includes(q) || sub.includes(q);
      })
      .slice(0, 6);
  }, [products, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchDropdownOpen(false);
    const q = searchQuery.toLowerCase().trim();
    const isGrease = products?.some(
      (p) =>
        p.categorySlug === "industrial-greases" &&
        ((p.name || "").toLowerCase().includes(q) ||
          ((p as any).subCategoryTitle || "").toLowerCase().includes(q)),
    );
    const targetCat = isGrease ? "industrial-greases" : "industrial-oils";
    router.push(
      `/products/${targetCat}?search=${encodeURIComponent(searchQuery.trim())}`,
    );
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    fetchProducts().catch(console.error);
    fetchGlobalSEO().catch(console.error);
  }, [fetchProducts, fetchGlobalSEO]);

  // Extract direct categories dynamically from CMS products if available
  const productSubCategories = useMemo<ProductSubCategoryItem[]>(() => {
    if (!products || products.length === 0) return DEFAULT_PRODUCT_CATEGORIES;

    const map = new Map<string, ProductSubCategoryItem>();
    products
      .filter(
        (p) =>
          p.categorySlug === "industrial-oils" ||
          p.categorySlug === "industrial-greases",
      )
      .forEach((p) => {
        const title =
          (p as any).subCategoryTitle ||
          (p as any).subtitle ||
          (p.categorySlug === "industrial-greases"
            ? "INDUSTRIAL GREASES"
            : "INDUSTRIAL OILS");
        const upperTitle = title.toUpperCase().trim();
        if (!map.has(upperTitle)) {
          const anchor = upperTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          map.set(upperTitle, {
            title: upperTitle,
            categorySlug: p.categorySlug,
            anchor,
          });
        }
      });

    // Ensure INDUSTRIAL GREASES is present
    if (!map.has("INDUSTRIAL GREASES")) {
      map.set("INDUSTRIAL GREASES", {
        title: "INDUSTRIAL GREASES",
        categorySlug: "industrial-greases",
        anchor: "industrial-greases",
      });
    }

    const list = Array.from(map.values()).sort((a, b) =>
      a.title.localeCompare(b.title),
    );
    return list.length > 0 ? list : DEFAULT_PRODUCT_CATEGORIES;
  }, [products]);

  const currentSubCat =
    productSubCategories.find((c) => c.anchor === activeHoverCategory) ||
    productSubCategories[0] ||
    DEFAULT_PRODUCT_CATEGORIES[0];

  const currentCategoryProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.filter((p) => {
      const pTitle = ((p as any).subCategoryTitle || (p as any).subtitle || "")
        .toUpperCase()
        .trim();
      const pAnchor = pTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      if (currentSubCat.anchor === "industrial-greases") {
        return (
          p.categorySlug === "industrial-greases" ||
          pAnchor === "industrial-greases"
        );
      }
      return pAnchor === currentSubCat.anchor;
    });
  }, [products, currentSubCat]);

  const logoSrc = globalSEO?.logo || "/mahalaxmi png logo .png";

  const [currentFontSize, setCurrentFontSize] = useState<number>(16);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("mahalaxmi_font_size");
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 12 && parsed <= 26) {
          setCurrentFontSize(parsed);
          document.documentElement.style.fontSize = `${parsed}px`;
          return;
        }
      }
      const computed =
        Math.round(
          parseFloat(getComputedStyle(document.documentElement).fontSize),
        ) || 16;
      setCurrentFontSize(computed);
    } catch {
      setCurrentFontSize(16);
    }
  }, []);

  const increaseFont = () => {
    setCurrentFontSize((prev) => {
      const next = Math.min(26, prev + 1);
      document.documentElement.style.fontSize = `${next}px`;
      try {
        localStorage.setItem("mahalaxmi_font_size", String(next));
      } catch {}
      if (setFontSizeMultiplier) {
        setFontSizeMultiplier(next / 16);
      }
      return next;
    });
  };

  const decreaseFont = () => {
    setCurrentFontSize((prev) => {
      const next = Math.max(12, prev - 1);
      document.documentElement.style.fontSize = `${next}px`;
      try {
        localStorage.setItem("mahalaxmi_font_size", String(next));
      } catch {}
      if (setFontSizeMultiplier) {
        setFontSizeMultiplier(next / 16);
      }
      return next;
    });
  };

  const detectedLanguage = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState<"EN" | "HI">(
    language || detectedLanguage || "EN",
  );

  React.useEffect(() => {
    setCurrentLanguage(detectedLanguage);
  }, [detectedLanguage]);

  const handleLanguageChange = (lang: "EN" | "HI") => {
    setCurrentLanguage(lang);
    if (setLanguage) setLanguage(lang);
    changeLanguage(lang);
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

  return (
    <header className="relative z-50 bg-white shadow-md">
      {/* Top Header Utility Bar - Desktop & Tablet */}
      <div className="hidden md:flex lg:absolute lg:right-10 lg:top-3 z-10 justify-end px-4 py-2 md:py-0">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 text-xs text-[#337ab7]">
            <button
              onClick={() => handleLanguageChange("EN")}
              className={`hover:underline cursor-pointer notranslate ${
                currentLanguage === "EN" ? "font-bold text-[#eb1e25]" : ""
              }`}
              translate="no"
              type="button"
              title="Translate to English"
            >
              English
            </button>
            <span className="text-gray-400 notranslate" translate="no">
              |
            </span>
            <button
              onClick={() => handleLanguageChange("HI")}
              className={`hover:underline cursor-pointer notranslate ${
                currentLanguage === "HI" ? "font-bold text-[#eb1e25]" : ""
              }`}
              translate="no"
              type="button"
              title="Translate to Hindi (हिन्दी)"
            >
              हिन्दी
            </button>
          </div>

          <div className="relative" ref={searchDropdownRef}>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center font-sans"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onFocus={() => setIsSearchDropdownOpen(true)}
                className="outline-none border font-sans border-[#CCCCCC] border-r-0 px-2.5 text-xs sm:text-[0.8125rem] py-1 h-[28px] sm:h-[30px] w-[110px] sm:w-[150px] focus:w-[180px] transition-all bg-white"
              />
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="bg-[#eb1e25] text-white h-[28px] sm:h-[30px] px-2 border border-[#eb1e25] flex items-center justify-center hover:bg-[#c4141a] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#eb1e25] transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search size={14} className="font-bold stroke-[2.5]" />
              </button>
            </form>

            {/* Instant Search Results Dropdown */}
            {isSearchDropdownOpen && searchQuery.trim().length >= 1 && (
              <div className="absolute right-0 mt-1 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 text-left">
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>Matching Products ({liveSearchResults.length})</span>
                  <span className="text-[#eb1e25] truncate max-w-[120px]">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                </div>
                {liveSearchResults.length > 0 ? (
                  <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                    {liveSearchResults.map((p) => {
                      const cat = p.categorySlug || "industrial-oils";
                      return (
                        <Link
                          key={p.id}
                          href={`/products/${cat}/${p.slug}`}
                          onClick={() => setIsSearchDropdownOpen(false)}
                          className="p-2.5 hover:bg-red-50/60 flex flex-col transition-colors group/item block"
                        >
                          <span className="text-xs font-bold text-[#002b5c] group-hover/item:text-[#eb1e25] leading-snug">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-gray-400 uppercase mt-0.5 font-medium">
                            {(p as any).subCategoryTitle ||
                              (p as any).subtitle ||
                              cat.replace("-", " ")}
                          </span>
                        </Link>
                      );
                    })}
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full p-2.5 bg-gray-50 hover:bg-[#002b5c] hover:text-white text-xs font-bold text-center text-[#002b5c] transition-colors uppercase tracking-wider cursor-pointer block border-t border-gray-100"
                    >
                      View All Search Results →
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-gray-400">
                    No products found for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            className="flex items-center gap-1"
            title={`Text Size: ${currentFontSize}px`}
          >
            <span className="text-gray-600 text-xs font-sans select-none">
              Text
            </span>
            <button
              onClick={increaseFont}
              disabled={currentFontSize >= 26}
              className="bg-[#002b5c] text-white p-0.5 flex items-center justify-center hover:bg-opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              title={`Increase Font Size (+1px) - Current: ${currentFontSize}px`}
              type="button"
              aria-label="Increase font size"
            >
              <Plus size={12} strokeWidth={3} />
            </button>
            <button
              onClick={decreaseFont}
              disabled={currentFontSize <= 12}
              className="bg-[#002b5c] text-white p-0.5 flex items-center justify-center hover:bg-opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              title={`Decrease Font Size (-1px) - Current: ${currentFontSize}px`}
              type="button"
              aria-label="Decrease font size"
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
            onClick={() => handleLanguageChange("EN")}
            className={`cursor-pointer notranslate ${
              currentLanguage === "EN" ? "font-bold text-[#eb1e25]" : ""
            }`}
            translate="no"
            type="button"
            title="Translate to English"
          >
            English
          </button>
          <span className="text-gray-300 notranslate" translate="no">
            |
          </span>
          <button
            onClick={() => handleLanguageChange("HI")}
            className={`cursor-pointer notranslate ${
              currentLanguage === "HI" ? "font-bold text-[#eb1e25]" : ""
            }`}
            translate="no"
            type="button"
            title="Translate to Hindi (हिन्दी)"
          >
            हिन्दी
          </button>
        </div>

        <div className="flex items-center gap-2">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center font-sans"
          >
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none border border-[#CCCCCC] border-r-0 px-2 text-[0.6875rem] h-[26px] w-[90px]"
            />
            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className="bg-[#eb1e25] text-white h-[26px] px-1.5 border border-[#eb1e25] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search size={12} />
            </button>
          </form>

          <div
            className="flex items-center gap-1"
            title={`Text Size: ${currentFontSize}px`}
          >
            <span className="text-gray-500 text-[0.6875rem] select-none">
              Text
            </span>
            <button
              onClick={increaseFont}
              disabled={currentFontSize >= 26}
              className="bg-[#002b5c] text-white p-0.5 rounded-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              title={`Increase Font Size (+1px) - Current: ${currentFontSize}px`}
              type="button"
              aria-label="Increase font size"
            >
              <Plus size={10} strokeWidth={3} />
            </button>
            <button
              onClick={decreaseFont}
              disabled={currentFontSize <= 12}
              className="bg-[#002b5c] text-white p-0.5 rounded-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              title={`Decrease Font Size (-1px) - Current: ${currentFontSize}px`}
              type="button"
              aria-label="Decrease font size"
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
            src={logoSrc}
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
                  className={`text-sm font-sans font-medium tracking-normal transition flex items-center gap-1 ${
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

                {/* Same 2-Column Mega Menu UI with Direct Categories in Left Column */}
                {item.isMegaMenu && openDropdown === item.name && (
                  <div
                    className={`absolute top-full ${currentLanguage === "HI" ? "-right-44" : "left-0"} -ml-12 w-[560px] bg-white shadow-2xl border border-gray-100 rounded-2xl p-4 z-50 grid grid-cols-12 gap-4 animate-in fade-in zoom-in-95 duration-150`}
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {/* Left Column: Direct Category List with Exact Same Visual Style */}
                    <div className="col-span-5 border-r border-gray-100 pr-2.5 space-y-1 max-h-64 overflow-y-auto">
                      <div className="text-[0.6875rem] font-extrabold text-gray-400 uppercase tracking-wider px-3 py-1 mb-1 flex items-center gap-1.5">
                        <Layers size={13} className="text-[#eb1e25]" />{" "}
                        Categories
                      </div>
                      {productSubCategories.map((cat) => {
                        const isCatActive = activeHoverCategory === cat.anchor;
                        return (
                          <div
                            key={cat.anchor}
                            onMouseEnter={() =>
                              setActiveHoverCategory(cat.anchor)
                            }
                            className="block"
                          >
                            <Link
                              href={
                                cat.categorySlug === "industrial-greases"
                                  ? "/products/industrial-greases"
                                  : `/products/${cat.categorySlug}#subcat-${cat.anchor}`
                              }
                              onClick={() => {
                                setActiveTab(item.name);
                                setOpenDropdown(null);
                              }}
                              className={`flex items-center justify-between px-3 py-2 text-xs font-bold transition-all duration-150 cursor-pointer group ${
                                isCatActive
                                  ? "bg-[#002b5c] text-white border-l-4 border-[#eb1e25] rounded-r-lg rounded-l-xs shadow-xs"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-[#eb1e25] rounded-lg"
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate pr-1">
                                <Droplet
                                  size={13}
                                  className={`shrink-0 transition-colors ${
                                    isCatActive
                                      ? "text-[#eb1e25] fill-[#eb1e25]"
                                      : "text-slate-500 fill-slate-500 group-hover:text-[#eb1e25] group-hover:fill-[#eb1e25]"
                                  }`}
                                />
                                <span className="truncate">{cat.title}</span>
                              </div>
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

                    {/* Right Column: Pre-populated Products for the Hovered Category */}
                    <div className="col-span-7 pl-1 flex flex-col justify-between">
                      <div
                        key={currentSubCat.anchor}
                        className="animate-in fade-in duration-150 space-y-2"
                      >
                        <div className="text-[0.6875rem] font-extrabold text-[#002b5c] uppercase tracking-wider px-2 py-1 border-b border-gray-100 flex items-center justify-between">
                          <span className="truncate pr-2">
                            {currentSubCat.title}
                          </span>
                          <span className="text-[0.625rem] text-[#eb1e25] font-bold bg-red-50 px-2 py-0.5 rounded shrink-0">
                            {currentCategoryProducts.length} Products
                          </span>
                        </div>
                        <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                          {currentCategoryProducts.length > 0 ? (
                            currentCategoryProducts.map((prod) => (
                              <Link
                                key={prod.id}
                                href={`/products/${prod.categorySlug}/${prod.slug}`}
                                onClick={() => {
                                  setActiveTab(item.name);
                                  setOpenDropdown(null);
                                }}
                                className="block px-3 py-2 text-xs font-medium text-gray-700 hover:bg-red-50 hover:text-[#eb1e25] rounded-lg transition-all duration-150 group border border-transparent hover:border-red-100"
                              >
                                <div className="font-bold text-[#002b5c] group-hover:text-[#eb1e25] transition-colors">
                                  {prod.name}
                                </div>
                                {(prod.subCategoryTitle ||
                                  prod.tagline ||
                                  (prod as any).subtitle) && (
                                  <div className="text-[0.625rem] text-gray-500 font-normal truncate">
                                    {prod.subCategoryTitle ||
                                      prod.tagline ||
                                      (prod as any).subtitle}
                                  </div>
                                )}
                              </Link>
                            ))
                          ) : (
                            <Link
                              href={`/products/${currentSubCat.categorySlug}#subcat-${currentSubCat.anchor}`}
                              onClick={() => {
                                setActiveTab(item.name);
                                setOpenDropdown(null);
                              }}
                              className="block px-3 py-4 text-xs text-gray-500 italic hover:text-[#002b5c]"
                            >
                              Explore all products in {currentSubCat.title}{" "}
                              &rarr;
                            </Link>
                          )}
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
                src={logoSrc}
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

                        {/* Collapsible Product Categories for PRODUCTS & SERVICES */}
                        {mobileProductsOpen && (
                          <div className="pl-3 mt-1 flex flex-col gap-1.5 border-l-2 border-[#eb1e25]/70 bg-gray-50/80 p-3 rounded-r-lg max-h-[360px] overflow-y-auto animate-in fade-in duration-150">
                            <span className="text-[0.6875rem] font-bold uppercase text-gray-400 tracking-wider">
                              Product Categories
                            </span>
                            {productSubCategories.map((catItem, cIdx) => (
                              <Link
                                key={cIdx}
                                href={`/products/${catItem.categorySlug}#subcat-${catItem.anchor}`}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileProductsOpen(false);
                                }}
                                className="text-xs text-gray-700 hover:text-[#eb1e25] font-semibold py-1.5 px-2 rounded hover:bg-white flex items-center justify-between transition-colors uppercase"
                              >
                                <span className="truncate">
                                  {catItem.title}
                                </span>
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
                <span className="font-bold text-gray-800">
                  {globalSEO?.phone || ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
