"use client"

export default function ToolsLoading() {
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
            <main className="flex-grow relative z-10 flex flex-col items-center px-4 py-12 md:py-20">
                <div className="w-full max-w-3xl mx-auto text-center mb-12">
                    {/* Title skeleton */}
                    <div className="mx-auto h-10 w-2/3 bg-zinc-800 rounded animate-pulse mb-4" />

                    {/* Subtitle skeleton */}
                    <div className="mx-auto h-6 w-1/2 bg-zinc-800 rounded animate-pulse mb-6" />

                    {/* Description skeleton */}
                    <div className="space-y-2">
                        <div className="mx-auto h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
                        <div className="mx-auto h-4 w-2/3 bg-zinc-800 rounded animate-pulse" />
                    </div>
                </div>

                {/* Upload zone skeleton */}
                <div className="w-full max-w-2xl h-64 bg-zinc-800/50 border-2 border-dashed border-zinc-700 rounded-2xl animate-pulse mb-16" />

                {/* Features section skeleton */}
                <div className="w-full max-w-4xl">
                    <div className="h-8 w-48 mx-auto bg-zinc-800 rounded animate-pulse mb-8" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-12 bg-zinc-800 rounded-lg animate-pulse" />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
