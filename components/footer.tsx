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
        <footer className="w-full border-t border-white/5 bg-[#1a1a1a] py-8 mt-auto z-10">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-zinc-500 text-xs">{dict.copyright}</p>
                <div className="flex items-center gap-6">
                    <Link
                        href={`/${locale}/about`}
                        className="text-zinc-500 hover:text-brand text-xs transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        href={`/${locale}/privacy`}
                        className="text-zinc-500 hover:text-brand text-xs transition-colors"
                    >
                        {dict.privacy}
                    </Link>
                    <Link
                        href={`/${locale}/terms`}
                        className="text-zinc-500 hover:text-brand text-xs transition-colors"
                    >
                        {dict.terms}
                    </Link>
                    <Link
                        href={`/${locale}/cookies`}
                        className="text-zinc-500 hover:text-brand text-xs transition-colors"
                    >
                        {dict.cookies}
                    </Link>
                </div>
            </div>
        </footer>
    )
}
