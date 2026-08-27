"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import DistributorModal from "@/components/DistributorModal";
import SEOMeta from "@/components/SEOMeta";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";
import {
  ShieldCheck,
  Calendar,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Lock,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const [isDistributorOpen, setIsDistributorOpen] = useState(false);
  const [distributorType, setDistributorType] = useState(
    "Industrial Lube Distributor (ILD)"
  );

  const { fetchPage, pages, pageSEO, globalSEO, isLoading } = useCMSStore();

  useEffect(() => {
    fetchPage("privacy-policy").catch(console.error);
  }, [fetchPage]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  const handleOpenDistributor = (type?: string) => {
    if (type) setDistributorType(type);
    setIsDistributorOpen(true);
  };

  const currentSEO = pageSEO["privacy-policy"];
  const HeadingTag = getHeadingTag(currentSEO?.headingOptions, "h1");

  const cmsPrivacy = pages["privacy-policy"];
  const title = cmsPrivacy?.title || "PRIVACY POLICY";
  const lastUpdated = cmsPrivacy?.lastUpdated;
  const rawHtmlContent = cmsPrivacy?.content;
  const pageLoading = isLoading["privacy-policy"] && !cmsPrivacy;

  const sanitizedContent = React.useMemo(() => {
    if (!rawHtmlContent) return "";
    return rawHtmlContent.replace(/&nbsp;/gi, " ").replace(/\u00a0/g, " ");
  }, [rawHtmlContent]);

  const address = globalSEO?.address;
  const phone = globalSEO?.phone;
  const email = globalSEO?.email;

  return (
    <main
      className="min-h-screen bg-white text-gray-800 font-sans flex flex-col justify-between"
      style={{
        fontSize: `${16 * fontSizeMultiplier}px`,
      }}
    >
      <SEOMeta pageSlug="privacy-policy" />

      {/* Header Navigation Bar */}
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Hero Banner with Modern Breadcrumbs */}
      <section className="bg-[#002749] text-white py-12 md:py-16 relative overflow-hidden border-b border-[#001d37]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#eb1e25]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Links */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-gray-300 font-medium mb-4">
            <Link href="/" className="hover:text-white transition flex items-center gap-1">
              Home
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#eb1e25] font-semibold">{title}</span>
          </nav>

          {/* Dynamic Hero Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-xs border border-white/15 rounded-full text-xs font-semibold text-white mb-3">
                <ShieldCheck size={14} className="text-[#eb1e25]" />
                <span>Legal & Privacy Compliance</span>
              </div>
              <HeadingTag className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
                {title}
              </HeadingTag>
            </div>

            {lastUpdated && (
              <div className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-300 bg-black/20 px-3.5 py-1.5 rounded-lg border border-white/10 shrink-0">
                <Calendar size={15} className="text-[#eb1e25]" />
                <span>Last Updated: <strong className="text-white font-semibold">{lastUpdated}</strong></span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area without box container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full grow">
        {pageLoading ? (
          /* Loading Skeleton State */
          <div className="space-y-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
            <div className="h-4 bg-gray-100 rounded w-4/5" />
            <div className="h-8 bg-gray-200 rounded w-1/3 mt-8" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-full" />
          </div>
        ) : sanitizedContent ? (
          /* Dynamic Rich HTML Content from CMS */
          <article
            className="privacy-rich-content font-sans"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        ) : null}

        {/* Quick Compliance Contact Block (Dynamically from Global SEO) */}
        {(address || phone || email) && (
          <div className="mt-14 pt-8 border-t border-gray-200 bg-[#f8fafc] p-6 sm:p-8 rounded-xl">
            <div className="flex items-center gap-2 text-sm font-bold text-[#002749] mb-4">
              <Lock size={16} className="text-[#eb1e25]" />
              <span>Data Privacy & Redressal Helpdesk</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs md:text-sm text-gray-600">
              {address && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="text-[#002749] shrink-0 mt-0.5" size={17} />
                  <span>{address}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="text-[#002749] shrink-0" size={17} />
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="hover:text-[#eb1e25] transition font-medium text-gray-800"
                  >
                    {phone}
                  </a>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="text-[#002749] shrink-0" size={17} />
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-[#eb1e25] transition font-medium text-gray-800"
                  >
                    {email}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dedicated CSS Styling for Dynamic Rich HTML from CMS */}
      <style jsx global>{`
        .privacy-rich-content,
        .privacy-rich-content * {
          white-space: normal !important;
          word-break: normal !important;
          overflow-wrap: break-word !important;
          word-wrap: break-word !important;
          box-sizing: border-box !important;
        }
        .privacy-rich-content {
          color: #334155;
          font-size: 15px;
          line-height: 1.8;
          max-width: 100%;
        }
        @media (min-width: 640px) {
          .privacy-rich-content {
            font-size: 16px;
          }
        }
        .privacy-rich-content p {
          margin-bottom: 1.25rem;
          color: #475569;
          line-height: 1.8;
        }
        .privacy-rich-content h2 {
          color: #002749;
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.015em;
          margin-top: 2.25rem;
          margin-bottom: 0.85rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        @media (min-width: 640px) {
          .privacy-rich-content h2 {
            font-size: 1.55rem;
          }
        }
        .privacy-rich-content h3 {
          color: #002749;
          font-size: 1.15rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .privacy-rich-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: #475569;
        }
        .privacy-rich-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: #475569;
        }
        .privacy-rich-content li {
          margin-bottom: 0.5rem;
          line-height: 1.65;
        }
        .privacy-rich-content strong {
          color: #002749;
          font-weight: 700;
        }
        .privacy-rich-content a {
          color: #eb1e25;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 600;
          transition: color 0.15s ease;
        }
        .privacy-rich-content a:hover {
          color: #b91016;
        }
      `}</style>

      {/* Footer */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Modals */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />

      <DistributorModal
        isOpen={isDistributorOpen}
        onClose={() => setIsDistributorOpen(false)}
        initialType={distributorType}
      />
    </main>
  );
}
