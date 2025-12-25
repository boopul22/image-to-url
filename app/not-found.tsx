import Link from "next/link"

export default function NotFound() {
    return (
        <div className="bg-dark text-zinc-300 min-h-screen flex items-center justify-center">
            <div className="text-center px-4">
                <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                <h2 className="text-2xl font-medium text-white mb-2">Page Not Found</h2>
                <p className="text-zinc-500 mb-8 max-w-md">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/en"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark rounded-full font-medium hover:bg-zinc-200 transition-colors"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    )
}
