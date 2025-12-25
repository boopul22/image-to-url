import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import { Github, Instagram, Mail } from "lucide-react"

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
                            <li>
                                <Link
                                    href={`/${locale}/about`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    About
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

                {/* Social Links */}
                <div className="border-t border-white/5 pt-6 pb-4">
                    <div className="flex items-center justify-center gap-6">
                        <a
                            href="https://github.com/boopul22"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.instagram.com/no.code_boopul"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-pink-400 transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="mailto:blog.boopul@gmail.com"
                            className="text-zinc-500 hover:text-brand transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Fazier Badges */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <a href="https://fazier.com/launches/www.imagetourl.cloud" target="_blank" rel="noopener noreferrer">
                            <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light" width={80} alt="Fazier badge" />
                        </a>
                        <a href="https://fazier.com/launches/www.imagetourl.cloud" target="_blank" rel="noopener noreferrer">
                            <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light" width={150} alt="Fazier badge" />
                        </a>
                    </div>

                    {/* Product Hunt Badge */}
                    <div className="flex items-center justify-center mt-4 text-white">
                        <a href="https://www.producthunt.com/products/imagetourl-2/reviews/new?utm_source=badge-product_review&utm_medium=badge&utm_source=badge-imagetourl&#0045;2" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=1138741&theme=light"
                                alt="ImageToURL - Free image to url converter | Product Hunt"
                                style={{ width: '250px', height: '54px' }}
                                width="250"
                                height="54"
                            />
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-500 text-xs">© 2025 ImageToURL. All rights reserved.</p>
                    <p className="text-zinc-600 text-xs">
                        Free image to URL converter powered by global CDN
                    </p>
                </div>
            </div>
        </footer>
    )
}
