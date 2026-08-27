"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";

export default function EventsContent() {
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);
  const { pages, pageSEO } = useCMSStore();

  const cmsContent = pages["events"]?.EventsContent;
  const cmsGallery = pages["events"]?.EventsGallery;

  const title = cmsContent?.title || "";
  const intro = cmsContent?.introText || "";
  const items = cmsGallery?.galleryItems || [];
  const HeadingTag = getHeadingTag(pageSEO["events"]?.headingOptions, "h1");

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* Main Section Header */}
      {title && (
        <div className="mb-6">
          <HeadingTag className="text-3xl md:text-4xl font-extrabold text-[#002b5c] tracking-tight uppercase">
            {title}
          </HeadingTag>
          <div className="w-20 h-1 bg-[#002b5c] mt-2"></div>
        </div>
      )}

      {/* Intro Description */}
      {intro && (
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-12 max-w-5xl font-sans">
          {intro}
        </p>
      )}

      {/* Photo Gallery Grid (3 columns with rounded corners) */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any, idx: number) => (
            <div
              key={item.id || idx}
              onClick={() => setLightboxImage(item)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer hover:-translate-y-1"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 rounded-2xl">
                <img
                  src={item.image}
                  alt={item.altText || item.title || "Event Image"}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-base font-extrabold text-[#002b5c]">
                {lightboxImage.title || "Event Gallery Photo"}
              </h3>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-full transition cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Image */}
            <div className="max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxImage.image}
                alt={lightboxImage.altText || lightboxImage.title || "Event Photo"}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
