import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"

interface RelatedTopicsSectionProps {
    title: string
    locale: Locale
}

const relatedTopics = [
    { name: "Image Hosting", href: "/" },
    { name: "CDN Delivery", href: "/" },
    { name: "URL Shortening", href: "/tools/image-to-short-url" },
    { name: "PNG to URL", href: "/tools/png-to-url" },
    { name: "JPG to URL", href: "/tools/jpg-to-url" },
    { name: "GIF to URL", href: "/tools/gif-to-url" },
    { name: "WebP to URL", href: "/tools/webp-to-url" },
    { name: "SVG Hosting", href: "/tools/svg-to-url" },
    { name: "Base64 to URL", href: "/tools/base64-to-url" },
    { name: "Discord Image Hosting", href: "/use-cases/discord" },
    { name: "Fantasy Sports Logos", href: "/use-cases/fantasy-sports" },
    { name: "Email Images", href: "/use-cases/email" },
    { name: "Photo Sharing", href: "/tools/photo-to-url" },
    { name: "Image Converter", href: "/tools/convert-image-to-link" },
    { name: "Free Image Upload", href: "/tools/free-image-hosting" },
    { name: "Instant Image Link", href: "/tools/image-link-generator" },
    { name: "Shareable Image URL", href: "/tools/create-image-url" },
    { name: "Online Image Hosting", href: "/tools/upload-image-to-url" },
    { name: "Bulk Image Upload", href: "/tools/bulk-upload" },
    { name: "API Integration", href: "/api-docs" },
]

export function RelatedTopicsSection({ title, locale }: RelatedTopicsSectionProps) {
    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    {title}
                </h2>
                <p className="text-zinc-500 text-sm">
                    Explore image hosting solutions and tools
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {relatedTopics.map((topic) => (
                    <Link
                        key={topic.name}
                        href={`/${locale}${topic.href}`}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-xs md:text-sm text-zinc-400 hover:text-white transition-all duration-200"
                    >
                        {topic.name}
                    </Link>
                ))}
            </div>
        </section>
    )
}
