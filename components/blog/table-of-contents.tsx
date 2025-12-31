'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TableOfContentsItem } from '@/lib/blog/types'

interface TableOfContentsProps {
  headings: TableOfContentsItem[]
  title?: string
}

export function TableOfContents({
  headings,
  title = 'Table of Contents',
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
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

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="space-y-3">
      <h3 className="text-sm font-semibold text-white uppercase tracking-wide">{title}</h3>
      <ul className="space-y-0.5">
        {headings.map(({ id, title, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                  setActiveId(id)
                }
              }}
              className={cn(
                'block text-sm py-2 transition-all duration-200 border-l-2 hover:text-white',
                level === 2 && 'pl-4',
                level === 3 && 'pl-7',
                level === 4 && 'pl-10',
                activeId === id
                  ? 'border-brand text-brand bg-brand/5 font-medium'
                  : 'border-transparent text-zinc-500 hover:border-zinc-600 hover:bg-zinc-800/30'
              )}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
