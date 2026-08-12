"use client";

import React from "react";

export default function LubesHeadquarterSection() {
  return (
    <section className="w-full bg-[#eaeef3] py-12 md:py-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] uppercase leading-snug mb-6 tracking-wide">
          MAHALAXMI ENTERPRISES<br />
          <span className="border-b-[3px] border-[#002b5c] pb-1 inline-block">
            AUTHORIZED INDUSTRIAL LUBRICANTS DISTRIBUTOR (ILD)
          </span>
        </h2>

        <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-1 font-normal font-sans">
          <p>
            <strong className="font-bold text-gray-900">Proprietor:</strong> Neha Goyal
          </p>
          <p>
            <strong className="font-bold text-gray-900">Serving Region:</strong> Baghpat Region & Surrounding Industrial Belts, Uttar Pradesh
          </p>
          <p>
            <strong className="font-bold text-gray-900">Establishment:</strong> Est. 2023 | 100+ Industrial Clients & Government Department Supplier
          </p>
          <p className="pt-2">
            <strong className="font-bold text-gray-900">Direct Contact:</strong> +91 98765 43210 |{" "}
            <a
              href="mailto:sales@mahalaxmienterprises.com"
              className="text-[#002b5c] hover:text-[#eb1e25] font-normal transition-colors"
            >
              sales@mahalaxmienterprises.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
