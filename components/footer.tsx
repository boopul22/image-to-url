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

export function Footer({ locale, dict }: FooterProps) {
    return (
        <footer className="w-full border-t border-white/5 bg-[#1a1a1a] py-12 mt-auto z-10">
            <div className="max-w-6xl mx-auto px-6">
                {/* Main Footer Content - Internal Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {/* Product Section */}
                    <div>
                        <h3 className="text-white font-semibold text-sm mb-4">Product</h3>
                        <ul className="space-y-3">
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
                                    href={`/${locale}/dashboard`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}#features`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}#pricing`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div>
                        <h3 className="text-white font-semibold text-sm mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href={`/${locale}#features`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}#features`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    API
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/dashboard`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    Upload Images
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    CDN Hosting
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href={`/${locale}`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/dashboard`}
                                    className="text-zinc-500 hover:text-brand text-xs transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div>
                        <h3 className="text-white font-semibold text-sm mb-4">Legal</h3>
                        <ul className="space-y-3">
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
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-500 text-xs">{dict.copyright}</p>

                    {/* Quick Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href={`/${locale}`}
                            className="text-zinc-500 hover:text-brand text-xs transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href={`/${locale}/dashboard`}
                            className="text-zinc-500 hover:text-brand text-xs transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={`/${locale}#features`}
                            className="text-zinc-500 hover:text-brand text-xs transition-colors"
                        >
                            Features
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
