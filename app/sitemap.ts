import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/lib/i18n/config'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imagetourl.cloud'

// Static list of tools pages (add new tools here)
const TOOLS_ROUTES = [
  '/tools/base64-to-url',
  '/tools/bulk-upload',
  '/tools/convert-image-to-link',
  '/tools/convert-picture-to-url',
  '/tools/create-image-url',
  '/tools/free-image-hosting',
  '/tools/gif-to-url',
  '/tools/image-embed-code',
  '/tools/image-link-generator',
  '/tools/image-to-data-url',
  '/tools/image-to-short-url',
  '/tools/jpeg-to-url',
  '/tools/jpg-to-url',
  '/tools/pdf-to-url',
  '/tools/photo-link-creator',
  '/tools/photo-to-url',
  '/tools/picture-to-link',
  '/tools/picture-url-maker',
  '/tools/png-to-url',
  '/tools/qr-to-url',
  '/tools/svg-to-url',
  '/tools/upload-image-to-url',
  '/tools/url-generator-for-image',
  '/tools/url-to-qr-code',
  '/tools/video-to-url',
  '/tools/webp-to-url',
]

// Static list of use-cases pages (add new use-cases here)
const USE_CASES_ROUTES = [
  '/use-cases/discord',
  '/use-cases/espn-fantasy',
  '/use-cases/fantasy-sports',
  '/use-cases/html',
  '/use-cases/javascript',
  '/use-cases/minecraft',
  '/use-cases/nodejs',
  '/use-cases/python',
  '/use-cases/react',
  '/use-cases/roblox',
  '/use-cases/telegram',
  '/use-cases/vrchat',
]

// Static list of blog posts (add new blog posts here)
const BLOG_POSTS = [
  'best-practices-image-to-url-cdn-delivery',
  // Add more blog post slugs as needed
]

function getPublicRoutes(): string[] {
  const staticRoutes = [
    '', // home page
    '/about',
    '/blog',
    '/cookies',
    '/pricing',
    '/privacy',
    '/terms',
  ]

  return [...staticRoutes, ...TOOLS_ROUTES, ...USE_CASES_ROUTES]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // Generate entries for each static route and locale
  for (const route of getPublicRoutes()) {
    for (const locale of locales) {
      const url = `${BASE_URL}/${locale}${route}`

      // Create language alternates for this route
      const languages: Record<string, string> = {}
      for (const altLocale of locales) {
        languages[altLocale] = `${BASE_URL}/${altLocale}${route}`
      }
      // Add x-default pointing to default locale
      languages['x-default'] = `${BASE_URL}/${defaultLocale}${route}`

      entries.push({
        url,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: locale === defaultLocale ? 1.0 : 0.8,
        alternates: {
          languages,
        },
      })
    }
  }

  // Add blog posts to sitemap
  for (const slug of BLOG_POSTS) {
    const route = `/blog/${slug}`

    for (const locale of locales) {
      const url = `${BASE_URL}/${locale}${route}`

      // Create language alternates for this blog post
      const languages: Record<string, string> = {}
      for (const altLocale of locales) {
        languages[altLocale] = `${BASE_URL}/${altLocale}${route}`
      }
      languages['x-default'] = `${BASE_URL}/${defaultLocale}${route}`

      entries.push({
        url,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: locale === defaultLocale ? 0.8 : 0.6,
        alternates: {
          languages,
        },
      })
    }
  }

  return entries
}
