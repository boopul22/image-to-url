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
    const terms = dict.pages?.terms

    return {
        title: terms?.metaTitle || "Terms of Service | ImageToURL",
        description: terms?.metaDescription || "Read the terms and conditions for using ImageToURL image hosting service.",
        alternates: {
            canonical: `https://imagetourl.cloud/${locale}/terms`,
        },
    }
}

export default async function TermsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const terms = dict.pages?.terms || {
        title: "Terms of Service",
        lastUpdated: "Last updated: December 2024",
        sections: [
            {
                title: "Acceptance of Terms",
                content: "By accessing or using ImageToURL, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service."
            },
            {
                title: "Service Description",
                content: "ImageToURL provides free image hosting and URL generation services. We reserve the right to modify, suspend, or discontinue any part of the service at any time."
            },
            {
                title: "User Responsibilities",
                content: "You are responsible for all content you upload. You must not upload illegal content, malware, or content that infringes on others' intellectual property rights."
            },
            {
                title: "Prohibited Content",
                content: "The following content is strictly prohibited: illegal material, malware or viruses, content that infringes copyrights, adult content involving minors, content promoting violence or hate."
            },
            {
                title: "Account Termination",
                content: "We reserve the right to terminate accounts that violate these terms, upload prohibited content, or abuse the service in any way."
            },
            {
                title: "Limitation of Liability",
                content: "ImageToURL is provided 'as is' without warranties. We are not liable for any data loss, service interruptions, or damages arising from your use of the service."
            },
            {
                title: "Changes to Terms",
                content: "We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms."
            }
        ]
    }

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `https://imagetourl.cloud/${locale}` },
                    { name: terms.title, url: `https://imagetourl.cloud/${locale}/terms` }
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
                            {terms.title}
                        </h1>
                        <p className="text-zinc-500 text-sm mb-12">{terms.lastUpdated}</p>

                        <div className="space-y-8">
                            {terms.sections.map((section: { title: string; content: string }, index: number) => (
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
