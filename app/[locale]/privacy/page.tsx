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
    const privacy = dict.pages?.privacy

    return {
        title: privacy?.metaTitle || "Privacy Policy | ImageToURL",
        description: privacy?.metaDescription || "Learn how ImageToURL collects, uses, and protects your personal information.",
        alternates: {
            canonical: `https://imagetourl.cloud/${locale}/privacy`,
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
    const privacy = dict.pages?.privacy || {
        title: "Privacy Policy",
        lastUpdated: "Last updated: December 2024",
        sections: [
            {
                title: "Information We Collect",
                content: "We collect information you provide directly, such as your email address when you sign in. We also automatically collect certain information when you use our service, including your IP address and browser type."
            },
            {
                title: "How We Use Your Information",
                content: "We use the information we collect to provide and improve our image hosting service, communicate with you about your account, and ensure the security of our platform."
            },
            {
                title: "Data Storage",
                content: "Your uploaded images are stored on enterprise-grade cloud infrastructure with encryption. Anonymous uploads are automatically deleted after 30 days. Signed-in users can manage their upload retention settings."
            },
            {
                title: "Cookies",
                content: "We use essential cookies to enable core functionality like user authentication. We do not use tracking cookies for advertising purposes."
            },
            {
                title: "Third-Party Services",
                content: "We use Cloudflare for CDN and security services, and Supabase for authentication. These services have their own privacy policies."
            },
            {
                title: "Your Rights",
                content: "You can request access to, correction of, or deletion of your personal data at any time by contacting us."
            },
            {
                title: "Contact",
                content: "If you have questions about this Privacy Policy, please contact us at privacy@imagetourl.cloud"
            }
        ]
    }

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `https://imagetourl.cloud/${locale}` },
                    { name: privacy.title, url: `https://imagetourl.cloud/${locale}/privacy` }
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

                {/* Main Content */}
                <main className="flex-grow relative z-10 px-4 py-12 md:py-20">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
                            {privacy.title}
                        </h1>
                        <p className="text-zinc-500 text-sm mb-12">{privacy.lastUpdated}</p>

                        <div className="space-y-8">
                            {privacy.sections.map((section: { title: string; content: string }, index: number) => (
                                <section key={index} className="space-y-3">
                                    <h2 className="text-xl font-medium text-white">{section.title}</h2>
                                    <p className="text-zinc-400 leading-relaxed">{section.content}</p>
                                </section>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <Footer locale={locale} dict={dict.footer} />
            </div>
        </>
    )
}
