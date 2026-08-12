'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'FUTUR-X ULTRA-SYNTHETIC PREMIUM ENGINE OILS',
      img: 'https://www.hplubricants.in/sites/default/files/FuturX-1.jpg',
      link: '#products',
    },
    {
      id: 2,
      title: 'FUTUR-X NEXT GEN ENGINE PROTECTION',
      img: 'https://www.hplubricants.in/sites/default/files/FuturX-2.jpg',
      link: '#products',
    },
    {
      id: 3,
      title: 'HP RACER GEN6 2-WHEELER ENGINE OIL',
      img: 'https://www.hplubricants.in/sites/default/files/Racer-Gen6.jpg',
      link: '#products',
    },
    {
      id: 4,
      title: 'HIGH PERFORMANCE INDUSTRIAL & SECTORIAL LUBRICANTS',
      img: 'https://www.hplubricants.in/sites/default/files/HPL-Sectorial-Web-Banner-1920x715-pix[9].jpg',
      link: '#products',
    },
    {
      id: 5,
      title: 'HP MILCY FLEET HEAVY DUTY DIESEL ENGINE OIL',
      img: 'https://www.hplubricants.in/sites/default/files/New%201.jpg',
      link: '#products',
    },
    {
      id: 6,
      title: 'INDIA\'S LEADING LUBE MARKETER',
      img: 'https://www.hplubricants.in/sites/default/files/Lubricants.jpg',
      link: '#products',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full bg-black overflow-hidden aspect-[16/6] min-h-[300px] max-h-[560px]">
      {/* Slides Container */}
      {slides.map((slide, idx) => (
        <a
          key={slide.id}
          href={slide.link}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=80';
            }}
          />
        </a>
      ))}

      {/* Prev / Next Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#eb1e25] text-white p-2.5 rounded-full transition flex items-center justify-center"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#eb1e25] text-white p-2.5 rounded-full transition flex items-center justify-center"
        aria-label="Next Slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Bottom Dot Pagination */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentSlide ? 'bg-[#eb1e25] w-6' : 'bg-white/60 hover:bg-white'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
