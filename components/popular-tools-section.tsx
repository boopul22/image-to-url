import Link from "next/link"
import { Image, FileImage, Layers, Zap, Upload, Code2, Globe, Palette } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"

interface PopularToolsSectionProps {
    title: string
    subtitle: string
    locale: Locale
}

const tools = [
    {
        name: "Image to URL",
        description: "Convert any image to a shareable URL instantly. Supports JPG, PNG, GIF, SVG, WebP.",
        icon: Image,
        href: "/tools/image-to-url",
        featured: true,
    },
    {
        name: "PNG to URL",
        description: "Upload PNG images and get direct links. Perfect for transparent graphics and logos.",
        icon: FileImage,
        href: "/tools/png-to-url",
    },
    {
        name: "JPG to URL",
        description: "Convert JPEG photos to shareable links. Ideal for photographs and web images.",
        icon: Layers,
        href: "/tools/jpg-to-url",
    },
    {
        name: "GIF to URL",
        description: "Host animated GIFs and get instant URLs. Perfect for memes and animations.",
        icon: Zap,
        href: "/tools/gif-to-url",
    },
    {
        name: "Bulk Upload",
        description: "Upload multiple images at once. Get URLs for up to 20 images simultaneously.",
        icon: Upload,
        href: "/tools/bulk-upload",
    },
    {
        name: "Base64 to URL",
        description: "Convert base64-encoded images to hosted URLs. Great for embedded image data.",
        icon: Code2,
        href: "/tools/base64-to-url",
    },
    {
        name: "WebP to URL",
        description: "Host WebP images with modern compression. Optimized for faster web delivery.",
        icon: Globe,
        href: "/tools/webp-to-url",
    },
    {
        name: "SVG to URL",
        description: "Upload vector graphics and get direct links. Scalable images for any resolution.",
        icon: Palette,
        href: "/tools/svg-to-url",
    },
]

export function PopularToolsSection({ title, subtitle, locale }: PopularToolsSectionProps) {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                    {title}
                </h2>
                <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">
                    {subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tools.map((tool) => {
                    const Icon = tool.icon
                    return (
                        <Link
                            key={tool.name}
                            href={`/${locale}${tool.href}`}
                            className={`group relative p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${tool.featured
                                    ? "bg-gradient-to-br from-brand/10 to-brand/5 border-brand/30 hover:border-brand/50"
                                    : "bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20"
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${tool.featured
                                    ? "bg-brand/20 text-brand"
                                    : "bg-white/10 text-zinc-400 group-hover:text-white"
                                }`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-medium mb-2">{tool.name}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                {tool.description}
                            </p>
                            {tool.featured && (
                                <span className="absolute top-3 right-3 px-2 py-0.5 bg-brand/20 text-brand text-xs font-medium rounded-full">
                                    Popular
                                </span>
                            )}
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
