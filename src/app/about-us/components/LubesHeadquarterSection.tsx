"use client";

import React from "react";

export default function LubesHeadquarterSection() {
  return (
    <section className="w-full bg-[#eaeef3] py-12 md:py-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] uppercase leading-snug mb-6 tracking-wide">
          LUBES MARKETING<br />
          <span className="border-b-[3px] border-[#002b5c] pb-1 inline-block">HEADQUARTER</span>
        </h2>

        <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-1 font-normal">
          <p>Hindustan Petroleum Corporation Limited</p>
          <p>10<sup>th</sup> Floor, A Wing, Marathon Futurex,</p>
          <p>N. M. Joshi Marg, Lower Parel (E),</p>
          <p>Mumbai - 400013</p>
          <p>Maharastra, India.</p>
          <p className="pt-2">
            <strong className="font-bold text-gray-900">Email: </strong>
            <a
              href="mailto:lubescare@hpcl.in"
              className="text-[#002b5c] hover:text-[#eb1e25] font-normal transition-colors"
            >
              lubescare@hpcl.in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
