import type { Post } from '@/lib/blog/types'
import type { Locale } from '@/lib/i18n/config'

interface ArticleJsonLdProps {
  post: Post
  locale: Locale
}

export function ArticleJsonLd({ post, locale }: ArticleJsonLdProps) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imagetourl.cloud'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.coverImage
      ? post.frontmatter.coverImage.startsWith('http')
        ? post.frontmatter.coverImage
        : `${BASE_URL}${post.frontmatter.coverImage}`
      : `${BASE_URL}/og-image.png`,
    datePublished: post.frontmatter.publishedAt,
    dateModified:
      post.frontmatter.updatedAt || post.frontmatter.publishedAt,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author,
      url: `${BASE_URL}/${locale}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ImageToURL',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${locale}/blog/${post.slug}`,
    },
    wordCount: post.readingTime.words,
    articleSection: post.frontmatter.category,
    keywords: post.frontmatter.tags.join(', '),
    inLanguage: locale,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BlogListJsonLdProps {
  locale: Locale
  posts: Array<{
    slug: string
    frontmatter: {
      title: string
      description: string
      publishedAt: string
    }
  }>
}

export function BlogListJsonLd({ locale, posts }: BlogListJsonLdProps) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imagetourl.cloud'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ImageToURL Blog',
    description:
      'Tips, tutorials, and insights about image hosting and web development',
    url: `${BASE_URL}/${locale}/blog`,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'ImageToURL',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/android-chrome-512x512.png`,
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      datePublished: post.frontmatter.publishedAt,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
