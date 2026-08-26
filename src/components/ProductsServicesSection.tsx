"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCMSStore } from "@/store/useCMSStore";

interface ProductsServicesProps {
  onSelectCategory?: (category: string) => void;
}

export default function ProductsServicesSection({
  onSelectCategory,
}: ProductsServicesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { pages } = useCMSStore();

  const cmsSection = pages["home"]?.ProductsServicesSection;

  if (!cmsSection) {
    return null;
  }

  const title = cmsSection.title || "OUR PRODUCTS AND SERVICES";
  const subtitle = cmsSection.subtitle || cmsSection.description || "";
  const items: any[] = cmsSection.items || cmsSection.categories || [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="products" className="py-16 bg-[#f4f6f9] text-center font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        {title && (
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] uppercase tracking-wide section-underline">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="mt-4 text-gray-600 text-sm md:text-base max-w-3xl mx-auto font-medium">
            {subtitle}
          </p>
        )}

        {/* Category Items Centered */}
        <div className="mt-12 flex justify-center items-center gap-12 sm:gap-20 flex-wrap">
          {items.map((item, idx) => {
            const itemId = item.id || item.slug || `cat-${idx}`;
            const isHovered = hoveredId === itemId;
            const bgImage = isHovered ? (item.hoverImg || item.img) : (item.img || item.hoverImg);
            const link = item.link || `/products/${item.slug || itemId}`;

            return (
              <Link
                key={itemId}
                href={link}
                onMouseEnter={() => setHoveredId(itemId)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectCategory && onSelectCategory(itemId)}
                className="group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* Circular Background Image Box */}
                {bgImage && (
                  <div
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-contain bg-no-repeat bg-center transition-all duration-300 drop-shadow-md group-hover:drop-shadow-xl"
                    style={{
                      backgroundImage: `url(${bgImage})`,
                    }}
                  />
                )}

                <h3 className="mt-4 text-sm sm:text-base font-bold text-[#002b5c] group-hover:text-[#eb1e25] transition-colors">
                  {item.name || item.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
