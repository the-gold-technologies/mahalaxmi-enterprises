"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { useCMSStore, PageSEO } from "@/store/useCMSStore";

interface SEOMetaProps {
  pageSlug?: string;
  isLandingPage?: boolean;
  customSEO?: PageSEO | null;
}

export default function SEOMeta({
  pageSlug,
  isLandingPage = false,
  customSEO,
}: SEOMetaProps) {
  const {
    globalSEO,
    pageSEO,
    pages,
    productDetails,
    blogPosts,
    products,
    blogs,
  } = useCMSStore();

  const activeSEO: PageSEO | null =
    customSEO || (pageSlug ? pageSEO[pageSlug] : null) || null;

  useEffect(() => {
    // 1. Determine Title & Description strictly from CMS data
    const title = isLandingPage
      ? globalSEO?.siteTitle || "Mahalaxmi Enterprises | HP Lubricants Distributor"
      : activeSEO?.metaTitle ||
        activeSEO?.title ||
        globalSEO?.siteTitle ||
        "Mahalaxmi Enterprises";

    if (title) {
      document.title = title;
    }

    // 2. Helper to set or create meta tags
    const setMetaTag = (
      attr: "name" | "property",
      key: string,
      content: string | null | undefined
    ) => {
      if (!content) return;
      let tag = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Helper to set or create link tags
    const setLinkTag = (rel: string, href: string | null | undefined) => {
      if (!href) return;
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    // 3. Description & Keywords strictly from CMS
    const description = isLandingPage
      ? globalSEO?.siteDescription ||
        "Authorized Industrial Lubricants Division (ILD) for HPCL lubricants, engine oils, greases, and fluids."
      : activeSEO?.metaDescription || globalSEO?.siteDescription || "";

    const keywords =
      activeSEO?.targetKeywords ||
      "Mahalaxmi Enterprises, HPCL, HP Lubricants, Industrial Oils, Greases, Engine Oil Dealer, Baghpat, Uttar Pradesh";

    const currentUrl =
      activeSEO?.canonicalUrl ||
      (typeof window !== "undefined" ? window.location.href : "");

    if (description) {
      setMetaTag("name", "description", description);
    }
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }
    if (typeof activeSEO?.noIndex === "boolean") {
      setMetaTag(
        "name",
        "robots",
        activeSEO.noIndex ? "noindex, nofollow" : "index, follow"
      );
    }

    if (currentUrl) {
      setLinkTag("canonical", currentUrl);
      setMetaTag("property", "og:url", currentUrl);
    }

    // 4. OpenGraph & Twitter Tags
    if (title) {
      setMetaTag("property", "og:title", title);
      setMetaTag("name", "twitter:title", title);
    }
    if (description) {
      setMetaTag("property", "og:description", description);
      setMetaTag("name", "twitter:description", description);
    }
    setMetaTag("property", "og:type", pageSlug?.startsWith("blogs/") ? "article" : "website");
    setMetaTag("name", "twitter:card", "summary_large_image");

    if (globalSEO?.siteTitle) {
      setMetaTag("property", "og:site_name", globalSEO.siteTitle);
    }
    if (globalSEO?.logo) {
      setMetaTag("property", "og:image", globalSEO.logo);
      setMetaTag("name", "twitter:image", globalSEO.logo);
    }

    // 5. Google Search Console Verification
    if (globalSEO?.searchConsoleId) {
      setMetaTag(
        "name",
        "google-site-verification",
        globalSEO.searchConsoleId
      );
    }

    // 6. Favicon Dynamic Update
    if (globalSEO?.favicon) {
      setLinkTag("icon", globalSEO.favicon);
      setLinkTag("shortcut icon", globalSEO.favicon);
      setLinkTag("apple-touch-icon", globalSEO.favicon);
    }

    // 7. Structured Data (JSON-LD) - Dynamic per page content with custom override
    let finalSchema: any = null;
    const rawCustomSchema = activeSEO?.schema?.trim();

    if (rawCustomSchema) {
      try {
        const cleaned = rawCustomSchema.replace(/<\/?script[^>]*>/gi, "").trim();
        finalSchema = JSON.parse(cleaned);
      } catch {
        finalSchema = rawCustomSchema.replace(/<\/?script[^>]*>/gi, "").trim();
      }
    } else {
      // Automatically generate contextual JSON-LD structured data for this page
      finalSchema = generatePageSchema({
        pageSlug,
        isLandingPage,
        activeSEO,
        globalSEO,
        pages,
        productDetails,
        blogPosts,
        products,
        blogs,
      });
    }

    if (finalSchema) {
      let scriptTag = document.getElementById("dynamic-json-ld");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "dynamic-json-ld";
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent =
        typeof finalSchema === "string"
          ? finalSchema
          : JSON.stringify(finalSchema, null, 2);
    } else {
      const existingScript = document.getElementById("dynamic-json-ld");
      if (existingScript) {
        existingScript.remove();
      }
    }

    // 8. Execute GA & GTM in window context
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      if (globalSEO?.googleAnalyticsId) {
        if (!(window as any).gtag) {
          (window as any).gtag = function () {
            (window as any).dataLayer.push(arguments);
          };
          (window as any).gtag("js", new Date());
        }
        (window as any).gtag("config", globalSEO.googleAnalyticsId, {
          page_path: window.location.pathname,
          page_title: title,
        });
      }

      if (globalSEO?.gtmId) {
        (window as any).dataLayer.push({
          event: "pageview",
          page: window.location.pathname,
          title: title,
        });
      }
    }

    // 9. Custom Header Scripts
    if (globalSEO?.customHeaderScripts && typeof window !== "undefined") {
      const headerScriptId = "cms-custom-header-scripts";
      let container = document.getElementById(headerScriptId);
      if (!container) {
        container = document.createElement("div");
        container.id = headerScriptId;
        document.head.appendChild(container);
        injectHtmlWithScripts(container, globalSEO.customHeaderScripts);
      }
    }

    // 10. Custom Footer Scripts
    if (globalSEO?.customFooterScripts && typeof window !== "undefined") {
      const footerScriptId = "cms-custom-footer-scripts";
      let container = document.getElementById(footerScriptId);
      if (!container) {
        container = document.createElement("div");
        container.id = footerScriptId;
        document.body.appendChild(container);
        injectHtmlWithScripts(container, globalSEO.customFooterScripts);
      }
    }
  }, [
    activeSEO,
    globalSEO,
    isLandingPage,
    pageSlug,
    pages,
    productDetails,
    blogPosts,
    products,
    blogs,
  ]);

  return (
    <>
      {/* Google Tag Manager (GTM) Native Scripts */}
      {globalSEO?.gtmId && (
        <>
          <Script
            id="google-tag-manager-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${globalSEO.gtmId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${globalSEO.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics (GA4) Native Scripts */}
      {globalSEO?.googleAnalyticsId && (
        <>
          <Script
            id="google-analytics-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${globalSEO.googleAnalyticsId}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${globalSEO.googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}

/**
 * Builds standard Google-compliant Schema.org JSON-LD structured data for each page
 */
function generatePageSchema({
  pageSlug,
  isLandingPage,
  activeSEO,
  globalSEO,
  pages,
  productDetails,
  blogPosts,
  products,
  blogs,
}: {
  pageSlug?: string;
  isLandingPage?: boolean;
  activeSEO: PageSEO | null;
  globalSEO: any;
  pages: Record<string, any>;
  productDetails: Record<string, any>;
  blogPosts: Record<string, any>;
  products: any[] | null;
  blogs: any[] | null;
}) {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://mahalaxmilubricants.com";

  const companyName = globalSEO?.siteTitle || "Mahalaxmi Enterprises";
  const companyPhone = globalSEO?.phone || "+91 98765 43210";
  const companyEmail = globalSEO?.email || "sales@mahalaxmienterprises.com";
  const companyAddress =
    globalSEO?.address ||
    "Baghpat Region & Surrounding Industrial Belts, Uttar Pradesh, India";
  const companyLogo =
    globalSEO?.logo ||
    "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/footer/rnrmsenowtlzykcxuprr.jpg";

  // Base Organization Schema Node
  const organizationNode = {
    "@type": ["LocalBusiness", "AutoPartsStore"],
    "@id": `${origin}/#organization`,
    name: "Mahalaxmi Enterprises",
    alternateName: "HP Lubricants Distributor Mahalaxmi Enterprises",
    url: origin,
    logo: companyLogo,
    image: companyLogo,
    telephone: companyPhone,
    email: companyEmail,
    priceRange: "₹₹",
    description:
      globalSEO?.siteDescription ||
      "Authorized Industrial Lubricants Division (ILD) for Hindustan Petroleum Corporation Limited (HPCL).",
    address: {
      "@type": "PostalAddress",
      streetAddress: companyAddress,
      addressLocality: "Baghpat",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
  };

  // 1. Home / Landing Page Schema
  if (isLandingPage || pageSlug === "home" || !pageSlug) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        organizationNode,
        {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          url: origin,
          name: companyName,
          description: globalSEO?.siteDescription || "",
          publisher: { "@id": `${origin}/#organization` },
          potentialAction: {
            "@type": "SearchAction",
            target: `${origin}/products?search={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
      ],
    };
  }

  // 2. About Us Page Schema
  if (pageSlug === "about-us") {
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: activeSEO?.metaTitle || "About Us | Mahalaxmi Enterprises",
      description:
        activeSEO?.metaDescription ||
        "Authorized Industrial Lubricants Division (ILD) for Hindustan Petroleum Corporation Limited (HPCL).",
      url: `${origin}/about-us`,
      mainEntity: {
        "@type": "Organization",
        name: "Mahalaxmi Enterprises",
        url: origin,
        logo: companyLogo,
        description:
          "Official distributor of HP Lubricants across Uttar Pradesh and Delhi-NCR.",
        parentOrganization: {
          "@type": "Organization",
          name: "Hindustan Petroleum Corporation Limited (HPCL)",
        },
      },
    };
  }

  // 3. Contact Us Page Schema
  if (pageSlug === "contact-us") {
    return {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: activeSEO?.metaTitle || "Contact Us | Mahalaxmi Enterprises",
      description:
        activeSEO?.metaDescription ||
        "Get in touch with Mahalaxmi Enterprises for bulk industrial oils, greases, and HPCL dealership enquiries.",
      url: `${origin}/contact-us`,
      mainEntity: organizationNode,
    };
  }

  // 4. Privacy Policy Page Schema
  if (pageSlug === "privacy-policy") {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: activeSEO?.metaTitle || "Privacy Policy | Mahalaxmi Enterprises",
      description:
        activeSEO?.metaDescription ||
        "Read the Privacy Policy of Mahalaxmi Enterprises HPCL Lubricants distribution.",
      url: `${origin}/privacy-policy`,
    };
  }

  // 5. Events & Gallery Page Schema
  if (pageSlug === "events") {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: activeSEO?.metaTitle || "Events & Gallery | Mahalaxmi Enterprises",
      description:
        activeSEO?.metaDescription ||
        "Explore HPCL industrial meets, dealer conventions, exhibitions, and technical lubrication seminars.",
      url: `${origin}/events`,
    };
  }

  // 6. Blogs Main Index Page Schema
  if (pageSlug === "blogs") {
    const blogList = Array.isArray(blogs) ? blogs.slice(0, 10) : [];
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: activeSEO?.metaTitle || "Industrial Lubrication Insights & Blog",
      description:
        activeSEO?.metaDescription ||
        "Technical guides, automotive lubrication tips, and industrial oil insights from Mahalaxmi Enterprises.",
      url: `${origin}/blogs`,
      blogPost: blogList.map((b: any) => ({
        "@type": "BlogPosting",
        headline: b.title,
        url: `${origin}/blogs/${b.slug}`,
        datePublished: b.publishDate || b.createdAt,
        image: b.coverImage || companyLogo,
      })),
    };
  }

  // 7. Individual Blog Post Article Schema (`blogs/[slug]`)
  if (pageSlug.startsWith("blogs/")) {
    const blogSlug = pageSlug.replace("blogs/", "").trim();
    const post = blogPosts[blogSlug] || {};
    const articleTitle = post.title || activeSEO?.metaTitle || "Technical Article";
    const articleDesc =
      post.excerpt ||
      activeSEO?.metaDescription ||
      `Technical article on ${articleTitle}`;
    const articleImage = post.coverImage || companyLogo;

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${origin}/blogs/${blogSlug}`,
      },
      headline: articleTitle,
      description: articleDesc,
      image: articleImage,
      datePublished: post.publishDate || post.createdAt || new Date().toISOString(),
      author: {
        "@type": "Person",
        name: post.author || "HPCL Technical Lubricants Team",
      },
      publisher: {
        "@type": "Organization",
        name: "Mahalaxmi Enterprises",
        logo: {
          "@type": "ImageObject",
          url: companyLogo,
        },
      },
    };
  }

  // 8. Individual Product Detail Page Schema (`product:[slug]`)
  if (pageSlug.startsWith("product:")) {
    const prodSlug = pageSlug.replace("product:", "").trim();
    const product = productDetails[prodSlug] || {};
    const prodName = product.name || activeSEO?.metaTitle || "Industrial Lubricant";
    const prodDesc =
      product.description ||
      product.tagline ||
      activeSEO?.metaDescription ||
      `Buy genuine HPCL ${prodName} lubricants and oils from Mahalaxmi Enterprises.`;
    const prodImage = product.image || companyLogo;

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: prodName,
      image: prodImage,
      description: prodDesc,
      brand: {
        "@type": "Brand",
        name: "HP Lubricants (HPCL)",
      },
      category: product.categorySlug || "Industrial Lubricants",
      sku: product.slug || prodSlug,
      offers: {
        "@type": "Offer",
        url: `${origin}/products/${product.categorySlug || "industrial-oils"}/${prodSlug}`,
        priceCurrency: "INR",
        price: "0",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Mahalaxmi Enterprises",
        },
      },
    };
  }

  // 9. Products Catalog / Category Listing Schema
  if (pageSlug === "products" || pageSlug.startsWith("products/")) {
    const prodList = Array.isArray(products) ? products.slice(0, 20) : [];
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: activeSEO?.metaTitle || "Industrial Lubricants & Oils Catalog",
      description:
        activeSEO?.metaDescription ||
        "Browse the full catalogue of genuine HPCL engine oils, gear oils, hydraulic oils, and greases.",
      url: `${origin}/${pageSlug}`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: prodList.map((p: any, idx: number) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: p.name,
          url: `${origin}/products/${p.categorySlug || "industrial-oils"}/${p.slug}`,
          image: p.image || companyLogo,
        })),
      },
    };
  }

  // Generic WebPage Schema Fallback
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: activeSEO?.metaTitle || companyName,
    description: activeSEO?.metaDescription || globalSEO?.siteDescription || "",
    url: `${origin}/${pageSlug}`,
  };
}

/**
 * Safely injects HTML containing script tags by transforming them into executable DOM Script elements
 */
function injectHtmlWithScripts(container: HTMLElement, rawHtml: string) {
  if (!rawHtml || !container) return;
  container.innerHTML = rawHtml;
  const scripts = Array.from(container.querySelectorAll("script"));
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes).forEach((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    });
    if (oldScript.innerHTML) {
      newScript.innerHTML = oldScript.innerHTML;
    }
    oldScript.parentNode?.replaceChild(newScript, oldScript);
  });
}
