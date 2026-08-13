'use client';

import React from 'react';

export default function TrustedClientsSection() {
  const clients = [
    {
      id: 'haldiram',
      name: "Haldiram's",
      category: 'Food Processing Giant',
      logo: '/Haldirams.jpeg',
    },
    {
      id: 'thdc',
      name: 'THDC Khurja',
      category: 'Power & Thermal Energy',
      logo: '/THDC.jpeg',
    },
    {
      id: 'ordnance',
      name: 'Ordnance Factories',
      category: 'Ministry of Defence, Govt of India',
      logo: '/Ordnan.jpeg',
    },
    {
      id: 'indian-army',
      name: 'Indian Army',
      category: 'Armed Forces of India',
      logo: '/Indian_Army.jpeg',
    },
  ];

  // Quadruple the array for seamless infinite looping
  const marqueeClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section id="trusted-clients" className="py-14 bg-[#f8fafc] text-center font-sans overflow-hidden border-t border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] uppercase tracking-wide section-underline">
          TRUSTED CLIENTS & PARTNERS
        </h2>
        <p className="mt-4 text-gray-600 text-sm md:text-base max-w-3xl mx-auto font-medium">
          Proudly serving leading public enterprises, defense organizations, and industrial giants across India with high-performance lubricants.
        </p>
      </div>

      {/* Infinite Horizontal Logo Marquee Container */}
      <div className="relative w-full overflow-hidden py-4 flex select-none group">
        {/* Left & Right Gradient Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Flex Track */}
        <div className="flex gap-6 sm:gap-8 items-center animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
          {marqueeClients.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="flex-shrink-0 bg-white border border-gray-200/90 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-[#eb1e25]/40 transition-all duration-300 flex items-center gap-3.5 min-w-[220px] sm:min-w-[260px] h-20"
            >
              {/* Client Logo / Badge Box */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center p-1.5 flex-shrink-0">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Client Name & Category */}
              <div className="text-left">
                <h3 className="text-sm sm:text-base font-extrabold text-[#002b5c] tracking-tight leading-tight">
                  {client.name}
                </h3>
                <p className="text-[11px] font-semibold text-[#eb1e25] mt-0.5 tracking-wide">
                  {client.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind marquee keyframe styling inlined */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
