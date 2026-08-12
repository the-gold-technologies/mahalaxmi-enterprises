'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Sh. V Narayanappa',
      role: 'CMS/DSL/KJM',
      org: 'Krishnarajapuram Shed, Bengaluru SWR',
      quote:
        'HP Lubricants offer technologically advanced products such as HP Powerkool RR which is environmental...',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      name: 'Sh. Yashwant M Jannu',
      role: 'Vice President-Research and Development, IED',
      org: 'Auma India Private Limited Bangalore - 560058',
      quote:
        'Proud to be associate with HP Lubricants one of the leading brand which offers innovative products a...',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 3,
      name: 'Sh. P.S. MANIAN',
      role: 'Sr Manager',
      org: 'Automotive India Pvt Ltd, Hosur',
      quote:
        'High performance Customized leaders – That is HPCL. More perfect in all transactions than any othe...',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 4,
      name: 'Sh. Ganeshan',
      role: 'President of Trichungode LOA',
      org: 'Tiruchengode Lorry Owners Association',
      quote:
        'HP Lubricants offer wide range of products to choose for application, help us to build our business...',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <section id="testimonials" className="py-16 bg-[#f4f6f9] text-center">
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] uppercase tracking-wide section-underline">
          Testimonials
        </h2>

        <p className="mt-4 text-gray-600 text-sm max-w-3xl mx-auto">
          HP Lubricants has always been in the forefront developing and marketing of technology advanced lubricants as per the market trends
        </p>

        {/* Carousel Container with Arrows */}
        <div className="mt-12 relative px-8">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700 hover:text-[#eb1e25] transition"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={36} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-gray-200 rounded p-6 shadow-sm flex flex-col justify-between relative text-center min-h-[300px]"
              >
                {/* Red Quote Symbol Top Left */}
                <div className="absolute top-2 left-2 text-[#eb1e25] text-3xl font-serif leading-none select-none">
                  ““
                </div>

                {/* Profile Photo */}
                <div className="mt-2 flex justify-center">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>

                {/* Info */}
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-[#002b5c]">{t.name}</h3>
                  <p className="text-xs font-bold text-red-600 mt-0.5">{t.role}</p>
                  <p className="text-[11px] font-bold text-red-600 leading-tight mt-0.5">{t.org}</p>
                </div>

                {/* Quote Text */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex-grow flex items-center justify-center">
                  <p className="text-xs text-gray-600 leading-relaxed italic">{t.quote}</p>
                </div>

                {/* Red Quote Symbol Bottom Right */}
                <div className="absolute bottom-2 right-2 text-[#eb1e25] text-3xl font-serif leading-none select-none">
                  ””
                </div>
              </div>
            ))}
          </div>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-700 hover:text-[#eb1e25] transition"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      </div>
    </section>
  );
}
