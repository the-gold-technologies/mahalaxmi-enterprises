"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Menu, X, Plus, Minus } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("HOME");
  const [searchQuery, setSearchQuery] = useState("");

  const increaseFont = () => {
    if (fontSizeMultiplier < 1.25) setFontSizeMultiplier((prev) => prev + 0.08);
  };

  const decreaseFont = () => {
    if (fontSizeMultiplier > 0.85) setFontSizeMultiplier((prev) => prev - 0.08);
  };

  const navItems = [
    { name: "HOME", link: "#" },
    {
      name: "ABOUT US",
      link: "#about",
      sub: [
        { name: "About HPCL", link: "#about" },
        { name: "About HP Lubricants", link: "#about" },
        { name: "About Caltex Lubricants", link: "#about" },
        { name: "We are No. 1", link: "#about" },
        { name: "Our Vision", link: "#about" },
        { name: "Awards & Milestones", link: "#about" },
      ],
    },
    {
      name: "PRODUCTS & SERVICES",
      link: "#products",
      sub: [
        { name: "FUTUR-X", link: "#products" },
        { name: "Automotive Oils", link: "#products" },
        { name: "Industrial Oils", link: "#products" },
        { name: "Specialties", link: "#products" },
        { name: "Greases", link: "#products" },
        { name: "Marine Oils", link: "#products" },
      ],
    },
    {
      name: "INTERNATIONAL",
      link: "#international",
      sub: [
        { name: "HP International", link: "#international" },
        { name: "HMEF Middle East", link: "#international" },
      ],
    },
    {
      name: "HP CONNECT",
      link: "#connect",
      sub: [
        { name: "HP Impact", link: "#enterprise" },
        { name: "FAQ's", link: "#connect" },
        { name: "High Performance Tips", link: "#connect" },
        { name: "Videos", link: "#videos" },
      ],
    },
    {
      name: "LUBE DISTRIBUTOR",
      link: "#distributor",
      sub: [
        { name: "Become a Lube Distributor", link: "#distributor" },
        { name: "Locate a Lube Distributor", link: "#distributor" },
        { name: "Become a Developer", link: "#distributor" },
      ],
    },
    { name: "BLOGS", link: "#blogs" },
    { name: "CONTACT US", link: "#contact" },
  ];

  return (
    <header className="relative z-50 bg-white shadow-md">
      {/* Top Header Utility Bar */}
      <div className=" absolute right-10 top-4">
        <div className=" flex items-center gap-3">
          <form className=" flex items-center font-sans">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none border font-sans border-[#CCCCCC] border-r-0 px-2.5 text-[14px] py-1 h-[32px]"
            />
            <button
              type="submit"
              className="bg-[#eb1e25] text-white h-[32px] px-2.5 border border-[#eb1e25] flex items-center justify-center hover:bg-[#c4141a] transition-colors"
              aria-label="Search"
            >
              <Search size={15} className="font-bold stroke-[2.5]" />
            </button>
          </form>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-md font-sans">Text</span>
            <button
              onClick={increaseFont}
              className="bg-[#002b5c] text-white p-0.5  flex items-center justify-center hover:bg-opacity-90"
              title="Increase Font Size"
              type="button"
            >
              <Plus size={13} strokeWidth={3} />
            </button>
            <button
              onClick={decreaseFont}
              className="bg-[#002b5c] text-white p-0.5  flex items-center justify-center hover:bg-opacity-90"
              title="Decrease Font Size"
              type="button"
            >
              <Minus size={13} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-end py-0.5 px-10 pt-4 ">
        {/* Logo */}
        <a href="#" className="flex items-end gap-10 ">
          <img
            src="./logo.png"
            alt="HP Lubricants - Power to Perform"
            className="w-[200px] -ml-10"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://www.hplubricants.in/sites/default/files/fevicon.png";
            }}
          />

          <div className="flex items-start flex-col gap-0.5 mb-4">
            <button
              onClick={() => setLanguage("EN")}
              className={`text-[15px] text-[#337ab7] tracking-wide font-sans`}
            >
              English
            </button>

            <button
              onClick={() => setLanguage("HI")}
              className={`text-[15px] text-[#337ab7] tracking-wide font-sans`}
            >
              हिन्दी
            </button>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-5 mb-6">
          {navItems.map((item, idx) => {
            const isActive = activeTab === item.name;
            return (
              <div
                key={idx}
                className="relative group py-2"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.link}
                  onClick={() => setActiveTab(item.name)}
                  className={`text-[14px] font-sans font-medium tracking-normal transition flex items-center gap-1 ${
                    isActive
                      ? "text-[#eb1e25] font-bold"
                      : "text-[#37474f] hover:text-[#eb1e25]"
                  }`}
                >
                  {item.name}
                  {item.sub && (
                    <ChevronDown
                      size={14}
                      className={
                        isActive
                          ? "text-[#eb1e25]"
                          : "text-gray-500 group-hover:text-[#eb1e25]"
                      }
                    />
                  )}
                </a>

                {/* Submenu Dropdown */}
                {item.sub && openDropdown === item.name && (
                  <div className="absolute top-full left-0 w-52 bg-white shadow-lg border border-gray-100 rounded-b py-2 z-50 animate-fadeIn">
                    {item.sub.map((s, sIdx) => (
                      <a
                        key={sIdx}
                        href={s.link}
                        onClick={() => setActiveTab(item.name)}
                        className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#eb1e25] transition"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-gray-800 p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex flex-col gap-2">
          {navItems.map((item, idx) => {
            const isActive = activeTab === item.name;
            return (
              <div key={idx}>
                <a
                  href={item.link}
                  onClick={() => {
                    setActiveTab(item.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`block text-sm font-bold py-1.5 ${
                    isActive ? "text-[#eb1e25]" : "text-gray-800 hover:text-[#eb1e25]"
                  }`}
                >
                  {item.name}
                </a>
                {item.sub && (
                  <div className="pl-4 flex flex-col gap-1 border-l-2 border-red-500 my-1">
                    {item.sub.map((s, sIdx) => (
                      <a
                        key={sIdx}
                        href={s.link}
                        onClick={() => {
                          setActiveTab(item.name);
                          setMobileMenuOpen(false);
                        }}
                        className="text-xs text-gray-600 hover:text-[#eb1e25] py-1"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
