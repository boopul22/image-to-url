import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
// unstable_cache removed - data is read from pre-generated JSON in memory,
// no caching needed, and unstable_cache may not work on CF Workers
import type { Locale } from '@/lib/i18n/config'
import { defaultLocale } from '@/lib/i18n/config'
import type {
  Post,
  PostMeta,
  PostFrontmatter,
  PaginatedPosts,
  BlogCategory,
  BlogTag,
  TableOfContentsItem,
  FAQItem,
} from './types'

// Import pre-generated blog data for production/Cloudflare
import generatedPosts from './generated-posts.json'

const POSTS_PER_PAGE = 10
const CONTENT_PATH = path.join(process.cwd(), 'content', 'blog')

// Type for the generated JSON structure (relaxed for JSON compatibility)
type GeneratedPost = {
  slug: string
  locale: string
  frontmatter: Record<string, unknown>
  content: string
  readingTime: {
    text: string
    minutes: number
    words: number
  }
  headings: TableOfContentsItem[]
  faqItems: FAQItem[]
}

type GeneratedPostsData = {
  [locale: string]: GeneratedPost[]
}

// Cast the imported JSON to proper type
const blogData = generatedPosts as unknown as GeneratedPostsData

// Safe fs wrapper that returns null/empty when fs is not available
function safeReadFileSync(filePath: string): string | null {
  try {
    // Dynamic import to avoid bundling issues
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs')
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return null
  }
}

function safeExistsSync(filePath: string): boolean {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs')
    return fs.existsSync(filePath)
  } catch {
    return false
  }
}

function safeReaddirSync(dir: string): { name: string; isDirectory: () => boolean }[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs')
    if (!fs.existsSync(dir)) {
      return []
    }
    return fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return []
  }
}

/**
 * Get all MDX files from a directory recursively
 */
function getMdxFiles(dir: string): string[] {
  const files: string[] = []
  const entries = safeReaddirSync(dir)

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...getMdxFiles(fullPath))
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

/**
 * Extract headings from MDX content for table of contents
 * Excludes FAQ section headings since they are rendered separately
 */
export function extractHeadings(content: string): TableOfContentsItem[] {
  // Remove FAQ section before extracting headings
  const contentWithoutFAQ = content.replace(
    /\n---\s*\n##\s+(?:FAQ|Frequently Asked Questions|FAQ Section)[^\n]*\n[\s\S]*$/i,
    ''
  ).replace(
    /\n##\s+(?:FAQ|Frequently Asked Questions|FAQ Section)[^\n]*\n[\s\S]*$/i,
    ''
  )

  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const headings: TableOfContentsItem[] = []
  let match

  while ((match = headingRegex.exec(contentWithoutFAQ)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    headings.push({ id, title, level })
  }

  return headings
}

/**
 * Extract FAQ items from MDX content
 * Looks for FAQ section with numbered h3 headings containing questions
 */
export function extractFAQItems(content: string): FAQItem[] {
  const faqItems: FAQItem[] = []

  // Find the FAQ section - look for "## FAQ" or similar headers
  const faqSectionMatch = content.match(/##\s+(?:FAQ|Frequently Asked Questions|FAQ Section)[^\n]*\n([\s\S]*?)(?=\n##\s+[^#]|$)/i)

  if (!faqSectionMatch) {
    return faqItems
  }

  const faqContent = faqSectionMatch[1]

  // Match numbered questions (### 1. Question? or ### Question?)
  // And capture everything until the next h3 or end
  const questionRegex = /###\s+(?:\d+\.\s*)?(.+?\?)\s*\n([\s\S]*?)(?=\n###|\n##|$)/g
  let match

  while ((match = questionRegex.exec(faqContent)) !== null) {
    const question = match[1].trim()
    // Clean up the answer - remove extra whitespace and newlines
    const answer = match[2]
      .trim()
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')

    if (question && answer) {
      faqItems.push({ question, answer })
    }
  }

  return faqItems
}

/**
 * Parse a single MDX file into a Post object
 */
function parsePost(filePath: string, locale: Locale): Post | null {
  try {
    const fileContent = safeReadFileSync(filePath)
    if (!fileContent) return null

    const { data, content } = matter(fileContent)
    const frontmatter = data as PostFrontmatter

    // Skip drafts in production
    if (frontmatter.draft && process.env.NODE_ENV === 'production') {
      return null
    }

    const slug = path.basename(filePath).replace(/\.mdx?$/, '')
    const stats = readingTime(content)

    return {
      slug,
      locale,
      frontmatter,
      content,
      readingTime: {
        text: stats.text,
        minutes: Math.ceil(stats.minutes),
        words: stats.words,
      },
      headings: extractHeadings(content),
      faqItems: extractFAQItems(content),
    }
  } catch {
    return null
  }
}

/**
 * Parse a single MDX file into PostMeta (without content)
 */
function parsePostMeta(filePath: string, locale: Locale): PostMeta | null {
  try {
    const fileContent = safeReadFileSync(filePath)
    if (!fileContent) return null

    const { data, content } = matter(fileContent)
    const frontmatter = data as PostFrontmatter

    // Skip drafts in production
    if (frontmatter.draft && process.env.NODE_ENV === 'production') {
      return null
    }

    const slug = path.basename(filePath).replace(/\.mdx?$/, '')
    const stats = readingTime(content)

    return {
      slug,
      locale,
      frontmatter,
      readingTime: {
        text: stats.text,
        minutes: Math.ceil(stats.minutes),
      },
    }
  } catch {
    return null
  }
}

/**
 * Get posts from pre-generated JSON (for production/Cloudflare)
 */
function getPostsFromJson(locale: Locale): GeneratedPost[] {
  const localePosts = blogData[locale] || []
  const defaultPosts = locale !== defaultLocale ? (blogData[defaultLocale] || []) : []

  // Start with locale-specific posts
  const posts = [...localePosts]
  const seenSlugs = new Set(posts.map(p => p.slug))

  // Add fallback posts from default locale
  for (const post of defaultPosts) {
    if (!seenSlugs.has(post.slug)) {
      posts.push(post)
    }
  }

  // Sort by publishedAt descending
  return posts.sort((a, b) => {
    const publishedAtA = a.frontmatter.publishedAt as string | undefined
    const publishedAtB = b.frontmatter.publishedAt as string | undefined
    const dateA = publishedAtA ? new Date(publishedAtA).getTime() : 0
    const dateB = publishedAtB ? new Date(publishedAtB).getTime() : 0
    return dateB - dateA
  })
}

/**
 * Get all posts for a locale, with fallback to English
 * Uses pre-generated JSON data (works in both dev and production)
 */
export async function getAllPosts(locale: Locale): Promise<PostMeta[]> {
  const posts = getPostsFromJson(locale)

  // Convert to PostMeta (without content)
  return posts.map(post => ({
    slug: post.slug,
    locale: post.locale as Locale,
    frontmatter: post.frontmatter as unknown as PostFrontmatter,
    readingTime: {
      text: post.readingTime.text,
      minutes: post.readingTime.minutes,
    },
  }))
}

/**
 * Get a single post by slug with locale fallback
 * Uses pre-generated JSON data
 */
export async function getPostBySlug(slug: string, locale: Locale): Promise<Post | null> {
  const localePosts = blogData[locale] || []
  const defaultPosts = blogData[defaultLocale] || []

  // Try locale-specific first
  let post = localePosts.find(p => p.slug === slug)

  // Fallback to default locale
  if (!post && locale !== defaultLocale) {
    post = defaultPosts.find(p => p.slug === slug)
  }

  if (!post) return null

  // Return with proper typing
  return {
    slug: post.slug,
    locale: post.locale as Locale,
    frontmatter: post.frontmatter as unknown as PostFrontmatter,
    content: post.content,
    readingTime: post.readingTime,
    headings: post.headings,
    faqItems: post.faqItems,
  }
}

/**
 * Get paginated posts
 */
export async function getPaginatedPosts(
  locale: Locale,
  page: number = 1
): Promise<PaginatedPosts> {
  const allPosts = await getAllPosts(locale)
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (page - 1) * POSTS_PER_PAGE
  const posts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return {
    posts,
    totalPages,
    currentPage: page,
    totalPosts,
  }
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(
  category: string,
  locale: Locale
): Promise<PostMeta[]> {
  const allPosts = await getAllPosts(locale)
  return allPosts.filter(
    (post) => post.frontmatter.category?.toLowerCase() === category.toLowerCase()
  )
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(
  tag: string,
  locale: Locale
): Promise<PostMeta[]> {
  const allPosts = await getAllPosts(locale)
  return allPosts.filter((post) =>
    (post.frontmatter.tags || []).some((t) => t?.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(
  locale: Locale,
  limit: number = 3
): Promise<PostMeta[]> {
  const allPosts = await getAllPosts(locale)
  return allPosts.filter((post) => post.frontmatter.featured).slice(0, limit)
}

/**
 * Get related posts based on category and tags
 */
export async function getRelatedPosts(
  currentPost: Post | PostMeta,
  locale: Locale,
  limit: number = 3
): Promise<PostMeta[]> {
  const allPosts = await getAllPosts(locale)

  // Score posts by relevance
  const scored = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0

      // Same category = 2 points
      if (post.frontmatter.category === currentPost.frontmatter.category) {
        score += 2
      }

      // Each matching tag = 1 point
      const postTags = post.frontmatter.tags || []
      const currentTags = currentPost.frontmatter.tags || []
      const matchingTags = postTags.filter((tag) =>
        currentTags.includes(tag)
      )
      score += matchingTags.length

      return { post, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((item) => item.post)
}

/**
 * Get all categories with post counts
 */
export async function getAllCategories(locale: Locale): Promise<BlogCategory[]> {
  const allPosts = await getAllPosts(locale)
  const categoryMap = new Map<string, number>()

  for (const post of allPosts) {
    const category = post.frontmatter.category
    if (category) {
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
    }
  }

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get all tags with post counts
 */
export async function getAllTags(locale: Locale): Promise<BlogTag[]> {
  const allPosts = await getAllPosts(locale)
  const tagMap = new Map<string, number>()

  for (const post of allPosts) {
    const tags = post.frontmatter.tags || []
    for (const tag of tags) {
      if (tag) {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      }
    }
  }

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<
  { slug: string; locale: Locale }[]
> {
  const slugs: { slug: string; locale: Locale }[] = []
  const seenSlugs = new Set<string>()

  // Get all posts from pre-generated JSON
  const defaultPosts = blogData[defaultLocale] || []

  for (const post of defaultPosts) {
    if (!seenSlugs.has(post.slug)) {
      seenSlugs.add(post.slug)
      slugs.push({ slug: post.slug, locale: defaultLocale })
    }
  }

  return slugs
}

/**
 * Get total page count for pagination
 */
export async function getTotalPages(locale: Locale): Promise<number> {
  const allPosts = await getAllPosts(locale)
  return Math.ceil(allPosts.length / POSTS_PER_PAGE)
}
