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

    return {
        title: "Privacy Policy | ImageToURL - Your Privacy Matters",
        description: "Learn how ImageToURL protects your privacy with enterprise-grade encryption, transparent data practices, and full user control over your data.",
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

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `https://imagetourl.cloud/${locale}` },
                    { name: "Privacy Policy", url: `https://imagetourl.cloud/${locale}/privacy` }
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
                    <div className="max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                                Privacy Policy
                            </h1>
                            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                                Your privacy is our top priority. We believe in transparency and protecting your data with the highest standards.
                            </p>
                            <p className="text-zinc-500 text-sm mt-4">Last updated: December 2024</p>
                        </div>

                        {/* Key Principles Cards */}
                        <div className="grid md:grid-cols-3 gap-6 mb-16">
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Data Security</h3>
                                <p className="text-zinc-400 text-sm">
                                    Enterprise-grade encryption protects all data in transit and at rest.
                                </p>
                            </div>

                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                                    <Eye className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Transparency</h3>
                                <p className="text-zinc-400 text-sm">
                                    Clear, honest communication about what data we collect and why.
                                </p>
                            </div>

                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                                    <UserCheck className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">User Control</h3>
                                <p className="text-zinc-400 text-sm">
                                    You have control over your data and can request deletion at any time.
                                </p>
                            </div>
                        </div>

                        {/* Information We Collect */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Information We Collect</h2>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 mb-4">
                                <h3 className="text-lg font-semibold text-white mb-4">Technical Information</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-400">IP address for rate limiting and abuse prevention</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-400">Browser type and version for compatibility</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-400">File metadata (size, type, upload time)</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Usage Analytics</h3>
                                <p className="text-zinc-400">
                                    We use Google Analytics to understand how our service is used. This data is anonymized and aggregated.
                                </p>
                            </div>
                        </section>

                        {/* How We Protect Your Data */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">How We Protect Your Data</h2>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5">
                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-3">
                                        <Lock className="w-5 h-5 text-green-400" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-2">HTTPS Encryption</h3>
                                    <p className="text-zinc-400 text-sm">All data transfers use SSL/TLS encryption</p>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5">
                                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
                                        <Cloud className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-2">Cloudflare R2 Storage</h3>
                                    <p className="text-zinc-400 text-sm">Images are stored on secure, encrypted cloud infrastructure</p>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5">
                                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-3">
                                        <UserX className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-2">No Personal Info Required</h3>
                                    <p className="text-zinc-400 text-sm">No registration or personal data needed to use our service</p>
                                </div>
                            </div>
                        </section>

                        {/* Data Retention */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Data Retention</h2>

                            <div className="space-y-4">
                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Cloud className="w-5 h-5 text-brand" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Images</h3>
                                        <p className="text-zinc-400 text-sm">Uploaded images are stored indefinitely unless they violate our terms of service or are manually deleted.</p>
                                    </div>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Technical Logs</h3>
                                        <p className="text-zinc-400 text-sm">Access logs and analytics data are retained for 30 days for security and performance monitoring.</p>
                                    </div>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <AlertCircle className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Error Logs</h3>
                                        <p className="text-zinc-400 text-sm">Technical error logs are retained for 7 days for debugging purposes.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Third-Party Services */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Third-Party Services</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
                                    <h3 className="font-semibold text-white mb-3">Cloudflare R2</h3>
                                    <p className="text-zinc-400 text-sm">
                                        Images are stored on Cloudflare R2, which provides secure object storage with built-in redundancy and DDoS protection.
                                    </p>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
                                    <h3 className="font-semibold text-white mb-3">Google Analytics</h3>
                                    <p className="text-zinc-400 text-sm">
                                        We use Google Analytics to understand usage patterns and improve our service. No personal information is shared.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Your Rights */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Your Rights</h2>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <p className="text-zinc-400 mb-4">You have the right to:</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-300">Access information about the data we process about you</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-300">Request deletion of your uploaded images</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-300">File a complaint with data protection authorities</span>
                                    </li>
                                </ul>
                                <p className="text-zinc-400 mt-4">
                                    To exercise these rights, contact us at{" "}
                                    <a href="mailto:blog.boopul@gmail.com" className="text-brand hover:underline">
                                        blog.boopul@gmail.com
                                    </a>
                                </p>
                            </div>
                        </section>

                        {/* Policy Updates */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Policy Updates</h2>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <p className="text-zinc-400 mb-4">We may update this privacy policy from time to time. We will:</p>
                                <ul className="space-y-3 mb-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-300">Post the updated policy on this page</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-300">Update the "Last updated" date</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-300">Notify users of significant changes</span>
                                    </li>
                                </ul>
                                <p className="text-zinc-400">
                                    Continued use of our service after changes constitutes acceptance of the updated policy.
                                </p>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section className="text-center">
                            <div className="bg-gradient-to-r from-brand/10 to-blue-500/10 border border-zinc-800 rounded-2xl p-8">
                                <div className="w-16 h-16 bg-brand/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-brand" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Questions about your privacy?</h2>
                                <p className="text-zinc-400 mb-6">We're here to help with any concerns about your data.</p>
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
