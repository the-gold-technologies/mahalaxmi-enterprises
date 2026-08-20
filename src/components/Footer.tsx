"use client";

import React from "react";
import { Facebook, Youtube, Instagram, Mail } from "lucide-react";

interface FooterProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function Footer({ onOpenEnquiry }: FooterProps) {
  return (
    <>
      {/* Dark Navy Footer matching original site */}
      <footer className="bg-[#002749] text-white py-5 px-4 sm:px-8 border-t border-[#002b5c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs sm:text-sm font-medium">
          {/* Left Copyright */}
          <div className="text-center md:text-left">
            <p>© 2026 Mahalaxmi Enterprises. All rights reserved.</p>
          </div>

          {/* Middle Links */}
          <div className="flex items-center gap-8 text-white">
            <a href="#" className="underline hover:text-gray-300 transition">
              Site Map
            </a>
            <a href="#" className="underline hover:text-gray-300 transition">
              Privacy Policy
            </a>
          </div>

          {/* Official Partner Badges (2-column layout matching reference screenshot) */}
          <div className="flex items-center gap-3 mr-8">
            {/* HPCL Logo */}
            <div className="bg-white rounded p-1.5 shadow-sm flex items-center justify-center">
              <img
                src="/footer-hpcl.jpg"
                alt="HPCL Logo"
                className="h-[69px] w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://www.hplubricants.in/sites/all/themes/hpcl/images/hpcl_logo.jpg";
                }}
              />
            </div>

            {/* India.gov.in and UN Global Compact Badges */}
            <div className="flex flex-col gap-2">
              <div className="bg-white rounded px-3 py-1.5 shadow-sm flex items-center justify-center">
                <img
                  src="/footer-india.jpg"
                  alt="india.gov.in"
                  className="h-6 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://www.hplubricants.in/sites/all/themes/hpcl/images/nic_logobt.jpg";
                  }}
                />
              </div>
              <div className="bg-white rounded px-3 py-1.5 shadow-sm flex items-center justify-center">
                <img
                  src="/footer-compact.jpg"
                  alt="UN Global Compact"
                  className="h-6 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://www.hplubricants.in/sites/all/themes/hpcl/images/globalcompactlogo_img.jpg";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Social Media Circular Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.facebook.com/hindustanpetroleumcorporateltd"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition shadow-sm"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCJzt53YmvAJQjT-rLSTqNjg"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#ff0000] flex items-center justify-center text-white hover:opacity-90 transition shadow-sm"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a
              href="https://www.instagram.com/hplubricants_hpcl/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#e4405f] flex items-center justify-center text-white hover:opacity-90 transition shadow-sm"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </footer>

      {/* Persistent Red Sticky ENQUIRY Button Fixed on Bottom Right Corner */}
      <button
        onClick={() => onOpenEnquiry("Footer Site Enquiry")}
        className="fixed bottom-1 right-0 z-50 bg-[#eb1e25] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-tl-sm shadow-2xl flex items-center gap-1.5 hover:bg-[#d0171d] transition-all cursor-pointer"
      >
        <Mail size={14} />
        <span>ENQUIRY</span>
      </button>
    </>
  );
}
