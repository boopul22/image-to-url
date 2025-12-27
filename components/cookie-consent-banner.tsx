"use client"

import { useState } from "react"
import { useCookieConsent } from "@/hooks/use-cookie-consent"
import { Cookie, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

export function CookieConsentBanner() {
    const { hasConsented, acceptAll, rejectAll, updatePreferences } = useCookieConsent()
    const [showDetails, setShowDetails] = useState(false)
    const [customPrefs, setCustomPrefs] = useState({
        analytics: true,
        advertising: true,
    })

    const handleSavePreferences = () => {
        updatePreferences({
            analytics: customPrefs.analytics,
            advertising: customPrefs.advertising,
            functional: true,
        })
    }

    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300",
                hasConsented
                    ? "opacity-0 translate-y-full pointer-events-none"
                    : "opacity-100 translate-y-0 pointer-events-auto"
            )}
        >
            <div className="max-w-4xl mx-auto">
                <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Main Banner */}
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            {/* Cookie Icon */}
                            <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Cookie className="w-6 h-6 text-brand" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    We value your privacy 🍪
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                    We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic.
                                    By clicking "Accept All", you consent to our use of cookies.{" "}
                                    <Link href="/en/cookies" className="text-brand hover:underline">
                                        Read our Cookie Policy
                                    </Link>
                                </p>

                                {/* Buttons */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <button
                                        onClick={acceptAll}
                                        className="bg-brand hover:bg-brand/90 text-white font-medium px-6 py-2.5 rounded-full transition-colors text-sm"
                                    >
                                        Accept All
                                    </button>
                                    <button
                                        onClick={rejectAll}
                                        className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-6 py-2.5 rounded-full transition-colors text-sm border border-zinc-600"
                                    >
                                        Reject All
                                    </button>
                                    <button
                                        onClick={() => setShowDetails(!showDetails)}
                                        className="text-zinc-400 hover:text-white font-medium px-4 py-2.5 transition-colors text-sm flex items-center gap-1"
                                    >
                                        Customize
                                        {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expandable Details */}
                    <div
                        className={cn(
                            "grid transition-[grid-template-rows] duration-300 ease-out",
                            showDetails ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        )}
                    >
                        <div className="overflow-hidden">
                            <div className="border-t border-zinc-700 p-6 bg-zinc-800/50">
                                <h4 className="text-white font-medium mb-4">Cookie Preferences</h4>

                                <div className="space-y-4">
                                    {/* Essential - Always On */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white text-sm font-medium">Essential Cookies</p>
                                            <p className="text-zinc-500 text-xs">Required for the website to function</p>
                                        </div>
                                        <div className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full">
                                            Always On
                                        </div>
                                    </div>

                                    {/* Analytics */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white text-sm font-medium">Analytics Cookies</p>
                                            <p className="text-zinc-500 text-xs">Help us understand how you use our site</p>
                                        </div>
                                        <Switch
                                            checked={customPrefs.analytics}
                                            onCheckedChange={(checked) => setCustomPrefs({ ...customPrefs, analytics: checked })}
                                        />
                                    </div>

                                    {/* Advertising */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white text-sm font-medium">Advertising Cookies</p>
                                            <p className="text-zinc-500 text-xs">Used to show relevant ads</p>
                                        </div>
                                        <Switch
                                            checked={customPrefs.advertising}
                                            onCheckedChange={(checked) => setCustomPrefs({ ...customPrefs, advertising: checked })}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={handleSavePreferences}
                                        className="bg-brand hover:bg-brand/90 text-white font-medium px-6 py-2 rounded-full transition-colors text-sm"
                                    >
                                        Save Preferences
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
