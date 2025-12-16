import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { NavAuth } from "@/components/nav-auth"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import type { Metadata } from "next"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const cookies = dict.pages?.cookies

    return {
        title: cookies?.metaTitle || "Cookie Policy | ImageToURL",
        description: cookies?.metaDescription || "Learn about how ImageToURL uses cookies on our website.",
        alternates: {
            canonical: `https://imagetourl.cloud/${locale}/cookies`,
        },
    }
}

export default async function CookiesPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const cookies = dict.pages?.cookies || {
        title: "Cookie Policy",
        lastUpdated: "Last updated: December 2024",
        intro: "This Cookie Policy explains how ImageToURL uses cookies and similar technologies when you visit our website.",
        sections: [
            {
                title: "What Are Cookies?",
                content: "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience."
            },
            {
                title: "Essential Cookies",
                content: "We use essential cookies that are necessary for the website to function properly. These include authentication cookies to keep you signed in and security cookies to protect against threats."
            },
            {
                title: "Functional Cookies",
                content: "We use functional cookies to remember your preferences, such as your selected language and theme (light/dark mode)."
            },
            {
                title: "Analytics",
                content: "We use Vercel Analytics to understand how visitors interact with our website. This helps us improve the user experience. These analytics are privacy-focused and do not use cookies for tracking."
            },
            {
                title: "Third-Party Cookies",
                content: "We do not use third-party advertising cookies. Our authentication service (Supabase) may set cookies for session management."
            },
            {
                title: "Managing Cookies",
                content: "You can control cookies through your browser settings. Note that disabling essential cookies may affect the functionality of the website."
            }
        ]
    }

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `https://imagetourl.cloud/${locale}` },
                    { name: cookies.title, url: `https://imagetourl.cloud/${locale}/cookies` }
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
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
                            {cookies.title}
                        </h1>
                        <p className="text-zinc-500 text-sm mb-8">{cookies.lastUpdated}</p>
                        <p className="text-zinc-400 leading-relaxed mb-12">{cookies.intro}</p>

                        <div className="space-y-8">
                            {cookies.sections.map((section: { title: string; content: string }, index: number) => (
                                <section key={index} className="space-y-3">
                                    <h2 className="text-xl font-medium text-white">{section.title}</h2>
                                    <p className="text-zinc-400 leading-relaxed">{section.content}</p>
                                </section>
                            ))}
                        </div>
                    </div>
                </main>

                <Footer locale={locale} dict={dict.footer} />
            </div>
        </>
    )
}
