import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/store/useCMSStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  let robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml`;

  try {
    const apiUrl = getApiBaseUrl();
    const res = await fetch(`${apiUrl}/api/seo`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.data?.robotsTxt && json.data.robotsTxt.trim()) {
        robotsContent = json.data.robotsTxt.trim();
        if (!robotsContent.toLowerCase().includes("sitemap:") && origin) {
          robotsContent += `\n\nSitemap: ${origin}/sitemap.xml`;
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
