"use client";

import React from "react";
import { FormattedText } from "@/components/FormattedText";
import { SpecTable } from "@/components/SpecTable";
import { normalizeSections, type ProductSection } from "@/lib/productSections";

interface ProductCustomSectionsProps {
  sections: unknown;
  productName: string;
}

function SectionHeading({ title }: { title: string }) {
  if (!title) return null;
  return (
    <h3 className="text-base sm:text-lg font-bold text-[#002b5c] mb-3 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-[#eb1e25]" /> {title}
    </h3>
  );
}

function Section({ section, productName }: { section: ProductSection; productName: string }) {
  switch (section.type) {
    case "table":
      return (
        <SpecTable
          title={section.title}
          topHeader={section.topHeader}
          propertyHeader={section.tablePropertyHeader}
          tableHeaders={section.tableHeaders}
          rows={section.propertiesTable}
        />
      );

    case "text":
      if (!section.content?.trim()) return null;
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <SectionHeading title={section.title} />
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line">
            <FormattedText text={section.content.trim()} />
          </p>
        </div>
      );

    case "list":
      if (!section.items?.length) return null;
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <SectionHeading title={section.title} />
          <ul className="space-y-2.5">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <span className="text-[#eb1e25] font-bold text-sm leading-none mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "images":
      if (!section.images?.length) return null;
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <SectionHeading title={section.title} />
          <div
            className={`grid gap-4 ${
              section.images.length === 1
                ? "grid-cols-1"
                : section.images.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-2 md:grid-cols-3"
            }`}
          >
            {section.images.map((src, i) => (
              <a
                key={i}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-slate-50 border border-slate-200 p-3 hover:border-[#002b5c]/40 transition-colors"
              >
                <img
                  src={src}
                  alt={`${section.title || productName} ${i + 1}`}
                  loading="lazy"
                  className="w-full h-48 object-contain mx-auto"
                />
              </a>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

/** Extra sections added per product in the CMS ("Additional Sections"). */
export function ProductCustomSections({ sections, productName }: ProductCustomSectionsProps) {
  const list = normalizeSections(sections);
  if (list.length === 0) return null;
  return (
    <>
      {list.map((section) => (
        <Section key={section.id} section={section} productName={productName} />
      ))}
    </>
  );
}
