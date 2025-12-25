"use client"

import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface LoginFeatureTooltipProps {
    variant?: "icon" | "inline"
    className?: string
}

export function LoginFeatureTooltip({ variant = "icon", className = "" }: LoginFeatureTooltipProps) {
    const benefits = [
        { icon: "📊", text: "Track all your uploads" },
        { icon: "♾️", text: "Unlimited uploads" },
        { icon: "🔒", text: "Secure storage" },
        { icon: "📱", text: "Access from anywhere" },
    ]

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {variant === "icon" ? (
                    <button
                        className={`inline-flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors ${className}`}
                        aria-label="Login benefits"
                    >
                        <Info size={16} />
                    </button>
                ) : (
                    <span className={`inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors cursor-help ${className}`}>
                        <Info size={14} />
                    </span>
                )}
            </TooltipTrigger>
            <TooltipContent
                side="bottom"
                className="bg-zinc-900 border-zinc-700 p-3 max-w-[220px]"
                sideOffset={5}
            >
                <div className="space-y-2">
                    <p className="text-white font-medium text-xs mb-2">Sign in to unlock:</p>
                    <div className="space-y-1.5">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-zinc-300">
                                <span className="text-sm">{benefit.icon}</span>
                                <span>{benefit.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </TooltipContent>
        </Tooltip>
    )
}
