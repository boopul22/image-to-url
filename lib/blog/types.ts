import type { Locale } from '@/lib/i18n/config'

export interface PostFrontmatter {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  author: string
  authorImage?: string
  category: string
  tags: string[]
  coverImage: string
  coverImageAlt: string
  featured?: boolean
  draft?: boolean
  canonicalUrl?: string
  seoTitle?: string
  seoDescription?: string
}

export interface Post {
  slug: string
  locale: Locale
  frontmatter: PostFrontmatter
  content: string
  readingTime: {
    text: string
    minutes: number
    words: number
  }
  headings: TableOfContentsItem[]
}

export interface PostMeta {
  slug: string
  locale: Locale
  frontmatter: PostFrontmatter
  readingTime: {
    text: string
    minutes: number
  }
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

export interface PaginatedPosts {
  posts: PostMeta[]
  totalPages: number
  currentPage: number
  totalPosts: number
}

export interface BlogCategory {
  slug: string
  name: string
  count: number
}

export interface BlogTag {
  slug: string
  name: string
  count: number
}

/**
 * Lightweight search index item - only essential fields for client-side search
 * This reduces data serialization by ~80% compared to passing full PostMeta
 */
export interface SearchIndexItem {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
}
