import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/studio',
          '/privacy/*',
          '/cookies/*',
          '/politique',
        ],
      },
    ],
    sitemap: 'https://proud-us-drip.vercel.app/sitemap.xml',
  }
}
