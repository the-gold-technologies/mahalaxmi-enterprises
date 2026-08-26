"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

export interface HeroSlide {
  id?: string | number;
  title?: string;
  img: string;
  link?: string;
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { pages, isLoading } = useCMSStore();

  const slides: HeroSlide[] = pages["home"]?.HeroSlider?.slides || [];
  const loading = isLoading["home"] && slides.length === 0;

  // Auto-advance slides every 5.5s if there are multiple slides
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (loading) {
    return (
      <section className="relative w-full overflow-hidden bg-slate-900 aspect-[16/7] sm:aspect-[16/6] md:aspect-[1920/715] max-h-[620px] min-h-[220px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/20 border-t-[#eb1e25] rounded-full animate-spin" />
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-slate-900 shadow-inner">
      {/* 16:6 / 1920x715 Aspect Ratio Container */}
      <div className="relative w-full aspect-[16/7] sm:aspect-[16/6] md:aspect-[1920/715] max-h-[620px] min-h-[220px]">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.img}
                alt={slide.title || "Slide Banner"}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* Previous Button */}
        {slides.length > 1 && (
          <button
            onClick={prevSlide}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#eb1e25] text-white p-2 md:p-3 rounded-full backdrop-blur-xs transition-all duration-200 cursor-pointer shadow-lg hover:scale-110"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={22} className="md:w-6 md:h-6" />
          </button>
        )}

        {/* Next Button */}
        {slides.length > 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#eb1e25] text-white p-2 md:p-3 rounded-full backdrop-blur-xs transition-all duration-200 cursor-pointer shadow-lg hover:scale-110"
            aria-label="Next Slide"
          >
            <ChevronRight size={22} className="md:w-6 md:h-6" />
          </button>
        )}

        {/* Slide Indicator Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-full">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentSlide
                    ? "w-6 bg-[#eb1e25]"
                    : "w-2 bg-white/70 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
