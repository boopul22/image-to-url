"use client"

import { useState, useEffect } from "react"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePushNotifications } from "@/hooks/use-push-notifications"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "push-prompt-dismissed"
const SHOW_AFTER_UPLOADS = 1 // Show after first upload

interface PushNotificationPromptProps {
  uploadCount: number
}

export function PushNotificationPrompt({ uploadCount }: PushNotificationPromptProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { isSupported, isSubscribed, permission, subscribe } = usePushNotifications()

  useEffect(() => {
    // Don't show if not supported, already subscribed, or denied
    if (!isSupported || isSubscribed || permission === "denied") return

    // Check if VAPID key is configured
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) return

    // Check if dismissed recently (7 days)
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) return

    // Show after user has made uploads (contextual)
    if (uploadCount >= SHOW_AFTER_UPLOADS) {
      const timer = setTimeout(() => setIsVisible(true), 2500)
      return () => clearTimeout(timer)
    }
  }, [isSupported, isSubscribed, permission, uploadCount])

  const handleEnable = async () => {
    const success = await subscribe()
    if (success) {
      setIsVisible(false)
    }
  }

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
    setIsVisible(false)
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 w-80 transition-all duration-300",
        isVisible
          ? "opacity-100 translate-x-0 pointer-events-auto"
          : "opacity-0 translate-x-4 pointer-events-none"
      )}
    >
      <div className="bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-700/50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Bell className="text-blue-400" size={20} />
          </div>

          <div className="flex-grow">
            <h4 className="text-white font-semibold text-sm mb-1">
              Never miss an expiring link
            </h4>
            <p className="text-zinc-400 text-xs mb-3">
              Get notified before your image links expire so you can save or reshare them.
            </p>

            <div className="flex gap-2">
              <Button
                onClick={handleEnable}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs"
                size="sm"
              >
                Enable Notifications
              </Button>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white text-xs"
              >
                Later
              </Button>
            </div>
          </div>

          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="sm"
            className="flex-shrink-0 h-6 w-6 p-0 hover:bg-zinc-800 text-zinc-500"
          >
            <X size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}
