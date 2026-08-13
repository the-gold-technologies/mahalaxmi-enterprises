"use client";

import React from "react";

export default function BlogsHero() {
  return (
    <section className="w-full relative overflow-hidden leading-none">
      <img
        src="/blogs-banner.jpg"
        alt="Blogs - Mahalaxmi Enterprises HP Lubricants"
        className="w-full h-auto object-cover block"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://www.hplubricants.in/sites/default/files/blogs-banner.jpg";
        }}
      />
    </section>
  );
}
