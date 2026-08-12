'use client';

import React from 'react';

export default function EnterpriseSection() {
  const cards = [
    {
      id: 'rd',
      title: 'R & D',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'impact',
      title: 'HP IMPACT',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'quality',
      title: 'QUALITY',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'infrastructure',
      title: 'INFRASTRUCTURE',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="enterprise" className="py-16 bg-white text-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] uppercase tracking-wide section-underline">
          A Future Ready Enterprise
        </h2>

        <p className="mt-4 text-gray-600 text-sm max-w-3xl mx-auto">
          HP Lubricants has been leading the way in developing and marketing technologically advanced products in step with innovations in the global lubricant's markets.
        </p>

        {/* 4 Card Grid matching exact HP design */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-[#e5e9f0] border border-gray-200 rounded shadow-sm overflow-hidden flex flex-col hover:shadow-md transition"
            >
              <div className="h-48 overflow-hidden bg-gray-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="py-4 bg-[#e8ecf2] border-t border-gray-200">
                <h3 className="text-base font-extrabold text-[#002b5c] uppercase tracking-wider">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
