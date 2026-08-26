"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

export default function AboutHpclHero() {
  const { pages } = useCMSStore();
  const cmsHero = pages["about-us"]?.AboutHero;
  const image = cmsHero?.bannerImage || cmsHero?.image || "";
  const altText = cmsHero?.altText || cmsHero?.title || "";

  if (!image) {
    return null;
  }

  return (
    <section className="w-full relative overflow-hidden leading-none">
      <img
        src={image}
        alt={altText}
        className="w-full h-auto object-cover block"
      />
    </section>
  );
}
