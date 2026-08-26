"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

export default function ContactHero() {
  const { pages } = useCMSStore();
  const cmsHero = pages["contact-us"]?.ContactHero;
  const image = cmsHero?.bannerImage || "/contact-us-banner.jpg";

  return (
    <section className="w-full relative overflow-hidden leading-none">
      <img
        src={image}
        alt={cmsHero?.title || "Contact Us - MAHALAXMI ENTERPRISES"}
        className="w-full h-auto object-cover block"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://www.hplubricants.in/sites/default/files/contact-us-banner.jpg";
        }}
      />
    </section>
  );
}
