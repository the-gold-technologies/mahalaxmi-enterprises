"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

export default function BlogsHero() {
  const { pages } = useCMSStore();
  const cmsHero = pages["blogs"]?.BlogsHero;
  const image = cmsHero?.bannerImage || "/blogs-banner.jpg";

  return (
    <section className="w-full relative overflow-hidden leading-none">
      <img
        src={image}
        alt={cmsHero?.title || "Blogs - Mahalaxmi Enterprises HP Lubricants"}
        className="w-full h-auto object-cover block"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://www.hplubricants.in/sites/default/files/blogs-banner.jpg";
        }}
      />
    </section>
  );
}
