"use client"

import { useEffect } from "react"
import { useCookieConsent } from "@/hooks/use-cookie-consent"

declare global {
    interface Window {
        dataLayer: unknown[]
        gtag: (...args: unknown[]) => void
    }
}

interface ConditionalAnalyticsProps {
    googleAnalyticsId?: string
    cloudflareBeaconToken?: string
}

export function ConditionalAnalytics({ googleAnalyticsId, cloudflareBeaconToken }: ConditionalAnalyticsProps) {
    const { hasConsented, preferences } = useCookieConsent()

    // Load Google Analytics only when consent is given
    useEffect(() => {
        if (hasConsented && preferences.analytics && googleAnalyticsId) {
            // Check if already loaded
            if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
                return
            }

            // Initialize dataLayer FIRST (before script loads)
            window.dataLayer = window.dataLayer || []
            window.gtag = function gtag(...args: unknown[]) {
                window.dataLayer.push(args)
            }

            // Load Google Analytics script
            const script = document.createElement("script")
            script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
            script.async = true

            // Configure gtag AFTER script loads to prevent race condition
            script.onload = () => {
                window.gtag("js", new Date())
                window.gtag("config", googleAnalyticsId, {
                    anonymize_ip: true,
                })
            }

            document.head.appendChild(script)
        }
    }, [hasConsented, preferences.analytics, googleAnalyticsId])

    // Load Cloudflare Web Analytics only when consent is given
    useEffect(() => {
        if (hasConsented && preferences.analytics && cloudflareBeaconToken) {
            // Check if already loaded
            if (document.querySelector(`script[src*="static.cloudflareinsights.com"]`)) {
                return
            }

            // Load Cloudflare Web Analytics script
            const script = document.createElement("script")
            script.src = "https://static.cloudflareinsights.com/beacon.min.js"
            script.defer = true
            script.dataset.cfBeacon = JSON.stringify({ token: cloudflareBeaconToken })

            document.head.appendChild(script)
        }
    }, [hasConsented, preferences.analytics, cloudflareBeaconToken])

    return null
}
