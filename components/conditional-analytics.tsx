"use client"

import { useEffect } from "react"
import { Analytics } from "@vercel/analytics/next"
import { useCookieConsent } from "@/hooks/use-cookie-consent"

declare global {
    interface Window {
        dataLayer: unknown[]
        gtag: (...args: unknown[]) => void
    }
}

interface ConditionalAnalyticsProps {
    googleAnalyticsId?: string
}

export function ConditionalAnalytics({ googleAnalyticsId }: ConditionalAnalyticsProps) {
    const { hasConsented, preferences } = useCookieConsent()

    // Load Google Analytics only when consent is given
    useEffect(() => {
        if (hasConsented && preferences.analytics && googleAnalyticsId) {
            // Check if already loaded
            if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
                return
            }

            // Load Google Analytics
            const script = document.createElement("script")
            script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
            script.async = true
            document.head.appendChild(script)

            // Initialize gtag
            window.dataLayer = window.dataLayer || []
            window.gtag = function gtag(...args: unknown[]) {
                window.dataLayer.push(args)
            }
            window.gtag("js", new Date())
            window.gtag("config", googleAnalyticsId, {
                anonymize_ip: true,
            })
        }
    }, [hasConsented, preferences.analytics, googleAnalyticsId])

    // Only render Vercel Analytics if consent is given
    if (!hasConsented || !preferences.analytics) {
        return null
    }

    return <Analytics />
}
