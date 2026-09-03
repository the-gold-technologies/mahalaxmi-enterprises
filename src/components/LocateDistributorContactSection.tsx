"use client";

import React, { useState } from "react";
import { Home as HomeIcon, Phone, Mail } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface ContactSectionProps {
  onOpenEnquiry?: (productName?: string) => void;
  onOpenDistributor?: (type?: string) => void;
}

export default function LocateDistributorContactSection({
  onOpenEnquiry,
  onOpenDistributor,
}: ContactSectionProps) {
  const { pages, globalSEO } = useCMSStore();
  const cmsLocate = pages["home"]?.LocateDistributorSection;

  const [lubeType, setLubeType] = useState("ILD");
  const [country, setCountry] = useState("India");
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  if (!cmsLocate) {
    return null;
  }

  const locateTitle = cmsLocate.locateTitle || "";
  const locateSubtitle = cmsLocate.locateSubtitle || "";
  const searchBtnText = cmsLocate.searchBtnText || "";
  const contactTitle = cmsLocate.contactTitle || "";
  const companyName = cmsLocate.companyName || "";
  const address = cmsLocate.address || "";
  const phone = cmsLocate.phone || "";
  const workingHours = cmsLocate.workingHours || "";
  const email = cmsLocate.email || "";
  const contactBtnText = cmsLocate.contactBtnText || "";
  const logo = cmsLocate.logo || globalSEO?.logo || "";

  const lubeTypes: { label: string; value: string }[] = cmsLocate.lubeTypes || [
    { label: "Industrial Lube Distributor (ILD)", value: "ILD" },
    { label: "Bazaar Lube Distributor (BLD)", value: "BLD" },
    { label: "CFA Distributor", value: "CFA" },
    { label: "Caltex Distributor", value: "Caltex" },
  ];

  const countries: { label: string; value: string }[] = cmsLocate.countries || [
    { label: "India", value: "India" },
    { label: "International", value: "International" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTypeObj = lubeTypes.find((t) => t.value === lubeType);
    setSearchResults([
      {
        name: cmsLocate.searchResultCompany || companyName,
        type: selectedTypeObj ? selectedTypeObj.label : lubeType,
        address: cmsLocate.searchResultAddress || address,
        phone: cmsLocate.searchResultPhone || phone,
      },
    ]);
  };

  return (
    <section id="contact" className="py-8 sm:py-12 lg:py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Left Column: LOCATE DISTRIBUTOR */}
          <div className="bg-[#ECEEF2] w-full lg:w-[70%] border-[#D1D1D1] border p-4 sm:p-6 lg:py-6 lg:px-8">
            <div>
              {locateTitle && (
                <>
                  <h2 className="text-[#002749] font-bold text-2xl sm:text-3xl lg:text-4xl uppercase leading-[1.25] pr-0 lg:pr-24">
                    {locateTitle}
                  </h2>
                  <div className="w-[110px] h-[4px] bg-[#002b5c] mt-3 mb-6 sm:mb-8" />
                </>
              )}

              {locateSubtitle && (
                <p className="text-sm text-[#4b5563] mb-6 sm:mb-8 font-medium tracking-wide">
                  {locateSubtitle}
                </p>
              )}

              <form
                onSubmit={handleSearch}
                className="flex flex-col gap-4 px-0 sm:px-6"
              >
                {/* Type Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <label className="w-full sm:w-40 text-sm font-bold text-[#002b5c] shrink-0">
                    Type<span className="text-[#eb1e25]">*</span>:
                  </label>
                  <div className="relative flex-1 w-full">
                    <select
                      value={lubeType}
                      onChange={(e) => setLubeType(e.target.value)}
                      className="w-full bg-white border border-[#d1d5db] rounded px-4 py-1.5 sm:py-1 text-sm text-gray-700 focus:outline-none shadow-xs cursor-pointer"
                    >
                      {lubeTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Country Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <label className="w-full sm:w-40 text-sm font-bold text-[#002b5c] shrink-0">
                    Country<span className="text-[#eb1e25]">*</span>:
                  </label>
                  <div className="relative flex-1 w-full">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white border border-[#d1d5db] rounded px-4 py-1.5 sm:py-1 text-sm text-gray-700 focus:outline-none shadow-xs cursor-pointer"
                    >
                      {countries.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Search Button */}
                {searchBtnText && (
                  <div className="ml-0 sm:ml-40 mt-2 sm:mt-4">
                    <button
                      type="submit"
                      disabled={!lubeType.trim() || !country.trim()}
                      className="bg-[#eb1e25] hover:bg-[#d0171d] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#eb1e25] text-white font-extrabold px-4 py-2.5 rounded text-sm uppercase tracking-wider shadow-none transition-all inline-block cursor-pointer"
                    >
                      {searchBtnText}
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Optional Search Results Box */}
            {searchResults && (
              <div className="mt-6 p-4 bg-white border border-gray-300 rounded">
                <h4 className="text-sm font-bold text-[#002b5c]">
                  Search Result:
                </h4>
                {searchResults.map((res, i) => (
                  <div
                    key={i}
                    className="mt-2 text-xs sm:text-sm text-gray-700 leading-relaxed"
                  >
                    {res.name && <p className="font-bold text-[#eb1e25]">{res.name}</p>}
                    {res.type && <p className="text-xs text-gray-600 font-medium">{res.type}</p>}
                    {res.address && <p>{res.address}</p>}
                    {res.phone && (
                      <p className="font-semibold text-gray-800">
                        Phone: {res.phone}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: CONTACT DETAILS */}
          <div className="bg-[#ECEEF2] w-full lg:w-[30%] border-[#D1D1D1] border p-4 sm:p-6">
            <div>
              {contactTitle && (
                <>
                  <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#002b5c] uppercase leading-tight tracking-tight">
                    {contactTitle}
                  </h2>
                  <div className="w-[110px] h-[4px] bg-[#002b5c] mt-3 mb-6" />
                </>
              )}

              {/* Logo Banner Graphic */}
              {logo && (
                <div className="my-6 lg:my-10 flex justify-start">
                  <img
                    src={logo}
                    alt={companyName || "Brand Logo"}
                    className="h-14 sm:h-16 w-auto object-contain"
                  />
                </div>
              )}

              {/* Contact Information List */}
              <div className="mt-8 flex flex-col gap-7 text-[15px] text-[#333333] leading-relaxed font-sans">
                {/* Address Item */}
                {address && (
                  <div className="flex gap-4 items-start">
                    <HomeIcon
                      className="text-[#002b5c] w-6 h-6 shrink-0 mt-0.5"
                      strokeWidth={1.8}
                    />
                    <p className="text-[#333333] text-[15px] leading-relaxed">
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

                {/* Direct Contact Phone & Hours */}
                {phone && (
                  <div className="flex gap-4 items-start">
                    <Phone
                      className="text-[#002b5c] w-6 h-6 shrink-0 mt-0.5"
                      strokeWidth={1.8}
                    />
                    <div>
                      <p className="text-[#333333] text-[15px]">
                        Direct Contact:{" "}
                        <strong className="font-bold text-[#002b5c]">
                          {phone}
                        </strong>
                      </p>
                      {workingHours && (
                        <p className="text-sm text-[#555555] mt-2 leading-relaxed">
                          {workingHours}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Email Item */}
                {email && (
                  <div className="flex gap-4 items-center">
                    <Mail
                      className="text-[#002b5c] w-6 h-6 shrink-0"
                      strokeWidth={1.8}
                    />
                    <p className="text-[#333333] text-[15px]">
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

              {/* Contact Us Action Buttons */}
              <div className="mt-6 sm:mt-8 mb-4 flex flex-col sm:flex-row gap-3">
                {contactBtnText && (
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry(companyName || "Direct Contact Support")}
                    className="bg-[#eb1e25] hover:bg-[#d0171d] text-white font-extrabold px-6 py-2.5 rounded text-sm uppercase tracking-wider shadow-none transition-all inline-block cursor-pointer text-center"
                  >
                    {contactBtnText}
                  </button>
                )}
                {onOpenDistributor && (
                  <button
                    onClick={() => onOpenDistributor(lubeType)}
                    className="bg-[#002b5c] hover:bg-[#001f42] text-white font-extrabold px-6 py-2.5 rounded text-sm uppercase tracking-wider shadow-none transition-all inline-block cursor-pointer text-center"
                  >
                    Become a Distributor
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
