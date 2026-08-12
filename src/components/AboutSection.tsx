'use client';

import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Heading with dark blue underline */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] uppercase tracking-wide section-underline">
          About <span className="text-[#002b5c]">HP Lubricants</span>
        </h1>

        <p className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
          HP Lubricants is an integral part of Hindustan Petroleum Corporation Limited, one of India's frontline oil majors, committed to providing energy and fueling growth in every significant area of development. In pursuit of this vision, there is a sustained emphasis on environment protection and preserving the cultural heritage of India.
        </p>

        <div className="mt-8">
          <a
            href="#products"
            className="inline-block bg-[#eb1e25] text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded hover:bg-[#c4141a] transition shadow-md"
          >
            Read More
          </a>
        </div>
      </div>
    </section>
  );
}
