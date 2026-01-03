import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/lib/i18n/config'
import { getAllPosts } from '@/lib/blog/content'
import fs from 'fs'
import path from 'path'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imagetourl.cloud'

// Helper function to get subdirectories from a path
function getSubdirectories(dirPath: string): string[] {
  try {
    const fullPath = path.join(process.cwd(), dirPath)
    if (!fs.existsSync(fullPath)) {
      return []
    }
    return fs.readdirSync(fullPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  } catch {
    return []
  }
}

// Dynamically discover tools and use-cases pages
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

  // Dynamically get tools routes
  const toolsDirs = getSubdirectories('app/[locale]/tools')
  const toolsRoutes = toolsDirs.map(dir => `/tools/${dir}`)

  // Dynamically get use-cases routes
  const useCasesDirs = getSubdirectories('app/[locale]/use-cases')
  const useCasesRoutes = useCasesDirs.map(dir => `/use-cases/${dir}`)

  return [...staticRoutes, ...toolsRoutes, ...useCasesRoutes]
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

