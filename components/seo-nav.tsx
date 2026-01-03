import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"

interface SeoNavProps {
    locale: Locale
}

/**
 * Server-side navigation component for SEO purposes.
 * This component renders navigation links that are visible to search engine crawlers
 * that don't execute JavaScript. It's visually hidden but accessible to crawlers.
 */
export function SeoNav({ locale }: SeoNavProps) {
    const toolLinks = [
        { name: "JPG to URL", href: "/tools/jpg-to-url" },
        { name: "PNG to URL", href: "/tools/png-to-url" },
        { name: "GIF to URL", href: "/tools/gif-to-url" },
        { name: "SVG to URL", href: "/tools/svg-to-url" },
        { name: "WebP to URL", href: "/tools/webp-to-url" },
        { name: "PDF to URL", href: "/tools/pdf-to-url" },
        { name: "Base64 to URL", href: "/tools/base64-to-url" },
        { name: "Bulk Upload", href: "/tools/bulk-upload" },
        { name: "Video to URL", href: "/tools/video-to-url" },
        { name: "QR to URL", href: "/tools/qr-to-url" },
        { name: "Image to Short URL", href: "/tools/image-to-short-url" },
        { name: "Free Image Hosting", href: "/tools/free-image-hosting" },
    ]

    const useCaseLinks = [
        { name: "Discord Images", href: "/use-cases/discord" },
        { name: "HTML & CSS", href: "/use-cases/html" },
        { name: "Fantasy Sports", href: "/use-cases/fantasy-sports" },
        { name: "ESPN Fantasy", href: "/use-cases/espn-fantasy" },
        { name: "Minecraft", href: "/use-cases/minecraft" },
        { name: "Roblox", href: "/use-cases/roblox" },
        { name: "VRChat", href: "/use-cases/vrchat" },
        { name: "Telegram", href: "/use-cases/telegram" },
        { name: "React", href: "/use-cases/react" },
        { name: "JavaScript", href: "/use-cases/javascript" },
        { name: "Python", href: "/use-cases/python" },
        { name: "Node.js", href: "/use-cases/nodejs" },
    ]

    const mainLinks = [
        { name: "Home", href: "" },
        { name: "Blog", href: "/blog" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
    ]

    return (
        <nav
            aria-label="Site navigation"
            className="sr-only"
        // Visually hidden but accessible to screen readers and crawlers
        >
            <h2 className="sr-only">Site Navigation</h2>

            {/* Main Navigation */}
            <ul>
                {mainLinks.map((link) => (
                    <li key={link.href}>
                        <Link href={`/${locale}${link.href}`}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Tools */}
            <h3 className="sr-only">Image Tools</h3>
            <ul>
                {toolLinks.map((link) => (
                    <li key={link.href}>
                        <Link href={`/${locale}${link.href}`}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Use Cases */}
            <h3 className="sr-only">Use Cases</h3>
            <ul>
                {useCaseLinks.map((link) => (
                    <li key={link.href}>
                        <Link href={`/${locale}${link.href}`}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
