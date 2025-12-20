"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to homepage
        router.replace("/en")
    }, [router])

    return (
        <div className="bg-dark text-zinc-300 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-medium text-white mb-2">Redirecting...</h1>
                <p className="text-zinc-500">Taking you back to the homepage</p>
            </div>
        </div>
    )
}
