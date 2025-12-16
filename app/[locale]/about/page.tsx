import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { NavAuth } from "@/components/nav-auth"
import { BreadcrumbJsonLd, OrganizationJsonLd } from "@/components/json-ld"
import type { Metadata } from "next"
import { Globe, Zap, Shield, Clock } from "lucide-react"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const about = dict.pages?.about

    return {
        title: about?.metaTitle || "About ImageToURL - Free Image Hosting Service",
        description: about?.metaDescription || "Learn about ImageToURL, the free image hosting platform that provides instant shareable links powered by a global CDN.",
        alternates: {
            canonical: `https://imagetourl.cloud/${locale}/about`,
        },
    }
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const about = dict.pages?.about || {
        title: "About ImageToURL",
        subtitle: "Free, Fast, and Reliable Image Hosting",
        mission: {
            title: "Our Mission",
            content: "We believe sharing images should be simple, fast, and free. ImageToURL was built to provide developers, designers, and everyday users with an effortless way to upload images and get instant shareable links."
        },
        features: [
            {
                icon: "globe",
                title: "Global CDN",
                description: "Images are served from edge locations worldwide for lightning-fast delivery anywhere."
            },
            {
                icon: "zap",
                title: "Instant Links",
                description: "Upload any image and get a shareable URL in seconds. No waiting, no complexity."
            },
            {
                icon: "shield",
                title: "Secure & Private",
                description: "All uploads are encrypted. We don't sell your data or track you with ads."
            },
            {
                icon: "clock",
                title: "Flexible Retention",
                description: "Sign in to manage how long your images are stored, from 1 hour to forever."
            }
        ],
        team: {
            title: "Built with Care",
            content: "ImageToURL is an indie project focused on simplicity and user experience. We're constantly improving based on user feedback."
        },
        contact: {
            title: "Get in Touch",
            content: "Have questions, feedback, or partnership inquiries? We'd love to hear from you.",
            email: "contact@imagetourl.cloud"
        }
    }

    const iconMap: Record<string, React.ReactNode> = {
        globe: <Globe className="w-6 h-6" />,
        zap: <Zap className="w-6 h-6" />,
        shield: <Shield className="w-6 h-6" />,
        clock: <Clock className="w-6 h-6" />
    }

    return (
        <>
            <OrganizationJsonLd />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `https://imagetourl.cloud/${locale}` },
                    { name: about.title, url: `https://imagetourl.cloud/${locale}/about` }
                ]}
            />

            <div className="bg-dark text-zinc-300 min-h-screen flex flex-col">
                <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[120px] pointer-events-none opacity-40 z-0" />
                <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none opacity-20 z-0" />

                <Header locale={locale} dict={dict.nav}>
                    <Suspense
                        fallback={
                            <Button
                                size="sm"
                                className="bg-white text-dark rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                disabled
                            >
                                {dict.nav.signIn}
                            </Button>
                        }
                    >
                        <NavAuth locale={locale} signInText={dict.nav.signIn} />
                    </Suspense>
                </Header>

                <main className="flex-grow relative z-10 px-4 py-12 md:py-20">
                    <div className="max-w-4xl mx-auto">
                        {/* Hero */}
                        <div className="text-center mb-16">
                            <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-4">
                                {about.title}
                            </h1>
                            <p className="text-xl text-zinc-400">{about.subtitle}</p>
                        </div>

                        {/* Mission */}
                        <section className="mb-16">
                            <h2 className="text-2xl font-medium text-white mb-4">{about.mission.title}</h2>
                            <p className="text-zinc-400 leading-relaxed text-lg">{about.mission.content}</p>
                        </section>

                        {/* Features Grid */}
                        <section className="mb-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {about.features.map((feature: { icon: string; title: string; description: string }, index: number) => (
                                    <div key={index} className="p-6 rounded-xl bg-white/5 border border-white/10">
                                        <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4">
                                            {iconMap[feature.icon] || <Globe className="w-6 h-6" />}
                                        </div>
                                        <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                                        <p className="text-zinc-400">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Team */}
                        <section className="mb-16">
                            <h2 className="text-2xl font-medium text-white mb-4">{about.team.title}</h2>
                            <p className="text-zinc-400 leading-relaxed">{about.team.content}</p>
                        </section>

                        {/* Contact */}
                        <section className="p-8 rounded-xl bg-white/5 border border-white/10 text-center">
                            <h2 className="text-2xl font-medium text-white mb-4">{about.contact.title}</h2>
                            <p className="text-zinc-400 mb-4">{about.contact.content}</p>
                            <a
                                href={`mailto:${about.contact.email}`}
                                className="inline-flex items-center text-brand hover:text-brand/80 transition-colors"
                            >
                                {about.contact.email}
                            </a>
                        </section>
                    </div>
                </main>

                <Footer locale={locale} dict={dict.footer} />
            </div>
        </>
    )
}
