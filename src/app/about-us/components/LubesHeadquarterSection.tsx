"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

export default function LubesHeadquarterSection() {
  const { pages } = useCMSStore();
  const cmsHq = pages["about-us"]?.LubesHeadquarterSection;

  if (!cmsHq) {
    return null;
  }

  const title = cmsHq.title || "";
  const badge = cmsHq.badge || "";
  const proprietor = cmsHq.proprietor || "";
  const servingRegion = cmsHq.servingRegion || "";
  const establishment = cmsHq.establishment || "";
  const phone = cmsHq.phone || "";
  const email = cmsHq.email || "";

  return (
    <section className="w-full bg-[#eaeef3] py-12 md:py-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {(title || badge) && (
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] uppercase leading-snug mb-6 tracking-wide">
            {title}
            {badge && (
              <>
                <br />
                <span className="border-b-[3px] border-[#002b5c] pb-1 inline-block">
                  {badge}
                </span>
              </>
            )}
          </h2>
        )}

        <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-1 font-normal font-sans">
          {proprietor && (
            <p>
              <strong className="font-bold text-gray-900">Proprietor:</strong> {proprietor}
            </p>
          )}
          {servingRegion && (
            <p>
              <strong className="font-bold text-gray-900">Serving Region:</strong> {servingRegion}
            </p>
          )}
          {establishment && (
            <p>
              <strong className="font-bold text-gray-900">Establishment:</strong> {establishment}
            </p>
          )}
          {(phone || email) && (
            <p className="pt-2">
              {phone && (
                <>
                  <strong className="font-bold text-gray-900">Direct Contact:</strong> {phone}
                </>
              )}
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
    </section>
  );
}
