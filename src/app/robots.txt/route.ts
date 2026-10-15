import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/store/useCMSStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Dynamically determine origin from request host or environment variable
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto =
    request.headers.get("x-forwarded-proto") ||
    (host && host.includes("localhost") ? "http" : "https");
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || (host ? `${proto}://${host}` : "")).replace(
    /\/$/,
    "",
  );

  let robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml`;

  try {
    const apiUrl = getApiBaseUrl();
    const res = await fetch(`${apiUrl}/api/seo`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json = await res.json();
      const globalConfig = json?.data;

      if (globalConfig?.robotsTxt && globalConfig.robotsTxt.trim()) {
        robotsContent = globalConfig.robotsTxt.trim();

        // Dynamically point any sitemap URL in robots.txt to current origin
        if (origin) {
          robotsContent = robotsContent.replace(
            /Sitemap:\s*https?:\/\/[^\s]+/gi,
            `Sitemap: ${origin}/sitemap.xml`,
          );
        }

        // If sitemap is enabled and not already listed, append it
        if (
          globalConfig.sitemapEnabled !== false &&
          origin &&
          !robotsContent.toLowerCase().includes("sitemap:")
        ) {
          robotsContent += `\n\nSitemap: ${origin}/sitemap.xml`;
        }

        // If sitemap is disabled in CMS, ensure no sitemap directive is advertised
        if (globalConfig.sitemapEnabled === false) {
          robotsContent = robotsContent
            .split("\n")
            .filter((line) => !line.trim().toLowerCase().startsWith("sitemap:"))
            .join("\n")
            .trim();
        }
      }
    }
  } catch (err) {
    console.error("Error fetching robots.txt from CMS:", err);
  }

  return new NextResponse(robotsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
