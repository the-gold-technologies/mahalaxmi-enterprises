"use client";

import React, { useState } from "react";
import Link from "next/link";
import { blogsData } from "../blogsData";

export default function BlogsContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredBlogs = blogsData.filter((post) => {
    return selectedCategory === "ALL" || post.category === selectedCategory;
  });

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Blog Grid matching exact screenshot layout, text colors, size and line-heights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {filteredBlogs.map((post) => (
          <div key={post.id} className="group flex flex-col font-sans">
            {/* Image with Hover Scale Zoom Effect */}
            <div className="w-full h-44 sm:h-48 md:h-52 overflow-hidden rounded bg-gray-100 mb-3">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://www.hplubricants.in/sites/default/files/blogs-banner.jpg";
                }}
              />
            </div>

            {/* Title - Exact 20px size & 26px line height with #337ab7 color */}
            <h3 className="text-[18px] md:text-[20px] font-bold text-[#337ab7] hover:text-[#23527c] hover:underline leading-[24px] md:leading-[26px] mb-2 transition-colors">
              <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
            </h3>

            {/* Summary Excerpt - Exact 14px size & 22px line height with #333333 color */}
            <p className="text-[13px] md:text-[14px] text-[#333333] leading-[20px] md:leading-[22px] font-sans line-clamp-3 mb-2">
              {post.excerpt}
            </p>

            {/* Read More Link - Exact 14px size & #337ab7 color */}
            <div className="pt-0.5">
              <Link
                href={`/blogs/${post.slug}`}
                className="text-[13px] md:text-[14px] text-[#337ab7] hover:text-[#23527c] hover:underline font-normal leading-[20px] transition-colors"
              >
                Read more...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
