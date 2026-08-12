"use client";

import React from "react";

export default function EventsHero() {
  return (
    <section className="w-full relative overflow-hidden leading-none">
      <img
        src="/events-banner.jpg"
        alt="HP Lubricants Events & Activities Gallery Banner"
        className="w-full h-auto object-cover block"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://www.hplubricants.in/sites/default/files/Event%20banner_01.jpg";
        }}
      />
    </section>
  );
}
