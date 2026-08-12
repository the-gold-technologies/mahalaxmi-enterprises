"use client";

import React from "react";
import Link from "next/link";

export default function EventsBreadcrumb() {
  return (
    <section className="bg-[#f8f9fa] border-b border-gray-200 py-2.5">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-xs md:text-sm text-gray-600 flex items-center gap-2 font-medium">
        <Link href="/" className="hover:text-[#eb1e25] transition-colors">
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-[#eb1e25] font-semibold">Events</span>
      </div>
    </section>
  );
}
