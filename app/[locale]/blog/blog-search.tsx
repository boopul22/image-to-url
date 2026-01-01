'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { SearchDialog } from '@/components/blog/search-dialog'
import type { SearchIndexItem } from '@/lib/blog/types'
import type { Locale } from '@/lib/i18n/config'

interface BlogSearchProps {
  searchIndex: SearchIndexItem[]
  locale: Locale
}

export function BlogSearch({ searchIndex, locale }: BlogSearchProps) {
  const [open, setOpen] = useState(false)

  // Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
      >
        <Search className="size-4" />
        <span>Search posts...</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-400 text-xs ml-2">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <SearchDialog
        searchIndex={searchIndex}
        locale={locale}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}
