"use client";

import React from "react";
import { Home as HomeIcon, Phone, Mail } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface ContactSectionProps {
  onOpenEnquiry?: (productName?: string) => void;
  onOpenDistributor?: (type?: string) => void;
}

export default function LocateDistributorContactSection({
  onOpenEnquiry,
}: ContactSectionProps) {
  const { pages, globalSEO } = useCMSStore();
  const cmsLocate = pages["home"]?.LocateDistributorSection;

  if (!cmsLocate) {
    return null;
  }

  const contactTitle = cmsLocate.contactTitle || "";
  const companyName = cmsLocate.companyName || "";
  const address = cmsLocate.address || "";
  const phone = cmsLocate.phone || "";
  const email = cmsLocate.email || "";
  const contactBtnText = cmsLocate.contactBtnText || "";
  const logo = cmsLocate.logo || globalSEO?.logo || "";

  return (
    <section id="contact" className="py-8 sm:py-12 lg:py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Details Box */}
        <div className="bg-[#ECEEF2] w-full border-[#D1D1D1] border p-4 sm:p-6 lg:py-8 lg:px-10">
          <div className="flex flex-col lg:flex-row items-start gap-8">

            {/* Logo */}
            {logo && (
              <div className="flex items-start shrink-0">
                <img
                  src={logo}
                  alt={companyName || "Brand Logo"}
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </div>
            )}

            <div className="flex-1">
              {contactTitle && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002b5c] uppercase leading-tight tracking-tight">
                    {contactTitle}
                  </h2>
                  <div className="w-[110px] h-[4px] bg-[#002b5c] mt-3 mb-6" />
                </>
              )}

              {/* Contact Information */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-6 text-[0.9375rem] text-[#333333] leading-relaxed font-sans">
                {/* Address */}
                {address && (
                  <div className="flex gap-3 items-start min-w-[220px]">
                    <HomeIcon
                      className="text-[#002b5c] w-5 h-5 shrink-0 mt-0.5"
                      strokeWidth={1.8}
                    />
                    <p className="text-[#333333] text-sm leading-relaxed">
                      {companyName && (
                        <>
                          <strong className="font-bold text-[#002b5c]">
                            {companyName}
                          </strong>
                          <br />
                        </>
                      )}
                      {address}
                    </p>
                  </div>
                )}

                {/* Phone */}
                {phone && (
                  <div className="flex gap-3 items-start">
                    <Phone
                      className="text-[#002b5c] w-5 h-5 shrink-0 mt-0.5"
                      strokeWidth={1.8}
                    />
                    <div>
                      <p className="text-sm text-[#333333]">
                        Direct Contact:{" "}
                        <strong className="font-bold text-[#002b5c]">
                          {phone}
                        </strong>
                      </p>
                    </div>
                  </div>
                )}

                {/* Email */}
                {email && (
                  <div className="flex gap-3 items-center">
                    <Mail
                      className="text-[#002b5c] w-5 h-5 shrink-0"
                      strokeWidth={1.8}
                    />
                    <p className="text-sm text-[#333333]">
                      Email:{" "}
                      <a
                        href={`mailto:${email}`}
                        className="font-bold text-[#002b5c] hover:text-[#eb1e25] transition-colors"
                      >
                        {email}
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              {contactBtnText && (
                <div className="mt-6">
                  <button
                    onClick={() =>
                      onOpenEnquiry &&
                      onOpenEnquiry(companyName || "Direct Contact Support")
                    }
                    className="bg-[#eb1e25] hover:bg-[#d0171d] text-white font-extrabold px-6 py-2.5 rounded text-sm uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {contactBtnText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
