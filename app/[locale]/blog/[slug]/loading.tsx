"use client"

export default function BlogLoading() {
    return (
        <div className="bg-dark text-zinc-300 min-h-screen flex flex-col">
            {/* Ambient Glow Background */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[120px] pointer-events-none opacity-40 z-0" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none opacity-20 z-0" />

            {/* Header skeleton */}
            <header className="w-full py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="h-8 w-32 bg-zinc-800 rounded animate-pulse" />
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-20 bg-zinc-800 rounded animate-pulse" />
                        <div className="h-8 w-20 bg-zinc-800 rounded animate-pulse" />
                    </div>
                </div>
            </header>

            {/* Main content skeleton */}
            <main className="flex-grow relative z-10 container mx-auto px-4 py-12 max-w-4xl">
                {/* Breadcrumb skeleton */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="h-4 w-12 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-2 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-10 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-2 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
                </div>

                {/* Category badge skeleton */}
                <div className="h-6 w-24 bg-zinc-800 rounded-full animate-pulse mb-4" />

                {/* Title skeleton */}
                <div className="space-y-3 mb-6">
                    <div className="h-10 w-full bg-zinc-800 rounded animate-pulse" />
                    <div className="h-10 w-3/4 bg-zinc-800 rounded animate-pulse" />
                </div>

                {/* Description skeleton */}
                <div className="h-6 w-2/3 bg-zinc-800 rounded animate-pulse mb-6" />

                {/* Meta skeleton */}
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-800">
                    <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-2 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-28 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-2 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse" />
                </div>

                {/* Featured image skeleton */}
                <div className="h-80 w-full bg-zinc-800 rounded-2xl animate-pulse mb-10" />

                {/* Content skeleton */}
                <div className="space-y-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-4 bg-zinc-800 rounded animate-pulse" style={{ width: `${85 + Math.random() * 15}%` }} />
                    ))}
                    <div className="h-8 bg-zinc-800 rounded animate-pulse w-1/3 mt-8" />
                    {[...Array(5)].map((_, i) => (
                        <div key={i + 8} className="h-4 bg-zinc-800 rounded animate-pulse" style={{ width: `${80 + Math.random() * 20}%` }} />
                    ))}
                </div>
            </main>
        </div>
    )
}
