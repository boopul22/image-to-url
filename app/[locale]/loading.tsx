"use client"

export default function Loading() {
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
            <main className="flex-grow relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-20">
                <div className="w-full max-w-3xl mx-auto text-center">
                    {/* Badge skeleton */}
                    <div className="mx-auto h-6 w-40 bg-zinc-800 rounded-full animate-pulse mb-6" />

                    {/* Title skeleton */}
                    <div className="space-y-4 mb-6">
                        <div className="mx-auto h-12 w-3/4 bg-zinc-800 rounded animate-pulse" />
                        <div className="mx-auto h-12 w-1/2 bg-zinc-800 rounded animate-pulse" />
                    </div>

                    {/* Description skeleton */}
                    <div className="mx-auto h-4 w-2/3 bg-zinc-800 rounded animate-pulse mb-12" />

                    {/* Upload zone skeleton */}
                    <div className="mx-auto w-full max-w-2xl h-64 bg-zinc-800/50 border-2 border-dashed border-zinc-700 rounded-2xl animate-pulse" />

                    {/* Stats skeleton */}
                    <div className="mt-16 grid grid-cols-3 gap-8 md:gap-20">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="text-center">
                                <div className="h-8 w-16 mx-auto bg-zinc-800 rounded animate-pulse mb-2" />
                                <div className="h-3 w-24 mx-auto bg-zinc-800 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
