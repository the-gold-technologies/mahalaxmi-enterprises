"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "HP Lubricants No. 1 Banner",
      img: "/Banner No 1.png",
      link: "#products",
    },
    {
      id: 2,
      title: "FUTUR-X ULTRA-SYNTHETIC PREMIUM ENGINE OILS",
      img: "/FuturX-1.jpg",
      link: "#products",
    },
    {
      id: 3,
      title: "FUTUR-X NEXT GEN ENGINE PROTECTION",
      img: "/FuturX-2.jpg",
      link: "#products",
    },
    {
      id: 4,
      title: "HP Lube New Banner",
      img: "/HP_Lube_Banner_new.png",
      link: "#products",
    },
    {
      id: 5,
      title: "HP Racer New Banner",
      img: "/HP-Racer-new-1929-x715 copy (1) (1).jpg",
      link: "#products",
    },
    {
      id: 6,
      title: "HIGH PERFORMANCE INDUSTRIAL & SECTORIAL LUBRICANTS",
      img: "/HPL-Sectorial-Web-Banner-1920x715-pix[9].jpg",
      link: "#products",
    },
    {
      id: 7,
      title: "INDIA'S LEADING LUBE MARKETER",
      img: "/Lubricants.jpg",
      link: "#products",
    },
    {
      id: 8,
      title: "HP MILCY FLEET HEAVY DUTY DIESEL ENGINE OIL",
      img: "/New 1.jpg",
      link: "#products",
    },
    {
      id: 9,
      title: "HP NEOSYNTH ENGINE OIL",
      img: "/New 2.jpg",
      link: "#products",
    },
    {
      id: 10,
      title: "HP RACER GEN6 2-WHEELER ENGINE OIL",
      img: "/Racer-Gen6.jpg",
      link: "#products",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full bg-black overflow-hidden aspect-[16/6] min-h-[300px] max-h-[560px]">
      {/* Slides Container */}
      {slides.map((slide, idx) => (
        <a
          key={slide.id}
          href={slide.link}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=80";
            }}
          />
        </a>
      ))}

      {/* Prev / Next Arrows */}
      <button
        className=" absolute left-3 top-1/2 text-white -translate-y-1/2 z-20 font-extrabold"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={36} strokeWidth={3.5} className="drop-shadow-md" />
      </button>

      <button
        onClick={nextSlide}
        className=" absolute right-3 top-1/2 text-white -translate-y-1/2 z-20 font-extrabold"
        aria-label="Next Slide"
      >
        <ChevronRight size={36} strokeWidth={3.5} className="drop-shadow-md" />
      </button>

      {/* Bottom Dot Pagination */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentSlide ? "bg-[#eb1e25] w-3" : "bg-white"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
