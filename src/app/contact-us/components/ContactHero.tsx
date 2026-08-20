"use client";

import React from "react";

export default function ContactHero() {
  return (
    <section className="w-full relative overflow-hidden leading-none">
      <img
        src="/contact-us-banner.jpg"
        alt="Contact Us - MAHALAXMI ENTERPRISES"
        className="w-full h-auto object-cover block"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://www.hplubricants.in/sites/default/files/contact-us-banner.jpg";
        }}
      />
    </section>
  );
}
