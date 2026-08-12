'use client';

import React, { useState } from 'react';

interface ProductsServicesProps {
  onSelectCategory?: (category: string) => void;
}

export default function ProductsServicesSection({ onSelectCategory }: ProductsServicesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const items = [
    {
      id: 'industrial',
      name: 'Industrial Oils',
      link: '#products',
      img: '/industrial-1.png',
      hoverImg: '/industrial-2.png',
    },
    {
      id: 'greases',
      name: 'Greases',
      link: '#products',
      img: '/greases-1.png',
      hoverImg: '/greases-2.png',
    },
  ];

  return (
    <section id="products" className="py-16 bg-[#f4f6f9] text-center font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] uppercase tracking-wide section-underline">
          OUR PRODUCTS AND SERVICES
        </h2>

        <p className="mt-4 text-gray-600 text-sm md:text-base max-w-3xl mx-auto font-medium">
          HP Lubricants has always been in the forefront developing and marketing of technology advanced lubricants as per the market trends
        </p>

        {/* 2 Category Items Centered */}
        <div className="mt-12 flex justify-center items-center gap-12 sm:gap-20 flex-wrap">
          {items.map((item) => {
            const isHovered = hoveredId === item.id;
            const bgImage = isHovered ? item.hoverImg : item.img;

            return (
              <a
                key={item.id}
                href={item.link}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectCategory && onSelectCategory(item.id)}
                className="group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* Circular Background Image Box */}
                <div
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-contain bg-no-repeat bg-center transition-all duration-300 drop-shadow-md group-hover:drop-shadow-xl"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                  }}
                />

                <h3 className="mt-4 text-sm sm:text-base font-bold text-[#002b5c] group-hover:text-[#eb1e25] transition-colors">
                  {item.name}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

