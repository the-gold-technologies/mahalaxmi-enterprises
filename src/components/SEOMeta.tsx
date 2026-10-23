"use client";

import React, { useEffect, useMemo } from "react";
import Script from "next/script";
import { useCMSStore, PageSEO } from "@/store/useCMSStore";

interface SEOMetaProps {
  pageSlug?: string;
  isLandingPage?: boolean;
  customSEO?: PageSEO | null;
}

export default function SEOMeta({
  pageSlug = "home",
  isLandingPage = false,
  customSEO,
}: SEOMetaProps) {
  const { globalSEO, fetchGlobalSEO, pageSEO, pages, productDetails, blogPosts, products, blogs } =
    useCMSStore();

  const isHome = isLandingPage || pageSlug === "home";
  const activeSEO: PageSEO = customSEO?.metaTitle ? customSEO : pageSEO?.[pageSlug] || {};

  // Auto fetch global SEO if not loaded yet
  useEffect(() => {
    if (!globalSEO) {
      fetchGlobalSEO().catch(console.error);
    }
  }, [globalSEO, fetchGlobalSEO]);

  let title = activeSEO.metaTitle || "";
  if (isHome && !title) {
    title = globalSEO?.siteTitle || "";
  }

  let description = activeSEO.metaDescription || "";
  if (isHome && !description) {
    description = globalSEO?.siteDescription || "";
  }

  const keywords = activeSEO.targetKeywords || "";
  const currentUrl = (activeSEO.canonicalUrl || "").trim();

  // Derive JSON-LD Structured Data:
  // For home: use CMS globalSEO?.schema (or activeSEO?.schema) if provided; otherwise generate default Organization/WebSite schema.
  // For subpages: use CMS activeSEO?.schema if provided; otherwise generate default contextual page schema.
  const schemaString = useMemo(() => {
    let customSchema = activeSEO.schema || "";
    if (isHome && !customSchema) {
      customSchema = globalSEO?.schema || "";
    }
    const rawCustomSchema = customSchema.trim();

    if (rawCustomSchema) {
      const parsed = parseCustomSchema(rawCustomSchema);
      if (parsed) {
        return formatSchemaString(parsed);
      }
    }

    const generated = generatePageSchema({
      pageSlug,
      isLandingPage: isHome,
      activeSEO,
      globalSEO,
      pages,
      productDetails,
      blogPosts,
      products,
      blogs,
    });

    return formatSchemaString(generated);
  }, [isHome, globalSEO, activeSEO, pageSlug, pages, productDetails, blogPosts, products, blogs]);

  useEffect(() => {
    if (title) {
      document.title = title;
    }

    // 2. Helper to set or create meta tags
    const setMetaTag = (
      attr: "name" | "property",
      key: string,
      content: string | null | undefined,
    ) => {
      if (!content) return;
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
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

    if (description) {
      setMetaTag("name", "description", description);
    }
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }

    // Robots meta tag
    if (typeof activeSEO?.noIndex === "boolean") {
      setMetaTag("name", "robots", activeSEO.noIndex ? "noindex, nofollow" : "index, follow");
    }

    // Canonical link tag
    if (currentUrl) {
      setLinkTag("canonical", currentUrl);
    }

    // 4. OpenGraph Tags
    if (title) {
      setMetaTag("property", "og:title", title);
    }
    if (description) {
      setMetaTag("property", "og:description", description);
    }
    if (currentUrl) {
      setMetaTag("property", "og:url", currentUrl);
    }
    setMetaTag("property", "og:type", pageSlug?.startsWith("blogs/") ? "article" : "website");

    // Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    if (title) {
      setMetaTag("name", "twitter:title", title);
    }
    if (description) {
      setMetaTag("name", "twitter:description", description);
    }

    // 5. Google Search Console Verification
    if (globalSEO?.searchConsoleId) {
      let token = globalSEO.searchConsoleId.trim();
      const contentMatch = token.match(/content=["']([^"']+)["']/i);
      if (contentMatch) {
        token = contentMatch[1];
      }
      if (token) {
        setMetaTag("name", "google-site-verification", token);
      }
    }

    // 6. Favicon Dynamic Update from CMS Global Settings
    if (globalSEO?.favicon) {
      const fav = globalSEO.favicon.trim();
      if (fav) {
        setLinkTag("icon", fav);
        setLinkTag("shortcut icon", fav);
        setLinkTag("apple-touch-icon", fav);
      }
    }

    // 7. Structured Data (JSON-LD) DOM sync
    if (schemaString) {
      let scriptTag = document.getElementById("dynamic-json-ld");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "dynamic-json-ld";
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = schemaString;
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
    isHome,
    pageSlug,
    schemaString,
    title,
    description,
    keywords,
    currentUrl,
  ]);

  const rawGtmId = globalSEO?.gtmId?.trim();
  const gtmId = rawGtmId ? rawGtmId.match(/GTM-[A-Z0-9]+/i)?.[0] || rawGtmId : null;

  const rawGaId = globalSEO?.googleAnalyticsId?.trim();
  const gaId = rawGaId ? rawGaId.match(/(G-[A-Z0-9]+|UA-[0-9-]+)/i)?.[0] || rawGaId : null;

  return (
    <>
      {/* Native Head Meta Tags for SSR / Search Engine Crawlers */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {typeof activeSEO?.noIndex === "boolean" && (
        <meta name="robots" content={activeSEO.noIndex ? "noindex, nofollow" : "index, follow"} />
      )}
      {currentUrl && <link rel="canonical" href={currentUrl} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      <meta property="og:type" content={pageSlug?.startsWith("blogs/") ? "article" : "website"} />
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}

      {/* Structured Data (JSON-LD Schema Markup) */}
      {schemaString && (
        <script
          id="dynamic-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaString }}
        />
      )}

      {/* Google Tag Manager (GTM) Native Scripts */}
      {gtmId && (
        <>
          <Script
            id="google-tag-manager-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id=${gtmId}';f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics (GA4) Native Scripts */}
      {gaId && (
        <>
          <Script
            id="google-analytics-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}

/**
 * Safely parses raw schema strings which may contain script tag wrappers or malformed formatting
 */
function parseCustomSchema(raw: string): any {
  if (!raw) return null;
  const cleaned = raw.replace(/<\/?script[^>]*>/gi, "").trim();
  if (!cleaned) return null;
  try {
    return JSON.parse(cleaned);
  } catch {
    return cleaned;
  }
}

function formatSchemaString(schema: any): string {
  if (!schema) return "";
  if (typeof schema === "string") {
    try {
      const parsed = JSON.parse(schema);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return schema;
    }
  }
  try {
    return JSON.stringify(schema, null, 2);
  } catch {
    return "";
  }
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
  pageSlug: string;
  isLandingPage: boolean;
  activeSEO: PageSEO | null;
  globalSEO: any;
  pages: Record<string, any>;
  productDetails: Record<string, any>;
  blogPosts: Record<string, any>;
  products: any[] | null;
  blogs: any[] | null;
}) {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

  const companyName = globalSEO?.siteTitle || "Mahalaxmi Enterprises";
  const companyPhone = globalSEO?.phone || "+91 88007 78032";
  const companyEmail = globalSEO?.email || "info@hplubricantscfa.com";
  const companyAddress =
    globalSEO?.address || "Baghpat Region & Surrounding Industrial Belts, Uttar Pradesh, India";
  const companyLogo =
    globalSEO?.logo ||
    "https://res.cloudinary.com/lfsnye1i/image/upload/v1792748020/mahalaxmi-enterprises/footer/rnrmsenowtlzykcxuprr.webp";

  // Base Organization Schema Node
  const organizationNode: any = {
    "@type": ["LocalBusiness", "AutoPartsStore"],
    "@id": `${origin}/#organization`,
    name: companyName,
    alternateName: "HP Lubricants Distributor Mahalaxmi Enterprises",
    url: origin,
    logo: companyLogo,
    image: companyLogo,
    telephone: companyPhone,
    email: companyEmail,
    priceRange: "₹₹",
    description:
      globalSEO?.siteDescription ||
      "Authorized Industrial Lube Distributor (ILD) for Hindustan Petroleum Corporation Limited (HPCL).",
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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
        "Authorized Industrial Lube Distributor (ILD) for Hindustan Petroleum Corporation Limited (HPCL).",
      url: `${origin}/about-us`,
      mainEntity: {
        "@type": "Organization",
        name: "Mahalaxmi Enterprises",
        url: origin,
        logo: companyLogo,
        description: "Official distributor of HP Lubricants across Uttar Pradesh and Delhi-NCR.",
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
        headline: b.title || "",
        url: `${origin}/blogs/${b.slug || ""}`,
        datePublished: b.publishDate || b.createdAt || "",
        image: b.coverImage || companyLogo,
      })),
    };
  }

  // 7. Individual Blog Post Article Schema (`blogs/[slug]`)
  if (pageSlug.startsWith("blogs/")) {
    const blogSlug = pageSlug.replace("blogs/", "").trim();
    const post = blogPosts[blogSlug] || {};
    const fallbackTitle = blogSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const articleTitle = post.title || activeSEO?.metaTitle || fallbackTitle;
    const articleDesc = post.excerpt || activeSEO?.metaDescription || "";
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
      datePublished: post.publishDate || post.createdAt || "",
      author: {
        "@type": "Person",
        name: post.author || "",
      },
      publisher: organizationNode,
    };
  }

  // 8. Individual Product Detail Page Schema (`product:[slug]`)
  if (pageSlug.startsWith("product:")) {
    const prodSlug = pageSlug.replace("product:", "").trim();
    const product = productDetails[prodSlug] || {};
    const fallbackName = prodSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const prodName = product.name || activeSEO?.metaTitle || fallbackName;
    const prodDesc =
      product.description ||
      product.tagline ||
      activeSEO?.metaDescription ||
      `Buy genuine HPCL ${prodName} lubricants and oils from Mahalaxmi Enterprises.`;
    const prodImage = product.containerImage || product.image || companyLogo;

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
        availability: "https://schema.org/InStock",
        seller: organizationNode,
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
          name: p.name || "",
          url: `${origin}/products/${p.categorySlug || "industrial-oils"}/${p.slug || ""}`,
          image: p.containerImage || p.image || companyLogo,
        })),
      },
    };
  }

  // Generic WebPage Schema Fallback
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: activeSEO?.metaTitle || companyName,
    description: activeSEO?.metaDescription || "",
    url: `${origin}/${pageSlug}`,
  };
}

/**
 * Safely injects HTML containing script tags by transforming them into executable DOM Script elements
 */
function injectHtmlWithScripts(container: HTMLElement, rawHtml: string) {
  if (!rawHtml || !container) return;
  const trimmed = rawHtml.trim();
  if (!trimmed) return;
  if (container.dataset.renderedContent === trimmed) return;
  container.dataset.renderedContent = trimmed;
  container.innerHTML = trimmed;
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
