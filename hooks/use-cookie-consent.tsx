"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"

export interface CookiePreferences {
    analytics: boolean
    advertising: boolean
    functional: boolean
}

interface CookieConsentContextType {
    hasConsented: boolean
    preferences: CookiePreferences
    acceptAll: () => void
    rejectAll: () => void
    updatePreferences: (prefs: Partial<CookiePreferences>) => void
    resetConsent: () => void
}

const STORAGE_KEY = "cookie-consent"

const defaultPreferences: CookiePreferences = {
    analytics: false,
    advertising: false,
    functional: true, // Essential cookies are always enabled
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
    const [hasConsented, setHasConsented] = useState<boolean>(true) // Default to true to prevent flash
    const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load consent from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                setPreferences(parsed.preferences || defaultPreferences)
                setHasConsented(true)
            } catch {
                setHasConsented(false)
            }
        } else {
            setHasConsented(false)
        }
        setIsLoaded(true)
    }, [])

    const saveConsent = useCallback((prefs: CookiePreferences) => {
        const data = {
            preferences: prefs,
            timestamp: new Date().toISOString(),
            version: "1.0",
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        setPreferences(prefs)
        setHasConsented(true)
    }, [])

    const acceptAll = useCallback(() => {
        saveConsent({
            analytics: true,
            advertising: true,
            functional: true,
        })
    }, [saveConsent])

    const rejectAll = useCallback(() => {
        saveConsent({
            analytics: false,
            advertising: false,
            functional: true, // Essential cookies remain enabled
        })
    }, [saveConsent])

    const updatePreferences = useCallback((prefs: Partial<CookiePreferences>) => {
        const newPrefs = { ...preferences, ...prefs, functional: true }
        saveConsent(newPrefs)
    }, [preferences, saveConsent])

    const resetConsent = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY)
        setHasConsented(false)
        setPreferences(defaultPreferences)
    }, [])

    // Don't render children until we've checked localStorage
    if (!isLoaded) {
        return null
    }

    return (
        <CookieConsentContext.Provider
            value={{
                hasConsented,
                preferences,
                acceptAll,
                rejectAll,
                updatePreferences,
                resetConsent,
            }}
        >
            {children}
        </CookieConsentContext.Provider>
    )
}

export function useCookieConsent() {
    const context = useContext(CookieConsentContext)
    if (context === undefined) {
        throw new Error("useCookieConsent must be used within a CookieConsentProvider")
    }
    return context
}
