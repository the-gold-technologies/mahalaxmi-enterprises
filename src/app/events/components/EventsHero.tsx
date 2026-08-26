"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

export default function EventsHero() {
  const { pages } = useCMSStore();
  const cmsHero = pages["events"]?.EventsHero;
  const image = cmsHero?.image || "";
  const altText = cmsHero?.altText || "";

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
