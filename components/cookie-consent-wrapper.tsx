"use client"

import { ReactNode } from "react"
import { CookieConsentProvider } from "@/hooks/use-cookie-consent"
import { CookieConsentBanner } from "@/components/cookie-consent-banner"
import { ConditionalAnalytics } from "@/components/conditional-analytics"

interface CookieConsentWrapperProps {
    children: ReactNode
    googleAnalyticsId?: string
}

export function CookieConsentWrapper({ children, googleAnalyticsId }: CookieConsentWrapperProps) {
    return (
        <CookieConsentProvider>
            {children}
            <CookieConsentBanner />
            <ConditionalAnalytics googleAnalyticsId={googleAnalyticsId} />
        </CookieConsentProvider>
    )
}
