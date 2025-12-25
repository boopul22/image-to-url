import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { NavAuth } from "@/components/nav-auth"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import type { Metadata } from "next"
import { Check, X } from "lucide-react"
import Link from "next/link"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const pricing = dict.pages?.pricing

    return {
        title: pricing?.metaTitle || "Pricing & Features - ImageToURL",
        description: pricing?.metaDescription || "Discover ImageToURL features. Free image hosting with unlimited uploads for signed-in users.",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/pricing`,
        },
    }
}

export default async function PricingPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const pricing = dict.pages?.pricing || {
        title: "Simple, Transparent Pricing",
        subtitle: "Start free, stay free. ImageToURL is built to be accessible to everyone.",
        plans: [
            {
                name: "Anonymous",
                price: "Free",
                description: "No account needed",
                features: [
                    { text: "5 uploads per day", included: true },
                    { text: "Up to 10MB per file", included: true },
                    { text: "30-day retention", included: true },
                    { text: "Global CDN delivery", included: true },
                    { text: "Manage uploads", included: false },
                    { text: "Custom expiration", included: false },
                ],
                cta: "Start Uploading",
                ctaLink: "/",
                highlighted: false
            },
            {
                name: "Signed In",
                price: "Free",
                description: "Create a free account",
                features: [
                    { text: "Unlimited uploads", included: true },
                    { text: "Up to 10MB per file", included: true },
                    { text: "Custom retention (1hr - forever)", included: true },
                    { text: "Global CDN delivery", included: true },
                    { text: "Manage all uploads", included: true },
                    { text: "Dashboard access", included: true },
                ],
                cta: "Sign Up Free",
                ctaLink: "/auth/login",
                highlighted: true
            }
        ],
        faq: {
            title: "Questions?",
            content: "Have questions about our features? Check out our FAQ on the home page or contact us.",
        }
    }

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `https://www.imagetourl.cloud/${locale}` },
                    { name: pricing.title, url: `https://www.imagetourl.cloud/${locale}/pricing` }
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
                    <div className="max-w-5xl mx-auto">
                        {/* Hero */}
                        <div className="text-center mb-16">
                            <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-4">
                                {pricing.title}
                            </h1>
                            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">{pricing.subtitle}</p>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
                            {pricing.plans.map((plan: {
                                name: string
                                price: string
                                description: string
                                features: { text: string; included: boolean }[]
                                cta: string
                                ctaLink: string
                                highlighted: boolean
                            }, index: number) => (
                                <div
                                    key={index}
                                    className={`relative p-8 rounded-2xl border ${plan.highlighted
                                            ? "bg-white/10 border-brand"
                                            : "bg-white/5 border-white/10"
                                        }`}
                                >
                                    {plan.highlighted && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand text-dark text-xs font-medium rounded-full">
                                            Recommended
                                        </div>
                                    )}
                                    <div className="text-center mb-6">
                                        <h2 className="text-xl font-medium text-white mb-2">{plan.name}</h2>
                                        <div className="text-4xl font-semibold text-white mb-1">{plan.price}</div>
                                        <p className="text-zinc-500 text-sm">{plan.description}</p>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature: { text: string; included: boolean }, fIndex: number) => (
                                            <li key={fIndex} className="flex items-center gap-3">
                                                {feature.included ? (
                                                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                ) : (
                                                    <X className="w-5 h-5 text-zinc-600 flex-shrink-0" />
                                                )}
                                                <span className={feature.included ? "text-zinc-300" : "text-zinc-600"}>
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href={`/${locale}${plan.ctaLink}`}>
                                        <Button
                                            className={`w-full ${plan.highlighted
                                                    ? "bg-brand hover:bg-brand/90 text-dark"
                                                    : "bg-white/10 hover:bg-white/20 text-white"
                                                }`}
                                        >
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* FAQ Link */}
                        <div className="text-center">
                            <h2 className="text-xl font-medium text-white mb-2">{pricing.faq.title}</h2>
                            <p className="text-zinc-400">{pricing.faq.content}</p>
                        </div>
                    </div>
                </main>

                <Footer locale={locale} dict={dict.footer} />
            </div>
        </>
    )
}
