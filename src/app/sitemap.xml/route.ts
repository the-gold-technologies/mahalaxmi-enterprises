import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/store/useCMSStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "";
  try {
    const apiUrl = getApiBaseUrl();
    const seoRes = await fetch(`${apiUrl}/api/seo`, {
      next: { revalidate: 60 },
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

    // 2. If custom uploaded XML file is provided in CMS
    if (
      globalSEO?.sitemapCustomContent &&
      (globalSEO.sitemapCustomContent.trim().startsWith("<?xml") ||
        globalSEO.sitemapCustomContent.includes("<urlset"))
    ) {
      return new NextResponse(globalSEO.sitemapCustomContent.trim(), {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=60, s-maxage=60",
        },
      });
    }

    // 3. Dynamic XML compilation from live pages & blog posts
    const urls: Array<{
      loc: string;
      lastmod: string;
      changefreq: string;
      priority: string;
    }> = [
      {
        loc: `${origin}`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: "1.0",
      },
      {
        loc: `${origin}/about-us`,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: "0.8",
      },
      {
        loc: `${origin}/contact-us`,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: "0.8",
      },
      {
        loc: `${origin}/events`,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: "0.7",
      },
      {
        loc: `${origin}/blogs`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: "0.8",
      },
      {
        loc: `${origin}/privacy-policy`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: "0.5",
      },
    ];

    // Dynamic products & categories
    try {
      const prodRes = await fetch(`${apiUrl}/api/products`, {
        next: { revalidate: 60 },
      });
      if (prodRes.ok) {
        const prodJson = await prodRes.json();
        const categories = prodJson?.data?.categories || [];
        const products = prodJson?.data?.products || [];

        categories.forEach((cat: any) => {
          if (cat?.slug) {
            urls.push({
              loc: `${origin}/products/${cat.slug}`,
              lastmod: new Date().toISOString(),
              changefreq: "weekly",
              priority: "0.8",
            });
          }
        });

        products.forEach((prod: any) => {
          if (prod?.categorySlug && prod?.slug) {
            urls.push({
              loc: `${origin}/products/${prod.categorySlug}/${prod.slug}`,
              lastmod: new Date().toISOString(),
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
        next: { revalidate: 60 },
      });
      if (blogRes.ok) {
        const blogJson = await blogRes.json();
        const blogList = Array.isArray(blogJson?.data?.blogs)
          ? blogJson.data.blogs
          : Array.isArray(blogJson?.data)
            ? blogJson.data
            : [];

        blogList.forEach((b: any) => {
          if (b?.slug) {
            urls.push({
              loc: `${origin}/blogs/${b.slug}`,
              lastmod: b.updatedAt
                ? new Date(b.updatedAt).toISOString()
                : new Date().toISOString(),
              changefreq: "weekly",
              priority: "0.7",
            });
          }
        });
      }
    } catch (e) {
      console.error("Error fetching blogs for sitemap:", e);
    }

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
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    });
  } catch (err: any) {
    console.error("Sitemap generation error:", err);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
