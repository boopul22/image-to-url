"use client"

import { useState, useEffect } from "react"
import { Download, X, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

const STORAGE_KEY = "pwa-install-dismissed"
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return
    }

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem(STORAGE_KEY)
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10)
      if (Date.now() - dismissedTime < DISMISS_DURATION) {
        return
      }
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show prompt after user has interacted with the app
      setTimeout(() => setIsVisible(true), 3000)
    }

    window.addEventListener("beforeinstallprompt", handler)

    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      setIsVisible(false)
    })

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setIsInstalled(true)
    }

    setDeferredPrompt(null)
    setIsVisible(false)
  }

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
    setIsVisible(false)
  }

  const shouldShow = !isInstalled && isVisible && deferredPrompt

  return (
    <div
      className={cn(
        "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md transition-all duration-300",
        shouldShow
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <div className="bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-700/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand/20 flex items-center justify-center">
            <Smartphone className="text-brand" size={24} />
          </div>

          <div className="flex-grow min-w-0">
            <h4 className="text-white font-semibold text-sm mb-0.5">
              Install ImageToURL
            </h4>
            <p className="text-zinc-400 text-xs">
              Add to home screen for quick access
            </p>
          </div>

          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="sm"
            className="flex-shrink-0 h-8 w-8 p-0 hover:bg-zinc-800 text-zinc-400"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="flex gap-2 mt-3">
          <Button
            onClick={handleInstall}
            className="flex-1 bg-brand hover:bg-brand/90 text-white"
            size="sm"
          >
            <Download size={16} className="mr-2" />
            Install App
          </Button>
          <Button
            onClick={handleDismiss}
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-400 hover:text-white"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  )
}
