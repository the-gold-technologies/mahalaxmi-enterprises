import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/store/useCMSStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto =
    request.headers.get("x-forwarded-proto") ||
    (host && host.includes("localhost") ? "http" : "https");
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || (host ? `${proto}://${host}` : "")).replace(
    /\/$/,
    "",
  );

  try {
    const apiUrl = getApiBaseUrl();
    const seoRes = await fetch(`${apiUrl}/api/seo`, {
      cache: "no-store",
    });
    const seoJson = seoRes.ok ? await seoRes.json() : null;
    const globalSEO = seoJson?.data;

    // 1. If sitemap is disabled in CMS
    if (globalSEO && globalSEO.sitemapEnabled === false) {
      return new NextResponse("Sitemap generation is disabled in CMS", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // 2. If custom uploaded XML file is provided in CMS and is a valid sitemap (<urlset or <sitemapindex)
    if (
      globalSEO?.sitemapCustomContent &&
      (globalSEO.sitemapCustomContent.includes("<urlset") ||
        globalSEO.sitemapCustomContent.includes("<sitemapindex"))
    ) {
      return new NextResponse(globalSEO.sitemapCustomContent.trim(), {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
        },
      });
    }

    // 3. Dynamic XML compilation from live pages, products, & blogs
    const now = new Date().toISOString();
    const urlsMap = new Map<
      string,
      { loc: string; lastmod: string; changefreq: string; priority: string }
    >();

    // Root home page
    urlsMap.set("/", {
      loc: `${origin}`,
      lastmod: now,
      changefreq: "daily",
      priority: "1.0",
    });

    // Fetch all dynamic pages from CMS (/api/seo/pages)
    try {
      const pagesRes = await fetch(`${apiUrl}/api/seo/pages`, {
        cache: "no-store",
      });
      if (pagesRes.ok) {
        const pagesJson = await pagesRes.json();
        const pagesList = Array.isArray(pagesJson?.data) ? pagesJson.data : [];

        for (const p of pagesList) {
          if (!p?.slug || p.slug === "home" || p.noIndex === true || p.visibility === "draft") {
            continue;
          }
          const cleanSlug = p.slug.startsWith("/") ? p.slug : `/${p.slug}`;
          const isCategory = p.type === "Category" || cleanSlug.startsWith("/products/");
          const isBlog = p.type === "Blog Article" || cleanSlug.startsWith("/blogs/");

          urlsMap.set(cleanSlug, {
            loc: `${origin}${cleanSlug}`,
            lastmod: now,
            changefreq: isBlog ? "weekly" : isCategory ? "weekly" : "monthly",
            priority: isCategory ? "0.8" : isBlog ? "0.7" : "0.8",
          });
        }
      }
    } catch (e) {
      console.error("Error fetching pages for sitemap:", e);
    }

    // Fallback static core pages if CMS pages weren't populated
    const fallbackStaticRoutes = [
      { path: "/about-us", priority: "0.8", changefreq: "weekly" },
      { path: "/products", priority: "0.8", changefreq: "weekly" },
      { path: "/events", priority: "0.7", changefreq: "weekly" },
      { path: "/blogs", priority: "0.8", changefreq: "daily" },
      { path: "/contact-us", priority: "0.8", changefreq: "weekly" },
      { path: "/privacy-policy", priority: "0.5", changefreq: "monthly" },
    ];
    for (const r of fallbackStaticRoutes) {
      if (!urlsMap.has(r.path)) {
        urlsMap.set(r.path, {
          loc: `${origin}${r.path}`,
          lastmod: now,
          changefreq: r.changefreq,
          priority: r.priority,
        });
      }
    }

    // Dynamic products & categories
    try {
      const prodRes = await fetch(`${apiUrl}/api/products`, {
        cache: "no-store",
      });
      if (prodRes.ok) {
        const prodJson = await prodRes.json();
        const categories = prodJson?.data?.categories || [];
        const products = prodJson?.data?.products || [];

        categories.forEach((cat: any) => {
          if (cat?.slug) {
            const path = `/products/${cat.slug}`;
            urlsMap.set(path, {
              loc: `${origin}${path}`,
              lastmod: now,
              changefreq: "weekly",
              priority: "0.8",
            });
          }
        });

        products.forEach((prod: any) => {
          if (prod?.categorySlug && prod?.slug) {
            const path = `/products/${prod.categorySlug}/${prod.slug}`;
            urlsMap.set(path, {
              loc: `${origin}${path}`,
              lastmod: prod.updatedAt ? new Date(prod.updatedAt).toISOString() : now,
              changefreq: "weekly",
              priority: "0.7",
            });
          }
        });
      }
    } catch (e) {
      console.error("Error fetching products for sitemap:", e);
    }

    // Dynamic blog articles
    try {
      const blogRes = await fetch(`${apiUrl}/api/blogs`, {
        cache: "no-store",
      });
      if (blogRes.ok) {
        const blogJson = await blogRes.json();
        const blogList = Array.isArray(blogJson?.data?.blogs)
          ? blogJson.data.blogs
          : Array.isArray(blogJson?.data)
            ? blogJson.data
            : [];

        blogList.forEach((b: any) => {
          if (b?.slug && b.isPublished !== false) {
            const path = `/blogs/${b.slug}`;
            urlsMap.set(path, {
              loc: `${origin}${path}`,
              lastmod: b.updatedAt ? new Date(b.updatedAt).toISOString() : now,
              changefreq: "weekly",
              priority: "0.7",
            });
          }
        });
      }
    } catch (e) {
      console.error("Error fetching blogs for sitemap:", e);
    }

    const urls = Array.from(urlsMap.values());

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod.split("T")[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (err: any) {
    console.error("Sitemap generation error:", err);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
