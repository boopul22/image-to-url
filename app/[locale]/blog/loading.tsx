import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
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
      <main className="flex-grow relative z-10 px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto bg-zinc-800 mb-4" />
            <Skeleton className="h-6 w-96 mx-auto bg-zinc-800 mb-8" />
            <Skeleton className="h-10 w-48 mx-auto bg-zinc-800" />
          </div>

          {/* Categories Skeleton */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full bg-zinc-800" />
            ))}
          </div>

          {/* Posts Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
              >
                <Skeleton className="aspect-video w-full bg-zinc-800" />
                <div className="p-5">
                  <Skeleton className="h-4 w-20 bg-zinc-800 mb-2" />
                  <Skeleton className="h-6 w-full bg-zinc-800 mb-2" />
                  <Skeleton className="h-6 w-3/4 bg-zinc-800 mb-4" />
                  <Skeleton className="h-4 w-full bg-zinc-800 mb-2" />
                  <Skeleton className="h-4 w-2/3 bg-zinc-800 mb-4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-20 bg-zinc-800" />
                    <Skeleton className="h-4 w-16 bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
