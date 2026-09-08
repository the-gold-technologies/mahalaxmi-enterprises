"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import BlogsBreadcrumb from "@/app/blogs/components/BlogsBreadcrumb";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Tag,
  CheckCircle2,
  Send,
} from "lucide-react";
import { useCMSStore, PageSEO } from "@/store/useCMSStore";
import SEOMeta from "@/components/SEOMeta";
import { isHindiActive, useLanguage } from "@/components/GoogleTranslator";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const language = useLanguage();

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const { blogPosts, blogs, fetchBlogBySlug, fetchBlogs } = useCMSStore();

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug).catch(console.error);
    }
    fetchBlogs().catch(console.error);
  }, [slug, fetchBlogBySlug, fetchBlogs]);

  const post: any = useMemo(() => {
    if (blogPosts[slug]) return blogPosts[slug];
    if (blogs && blogs.length > 0) {
      return blogs.find((b) => b.slug === slug) || null;
    }
    return null;
  }, [blogPosts, blogs, slug]);

  const relatedPosts = useMemo(() => {
    if (!blogs) return [];
    return blogs.filter((b) => b.slug !== slug).slice(0, 3);
  }, [blogs, slug]);

  const handleOpenEnquiry = (prodName?: string) => {
    if (prodName) setEnquiryProduct(prodName);
    else setEnquiryProduct(post?.title || "");
    setIsEnquiryOpen(true);
  };

  if (!post) {
    return (
      <main className="min-h-screen bg-white text-gray-800 font-sans flex flex-col justify-between">
        <Navbar
          fontSizeMultiplier={fontSizeMultiplier}
          setFontSizeMultiplier={setFontSizeMultiplier}
          language={language}
        />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-extrabold text-[#002b5c] mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The technical lubrication article you are looking for does not exist or has been relocated.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-[#002b5c] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#eb1e25] transition"
          >
            <ArrowLeft size={16} /> Return to All Technical Articles
          </Link>
        </div>
        <Footer onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      </main>
    );
  }

  // Handle both Structured JSON Content and WYSIWYG HTML Content from CMS Rich Text Editor
  const isStructuredContent = typeof post.content === "object" && post.content !== null;
  const intro = isStructuredContent ? post.content.intro : "";
  const sections = isStructuredContent && Array.isArray(post.content.sections) ? post.content.sections : [];
  const conclusion = isStructuredContent ? post.content.conclusion : "";
  const recommendedProducts = isStructuredContent ? post.content.recommendedProducts : (post.recommendedProducts || []);

  const rawHtmlContent = typeof post.content === "string" ? post.content : null;

  const articleRef = React.useRef<HTMLDivElement | null>(null);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (!rawHtmlContent) return;

    if (!isHindiActive()) {
      setContentReady(true);
      return;
    }

    // If article already contains Devanagari text, reveal immediately
    const currentText = articleRef.current?.textContent || "";
    if (/[\u0900-\u097F]/.test(currentText)) {
      setContentReady(true);
      return;
    }

    setContentReady(false);
    let active = true;
    const start = Date.now();

    const trigger = () => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (select && select.value !== "hi") {
        select.value = "hi";
        select.dispatchEvent(new Event("change"));
      }
    };

    trigger();
    const t1 = setTimeout(trigger, 30);

    const checkHindi = () => {
      if (!active) return;
      const el = articleRef.current;
      const text = el?.textContent || "";
      if (/[\u0900-\u097F]/.test(text) || Date.now() - start >= 450) {
        setContentReady(true);
        return;
      }
      requestAnimationFrame(checkHindi);
    };

    const observer = new MutationObserver(() => {
      const el = articleRef.current;
      const text = el?.textContent || "";
      if (/[\u0900-\u097F]/.test(text)) {
        setContentReady(true);
        observer.disconnect();
      }
    });

    if (articleRef.current) {
      observer.observe(articleRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    requestAnimationFrame(checkHindi);

    return () => {
      active = false;
      clearTimeout(t1);
      observer.disconnect();
    };
  }, [rawHtmlContent, language]);

  const blogSEO: PageSEO = useMemo(() => {
    return {
      title: post?.metaTitle || post?.title,
      metaTitle: post?.metaTitle || post?.title,
      metaDescription: post?.metaDescription || post?.excerpt,
      targetKeywords: post?.targetKeywords || post?.keywords,
      canonicalUrl: post?.canonicalUrl,
      schema: post?.schema,
    };
  }, [post]);

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans flex flex-col justify-between">
      <SEOMeta pageSlug={`blogs/${slug}`} customSEO={blogSEO} />

      {/* Header Navigation Bar */}
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
      />

      {/* Breadcrumb Navigation Bar */}
      <BlogsBreadcrumb postTitle={post.title} />

      {/* Main Blog Post Content Body */}
      <article className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14 w-full">
        {/* Category & Title */}
        <div className="mb-6">
          {post.category && (
            <span className="inline-block bg-[#eb1e25] text-white text-xs font-extrabold uppercase px-3.5 py-1.5 rounded shadow-xs mb-4 tracking-wider">
              {post.category}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#002b5c] leading-tight mb-5">
            {post.title}
          </h1>

          {/* Author & Publishing Meta */}
          <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-gray-500 pb-6 border-b border-gray-200 font-medium">
            {post.author && (
              <span className="flex items-center gap-1.5 text-gray-700 font-semibold">
                <User size={16} className="text-[#002b5c]" />
                {post.author}
              </span>
            )}
            {post.publishDate && (
              <span className="flex items-center gap-1.5">
                <Calendar size={16} className="text-[#002b5c]" />
                {post.publishDate}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={16} className="text-[#002b5c]" />
                {post.readTime}
              </span>
            )}
          </div>
        </div>

        {/* Feature Cover Image */}
        {post.coverImage && (
          <div className="w-full h-72 md:h-[480px] overflow-hidden rounded-2xl mb-10 shadow-md bg-gray-100">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Intro Highlight Box */}
        {intro && (
          <div className="bg-[#f8f9fa] border-l-4 border-[#002b5c] p-6 rounded-r-xl mb-10 text-gray-700 text-sm md:text-base leading-relaxed italic font-sans">
            &ldquo;{intro}&rdquo;
          </div>
        )}

        {/* Structured Sections (if available) */}
        {sections.length > 0 && (
          <div className="space-y-10 text-gray-800 text-sm md:text-base leading-relaxed font-sans mb-10">
            {sections.map((section: any, idx: number) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-[#002b5c] tracking-tight">
                  {section.heading}
                </h2>
                {section.paragraphs &&
                  section.paragraphs.map((p: string, pIdx: number) => (
                    <p key={pIdx} className="text-gray-700">
                      {p}
                    </p>
                  ))}

                {section.bulletPoints && (
                  <ul className="space-y-2.5 pt-2 pl-2">
                    {section.bulletPoints.map((point: string, bIdx: number) => (
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
        )}

        {/* Rich Text WYSIWYG HTML Content with Consistent Theme Typography */}
        {rawHtmlContent && (
          <div
            ref={articleRef}
            className={`blog-rich-content text-gray-800 text-sm md:text-base leading-relaxed font-sans space-y-5 mb-10 transition-opacity duration-200 ${
              !contentReady && isHindiActive() ? "opacity-0" : "opacity-100"
            }`}
            dangerouslySetInnerHTML={{ __html: rawHtmlContent }}
          />
        )}

        {/* Recommended Products Callout Box */}
        {recommendedProducts && recommendedProducts.length > 0 && (
          <div className="my-12 bg-gradient-to-r from-[#002b5c] to-[#004085] text-white rounded-2xl p-6 md:p-8 shadow-md">
            <h3 className="text-lg md:text-xl font-bold mb-3 flex items-center gap-2">
              <Tag size={20} className="text-[#eb1e25]" /> Recommended Industrial Lubricants
            </h3>
            <p className="text-xs md:text-sm text-gray-200 mb-4">
              Mahalaxmi Enterprises supplies genuine industrial lubricants for
              industrial & fleet operations across Baghpat and Uttar Pradesh.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {recommendedProducts.map((prod: string, pIdx: number) => (
                <button
                  key={pIdx}
                  onClick={() => handleOpenEnquiry(prod)}
                  className="bg-white text-[#002b5c] hover:bg-[#eb1e25] hover:text-white text-xs md:text-sm font-bold uppercase px-4 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
                >
                  Inquire {prod}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conclusion */}
        {conclusion && (
          <div className="pt-6 border-t border-gray-200 text-gray-700 text-sm md:text-base leading-relaxed mb-12">
            <h3 className="text-lg font-bold text-[#002b5c] mb-2">Conclusion</h3>
            <p>{conclusion}</p>
          </div>
        )}

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
            className="w-full sm:w-auto bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs md:text-sm font-bold uppercase px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
          >
            <Send size={16} /> Request Product Quotation
          </button>
        </div>

        {/* Related Articles Grid */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#002b5c] mb-6">
              Related Technical Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel: any) => (
                <div
                  key={rel.id}
                  className="group border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition"
                >
                  <div className="h-36 overflow-hidden bg-gray-100">
                    <img
                      src={rel.coverImage || "/blogs-banner.jpg"}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    {rel.category && (
                      <span className="text-[0.625rem] font-bold text-[#eb1e25] uppercase tracking-wider block mb-1">
                        {rel.category}
                      </span>
                    )}
                    <h4 className="text-xs md:text-sm font-bold text-[#002b5c] group-hover:text-[#eb1e25] line-clamp-2 transition-colors">
                      <Link href={`/blogs/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
