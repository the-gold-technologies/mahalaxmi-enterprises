"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import BlogsBreadcrumb from "@/app/blogs/components/BlogsBreadcrumb";
import { blogsData, BlogPost } from "../blogsData";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  CheckCircle2,
  Send,
  Share2,
  Tag,
} from "lucide-react";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  const post: BlogPost | undefined = blogsData.find((b) => b.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-white text-gray-800 font-sans flex flex-col justify-between">
        <Navbar
          fontSizeMultiplier={fontSizeMultiplier}
          setFontSizeMultiplier={setFontSizeMultiplier}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-extrabold text-[#002b5c] mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you are looking for does not exist or has been
            relocated.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-[#002b5c] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#eb1e25] transition"
          >
            <ArrowLeft size={16} /> Back to All Blogs
          </Link>
        </div>
        <Footer onOpenEnquiry={handleOpenEnquiry} />
      </main>
    );
  }

  const relatedPosts = blogsData
    .filter((b) => b.slug !== post.slug)
    .slice(0, 3);

  return (
    <main
      className="min-h-screen bg-white text-gray-800 font-sans"
      style={{
        fontSize: `${16 * fontSizeMultiplier}px`,
      }}
    >
      {/* Header Navigation Bar */}
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Breadcrumb */}
      <BlogsBreadcrumb postTitle={post.title} />

      {/* Main Article Container */}
      <article className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {/* Category & Title */}
        <div className="mb-6">
          <span className="inline-block bg-[#eb1e25] text-white text-xs font-extrabold uppercase px-3.5 py-1.5 rounded shadow-xs mb-4 tracking-wider">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#002b5c] leading-tight mb-5">
            {post.title}
          </h1>

          {/* Author & Publishing Meta */}
          <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-gray-500 pb-6 border-b border-gray-200 font-medium">
            <span className="flex items-center gap-1.5 text-gray-700 font-semibold">
              <User size={16} className="text-[#002b5c]" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} className="text-[#002b5c]" />
              {post.publishDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-[#002b5c]" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Feature Cover Image */}
        <div className="w-full h-72 md:h-[480px] overflow-hidden rounded-2xl mb-10 shadow-md bg-gray-100">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200";
            }}
          />
        </div>

        {/* Intro Highlight Box */}
        <div className="bg-[#f8f9fa] border-l-4 border-[#002b5c] p-6 rounded-r-xl mb-10 text-gray-700 text-sm md:text-base leading-relaxed italic font-sans">
          "{post.content.intro}"
        </div>

        {/* Article Sections */}
        <div className="space-y-10 text-gray-800 text-sm md:text-base leading-relaxed font-sans">
          {post.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#002b5c] tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-gray-700">
                  {p}
                </p>
              ))}

              {section.bulletPoints && (
                <ul className="space-y-2.5 pt-2 pl-2">
                  {section.bulletPoints.map((point, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-[#eb1e25] shrink-0 mt-1"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Recommended Products Callout Box */}
        {post.content.recommendedProducts && (
          <div className="my-12 bg-gradient-to-r from-[#002b5c] to-[#004085] text-white rounded-2xl p-6 md:p-8 shadow-md">
            <h3 className="text-lg md:text-xl font-bold mb-3 flex items-center gap-2">
              <Tag size={20} className="text-[#eb1e25]" /> Recommended HP
              Lubricants
            </h3>
            <p className="text-xs md:text-sm text-gray-200 mb-4">
              Mahalaxmi Enterprises supplies genuine HP Lubricants for
              industrial & fleet operations across Baghpat and Uttar Pradesh.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {post.content.recommendedProducts.map((prod, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleOpenEnquiry(prod)}
                  className="bg-white text-[#002b5c] hover:bg-[#eb1e25] hover:text-white text-xs md:text-sm font-bold uppercase px-4 py-2 rounded-lg transition-all shadow-xs"
                >
                  Inquire {prod}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conclusion */}
        <div className="pt-6 border-t border-gray-200 text-gray-700 text-sm md:text-base leading-relaxed mb-12">
          <h3 className="text-lg font-bold text-[#002b5c] mb-2">Conclusion</h3>
          <p>{post.content.conclusion}</p>
        </div>

        {/* Action Buttons: Back to blogs & Quick Enquiry */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#f8f9fa] border border-gray-200 rounded-xl mb-16">
          <Link
            href="/blogs"
            className="text-xs md:text-sm font-bold text-[#002b5c] hover:text-[#eb1e25] flex items-center gap-2 uppercase tracking-wide transition-colors"
          >
            <ArrowLeft size={16} /> Return to All Blogs
          </Link>
          <button
            onClick={() => handleOpenEnquiry(post.title)}
            className="w-full sm:w-auto bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs md:text-sm font-bold uppercase px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition"
          >
            <Send size={16} /> Request Product Quotation
          </button>
        </div>

        {/* Related Articles Grid */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#002b5c] mb-6">
            Related Technical Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                className="group border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition"
              >
                <div className="h-36 overflow-hidden bg-gray-100">
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-[#eb1e25] uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-xs md:text-sm font-bold text-[#002b5c] group-hover:text-[#eb1e25] line-clamp-2 transition-colors">
                    <Link href={`/blogs/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Footer & Enquiry Modal */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />
    </main>
  );
}
