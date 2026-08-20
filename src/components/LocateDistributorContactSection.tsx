"use client";

import React, { useState } from "react";
import { Home as HomeIcon, Phone, Mail } from "lucide-react";

interface ContactSectionProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function LocateDistributorContactSection({
  onOpenEnquiry,
}: ContactSectionProps) {
  const [lubeType, setLubeType] = useState("ILD");
  const [country, setCountry] = useState("India");
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchResults([
      {
        name: "Mahalaxmi Enterprises - Authorized Industrial Lubricants Distributor",
        type:
          lubeType === "ILD"
            ? "Industrial Lube Distributor (ILD)"
            : "Bazaar Lube Distributor (BLD)",
        address: "Baghpat Region & Surrounding Industrial Belts, Uttar Pradesh",
        phone: "+91 98765 43210",
      },
    ]);
  };

  return (
    <section id="contact" className="py-8 sm:py-12 lg:py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Left Column: LOCATE AN INDUSTRIAL LUBE DISTRIBUTOR (ILD)/ BAZAAR LUBE DISTRIBUTOR (BLD) */}
          <div className="bg-[#ECEEF2] w-full lg:w-[70%] border-[#D1D1D1] border p-4 sm:p-6 lg:py-6 lg:px-8">
            <div>
              <h2 className="text-[#002749] font-bold text-2xl sm:text-3xl lg:text-4xl uppercase leading-[1.25] pr-0 lg:pr-24">
                LOCATE AN INDUSTRIAL LUBE DISTRIBUTOR (ILD)/ BAZAAR LUBE
                DISTRIBUTOR (BLD)
              </h2>
              <div className="w-[110px] h-[4px] bg-[#002b5c] mt-3 mb-6 sm:mb-8" />

              <p className="text-sm text-[#4b5563] mb-6 sm:mb-8 font-medium tracking-wide">
                Find the dealer of HP products in your area by selecting your
                options below.
              </p>

              <form
                onSubmit={handleSearch}
                className="flex flex-col gap-4 px-0 sm:px-6"
              >
                {/* Type Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <label className="w-full sm:w-40 text-sm font-bold text-[#002b5c] flex-shrink-0">
                    Type<span className="text-[#eb1e25]">*</span>:
                  </label>
                  <div className="relative flex-1 w-full">
                    <select
                      value={lubeType}
                      onChange={(e) => setLubeType(e.target.value)}
                      className="w-full bg-white border border-[#d1d5db] rounded px-4 py-1.5 sm:py-1 text-sm text-gray-700 focus:outline-none shadow-sm cursor-pointer"
                    >
                      <option value="ILD">
                        Industrial Lube Distributor (ILD)
                      </option>
                      <option value="BLD">Bazaar Lube Distributor (BLD)</option>
                      <option value="CFA">CFA Distributor</option>
                      <option value="Caltex">Caltex Distributor</option>
                    </select>
                  </div>
                </div>

                {/* Country Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <label className="w-full sm:w-40 text-sm font-bold text-[#002b5c] flex-shrink-0">
                    Country<span className="text-[#eb1e25]">*</span>:
                  </label>
                  <div className="relative flex-1 w-full">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white border border-[#d1d5db] rounded px-4 py-1.5 sm:py-1 text-sm text-gray-700 focus:outline-none shadow-sm cursor-pointer"
                    >
                      <option value="India">India</option>
                      <option value="International">International</option>
                    </select>
                  </div>
                </div>

                {/* Submit Search Button */}
                <div className="ml-0 sm:ml-40 mt-2 sm:mt-4">
                  <button
                    type="submit"
                    className="bg-[#eb1e25] hover:bg-[#d0171d] text-white font-extrabold px-4 py-2.5 rounded text-sm uppercase tracking-wider shadow-none transition-all inline-block cursor-pointer"
                  >
                    SEARCH
                  </button>
                </div>
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
                    <p className="font-bold text-[#eb1e25]">{res.name}</p>
                    <p>{res.address}</p>
                    <p className="font-semibold text-gray-800">
                      Phone: {res.phone}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: CONTACT DETAILS */}
          <div className="bg-[#ECEEF2] w-full lg:w-[30%] border-[#D1D1D1] border p-4 sm:p-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#002b5c] uppercase leading-tight tracking-tight">
                CONTACT DETAILS
              </h2>
              <div className="w-[110px] h-[4px] bg-[#002b5c] mt-3 mb-6" />

              {/* Logo Banner Graphic */}
              <div className="my-6 lg:my-10 flex justify-start">
                <img
                  src="/mahalaxmi png logo .png"
                  alt="Mahalaxmi Enterprises Logo"
                  className="h-14 sm:h-16 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://www.hplubricants.in/sites/default/files/fevicon.png";
                  }}
                />
              </div>

              {/* Contact Information List */}
              <div className="mt-8 flex flex-col gap-7 text-[15px] text-[#333333] leading-relaxed font-sans">
                {/* Address Item */}
                <div className="flex gap-4 items-start">
                  <HomeIcon className="text-[#002b5c] w-6 h-6 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                  <p className="text-[#333333] text-[15px] leading-relaxed">
                    <strong className="font-bold text-[#002b5c]">Mahalaxmi Enterprises</strong>
                    <br />
                    Baghpat Region & Surrounding Industrial Belts, Uttar Pradesh, India.
                  </p>
                </div>

                {/* Direct Contact Phone & Hours */}
                <div className="flex gap-4 items-start">
                  <Phone className="text-[#002b5c] w-6 h-6 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                  <div>
                    <p className="text-[#333333] text-[15px]">
                      Direct Contact:{" "}
                      <strong className="font-bold text-[#002b5c]">
                        +91 98765 43210
                      </strong>
                    </p>
                    <p className="text-sm text-[#555555] mt-2 leading-relaxed">
                      Working Hours Monday to Saturday from 9.00 am to 6.00pm
                      except for Public Holidays.
                    </p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex gap-4 items-center">
                  <Mail className="text-[#002b5c] w-6 h-6 flex-shrink-0" strokeWidth={1.8} />
                  <p className="text-[#333333] text-[15px]">
                    Email:{" "}
                    <a
                      href="mailto:sales@mahalaxmienterprises.com"
                      className="font-bold text-[#002b5c] hover:text-[#eb1e25] transition-colors"
                    >
                      sales@mahalaxmienterprises.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Contact Us Action Button */}
              <div className="mt-6 sm:mt-8 mb-4">
                <button
                  onClick={() => onOpenEnquiry("Direct Contact Support")}
                  className="bg-[#eb1e25] hover:bg-[#d0171d] text-white font-extrabold px-8 py-2.5 rounded text-sm uppercase tracking-wider shadow-none transition-all inline-block cursor-pointer"
                >
                  CONTACT US
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
