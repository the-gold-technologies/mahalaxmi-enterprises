'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, Menu, X, Plus, Minus } from 'lucide-react';

interface NavbarProps {
  fontSizeMultiplier: number;
  setFontSizeMultiplier: React.Dispatch<React.SetStateAction<number>>;
  language: 'EN' | 'HI';
  setLanguage: (lang: 'EN' | 'HI') => void;
}

export default function Navbar({
  fontSizeMultiplier,
  setFontSizeMultiplier,
  language,
  setLanguage,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const increaseFont = () => {
    if (fontSizeMultiplier < 1.25) setFontSizeMultiplier((prev) => prev + 0.08);
  };

  const decreaseFont = () => {
    if (fontSizeMultiplier > 0.85) setFontSizeMultiplier((prev) => prev - 0.08);
  };

  const navItems = [
    { name: 'HOME', link: '#' },
    {
      name: 'ABOUT US',
      link: '#about',
      sub: [
        { name: 'About HPCL', link: '#about' },
        { name: 'About HP Lubricants', link: '#about' },
        { name: 'About Caltex Lubricants', link: '#about' },
        { name: 'We are No. 1', link: '#about' },
        { name: 'Our Vision', link: '#about' },
        { name: 'Awards & Milestones', link: '#about' },
      ],
    },
    {
      name: 'PRODUCTS & SERVICES',
      link: '#products',
      sub: [
        { name: 'FUTUR-X', link: '#products' },
        { name: 'Automotive Oils', link: '#products' },
        { name: 'Industrial Oils', link: '#products' },
        { name: 'Specialties', link: '#products' },
        { name: 'Greases', link: '#products' },
        { name: 'Marine Oils', link: '#products' },
      ],
    },
    {
      name: 'INTERNATIONAL',
      link: '#international',
      sub: [
        { name: 'HP International', link: '#international' },
        { name: 'HMEF Middle East', link: '#international' },
      ],
    },
    {
      name: 'HP CONNECT',
      link: '#connect',
      sub: [
        { name: 'HP Impact', link: '#enterprise' },
        { name: 'FAQ\'s', link: '#connect' },
        { name: 'High Performance Tips', link: '#connect' },
        { name: 'Videos', link: '#videos' },
      ],
    },
    {
      name: 'LUBE DISTRIBUTOR',
      link: '#distributor',
      sub: [
        { name: 'Become a Lube Distributor', link: '#distributor' },
        { name: 'Locate a Lube Distributor', link: '#distributor' },
        { name: 'Become a Developer', link: '#distributor' },
      ],
    },
    { name: 'BLOGS', link: '#blogs' },
    { name: 'CONTACT US', link: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Header Utility Bar */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-4 text-xs font-semibold text-gray-700">
          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery) alert(`Searching HP Lubricants for: "${searchQuery}"`);
            }}
            className="flex items-center"
          >
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-2 py-1 text-xs border border-gray-300 rounded-l focus:outline-none w-32 md:w-44"
            />
            <button
              type="submit"
              className="bg-[#eb1e25] text-white p-1 px-2.5 rounded-r hover:bg-[#c4141a] transition"
              aria-label="Search"
            >
              <Search size={14} />
            </button>
          </form>

          {/* Text Font Resizer */}
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Text</span>
            <button
              onClick={increaseFont}
              className="bg-[#002b5c] text-white p-0.5 px-1.5 rounded text-[10px] font-bold hover:bg-opacity-90"
              title="Increase Font Size"
            >
              <Plus size={12} />
            </button>
            <button
              onClick={decreaseFont}
              className="bg-[#002b5c] text-white p-0.5 px-1.5 rounded text-[10px] font-bold hover:bg-opacity-90"
              title="Decrease Font Size"
            >
              <Minus size={12} />
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-gray-300">
            <button
              onClick={() => setLanguage('EN')}
              className={`hover:text-[#eb1e25] ${language === 'EN' ? 'text-[#eb1e25] font-bold' : 'text-gray-600'}`}
            >
              English
            </button>
            <span>/</span>
            <button
              onClick={() => setLanguage('HI')}
              className={`hover:text-[#eb1e25] ${language === 'HI' ? 'text-[#eb1e25] font-bold' : 'text-gray-600'}`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img
            src="https://www.hplubricants.in/sites/default/files/logo.png"
            alt="HP Lubricants - Power to Perform"
            className="h-14 md:h-16 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://www.hplubricants.in/sites/default/files/fevicon.png';
            }}
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-5">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group py-2"
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.link}
                className="text-[13px] font-bold text-[#333333] hover:text-[#eb1e25] transition flex items-center gap-1"
              >
                {item.name}
                {item.sub && <ChevronDown size={14} className="text-gray-500 group-hover:text-[#eb1e25]" />}
              </a>

              {/* Submenu Dropdown */}
              {item.sub && openDropdown === item.name && (
                <div className="absolute top-full left-0 w-52 bg-white shadow-lg border border-gray-100 rounded-b py-2 z-50 animate-fadeIn">
                  {item.sub.map((s, sIdx) => (
                    <a
                      key={sIdx}
                      href={s.link}
                      className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#eb1e25] transition"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
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
          {navItems.map((item, idx) => (
            <div key={idx}>
              <a
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-bold text-gray-800 hover:text-[#eb1e25] py-1.5"
              >
                {item.name}
              </a>
              {item.sub && (
                <div className="pl-4 flex flex-col gap-1 border-l-2 border-red-500 my-1">
                  {item.sub.map((s, sIdx) => (
                    <a
                      key={sIdx}
                      href={s.link}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-gray-600 hover:text-[#eb1e25] py-1"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
