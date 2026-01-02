import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/lib/i18n/config'
import { getAllPosts } from '@/lib/blog/content'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imagetourl.cloud'

// Static list of public routes (excluding protected routes like /admin, /auth, /dashboard)
// This is required because filesystem scanning doesn't work on Vercel's serverless environment
const publicRoutes: string[] = [
  '', // home page
  '/about',
  '/blog',
  '/cookies',
  '/pricing',
  '/privacy',
  '/terms',
  // Tools routes
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
  // Use cases routes
  '/use-cases/discord',
  '/use-cases/espn-fantasy',
  '/use-cases/fantasy-sports',
  '/use-cases/html',
  '/use-cases/javascript',
  '/use-cases/minecraft',
  '/use-cases/nodejs',
  '/use-cases/python',
  '/use-cases/react',
  '/use-cases/sheets',
  '/use-cases/slack',
  '/use-cases/wordpress',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // Generate entries for each static route and locale
  for (const route of publicRoutes) {
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
  try {
    const posts = await getAllPosts(defaultLocale)

    for (const post of posts) {
      const route = `/blog/${post.slug}`

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
          lastModified: post.frontmatter.updatedAt
            ? new Date(post.frontmatter.updatedAt)
            : new Date(post.frontmatter.publishedAt),
          changeFrequency: 'monthly',
          priority: locale === defaultLocale ? 0.8 : 0.6,
          alternates: {
            languages,
          },
        })
      }
    }
  } catch (error) {
    // Blog content may not exist yet, continue without blog posts
    if (process.env.NODE_ENV === 'development') {
      console.log('Sitemap: No blog posts found or error loading posts')
    }
  }

  return entries
}

