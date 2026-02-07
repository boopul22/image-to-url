import Link from "next/link"
import {
    MessageSquare,
    Code,
    Mail,
    ShoppingBag,
    FileText,
    Share2
} from "lucide-react"

interface UseCase {
    icon: React.ReactNode
    title: string
    description: string
    href: string
}

interface UseCasesHighlightsSectionProps {
    title: string
    subtitle: string
    locale: string
}

const useCases: UseCase[] = [
    {
        icon: <MessageSquare className="w-6 h-6" />,
        title: "Discord & Slack",
        description: "Share images in bots, custom emojis, and server icons with direct URLs",
        href: "/use-cases/discord",
    },
    {
        icon: <Code className="w-6 h-6" />,
        title: "HTML & CSS",
        description: "Embed images in websites with reliable, fast-loading URLs",
        href: "/use-cases/html-css",
    },
    {
        icon: <Mail className="w-6 h-6" />,
        title: "Email Marketing",
        description: "Add images to newsletters and campaigns with hosted URLs",
        href: "/use-cases/email",
    },
    {
        icon: <ShoppingBag className="w-6 h-6" />,
        title: "E-commerce",
        description: "Host product images for marketplaces and online stores",
        href: "/use-cases/ecommerce",
    },
    {
        icon: <FileText className="w-6 h-6" />,
        title: "Documentation",
        description: "Add screenshots and diagrams to your docs and wikis",
        href: "/use-cases/documentation",
    },
    {
        icon: <Share2 className="w-6 h-6" />,
        title: "Social Media",
        description: "Create shareable links for Twitter, Facebook, and forums",
        href: "/use-cases/social-media",
    },
]

export function UseCasesHighlightsSection({ title, subtitle, locale }: UseCasesHighlightsSectionProps) {
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {useCases.map((useCase) => (
                    <Link
                        key={useCase.title}
                        href={`/${locale}${useCase.href}`}
                        className="group flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20"
                    >
                        <div className="flex-shrink-0 p-2.5 bg-brand/10 rounded-lg text-brand group-hover:bg-brand/20 transition-colors">
                            {useCase.icon}
                        </div>
                        <div>
                            <h3 className="text-white font-medium text-sm mb-1 group-hover:text-brand transition-colors">
                                {useCase.title}
                            </h3>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                {useCase.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
