"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavDict {
    home?: string
    blog?: string
    documentation: string
    api: string
    pricing: string
    signIn: string
    dashboard?: string
    tools?: string
}

interface HeaderProps {
    locale: Locale
    dict: NavDict
    children?: React.ReactNode // For NavAuth component passed from server
}

const navLinks = [
    { key: "home", href: "" },
    { key: "blog", href: "/blog" },
    { key: "pricing", href: "/pricing" },
] as const

const toolLinks = [
    { name: "PNG to URL", href: "/tools/png-to-url" },
    { name: "JPG to URL", href: "/tools/jpg-to-url" },
    { name: "SVG to URL", href: "/tools/svg-to-url" },
    { name: "GIF to URL", href: "/tools/gif-to-url" },
    { name: "QR to URL", href: "/tools/qr-to-url" },
    { name: "Base64 to URL", href: "/tools/base64-to-url" },
    { name: "Bulk Upload", href: "/tools/bulk-upload" },
] as const

export function Header({ locale, dict, children }: HeaderProps) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [showBanner, setShowBanner] = useState(true)

    const isDashboard = pathname.includes("/dashboard")

    // Auto-hide banner after 30 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowBanner(false), 30000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            {/* Happy New Year Flash Banner */}
            {showBanner && (
                <div className="relative overflow-hidden bg-dark border-b border-brand/30 text-white py-2">
                    {/* Animated sparkle background with brand color */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-1 left-1/4 w-1 h-1 bg-brand rounded-full animate-ping" style={{ animationDuration: '1.5s' }} />
                        <div className="absolute top-1 left-1/2 w-1.5 h-1.5 bg-brand rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
                        <div className="absolute -top-0.5 left-3/4 w-1 h-1 bg-brand rounded-full animate-ping" style={{ animationDuration: '1.8s', animationDelay: '0.7s' }} />
                        <div className="absolute top-0.5 left-1/3 w-0.5 h-0.5 bg-brand/70 rounded-full animate-ping" style={{ animationDuration: '2.2s', animationDelay: '0.5s' }} />
                        {/* Gradient glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/10 to-transparent" />
                    </div>

                    <div className="relative flex items-center justify-center gap-2 text-sm font-medium">
                        <Sparkles className="w-4 h-4 animate-pulse text-brand" />
                        <span className="bg-gradient-to-r from-brand via-white to-brand bg-clip-text text-transparent animate-pulse font-semibold">
                            🎊 Happy New Year 2026! 🎊
                        </span>
                        <Sparkles className="w-4 h-4 animate-pulse text-brand" />
                        <button
                            onClick={() => setShowBanner(false)}
                            className="absolute right-4 text-zinc-500 hover:text-white text-xs transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <nav className="w-full z-50 border-b border-white/5 glass-panel sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex items-center gap-2.5 group shrink-0">
                        <div className="w-9 h-9 rounded-lg overflow-hidden">
                            <img
                                src="/favicon-32x32.png"
                                alt="ImageToURL Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-medium tracking-tight text-white text-lg group-hover:text-white/90 transition-colors">
                            IMAGETOURL
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.key}
                                href={`/${locale}${link.href}`}
                                className="nav-link text-sm font-medium text-zinc-400 hover:text-white transition-colors relative px-4 py-2"
                            >
                                {dict[link.key as keyof NavDict] || (link.key === "home" ? "Home" : link.key)}
                            </Link>
                        ))}

                        {/* Tools Dropdown - modal=false prevents body scroll lock */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger className="group nav-link text-sm font-medium text-zinc-400 hover:text-white transition-colors relative flex items-center gap-1.5 px-4 py-2 outline-none focus:outline-none focus-visible:outline-none">
                                {dict.tools || "Tools"}
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-dark border border-white/10 min-w-[180px]">
                                {toolLinks.map((tool) => (
                                    <DropdownMenuItem key={tool.href} asChild>
                                        <Link
                                            href={`/${locale}${tool.href}`}
                                            className="text-zinc-300 hover:text-white cursor-pointer"
                                        >
                                            {tool.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Dashboard link - always rendered but visibility controlled to prevent layout shift */}
                        <Link
                            href={`/${locale}/dashboard`}
                            className={cn(
                                "nav-link text-sm font-medium transition-colors relative",
                                pathname.includes("/dashboard")
                                    ? "text-brand"
                                    : "text-zinc-400 hover:text-white",
                                // Hide when not on dashboard but keep space reserved
                                !isDashboard && "opacity-0 pointer-events-none absolute"
                            )}
                            tabIndex={isDashboard ? 0 : -1}
                            aria-hidden={!isDashboard}
                        >
                            {dict.dashboard || "Dashboard"}
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <LanguageSwitcher currentLocale={locale} />
                        </div>

                        {/* Auth button passed from server component - min-w prevents layout shift */}
                        <div className="hidden sm:flex sm:items-center sm:justify-end sm:min-w-[120px]">
                            {children}
                        </div>

                        {/* Mobile Menu Trigger */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                    <Menu size={22} />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[280px] bg-dark border-white/10 p-0"
                            >
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                {/* Mobile Menu Header */}
                                <div className="flex items-center justify-between p-4 border-b border-white/5">
                                    <Link
                                        href={`/${locale}`}
                                        className="flex items-center gap-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg overflow-hidden">
                                            <img
                                                src="/favicon-32x32.png"
                                                alt="ImageToURL Logo"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="font-medium text-white text-sm">IMAGETOURL</span>
                                    </Link>
                                </div>

                                {/* Mobile Menu Links */}
                                <div className="flex flex-col p-4 gap-1 overflow-y-auto max-h-[calc(100vh-200px)]">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.key}
                                            href={`/${locale}${link.href}`}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center px-3 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                                        >
                                            {dict[link.key as keyof NavDict] || (link.key === "home" ? "Home" : link.key)}
                                        </Link>
                                    ))}

                                    {/* Tools Section */}
                                    <div className="mt-2 pt-2 border-t border-white/5">
                                        <div className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                            {dict.tools || "Tools"}
                                        </div>
                                        {toolLinks.map((tool) => (
                                            <Link
                                                key={tool.href}
                                                href={`/${locale}${tool.href}`}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-sm"
                                            >
                                                {tool.name}
                                            </Link>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/${locale}/dashboard`}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center px-3 py-3 rounded-lg transition-all mt-2 pt-2 border-t border-white/5",
                                            pathname.includes("/dashboard")
                                                ? "text-brand bg-brand/10"
                                                : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {dict.dashboard || "Dashboard"}
                                    </Link>
                                </div>

                                {/* Mobile Menu Footer */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
                                    <div className="flex items-center justify-between mb-4">
                                        <LanguageSwitcher currentLocale={locale} />
                                    </div>
                                    {/* Auth button */}
                                    <div className="w-full">
                                        {children}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </>
    )
}
