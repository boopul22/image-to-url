"use client"

import { useState, useEffect } from "react"
import { Bookmark, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookmarkBannerProps {
    show: boolean
    onDismiss: () => void
}

const STORAGE_KEY = "bookmark-banner-dismissed"
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

export function BookmarkBanner({ show, onDismiss }: BookmarkBannerProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        // Check if banner was previously dismissed
        const dismissedAt = localStorage.getItem(STORAGE_KEY)
        if (dismissedAt) {
            const dismissedTime = parseInt(dismissedAt, 10)
            const now = Date.now()
            if (now - dismissedTime < DISMISS_DURATION) {
                // Still within dismiss period, don't show
                return
            }
        }

        // Show banner if triggered
        if (show) {
            setShouldRender(true)
            // Small delay for animation
            setTimeout(() => setIsVisible(true), 100)
        }
    }, [show])

    const handleDismiss = () => {
        setIsVisible(false)
        // Save dismiss timestamp
        localStorage.setItem(STORAGE_KEY, Date.now().toString())
        // Wait for animation to complete before unmounting
        setTimeout(() => {
            setShouldRender(false)
            onDismiss()
        }, 300)
    }

    if (!shouldRender) return null

    return (
        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
        >
            <div className="bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-700/50 p-4 md:p-5">
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                        <Bookmark className="text-zinc-300" size={20} strokeWidth={2.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                        <h4 className="text-white font-semibold text-sm md:text-base mb-0.5">
                            Love this tool?
                        </h4>
                        <p className="text-zinc-400 text-xs md:text-sm">
                            Bookmark us for easy access next time!
                        </p>
                    </div>

                    {/* Dismiss Button */}
                    <Button
                        onClick={handleDismiss}
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0 h-8 w-8 p-0 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg"
                        aria-label="Dismiss"
                    >
                        <X size={18} />
                    </Button>
                </div>

                {/* Keyboard shortcut hint - hidden on mobile */}
                <div className="hidden md:flex items-center gap-2 mt-3 pt-3 border-t border-zinc-800">
                    <p className="text-zinc-500 text-xs">
                        <kbd className="px-2 py-0.5 bg-zinc-800 rounded text-zinc-300 font-mono text-xs">
                            {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}+D
                        </kbd>{" "}
                        to bookmark this page
                    </p>
                </div>
            </div>
        </div>
    )
}
