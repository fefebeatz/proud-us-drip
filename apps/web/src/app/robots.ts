import { MetadataRoute } from 'next'
import { userAgent } from 'next/server'

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
