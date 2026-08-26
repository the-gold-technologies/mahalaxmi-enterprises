"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

export default function AboutHpclHero() {
  const { pages } = useCMSStore();
  const cmsHero = pages["about-us"]?.AboutHero;
  const image = cmsHero?.bannerImage || "/About-HPCL.jpg";

  return (
    <section className="w-full relative overflow-hidden leading-none">
      <img
        src={image}
        alt={cmsHero?.title || "About MAHALAXMI ENTERPRISES Banner"}
        className="w-full h-auto object-cover block"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/About-HPCL.jpg";
        }}
      />
    </section>
  );
}
