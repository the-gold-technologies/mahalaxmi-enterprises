"use client";

import React, { useState } from "react";
import Link from "next/link";
import { blogsData } from "../blogsData";
import { Clock, Calendar, ArrowRight } from "lucide-react";

export default function BlogsContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredBlogs = blogsData.filter((post) => {
    return selectedCategory === "ALL" || post.category === selectedCategory;
  });

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((post) => (
          <article
            key={post.id}
            className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:shadow-[#002b5c]/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden font-sans"
          >
            {/* Image Container with Floating Badges */}
            <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://www.hplubricants.in/sites/default/files/blogs-banner.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Floating Category Badge */}
              <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-sm text-[#002b5c] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-slate-100">
                {post.category}
              </span>

              {/* Read Time */}
              <span className="absolute top-3.5 right-3.5 bg-black/65 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                <Clock size={11} /> {post.readTime}
              </span>
            </div>

            {/* Card Content Body */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Publish Date */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-2.5">
                  <Calendar size={12} className="text-[#eb1e25]" />
                  <span>{post.publishDate}</span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#002b5c] group-hover:text-[#eb1e25] leading-snug line-clamp-2 mb-3 transition-colors">
                  <Link href={`/blogs/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5 font-normal">
                  {post.excerpt}
                </p>
              </div>

              {/* Read More Footer CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#002b5c] group-hover:text-[#eb1e25] transition-all group-hover:gap-3"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  MAHALAXMI ENTERPRISES
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
