import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/projects/', '/finance/', '/leads/'],
    },
    sitemap: 'https://devbasehq.xyz/sitemap.xml',
  };
}
