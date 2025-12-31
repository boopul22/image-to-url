import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { NavAuth } from "@/components/nav-auth"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import type { Metadata } from "next"
import {
    Cookie,
    ShieldCheck,
    BarChart3,
    CheckCircle,
    Info,
    Settings,
    Mail,
    Eye,
    Target,
    RefreshCw,
    Globe,
    Lock
} from "lucide-react"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params

    return {
        title: "Cookie Policy | ImageToURL - Transparency & Consent",
        description: "Learn how ImageToURL uses cookies. We use Google AdSense and Analytics cookies with your consent. Manage your cookie preferences anytime.",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/cookies`,
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

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `https://www.imagetourl.cloud/${locale}` },
                    { name: "Cookie Policy", url: `https://www.imagetourl.cloud/${locale}/cookies` }
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
                            <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-2 mb-6">
                                <ShieldCheck className="w-4 h-4 text-brand" />
                                <span className="text-sm text-brand">GDPR & AdSense Compliant</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                                Cookie Policy
                            </h1>
                            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                                We believe in transparency. This policy explains how we use cookies and how you can control your preferences.
                            </p>
                            <p className="text-zinc-500 text-sm mt-4">Last updated: December 2024</p>
                        </div>

                        {/* What Are Cookies */}
                        <section className="mb-12">
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Cookie className="w-6 h-6 text-brand" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">What Are Cookies?</h2>
                                        <p className="text-zinc-400 leading-relaxed">
                                            Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, understand how you use the site, and deliver relevant content and advertisements.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Types of Cookies We Use */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Types of Cookies We Use</h2>

                            <div className="space-y-4">
                                {/* Essential Cookies */}
                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                                            <Lock className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Essential Cookies</h3>
                                            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Required</span>
                                        </div>
                                    </div>
                                    <p className="text-zinc-400 text-sm mb-4">
                                        These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as logging in or filling in forms.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300 text-sm">Authentication and session management</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300 text-sm">Security and fraud prevention</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300 text-sm">Load balancing and site functionality</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Preference Cookies */}
                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                            <Settings className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Preference Cookies</h3>
                                            <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">Functional</span>
                                        </div>
                                    </div>
                                    <p className="text-zinc-400 text-sm mb-4">
                                        These cookies remember your preferences and settings to provide a more personalized experience.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300 text-sm">Language preferences</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300 text-sm">Theme settings (dark/light mode)</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Analytics Cookies */}
                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                            <BarChart3 className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Analytics Cookies</h3>
                                            <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Performance</span>
                                        </div>
                                    </div>
                                    <p className="text-zinc-400 text-sm mb-4">
                                        These cookies help us understand how visitors interact with our website, allowing us to improve performance and user experience.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                                        <div className="bg-zinc-800/50 rounded-xl p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-white font-bold text-sm">▲</span>
                                                <span className="font-medium text-white text-sm">Vercel Analytics</span>
                                            </div>
                                            <p className="text-zinc-400 text-xs">Privacy-focused website performance monitoring</p>
                                        </div>
                                        <div className="bg-zinc-800/50 rounded-xl p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-orange-400 font-bold text-sm">G</span>
                                                <span className="font-medium text-white text-sm">Google Analytics</span>
                                            </div>
                                            <p className="text-zinc-400 text-xs">Understanding usage patterns and site improvements</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Advertising Cookies */}
                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                                            <Target className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Advertising Cookies</h3>
                                            <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">Targeting</span>
                                        </div>
                                    </div>
                                    <p className="text-zinc-400 text-sm mb-4">
                                        We use Google AdSense to display advertisements. These cookies are used to show you relevant ads based on your interests.
                                    </p>
                                    <div className="bg-zinc-800/50 rounded-xl p-4 mt-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-blue-400 font-bold text-sm">G</span>
                                            <span className="font-medium text-white text-sm">Google AdSense</span>
                                        </div>
                                        <p className="text-zinc-400 text-xs mb-3">Third-party cookies used for personalized advertising</p>
                                        <ul className="space-y-1.5">
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                                                <span className="text-zinc-300 text-xs">Serve ads based on prior visits to our site or other sites</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                                                <span className="text-zinc-300 text-xs">Frequency capping and ad reporting</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                                                <span className="text-zinc-300 text-xs">Combat fraud and abuse</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Third-Party Vendors */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Third-Party Vendors</h2>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Globe className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">Google and Third-Party Cookies</h3>
                                        <p className="text-zinc-400 text-sm mb-4">
                                            Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 mt-4">
                                    <div className="flex items-start gap-3">
                                        <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-zinc-300 text-sm">
                                                <strong className="text-white">Opt-out of personalized advertising:</strong> You can opt out of personalized advertising by visiting{" "}
                                                <a
                                                    href="https://www.google.com/settings/ads"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-brand hover:underline"
                                                >
                                                    Google Ads Settings
                                                </a>
                                                {" "}or{" "}
                                                <a
                                                    href="https://www.aboutads.info/choices/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-brand hover:underline"
                                                >
                                                    www.aboutads.info
                                                </a>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Your Consent & Choices */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Your Consent & Choices</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <h3 className="font-semibold text-white">Consent</h3>
                                    </div>
                                    <p className="text-zinc-400 text-sm">
                                        By using our website, you consent to the use of cookies as described in this policy. For users in the EEA, UK, and Switzerland, we obtain explicit consent before setting non-essential cookies.
                                    </p>
                                </div>

                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                            <RefreshCw className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <h3 className="font-semibold text-white">Withdraw Consent</h3>
                                    </div>
                                    <p className="text-zinc-400 text-sm">
                                        You can withdraw your consent at any time by accessing "Privacy and cookie settings" at the bottom of the page or by adjusting your browser settings.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Managing Cookies */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Managing Cookies</h2>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Settings className="w-5 h-5 text-brand" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">Browser Settings</h3>
                                        <p className="text-zinc-400 text-sm mb-4">
                                            Most web browsers allow you to control cookies through their settings. You can:
                                        </p>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-zinc-300 text-sm">View and delete cookies stored on your device</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-zinc-300 text-sm">Block all cookies or only third-party cookies</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-zinc-300 text-sm">Clear cookies when you close your browser</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-zinc-300 text-sm">Open a "private" browsing session</span>
                                            </li>
                                        </ul>
                                        <p className="text-zinc-500 text-xs mt-4 italic">
                                            Note: Blocking essential cookies may affect website functionality. Blocking advertising cookies means you'll see non-personalized ads.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Data Retention */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Cookie Retention</h2>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-zinc-800">
                                            <th className="text-left py-3 px-4 text-white font-medium">Cookie Type</th>
                                            <th className="text-left py-3 px-4 text-white font-medium">Duration</th>
                                            <th className="text-left py-3 px-4 text-white font-medium">Purpose</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-zinc-400">
                                        <tr className="border-b border-zinc-800/50">
                                            <td className="py-3 px-4">Session cookies</td>
                                            <td className="py-3 px-4">Until browser closes</td>
                                            <td className="py-3 px-4">Authentication</td>
                                        </tr>
                                        <tr className="border-b border-zinc-800/50">
                                            <td className="py-3 px-4">Preference cookies</td>
                                            <td className="py-3 px-4">1 year</td>
                                            <td className="py-3 px-4">Remember settings</td>
                                        </tr>
                                        <tr className="border-b border-zinc-800/50">
                                            <td className="py-3 px-4">Analytics cookies</td>
                                            <td className="py-3 px-4">Up to 2 years</td>
                                            <td className="py-3 px-4">Usage analysis</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">Advertising cookies</td>
                                            <td className="py-3 px-4">Up to 2 years</td>
                                            <td className="py-3 px-4">Personalized ads</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Updates */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">Policy Updates</h2>
                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <p className="text-zinc-400">
                                    We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will update the "Last updated" date at the top of this policy. Continued use of our website after changes constitutes acceptance of the updated policy.
                                </p>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section className="text-center">
                            <div className="bg-gradient-to-r from-brand/10 to-blue-500/10 border border-zinc-800 rounded-2xl p-8">
                                <div className="w-16 h-16 bg-brand/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-brand" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Questions About Cookies?</h2>
                                <p className="text-zinc-400 mb-6">If you have any questions about our use of cookies or this policy, please contact us.</p>
                                <a
                                    href="mailto:boopul22@gmail.com"
                                    className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-medium px-6 py-3 rounded-full transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    Contact us at: boopul22@gmail.com
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
