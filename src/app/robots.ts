import { MetadataRoute } from 'next';
import { getApiBaseUrl } from '@/store/useCMSStore';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = 'https://mahalaxmilubricants.com';

  try {
    const apiUrl = getApiBaseUrl();
    const res = await fetch(`${apiUrl}/api/seo`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (data?.data?.robotsTxt) {
        // Return standard config if robotsTxt is defined in CMS
        return {
          rules: {
            userAgent: '*',
            allow: '/',
          },
          sitemap: `${baseUrl}/sitemap.xml`,
        };
      }
    }
  } catch (e) {
    console.error('Error fetching robots config from CMS:', e);
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
