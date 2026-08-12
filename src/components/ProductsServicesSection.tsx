'use client';

import React from 'react';
import { Disc, Factory, Droplets, Wrench, Anchor, Zap } from 'lucide-react';

interface ProductsServicesProps {
  onSelectCategory?: (category: string) => void;
}

export default function ProductsServicesSection({ onSelectCategory }: ProductsServicesProps) {
  const items = [
    {
      id: 'automotive',
      name: 'Automotive Oils',
      icon: Disc,
      link: '#products',
      img: 'https://www.hplubricants.in/sites/default/files/automotive-1.png',
    },
    {
      id: 'industrial',
      name: 'Industrial Oils',
      icon: Factory,
      link: '#products',
      img: 'https://www.hplubricants.in/sites/default/files/industrial-1.png',
    },
    {
      id: 'specialties',
      name: 'Specialties',
      icon: Droplets,
      link: '#products',
      img: 'https://www.hplubricants.in/sites/default/files/specialities-1.png',
    },
    {
      id: 'greases',
      name: 'Greases',
      icon: Wrench,
      link: '#products',
      img: 'https://www.hplubricants.in/sites/default/files/greases-1.png',
    },
    {
      id: 'marine',
      name: 'Marine Oils',
      icon: Anchor,
      link: '#products',
      img: 'https://www.hplubricants.in/sites/default/files/marine-oils-1.png',
    },
    {
      id: 'futurx',
      name: 'FUTURX',
      icon: Zap,
      link: '#products',
      img: 'https://www.hplubricants.in/sites/default/files/automotive-1.png',
    },
  ];

  return (
    <section id="products" className="py-16 bg-[#f4f6f9] text-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] uppercase tracking-wide section-underline">
          Our Products and Services
        </h2>

        <p className="mt-4 text-gray-600 text-sm max-w-2xl mx-auto">
          HP Lubricants has always been in the forefront developing and marketing of technology advanced lubricants as per the market trends
        </p>

        {/* 6 Category Icons Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.link}
                onClick={() => onSelectCategory && onSelectCategory(item.id)}
                className="group flex flex-col items-center cursor-pointer transition transform hover:-translate-y-1.5"
              >
                {/* Circular Icon Container matching HP Lubricants original visual styling */}
                <div className="w-24 h-24 rounded-full border-4 border-[#007cc3] flex items-center justify-center bg-white shadow-md group-hover:bg-[#007cc3] group-hover:border-[#002b5c] transition duration-300">
                  <Icon size={44} className="text-[#007cc3] group-hover:text-white transition duration-300" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#002b5c] group-hover:text-[#eb1e25] transition">
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
