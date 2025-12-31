'use client'

import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { List } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TableOfContentsItem } from '@/lib/blog/types'

// Lazy load the drawer content for performance
const MobileTocContent = dynamic(
  () => import('./mobile-toc-content').then(mod => ({ default: mod.MobileTocContent })),
  { ssr: false }
)

interface MobileTocDrawerProps {
  headings: TableOfContentsItem[]
  title?: string
}

export function MobileTocDrawer({ headings, title = 'Contents' }: MobileTocDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')

  // IntersectionObserver for active heading tracking
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  const handleSelect = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveId(id)
    }
    setIsOpen(false)
  }, [])

  // Don't render if no headings
  if (headings.length === 0) return null

  return (
    <>
      {/* Floating Action Button - Bottom Right */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-40',
          'size-12 sm:size-14 rounded-full shadow-lg',
          'bg-brand hover:bg-brand/90 text-zinc-900',
          'flex items-center justify-center',
          'transition-all duration-200',
          'hover:scale-105 active:scale-95',
          'mobile-toc-fab',
          // Respect reduced motion
          'motion-reduce:transition-none motion-reduce:hover:scale-100'
        )}
        aria-label="Open table of contents"
        aria-expanded={isOpen}
        aria-controls="mobile-toc-drawer"
      >
        <List className="size-5 sm:size-6" />
      </button>

      {/* Drawer Component (lazy loaded) */}
      <MobileTocContent
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        headings={headings}
        activeId={activeId}
        onSelect={handleSelect}
        title={title}
      />
    </>
  )
}
