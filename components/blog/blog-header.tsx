import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Post } from '@/lib/blog/types'
import type { Locale } from '@/lib/i18n/config'

interface BlogHeaderProps {
  post: Post
  locale: Locale
}

export function BlogHeader({ post, locale }: BlogHeaderProps) {
  const { frontmatter, readingTime } = post
  const formattedDate = new Date(frontmatter.publishedAt).toLocaleDateString(
    locale,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  return (
    <header className="mb-4 sm:mb-6">
      {/* Breadcrumb - hidden on very small screens */}
      <nav className="hidden sm:flex items-center gap-2 text-sm text-zinc-500 mb-4 sm:mb-6">
        <Link href={`/${locale}`} className="hover:text-zinc-300 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={`/${locale}/blog`} className="hover:text-zinc-300 transition-colors">
          Blog
        </Link>
        <span>/</span>
        <Link
          href={`/${locale}/blog/category/${frontmatter.category.toLowerCase()}`}
          className="hover:text-zinc-300 transition-colors"
        >
          {frontmatter.category}
        </Link>
      </nav>

      {/* Category Badge */}
      <Link
        href={`/${locale}/blog/category/${frontmatter.category.toLowerCase()}`}
      >
        <Badge variant="secondary" className="mb-3 sm:mb-4 hover:bg-zinc-700">
          {frontmatter.category}
        </Badge>
      </Link>

      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
        {frontmatter.title}
      </h1>

      {/* Description */}
      <p className="text-sm sm:text-base text-zinc-400 mb-3 sm:mb-4 leading-relaxed">
        {frontmatter.description}
      </p>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-500 mb-3 sm:mb-4">
        <span className="flex items-center gap-1.5 sm:gap-2">
          <User className="size-3.5 sm:size-4" />
          {frontmatter.author}
        </span>
        <span className="flex items-center gap-1.5 sm:gap-2">
          <Calendar className="size-3.5 sm:size-4" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1.5 sm:gap-2">
          <Clock className="size-3.5 sm:size-4" />
          {readingTime.text}
        </span>
      </div>

      {/* Tags */}
      {frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {frontmatter.tags.map((tag) => (
            <Link
              key={tag}
              href={`/${locale}/blog/tag/${tag.toLowerCase()}`}
              className="text-xs px-2 sm:px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Cover Image */}
      {frontmatter.coverImage && (
        <div className="relative aspect-video rounded-lg overflow-hidden mb-4 sm:mb-6 mx-0">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.coverImageAlt || frontmatter.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1024px"
          />
        </div>
      )}
    </header>
  )
}
