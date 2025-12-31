import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export function BlogPagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showPages = 5 // Max pages to show

    if (totalPages <= showPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pages.push(1)

    // Calculate start and end of page range
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)

    // Adjust if at start or end
    if (currentPage <= 3) {
      end = Math.min(4, totalPages - 1)
    }
    if (currentPage >= totalPages - 2) {
      start = Math.max(2, totalPages - 3)
    }

    // Add ellipsis if needed before middle pages
    if (start > 2) {
      pages.push('...')
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis if needed after middle pages
    if (end < totalPages - 1) {
      pages.push('...')
    }

    // Always show last page
    pages.push(totalPages)

    return pages
  }

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath
    }
    return `${basePath}/page/${page}`
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav
      className="flex items-center justify-center gap-1 mt-12"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-5" />
        </Link>
      ) : (
        <span className="p-2 rounded-lg text-zinc-600 cursor-not-allowed">
          <ChevronLeft className="size-5" />
        </span>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <Link
            key={index}
            href={getPageUrl(page)}
            className={cn(
              'min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-brand text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            )}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ) : (
          <span
            key={index}
            className="min-w-[40px] h-10 flex items-center justify-center text-zinc-600"
          >
            {page}
          </span>
        )
      )}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="size-5" />
        </Link>
      ) : (
        <span className="p-2 rounded-lg text-zinc-600 cursor-not-allowed">
          <ChevronRight className="size-5" />
        </span>
      )}
    </nav>
  )
}
