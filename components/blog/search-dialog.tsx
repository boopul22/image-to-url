'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, FileText, Tag, Folder } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { PostMeta } from '@/lib/blog/types'
import type { Locale } from '@/lib/i18n/config'

interface SearchDialogProps {
  posts: PostMeta[]
  locale: Locale
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SearchResult {
  type: 'post' | 'category' | 'tag'
  title: string
  description?: string
  href: string
}

export function SearchDialog({
  posts,
  locale,
  open,
  onOpenChange,
}: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchTerm = query.toLowerCase()
    const searchResults: SearchResult[] = []

    // Search posts
    posts.forEach((post) => {
      const titleMatch = post.frontmatter.title.toLowerCase().includes(searchTerm)
      const descMatch = post.frontmatter.description
        .toLowerCase()
        .includes(searchTerm)
      const tagMatch = post.frontmatter.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm)
      )
      const categoryMatch = post.frontmatter.category
        .toLowerCase()
        .includes(searchTerm)

      if (titleMatch || descMatch || tagMatch || categoryMatch) {
        searchResults.push({
          type: 'post',
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          href: `/${locale}/blog/${post.slug}`,
        })
      }
    })

    // Search categories
    const categories = new Set(posts.map((p) => p.frontmatter.category))
    categories.forEach((category) => {
      if (category.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          type: 'category',
          title: category,
          href: `/${locale}/blog/category/${category.toLowerCase()}`,
        })
      }
    })

    // Search tags
    const tags = new Set(posts.flatMap((p) => p.frontmatter.tags))
    tags.forEach((tag) => {
      if (tag.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          type: 'tag',
          title: tag,
          href: `/${locale}/blog/tag/${tag.toLowerCase()}`,
        })
      }
    })

    setResults(searchResults.slice(0, 10))
    setSelectedIndex(0)
  }, [query, posts, locale])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        router.push(results[selectedIndex].href)
        onOpenChange(false)
        setQuery('')
      }
    },
    [results, selectedIndex, router, onOpenChange]
  )

  // Reset on close
  useEffect(() => {
    if (!open) {
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [open])

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'post':
        return <FileText className="size-4" />
      case 'category':
        return <Folder className="size-4" />
      case 'tag':
        return <Tag className="size-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>Search blog posts</DialogTitle>
        </DialogHeader>

        <div className="flex items-center border-b border-zinc-800 px-4">
          <Search className="size-5 text-zinc-500 mr-3" />
          <Input
            placeholder="Search posts, categories, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0 py-4 text-base placeholder:text-zinc-500"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-500 hover:text-zinc-300"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="max-h-80 overflow-y-auto py-2">
            {results.map((result, index) => (
              <li key={`${result.type}-${result.href}`}>
                <button
                  onClick={() => {
                    router.push(result.href)
                    onOpenChange(false)
                    setQuery('')
                  }}
                  className={cn(
                    'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors',
                    index === selectedIndex
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:bg-zinc-800/50'
                  )}
                >
                  <span className="mt-0.5 text-zinc-500">
                    {getIcon(result.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{result.title}</p>
                    {result.description && (
                      <p className="text-sm text-zinc-500 truncate">
                        {result.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-zinc-600 capitalize">
                    {result.type}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : query ? (
          <div className="py-12 text-center text-zinc-500">
            <p>No results found for &ldquo;{query}&rdquo;</p>
          </div>
        ) : (
          <div className="py-12 text-center text-zinc-500">
            <p>Start typing to search...</p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-2 text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
              ↑↓
            </kbd>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
              ↵
            </kbd>
            <span>Select</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
              Esc
            </kbd>
            <span>Close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hook to handle Cmd+K shortcut
export function useSearchShortcut(callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        callback()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [callback])
}
