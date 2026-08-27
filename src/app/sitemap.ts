import { MetadataRoute } from 'next';
import { getApiBaseUrl } from '@/store/useCMSStore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://mahalaxmilubricants.com';

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    const apiUrl = getApiBaseUrl();

    // 1. Fetch dynamic products & categories
    const prodRes = await fetch(`${apiUrl}/api/products`, {
      next: { revalidate: 3600 },
    });
    if (prodRes.ok) {
      const prodJson = await prodRes.json();
      const categories = prodJson?.data?.categories || [];
      const products = prodJson?.data?.products || [];

      categories.forEach((cat: any) => {
        if (cat?.slug) {
          routes.push({
            url: `${siteUrl}/products/${cat.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      });

      products.forEach((prod: any) => {
        if (prod?.categorySlug && prod?.slug) {
          routes.push({
            url: `${siteUrl}/products/${prod.categorySlug}/${prod.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      });
    }

    // 2. Fetch dynamic blog posts
    const blogRes = await fetch(`${apiUrl}/api/blogs`, {
      next: { revalidate: 3600 },
    });
    if (blogRes.ok) {
      const blogJson = await blogRes.json();
      const blogs = blogJson?.data || [];
      blogs.forEach((b: any) => {
        if (b?.slug) {
          routes.push({
            url: `${siteUrl}/blogs/${b.slug}`,
            lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      });
    }
  } catch (e) {
    console.error('Error generating dynamic sitemap from CMS:', e);
  }

  return routes;
}
