"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

const RedQuoteBadge = ({ className }: { className?: string }) => (
  <div
    className={`inline-flex gap-1.5 items-center justify-center z-20 pointer-events-none ${className}`}
  >
    <span className="w-3 h-7 bg-[#eb1e25] -skew-x-[18deg] block rounded-[2px]" />
    <span className="w-3 h-7 bg-[#eb1e25] -skew-x-[18deg] block rounded-[2px]" />
  </div>
);

export interface TestimonialItem {
  id?: string | number;
  name: string;
  role?: string;
  org?: string;
  location?: string;
  quote: string;
  image?: string;
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const { pages } = useCMSStore();

  const cmsTestimonialsSection = pages["home"]?.TestimonialsSection;
  const testimonials: TestimonialItem[] = cmsTestimonialsSection?.testimonials || [];

  const title = cmsTestimonialsSection?.title || "";
  const subtitle = cmsTestimonialsSection?.subtitle || cmsTestimonialsSection?.description || "";

  // Dynamically update cardsPerPage based on window width
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - cardsPerPage);

  // Keep currentIndex bounded when cardsPerPage changes on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Automatic slide transition every 4 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused || testimonials.length <= cardsPerPage) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex, testimonials.length, cardsPerPage]);

  const prevSlide = () => {
    if (testimonials.length <= cardsPerPage) return;
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    if (testimonials.length <= cardsPerPage) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  if (!cmsTestimonialsSection || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="py-16 text-center font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative">
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

        {/* Carousel Slider Outer Wrapper (Hover to Pause) */}
        {/*
        <div
          className="mt-14 relative px-2 sm:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials.length > cardsPerPage && (
            <button
              onClick={prevSlide}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-30 text-[#002b5c] hover:text-[#eb1e25] cursor-pointer transition-colors"
              aria-label="Previous Testimonials"
            >
              <ChevronLeft size={38} strokeWidth={4} />
            </button>
          )}

          <div className="overflow-hidden py-4 px-1">
            <div
              className="flex gap-6 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(calc(-${currentIndex} * ((100% + 24px) / ${cardsPerPage})))`,
              }}
            >
              {testimonials.map((t, idx) => (
                <div
                  key={t.id || idx}
                  className="shrink-0 w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] relative bg-white border border-[#d1d5db] pt-9 pb-9 px-5 flex flex-col justify-between text-center shadow-xs transition-all duration-300 hover:shadow-md min-h-[440px]"
                >
                  <RedQuoteBadge className="absolute -top-[14px] left-6" />

                  {t.image && (
                    <div className="flex justify-center mt-1 mb-4">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-24 h-24 rounded-full object-cover border border-gray-100 shadow-xs"
                      />
                    </div>
                  )}

                  <div className="flex flex-col items-center">
                    <h3 className="text-sm font-bold text-[#001a36] tracking-tight">
                      {t.name}
                    </h3>
                    {t.role && (
                      <p className="text-sm font-bold text-[#001a36] mt-0.5 uppercase">
                        {t.role}
                      </p>
                    )}

                    {t.org && (
                      <p className="text-sm font-bold text-[#eb1e25] mt-2 leading-snug">
                        {t.org}
                      </p>
                    )}
                    {t.location && (
                      <p className="text-sm font-bold text-[#eb1e25] mt-0.5 leading-snug">
                        {t.location}
                      </p>
                    )}
                  </div>

                  <div className="w-full border-t border-[#d1d5db] my-4" />

                  <div className="grow flex items-center justify-center pb-2">
                    <p className="text-sm text-[#374151] font-normal leading-relaxed font-sans px-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <RedQuoteBadge className="absolute -bottom-[14px] right-6" />
                </div>
              ))}
            </div>
          </div>

          {testimonials.length > cardsPerPage && (
            <button
              onClick={nextSlide}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-30 text-[#002b5c] hover:text-[#eb1e25] cursor-pointer transition-colors"
              aria-label="Next Testimonials"
            >
              <ChevronRight size={38} strokeWidth={4} />
            </button>
          )}
        </div>
        */}
      </div>
    </section>
  );
}
