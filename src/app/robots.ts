import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://rgbtechagency.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Disallow API routes if any exist in the future
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
