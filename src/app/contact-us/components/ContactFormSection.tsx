"use client";

import React, { useState, useMemo } from "react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";

interface ContactFormSectionProps {
  onOpenEnquiry?: (productName?: string) => void;
  onOpenDistributor?: (type?: string) => void;
}

interface OfficeItem {
  id: string | number;
  name: string;
  region: string;
  address: string;
  contactNo: string;
  contactName: string;
  email: string;
  altEmail: string;
}

export default function ContactFormSection({
  onOpenEnquiry,
  onOpenDistributor,
}: ContactFormSectionProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { offices, pages, pageSEO, globalSEO } = useCMSStore();

  const cmsHero = pages["contact-us"]?.ContactHero;
  const cmsHeadquarter = pages["contact-us"]?.ContactHeadquarter;
  const cmsRegionalOffices = pages["contact-us"]?.RegionalOffices;

  const pageTitle = cmsHero?.title || "CONTACT DETAILS";
  const pageSubtitle = cmsHero?.subtitle || "";
  const HeadingTag = getHeadingTag(pageSEO["contact-us"]?.headingOptions, "h1");

  // Headquarter information
  const companyName = cmsHeadquarter?.companyName || "";
  const badge = cmsHeadquarter?.badge || "";
  const proprietor = cmsHeadquarter?.proprietor || "";
  const servingRegion = cmsHeadquarter?.address || globalSEO?.address || "";
  const phone = cmsHeadquarter?.phone || globalSEO?.phone || "";
  const email = cmsHeadquarter?.email || globalSEO?.email || "";
  const workingHours = cmsHeadquarter?.workingHours || "";

  // Raw offices array
  const rawOffices = useMemo<OfficeItem[]>(() => {
    const list = cmsRegionalOffices?.offices || offices || [];
    return list.map((o: any) => ({
      id: o.id,
      name: o.name || "",
      region: (o.region || o.type || "NORTH").toUpperCase(),
      address: o.address || "",
      contactNo: o.contactNo || o.phone || "",
      contactName: o.contactName || o.contactPerson || "",
      email: o.email || "",
      altEmail: o.altEmail || "",
    }));
  }, [cmsRegionalOffices, offices]);

  const filteredOffices = useMemo(() => {
    return rawOffices.filter((office) => {
      const matchesRegion =
        selectedRegion === "ALL" ||
        office.region.includes(selectedRegion) ||
        selectedRegion.includes(office.region);
      const matchesQuery =
        office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        office.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        office.contactName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesQuery;
    });
  }, [rawOffices, selectedRegion, searchQuery]);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* 1. CONTACT US HEADER & INTRO */}
      {pageTitle && (
        <div className="mb-6">
          <HeadingTag className="text-3xl md:text-4xl font-extrabold text-[#002b5c] tracking-tight uppercase">
            {pageTitle}
          </HeadingTag>
          <div className="w-20 h-1 bg-[#002b5c] mt-2"></div>
        </div>
      )}

      {pageSubtitle && (
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-12 max-w-5xl font-sans">
          {pageSubtitle}
        </p>
      )}

      {/* 2. MAHALAXMI ENTERPRISES AUTHORIZED DISTRIBUTOR */}
      {companyName && (
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] uppercase leading-snug mb-4 tracking-wide">
            {companyName}
            {badge && (
              <>
                <br />
                <span className="border-b-[3px] border-[#002b5c] pb-1 inline-block">
                  {badge}
                </span>
              </>
            )}
          </h2>

          <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-1 font-normal font-sans">
            {proprietor && (
              <p>
                <strong className="font-bold text-gray-900">Proprietor:</strong>{" "}
                {proprietor}
              </p>
            )}
            {servingRegion && (
              <p>
                <strong className="font-bold text-gray-900">Serving Region:</strong>{" "}
                {servingRegion}
              </p>
            )}
            {workingHours && (
              <p>
                <strong className="font-bold text-gray-900">Operating Hours:</strong>{" "}
                {workingHours}
              </p>
            )}
            {(phone || email) && (
              <p className="pt-2">
                <strong className="font-bold text-gray-900">Direct Contact:</strong>{" "}
                {phone}
                {phone && email && " | "}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="text-[#002b5c] hover:text-[#eb1e25] font-normal transition-colors"
                  >
                    {email}
                  </a>
                )}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 4. REGIONAL OFFICES SECTION */}
      {rawOffices.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-xs">
          {/* Top Dark Navy Header Bar with Red Search Button */}
          <div className="bg-[#002b5c] text-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="font-extrabold text-base md:text-lg tracking-wider uppercase">
                REGIONAL OFFICES
              </span>
              <span className="text-xs text-gray-300 ml-2 font-normal">
                (Working Hours: Monday to Friday from 9.00 am to 5.00pm except for
                Public Holidays)
              </span>
            </div>

            {/* Search Box & Button */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search office or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white text-gray-900 text-xs px-3 py-1.5 rounded outline-none border-0 w-44 md:w-56"
                />
              </div>
              <button className="bg-[#eb1e25] hover:bg-[#c4141a] text-white font-bold text-xs uppercase px-4 py-1.5 rounded transition cursor-pointer">
                SEARCH
              </button>
            </div>
          </div>

          {/* Region Filter Buttons */}
          <div className="bg-white p-4 border-b border-gray-200 flex items-center gap-3 overflow-x-auto">
            {["ALL", "WEST", "SOUTH", "NORTH", "EAST"].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-1.5 rounded text-xs md:text-sm font-bold uppercase transition cursor-pointer ${
                  selectedRegion === region
                    ? "bg-[#eb1e25] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Regional Offices Directory List */}
          <div className="p-6 md:p-8 bg-white space-y-8">
            {filteredOffices.length > 0 ? (
              filteredOffices.map((office) => (
                <div
                  key={office.id}
                  className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0 font-sans"
                >
                  <h3 className="text-base md:text-lg font-extrabold text-[#002b5c] uppercase mb-3 tracking-tight">
                    {office.name}
                  </h3>

                  <div className="text-xs md:text-sm text-[#555555] space-y-1.5 font-sans leading-relaxed">
                    {office.address && (
                      <p className="uppercase text-gray-600">{office.address}</p>
                    )}
                    {office.contactNo && (
                      <p>
                        Contact number:{" "}
                        <span className="text-gray-800">{office.contactNo}</span>
                      </p>
                    )}
                    {office.contactName && (
                      <p className="pt-2">
                        Contact Name:{" "}
                        <span className="text-gray-800">{office.contactName}</span>
                      </p>
                    )}
                    {office.email && (
                      <p>
                        Email:{" "}
                        <a
                          href={`mailto:${office.email}`}
                          className="text-[#002b5c] hover:underline font-medium"
                        >
                          {office.email}
                        </a>
                      </p>
                    )}
                    {office.altEmail && (
                      <p>
                        Alternate Email:{" "}
                        <a
                          href={`mailto:${office.altEmail}`}
                          className="text-[#002b5c] hover:underline font-medium"
                        >
                          {office.altEmail}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm py-4 text-center">
                No regional offices found matching "{searchQuery}".
              </p>
            )}
          </div>
        </div>
      )}

      {/* 5. LOCATE DISTRIBUTOR RED BANNER BUTTON */}
      <div className="mt-14 md:mt-20 mb-6 text-center">
        <button
          onClick={() => {
            if (onOpenDistributor) {
              onOpenDistributor("Industrial Lube Distributor (ILD)");
            } else if (onOpenEnquiry) {
              onOpenEnquiry("Locate Industrial Lube Distributor (ILD)");
            }
          }}
          className="inline-block bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs md:text-sm lg:text-base font-extrabold uppercase tracking-wide px-6 md:px-10 py-3.5 rounded shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          LOCATE INDUSTRIAL LUBE DISTRIBUTOR (ILD)/ BAZAAR LUBE DISTRIBUTOR
          (BLD)
        </button>
      </div>
    </section>
  );
}
