"use client";

import React from "react";
import Link from "next/link";

interface BlogsBreadcrumbProps {
  postTitle?: string;
}

export default function BlogsBreadcrumb({ postTitle }: BlogsBreadcrumbProps) {
  return (
    <section className="bg-[#f8f9fa] border-b border-gray-200 py-2.5">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-xs md:text-sm text-gray-600 flex items-center gap-2 font-medium flex-wrap">
        <Link href="/" className="text-[#337ab7] hover:text-[#eb1e25] transition-colors">
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <Link href="/blogs" className={`hover:text-[#eb1e25] transition-colors ${!postTitle ? "text-[#eb1e25] font-semibold" : ""}`}>
          Blogs
        </Link>
        {postTitle && (
          <>
            <span className="text-gray-400">/</span>
            <span className="text-[#eb1e25] font-semibold truncate max-w-xs md:max-w-md">
              {postTitle}
            </span>
          </>
        )}
      </div>
    </section>
  );
}
