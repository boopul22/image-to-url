import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { NavAuth } from "@/components/nav-auth"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import type { Metadata } from "next"
import { Shield, Eye, UserCheck, Lock, Cloud, UserX, Clock, AlertCircle, Mail } from "lucide-react"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params
    const dict = await getDictionary(locale)

    return {
        title: dict.pages.privacy.metaTitle,
        description: dict.pages.privacy.metaDescription,
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/privacy`,
        },
    }
}

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    { name: dict.nav.home, url: `https://www.imagetourl.cloud/${locale}` },
                    { name: dict.pages.privacy.title, url: `https://www.imagetourl.cloud/${locale}/privacy` }
                ]}
            />

            <div className="bg-dark text-zinc-300 min-h-screen flex flex-col">
                {/* Ambient Glow Background */}
                <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[120px] pointer-events-none opacity-40 z-0" />
                <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none opacity-20 z-0" />

                {/* Navigation */}
                <Header locale={locale} dict={dict.nav}>
                    <Suspense
                        fallback={
                            <div className="flex items-center justify-end min-w-[120px]">
                                <Button
                                    size="sm"
                                    className="bg-white text-dark rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                    disabled
                                >
                                    {dict.nav.signIn}
                                </Button>
                            </div>
                        }
                    >
                        <NavAuth locale={locale} signInText={dict.nav.signIn} />
                    </Suspense>
                </Header>

                {/* Main Content */}
                <main className="flex-grow relative z-10 px-4 py-12 md:py-20">
                    <div className="max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                                {dict.pages.privacy.title}
                            </h1>
                            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                                {dict.pages.privacy.metaDescription}
                            </p>
                            <p className="text-zinc-500 text-sm mt-4">{dict.pages.privacy.lastUpdated}</p>
                        </div>

                        <div className="space-y-12 mb-16">
                            {dict.pages.privacy.sections.map((section, index) => (
                                <section key={index} className="mb-12">
                                    <h2 className="text-2xl font-bold text-white mb-6">{section.title}</h2>
                                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                        <p className="text-zinc-400 leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                </section>
                            ))}
                        </div>

                        {/* Contact Section */}
                        <section className="text-center">
                            <div className="bg-gradient-to-r from-brand/10 to-blue-500/10 border border-zinc-800 rounded-2xl p-8">
                                <div className="w-16 h-16 bg-brand/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-brand" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Questions about your privacy?</h2>
                                <p className="text-zinc-400 mb-6">We&apos;re here to help with any concerns about your data.</p>
                                <a
                                    href="mailto:blog.boopul@gmail.com"
                                    className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-medium px-6 py-3 rounded-full transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    Contact us at: blog.boopul@gmail.com
                                </a>
                            </div>
                        </section>
                    </div>
                </main>

                {/* Footer */}
                <Footer locale={locale} dict={dict.footer} />
            </div>
        </>
    )
}
