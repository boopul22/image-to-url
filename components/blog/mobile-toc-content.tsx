'use client'

import { useRef, useEffect } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TableOfContentsItem } from '@/lib/blog/types'

interface MobileTocContentProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  headings: TableOfContentsItem[]
  activeId: string
  onSelect: (id: string) => void
  title: string
}

export function MobileTocContent({
  isOpen,
  onOpenChange,
  headings,
  activeId,
  onSelect,
  title,
}: MobileTocContentProps) {
  const activeRef = useRef<HTMLAnchorElement>(null)

  // Scroll active item into view when drawer opens
  useEffect(() => {
    if (isOpen && activeRef.current) {
      // Small delay to ensure drawer animation completes
      const timer = setTimeout(() => {
        activeRef.current?.scrollIntoView({ block: 'center', behavior: 'instant' })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent
        id="mobile-toc-drawer"
        className={cn(
          'max-h-[70vh]',
          'bg-zinc-900/95 backdrop-blur-xl',
          'border-t border-zinc-800'
        )}
        aria-describedby={undefined}
      >
        <DrawerHeader className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <DrawerTitle className="text-lg font-semibold text-white">
            {title}
          </DrawerTitle>
          <DrawerClose asChild>
            <button
              className="rounded-full p-2 hover:bg-zinc-800 transition-colors"
              aria-label="Close table of contents"
            >
              <X className="size-5 text-zinc-400" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <ScrollArea className="flex-1 max-h-[calc(70vh-80px)]">
          <nav aria-label="Table of contents" className="px-6 py-4">
            <ul className="space-y-1">
              {headings.map(({ id, title, level }) => {
                const isActive = activeId === id
                return (
                  <li key={id}>
                    <a
                      ref={isActive ? activeRef : null}
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        onSelect(id)
                      }}
                      className={cn(
                        'block py-3 transition-colors border-l-2',
                        // Indentation based on heading level
                        level === 2 && 'pl-4',
                        level === 3 && 'pl-8',
                        level === 4 && 'pl-12',
                        // Active state
                        isActive
                          ? 'border-brand text-brand font-medium'
                          : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-600',
                        // Touch-friendly size
                        'min-h-[44px] flex items-center'
                      )}
                      aria-current={isActive ? 'location' : undefined}
                    >
                      {title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
