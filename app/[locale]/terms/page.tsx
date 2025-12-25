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
    FileImage,
    Cloud,
    HardDrive,
    Link,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Clock,
    Shield,
    Scale,
    FileWarning,
    Trash2,
    Mail
} from "lucide-react"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params

    return {
        title: "Terms of Service | ImageToURL - Usage Guidelines",
        description: "Read the terms and conditions for using ImageToURL. Free image hosting with permanent URLs, maximum 2MB file size, and content guidelines.",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/terms`,
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

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `https://www.imagetourl.cloud/${locale}` },
                    { name: "Terms of Service", url: `https://www.imagetourl.cloud/${locale}/terms` }
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
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                                Terms of Service
                            </h1>
                            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                                Please read these terms carefully before using ImageToURL. By using our service, you agree to these conditions.
                            </p>
                        </div>

                        {/* Quick Summary Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
                                <FileImage className="w-8 h-8 text-brand mx-auto mb-2" />
                                <p className="text-sm text-zinc-300">Free image hosting service</p>
                            </div>
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
                                <Cloud className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                <p className="text-sm text-zinc-300">Cloud photo storage</p>
                            </div>
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
                                <HardDrive className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                                <p className="text-sm text-zinc-300">Maximum file size: 2MB</p>
                            </div>
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
                                <Link className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                                <p className="text-sm text-zinc-300">Permanent URLs for valid content</p>
                            </div>
                        </div>

                        {/* Acceptance of Terms */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <p className="text-zinc-400 mb-4">
                                    By accessing and using ImageToURL (the "Service"), you accept and agree to be bound by the terms and provision of this agreement.
                                </p>
                                <p className="text-zinc-400">
                                    If you do not agree to abide by the above, please do not use this service.
                                </p>
                            </div>
                        </section>

                        {/* Use License */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Use License</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Permitted Uses */}
                                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                                        <h3 className="font-semibold text-white">Permission is granted to:</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300">Upload images that you own or have the right to share</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300">Use the generated URLs for personal and commercial purposes</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300">Embed images in websites, blogs, and applications</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Prohibited Uses */}
                                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <XCircle className="w-5 h-5 text-red-400" />
                                        <h3 className="font-semibold text-white">You may NOT:</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300">Upload copyrighted material without permission</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300">Submit illegal, harmful, or offensive content</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300">Attempt to circumvent security measures</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-zinc-300">Use the service for spam or malicious activities</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Prohibited Content */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Prohibited Content</h2>
                            <p className="text-zinc-400 mb-6">The following types of content are strictly prohibited on ImageToURL:</p>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <AlertTriangle className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Illegal Content</h3>
                                        <p className="text-zinc-400 text-sm">Any content that violates local, national, or international laws</p>
                                    </div>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <XCircle className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Adult Content</h3>
                                        <p className="text-zinc-400 text-sm">Pornographic or sexually explicit material</p>
                                    </div>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <AlertTriangle className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Violent Content</h3>
                                        <p className="text-zinc-400 text-sm">Graphic violence, gore, or hate speech</p>
                                    </div>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileWarning className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Copyright Infringement</h3>
                                        <p className="text-zinc-400 text-sm">Material you don't own or have permission to share</p>
                                    </div>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Malicious Content</h3>
                                        <p className="text-zinc-400 text-sm">Malware, viruses, or harmful code</p>
                                    </div>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <XCircle className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Personal Information</h3>
                                        <p className="text-zinc-400 text-sm">Private information about others without consent</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Service Limitations */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Service Limitations</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                                            <HardDrive className="w-5 h-5 text-yellow-400" />
                                        </div>
                                        <h3 className="font-semibold text-white">File Size Limit</h3>
                                    </div>
                                    <p className="text-zinc-400 text-sm">Maximum file size is 2MB per image. Files exceeding this limit will be rejected.</p>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <h3 className="font-semibold text-white">Rate Limiting</h3>
                                    </div>
                                    <p className="text-zinc-400 text-sm">We implement rate limiting to prevent abuse. Excessive uploads may be temporarily restricted.</p>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                            <Cloud className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <h3 className="font-semibold text-white">Storage Duration</h3>
                                    </div>
                                    <p className="text-zinc-400 text-sm">Valid images are stored indefinitely, but we reserve the right to remove content that violates these terms.</p>
                                </div>

                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <h3 className="font-semibold text-white">Service Availability</h3>
                                    </div>
                                    <p className="text-zinc-400 text-sm">While we strive for 100% uptime, we cannot guarantee uninterrupted service availability.</p>
                                </div>
                            </div>
                        </section>

                        {/* Content Removal */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Content Removal</h2>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Trash2 className="w-5 h-5 text-orange-400" />
                                    <p className="text-zinc-300">We reserve the right to remove any content that:</p>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-400">Violates these terms of service</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-400">Is reported by copyright holders</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-400">Is deemed harmful or inappropriate</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-400">Contributes to service abuse</span>
                                    </li>
                                </ul>
                                <p className="text-zinc-400">
                                    To report inappropriate content, contact us at:{" "}
                                    <a href="mailto:blog.boopul@gmail.com" className="text-brand hover:underline">
                                        blog.boopul@gmail.com
                                    </a>
                                </p>
                            </div>
                        </section>

                        {/* Disclaimer */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Disclaimer</h2>

                            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">
                                <p className="text-zinc-400 mb-4">
                                    The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
                                </p>
                                <ul className="space-y-3 mb-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-400">Excludes all representations and warranties relating to this website and its contents</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-400">Makes no warranty that the website will meet your requirements</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-zinc-400">Makes no warranty that the service will be uninterrupted, timely, or error-free</span>
                                    </li>
                                </ul>
                                <p className="text-zinc-300 font-medium">Your use of this service is entirely at your own risk.</p>
                            </div>
                        </section>

                        {/* Limitation of Liability */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Limitation of Liability</h2>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <p className="text-zinc-400 mb-4">
                                    In no event shall ImageToURL, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this website.
                                </p>
                                <p className="text-zinc-400">
                                    ImageToURL shall not be liable for any direct, indirect, special, or consequential damages arising out of or related to your use of the service.
                                </p>
                            </div>
                        </section>

                        {/* Indemnification */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Indemnification</h2>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <p className="text-zinc-400">
                                    You hereby indemnify to the fullest extent ImageToURL from and against any and all liabilities, costs, demands, causes of action, damages, and expenses (including reasonable attorney's fees) arising out of or related to your breach of any of the provisions of these Terms.
                                </p>
                            </div>
                        </section>

                        {/* Severability */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Severability</h2>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <p className="text-zinc-400">
                                    If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
                                </p>
                            </div>
                        </section>

                        {/* Variation of Terms */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Variation of Terms</h2>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <p className="text-zinc-400">
                                    ImageToURL is permitted to revise these Terms at any time as it sees fit, and by using this website you are expected to review these Terms on a regular basis.
                                </p>
                            </div>
                        </section>

                        {/* Assignment */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Assignment</h2>

                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                                <p className="text-zinc-400">
                                    ImageToURL is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.
                                </p>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section className="text-center">
                            <div className="bg-gradient-to-r from-brand/10 to-blue-500/10 border border-zinc-800 rounded-2xl p-8">
                                <div className="w-16 h-16 bg-brand/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Scale className="w-8 h-8 text-brand" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Questions about our terms?</h2>
                                <p className="text-zinc-400 mb-6">We're here to clarify any questions about our terms of service.</p>
                                <a
                                    href="mailto:blog.boopul@gmail.com"
                                    className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-medium px-6 py-3 rounded-full transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    Contact us at: blog.boopul@gmail.com
                                </a>
                                <p className="text-zinc-500 text-sm mt-6">Last updated: January 1, 2025</p>
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
