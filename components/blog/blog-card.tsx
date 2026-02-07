import Image from 'next/image'
import Link from 'next/link'
import { Bookmark } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { PostMeta } from '@/lib/blog/types'
import type { Locale } from '@/lib/i18n/config'

interface BlogCardProps {
  post: PostMeta
  locale: Locale
  featured?: boolean
}

export function BlogCard({ post, locale, featured }: BlogCardProps) {
  const { frontmatter, slug } = post

  // Format date to something like "8d ago" or standard date if older?
  // For now let's keep it simple or match the "8d ago" style if possible, 
  // but standard date is safer for i18n without a library like date-fns right now.
  // The image showed "8d ago", let's stick to standard date for MVP robustness unless requested.
  const formattedDate = frontmatter.publishedAt
    ? new Date(frontmatter.publishedAt).toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric',
    })
    : ''

  return (
    <article
      className="group relative flex flex-col h-full bg-[#0F0F10] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
    >
      <div className="flex flex-col flex-grow p-5 pb-0">
        {/* Header: Badge + Meta + Bookmark */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {frontmatter.category && (
              <Badge
                className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-zinc-300 border-none px-2.5 py-0.5 text-xs font-normal"
              >
                {frontmatter.category}
              </Badge>
            )}
            {/* Tag/Secondary Badge if needed, or Date */}
            {/* The image shows "Image Gen" as a second badge, we can use the first tag */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <span className="text-xs text-zinc-500 font-medium">
                {frontmatter.tags[0]}
              </span>
            )}
            <span className="text-xs text-zinc-600 font-medium">
              {formattedDate}
            </span>
          </div>

          <button className="text-zinc-600 hover:text-zinc-400 transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <Link href={`/${locale}/blog/${slug}`} className="block group-hover:opacity-80 transition-opacity">
          <h2 className="text-lg sm:text-lg font-semibold text-white leading-snug mb-2">
            {frontmatter.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
          {frontmatter.description}
        </p>

        {/* Image - Pushed to bottom */}
        <div className="mt-auto pt-2 pb-5">
          <Link
            href={`/${locale}/blog/${slug}`}
            className="block relative aspect-[4/3] w-full overflow-hidden rounded-xl"
          >
            {frontmatter.coverImage ? (
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter.coverImageAlt || frontmatter.title || 'Blog post'}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <span className="text-2xl text-zinc-700 font-bold">
                  {frontmatter.title?.charAt(0) || 'IMG'}
                </span>
              </div>
            )}

            {/* Gradient Overlay for "Prompt" text style from image? 
                The image has a specific look (Title on image or styled image). 
                We'll stick to clear clean image for now.
            */}
          </Link>
        </div>
      </div>
    </article>
  )
}
