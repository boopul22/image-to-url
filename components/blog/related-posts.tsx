import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import type { PostMeta } from '@/lib/blog/types'
import type { Locale } from '@/lib/i18n/config'

interface RelatedPostsProps {
  posts: PostMeta[]
  locale: Locale
  title?: string
}

export function RelatedPosts({
  posts,
  locale,
  title = 'Related Posts',
}: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-zinc-800">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group block"
          >
            <article className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700 transition-all">
              {/* Cover Image */}
              <div className="relative aspect-video overflow-hidden">
                {post.frontmatter.coverImage ? (
                  <Image
                    src={post.frontmatter.coverImage}
                    alt={post.frontmatter.coverImageAlt || post.frontmatter.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <span className="text-2xl text-zinc-600">
                      {post.frontmatter.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <span className="text-xs text-brand font-medium uppercase tracking-wide">
                  {post.frontmatter.category}
                </span>
                <h3 className="text-sm sm:text-base text-white font-semibold mt-1 line-clamp-2 group-hover:text-brand transition-colors">
                  {post.frontmatter.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-zinc-500 mt-2">
                  <Calendar className="size-3" />
                  {new Date(post.frontmatter.publishedAt).toLocaleDateString(
                    locale,
                    {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }
                  )}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
