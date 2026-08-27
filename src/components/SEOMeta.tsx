"use client";

import React, { useEffect } from "react";
import { useCMSStore, PageSEO } from "@/store/useCMSStore";

interface SEOMetaProps {
  pageSlug?: string;
  customSEO?: PageSEO | null;
  isLandingPage?: boolean;
}

export default function SEOMeta({
  pageSlug,
  customSEO,
  isLandingPage = false,
}: SEOMetaProps) {
  const { pageSEO, globalSEO, fetchGlobalSEO } = useCMSStore();

  useEffect(() => {
    fetchGlobalSEO().catch(console.error);
  }, [fetchGlobalSEO]);

  const activeSEO: PageSEO | null =
    customSEO || (pageSlug ? pageSEO[pageSlug] : null) || null;

  useEffect(() => {
    // 1. Determine Title & Description
    // Landing page strictly uses globalSEO (from /api/seo)
    // Other pages use that page's specific SEO from their own API
    const title = isLandingPage
      ? globalSEO?.siteTitle ||
        "Mahalaxmi Enterprises | HP Lubricants Distributor"
      : activeSEO?.metaTitle || activeSEO?.title || "Mahalaxmi Enterprises";

    document.title = title;

    // 2. Helper to set or create meta tags
    const setMetaTag = (
      attr: "name" | "property",
      key: string,
      content: string | null | undefined,
    ) => {
      if (!content) return;
      let tag = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
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

    // 3. Description & Keywords
    const description = isLandingPage
      ? globalSEO?.siteDescription ||
        "Authorized Industrial Lubricants Division (ILD) for Hindustan Petroleum Corporation Limited (HPCL)."
      : activeSEO?.metaDescription || "";

    const keywords =
      activeSEO?.targetKeywords ||
      "MAHALAXMI ENTERPRISES, Mahalaxmi Enterprises, HP Lubricants, Industrial Oils, Greases, Engine Oil Dealer, Baghpat, Uttar Pradesh";

    const currentUrl =
      activeSEO?.canonicalUrl ||
      (typeof window !== "undefined" ? window.location.href : "");

    const noIndex = Boolean(activeSEO?.noIndex);

    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag(
      "name",
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow",
    );

    if (currentUrl) {
      setLinkTag("canonical", currentUrl);
    }

    // 4. OpenGraph Tags
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
    if (currentUrl) setMetaTag("property", "og:url", currentUrl);
    setMetaTag(
      "property",
      "og:site_name",
      globalSEO?.siteTitle || "Mahalaxmi Enterprises",
    );
    if (globalSEO?.logo) {
      setMetaTag("property", "og:image", globalSEO.logo);
    }

    // 5. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    if (globalSEO?.logo) {
      setMetaTag("name", "twitter:image", globalSEO.logo);
    }

    // 6. Favicon Dynamic Update from Global SEO
    if (globalSEO?.favicon) {
      setLinkTag("icon", globalSEO.favicon);
      setLinkTag("shortcut icon", globalSEO.favicon);
    }

    // 7. Schema / JSON-LD structured data
    const schemaContent = activeSEO?.schema || globalSEO?.schema;
    if (schemaContent) {
      let scriptTag = document.getElementById("dynamic-json-ld");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "dynamic-json-ld";
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent =
        typeof schemaContent === "string"
          ? schemaContent
          : JSON.stringify(schemaContent);
    }

    // 8. Google Analytics Script Injection
    if (globalSEO?.googleAnalyticsId && typeof window !== "undefined") {
      const gaId = globalSEO.googleAnalyticsId;
      const scriptId = "google-analytics-script";
      if (!document.getElementById(scriptId)) {
        const gaScript = document.createElement("script");
        gaScript.id = scriptId;
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(gaScript);

        const gaInitScript = document.createElement("script");
        gaInitScript.id = "google-analytics-init";
        gaInitScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(gaInitScript);
      }
    }
  }, [activeSEO, globalSEO, isLandingPage, pageSlug]);

  return null;
}
