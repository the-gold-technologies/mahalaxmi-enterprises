"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

export default function EventsHero() {
  const { pages } = useCMSStore();
  const cmsHero = pages["events"]?.EventsHero;
  const image = cmsHero?.bannerImage || "/events-banner.jpg";

  return (
    <section className="w-full relative overflow-hidden leading-none">
      <img
        src={image}
        alt={cmsHero?.title || "MAHALAXMI ENTERPRISES Events & Activities Gallery Banner"}
        className="w-full h-auto object-cover block"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://www.hplubricants.in/sites/default/files/Event%20banner_01.jpg";
        }}
      />
    </section>
  );
}
