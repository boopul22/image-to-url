import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { unstable_cache } from 'next/cache'
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

const POSTS_PER_PAGE = 10
const CONTENT_PATH = path.join(process.cwd(), 'content', 'blog')

/**
 * Get all MDX files from a directory recursively
 */
function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

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
    const fileContent = fs.readFileSync(filePath, 'utf-8')
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
    const fileContent = fs.readFileSync(filePath, 'utf-8')
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
 * Get all posts for a locale, with fallback to English
 */
export const getAllPosts = unstable_cache(
  async (locale: Locale): Promise<PostMeta[]> => {
    const localePath = path.join(CONTENT_PATH, locale)
    const defaultLocalePath = path.join(CONTENT_PATH, defaultLocale)

    const posts: PostMeta[] = []
    const seenSlugs = new Set<string>()

    // First, get posts from requested locale
    const localeFiles = getMdxFiles(localePath)
    for (const file of localeFiles) {
      const post = parsePostMeta(file, locale)
      if (post) {
        posts.push(post)
        seenSlugs.add(post.slug)
      }
    }

    // Then, add English posts that don't exist in requested locale
    if (locale !== defaultLocale) {
      const defaultFiles = getMdxFiles(defaultLocalePath)
      for (const file of defaultFiles) {
        const slug = path.basename(file).replace(/\.mdx?$/, '')
        if (!seenSlugs.has(slug)) {
          const post = parsePostMeta(file, defaultLocale)
          if (post) {
            posts.push(post)
          }
        }
      }
    }

    // Sort by publishedAt descending
    return posts.sort((a, b) => {
      const dateA = a.frontmatter.publishedAt ? new Date(a.frontmatter.publishedAt).getTime() : 0
      const dateB = b.frontmatter.publishedAt ? new Date(b.frontmatter.publishedAt).getTime() : 0
      return dateB - dateA
    })
  },
  ['blog-posts'],
  { revalidate: 3600, tags: ['blog'] }
)

/**
 * Get a single post by slug with locale fallback
 */
export const getPostBySlug = unstable_cache(
  async (slug: string, locale: Locale): Promise<Post | null> => {
    // Try requested locale first
    const localePath = path.join(CONTENT_PATH, locale, `${slug}.mdx`)
    const localePathMd = path.join(CONTENT_PATH, locale, `${slug}.md`)

    if (fs.existsSync(localePath)) {
      return parsePost(localePath, locale)
    }
    if (fs.existsSync(localePathMd)) {
      return parsePost(localePathMd, locale)
    }

    // Fallback to English
    if (locale !== defaultLocale) {
      const defaultPath = path.join(CONTENT_PATH, defaultLocale, `${slug}.mdx`)
      const defaultPathMd = path.join(CONTENT_PATH, defaultLocale, `${slug}.md`)

      if (fs.existsSync(defaultPath)) {
        return parsePost(defaultPath, defaultLocale)
      }
      if (fs.existsSync(defaultPathMd)) {
        return parsePost(defaultPathMd, defaultLocale)
      }
    }

    return null
  },
  ['blog-post'],
  { revalidate: 3600, tags: ['blog'] }
)

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

  // Get all posts from English (default) first
  const defaultPath = path.join(CONTENT_PATH, defaultLocale)
  const defaultFiles = getMdxFiles(defaultPath)

  for (const file of defaultFiles) {
    const slug = path.basename(file).replace(/\.mdx?$/, '')
    if (!seenSlugs.has(slug)) {
      seenSlugs.add(slug)
      slugs.push({ slug, locale: defaultLocale })
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
