import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"

interface FooterDict {
    copyright: string
    privacy: string
    terms: string
    cookies: string
}

interface FooterProps {
    locale: Locale
    dict: FooterDict
}

const toolLinks = [
    { name: "JPG to URL", href: "/tools/jpg-to-url" },
    { name: "PNG to URL", href: "/tools/png-to-url" },
    { name: "GIF to URL", href: "/tools/gif-to-url" },
    { name: "SVG to URL", href: "/tools/svg-to-url" },
    { name: "Base64 to URL", href: "/tools/base64-to-url" },
    { name: "Bulk Upload", href: "/tools/bulk-upload" },
]

const useCaseLinks = [
    { name: "Discord Images", href: "/use-cases/discord" },
    { name: "HTML & CSS", href: "/use-cases/html" },
    { name: "Fantasy Sports", href: "/use-cases/fantasy-sports" },
    { name: "Minecraft", href: "/use-cases/minecraft" },
]

export function Footer({ locale, dict }: FooterProps) {
    return (
        <footer className="w-full border-t border-white/5 bg-[#1a1a1a] py-12 mt-auto z-10">
            <div className="max-w-6xl mx-auto px-6">
                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {/* Tools */}
                    <div>
                        <h3 className="text-white text-sm font-medium mb-3">Image Converters</h3>
                        <ul className="space-y-2">
                            {toolLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={`/${locale}${link.href}`}
                                        className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Use Cases */}
                    <div>
                        <h3 className="text-white text-sm font-medium mb-3">Use Cases</h3>
                        <ul className="space-y-2">
                            {useCaseLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={`/${locale}${link.href}`}
                                        className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white text-sm font-medium mb-3">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href={`/${locale}`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white text-sm font-medium mb-3">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href={`/${locale}/privacy`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    {dict.privacy}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/terms`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    {dict.terms}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/cookies`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    {dict.cookies}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-500 text-xs">{dict.copyright}</p>
                    <p className="text-zinc-600 text-xs">
                        Free image to URL converter powered by global CDN
                    </p>
                </div>
            </div>
        </footer>
    )
}
