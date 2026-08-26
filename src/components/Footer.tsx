"use client";

import React, { useEffect } from "react";
import { Facebook, Youtube, Instagram, Mail, Linkedin, Twitter } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface FooterProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function Footer({ onOpenEnquiry }: FooterProps) {
  const { globalSEO, fetchGlobalSEO } = useCMSStore();

  useEffect(() => {
    fetchGlobalSEO().catch(console.error);
  }, [fetchGlobalSEO]);

  const socialLinks: any = globalSEO?.socialLinks || {};
  const hpclBadge = socialLinks.hpclBadge || "";
  const indiaGovBadge = socialLinks.indiaGovBadge || "";
  const globalCompactBadge = socialLinks.globalCompactBadge || "";
  const siteTitle = globalSEO?.siteTitle || "Mahalaxmi Enterprises";

  return (
    <>
      {/* Dark Navy Footer matching original site */}
      <footer className="bg-[#002749] text-white py-5 px-4 sm:px-8 border-t border-[#002b5c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs sm:text-sm font-medium">
          {/* Left Copyright */}
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} {siteTitle}. All rights reserved.</p>
          </div>

          {/* Middle Links */}
          <div className="flex items-center gap-8 text-white">
            <a href="/sitemap.xml" className="underline hover:text-gray-300 transition">
              Site Map
            </a>
            <a href="/privacy-policy" className="underline hover:text-gray-300 transition">
              Privacy Policy
            </a>
          </div>

          {/* Official Partner Badges (2-column layout matching reference screenshot) */}
          {(hpclBadge || indiaGovBadge || globalCompactBadge) && (
            <div className="flex items-center gap-3 mr-8">
              {/* HPCL Logo */}
              {hpclBadge && (
                <div className="bg-white rounded p-1.5 shadow-xs flex items-center justify-center">
                  <img
                    src={hpclBadge}
                    alt="HPCL Logo"
                    className="h-[69px] w-auto object-contain"
                  />
                </div>
              )}

              {/* India.gov.in and UN Global Compact Badges */}
              {(indiaGovBadge || globalCompactBadge) && (
                <div className="flex flex-col gap-2">
                  {indiaGovBadge && (
                    <div className="bg-white rounded px-3 py-1.5 shadow-xs flex items-center justify-center">
                      <img
                        src={indiaGovBadge}
                        alt="india.gov.in"
                        className="h-6 w-auto object-contain"
                      />
                    </div>
                  )}
                  {globalCompactBadge && (
                    <div className="bg-white rounded px-3 py-1.5 shadow-xs flex items-center justify-center">
                      <img
                        src={globalCompactBadge}
                        alt="UN Global Compact"
                        className="h-6 w-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Social Media Circular Buttons */}
          <div className="flex items-center gap-2.5">
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition shadow-xs"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            )}
            {socialLinks.youtube && (
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#ff0000] flex items-center justify-center text-white hover:opacity-90 transition shadow-xs"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#e4405f] flex items-center justify-center text-white hover:opacity-90 transition shadow-xs"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:opacity-90 transition shadow-xs"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1da1f2] flex items-center justify-center text-white hover:opacity-90 transition shadow-xs"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            )}
          </div>
        </div>
      </footer>

      {/* Persistent Red Sticky ENQUIRY Button Fixed on Bottom Right Corner */}
      <button
        onClick={() => onOpenEnquiry("Footer Site Enquiry")}
        className="fixed bottom-1 right-0 z-50 bg-[#eb1e25] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-tl-xs shadow-2xl flex items-center gap-1.5 hover:bg-[#d0171d] transition-all cursor-pointer"
      >
        <Mail size={14} />
        <span>ENQUIRY</span>
      </button>
    </>
  );
}
