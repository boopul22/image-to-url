"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown } from "lucide-react"
import { useState } from "react"
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

    const isDashboard = pathname.includes("/dashboard")

    return (
        <nav className="w-full z-50 border-b border-white/5 glass-panel sticky top-0">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
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
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.key}
                            href={`/${locale}${link.href}`}
                            className="nav-link text-sm font-medium text-zinc-400 hover:text-white transition-colors relative"
                        >
                            {dict[link.key as keyof NavDict] || (link.key === "home" ? "Home" : link.key)}
                        </Link>
                    ))}

                    {/* Tools Dropdown - modal=false prevents body scroll lock */}
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger className="group nav-link text-sm font-medium text-zinc-400 hover:text-white transition-colors relative flex items-center gap-1 outline-none focus:outline-none focus-visible:outline-none">
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
    )
}
