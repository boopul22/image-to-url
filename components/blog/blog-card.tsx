import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { PostMeta } from '@/lib/blog/types'
import type { Locale } from '@/lib/i18n/config'

interface BlogCardProps {
  post: PostMeta
  locale: Locale
  featured?: boolean
}

export function BlogCard({ post, locale, featured }: BlogCardProps) {
  const { frontmatter, slug, readingTime } = post
  const formattedDate = frontmatter.publishedAt
    ? new Date(frontmatter.publishedAt).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <article
      className={`group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-brand/5 ${
        featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Cover Image */}
      <Link
        href={`/${locale}/blog/${slug}`}
        className={`relative overflow-hidden ${
          featured ? 'md:w-1/2' : 'aspect-video'
        }`}
      >
        {frontmatter.coverImage ? (
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.coverImageAlt || frontmatter.title || 'Blog post'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <span className="text-4xl text-zinc-600">
              {frontmatter.title?.charAt(0) || 'B'}
            </span>
          </div>
        )}
        {frontmatter.featured && (
          <Badge className="absolute top-3 left-3 bg-brand text-white border-none">
            Featured
          </Badge>
        )}
      </Link>

      {/* Content */}
      <div className={`flex flex-col p-5 ${featured ? 'md:w-1/2 md:p-6' : ''}`}>
        {/* Category */}
        {frontmatter.category && (
          <Link
            href={`/${locale}/blog/category/${frontmatter.category.toLowerCase()}`}
            className="text-xs font-medium text-brand hover:text-brand/80 uppercase tracking-wide mb-2"
          >
            {frontmatter.category}
          </Link>
        )}

        {/* Title */}
        <Link href={`/${locale}/blog/${slug}`}>
          <h2
            className={`font-bold text-white group-hover:text-brand transition-colors line-clamp-2 ${
              featured ? 'text-xl md:text-2xl mb-3' : 'text-lg mb-2'
            }`}
          >
            {frontmatter.title || 'Untitled'}
          </h2>
        </Link>

        {/* Description */}
        <p
          className={`text-zinc-400 line-clamp-2 mb-4 ${
            featured ? 'text-base' : 'text-sm'
          }`}
        >
          {frontmatter.description}
        </p>

        {/* Meta */}
        <div className="mt-auto flex items-center gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {readingTime.text}
          </span>
        </div>

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/${locale}/blog/tag/${tag.toLowerCase()}`}
                className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Read More */}
        {featured && (
          <Link
            href={`/${locale}/blog/${slug}`}
            className="inline-flex items-center gap-1 text-brand hover:text-brand/80 text-sm font-medium mt-4 transition-colors"
          >
            Read more
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </article>
  )
}
