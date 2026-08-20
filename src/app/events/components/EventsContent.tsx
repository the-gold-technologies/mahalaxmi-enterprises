"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { galleryItems, GalleryItem } from "./eventsData";

export default function EventsContent() {
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* Main Section Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] tracking-tight uppercase">
          EVENTS
        </h1>
        <div className="w-20 h-1 bg-[#002b5c] mt-2"></div>
      </div>

      {/* Intro Description */}
      <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-12 max-w-5xl font-sans">
        Mahalaxmi Enterprises actively engages with their stakeholders by frequently hosting meetings and events with them. This includes meeting business partners, strategic partners, distributors, OEMs, agencies, mechanics, and industrial clients.
      </p>

      {/* Photo Gallery Grid (3 columns with rounded corners) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxImage(item)}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer hover:-translate-y-1"
          >
            <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 rounded-2xl">
              <img
                src={item.image}
                alt={item.altText}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-base font-extrabold text-[#002b5c]">
                {lightboxImage.title}
              </h3>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-full transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Image */}
            <div className="max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxImage.image}
                alt={lightboxImage.altText}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
