import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { BlogCategory } from '@/lib/blog/types'
import type { Locale } from '@/lib/i18n/config'

interface CategoryListProps {
  categories: BlogCategory[]
  locale: Locale
  activeCategory?: string
}

export function CategoryList({
  categories,
  locale,
  activeCategory,
}: CategoryListProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/${locale}/blog`}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          !activeCategory
            ? 'bg-brand text-white'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
        )}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/${locale}/blog/category/${category.slug}`}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            activeCategory?.toLowerCase() === category.slug.toLowerCase()
              ? 'bg-brand text-white'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
          )}
        >
          {category.name}
          <span className="ml-1.5 text-xs opacity-70">({category.count})</span>
        </Link>
      ))}
    </div>
  )
}
