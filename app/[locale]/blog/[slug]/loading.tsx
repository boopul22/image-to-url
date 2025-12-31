import { Skeleton } from '@/components/ui/skeleton'

export default function BlogPostLoading() {
  return (
    <div className="bg-dark text-zinc-300 min-h-screen flex flex-col">
      {/* Ambient Glow Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[120px] pointer-events-none opacity-40 z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none opacity-20 z-0" />

      {/* Header Skeleton */}
      <header className="relative z-10 border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Skeleton className="h-10 w-32 bg-zinc-800" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-grow relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-12">
            {/* Article Skeleton */}
            <article className="flex-1 max-w-3xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6">
                <Skeleton className="h-4 w-16 bg-zinc-800" />
                <Skeleton className="h-4 w-4 bg-zinc-800" />
                <Skeleton className="h-4 w-12 bg-zinc-800" />
              </div>

              {/* Category Badge */}
              <Skeleton className="h-6 w-24 rounded-full bg-zinc-800 mb-4" />

              {/* Title */}
              <Skeleton className="h-12 w-full bg-zinc-800 mb-2" />
              <Skeleton className="h-12 w-3/4 bg-zinc-800 mb-4" />

              {/* Description */}
              <Skeleton className="h-6 w-full bg-zinc-800 mb-2" />
              <Skeleton className="h-6 w-2/3 bg-zinc-800 mb-6" />

              {/* Meta */}
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-5 w-24 bg-zinc-800" />
                <Skeleton className="h-5 w-24 bg-zinc-800" />
                <Skeleton className="h-5 w-20 bg-zinc-800" />
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-8">
                <Skeleton className="h-7 w-16 rounded-full bg-zinc-800" />
                <Skeleton className="h-7 w-20 rounded-full bg-zinc-800" />
                <Skeleton className="h-7 w-14 rounded-full bg-zinc-800" />
              </div>

              {/* Cover Image */}
              <Skeleton className="aspect-video w-full rounded-xl bg-zinc-800 mb-8" />

              {/* Content Paragraphs */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-full bg-zinc-800" />
                <Skeleton className="h-4 w-full bg-zinc-800" />
                <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                <Skeleton className="h-8 w-1/2 bg-zinc-800 mt-8" />
                <Skeleton className="h-4 w-full bg-zinc-800" />
                <Skeleton className="h-4 w-full bg-zinc-800" />
                <Skeleton className="h-4 w-5/6 bg-zinc-800" />
                <Skeleton className="h-4 w-full bg-zinc-800" />
                <Skeleton className="h-4 w-2/3 bg-zinc-800" />
              </div>
            </article>

            {/* Sidebar Skeleton */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-8">
                <div>
                  <Skeleton className="h-5 w-32 bg-zinc-800 mb-3" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-zinc-800" />
                    <Skeleton className="h-4 w-5/6 bg-zinc-800" />
                    <Skeleton className="h-4 w-4/5 bg-zinc-800" />
                    <Skeleton className="h-4 w-full bg-zinc-800" />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
