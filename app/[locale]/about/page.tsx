import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { NavAuth } from "@/components/nav-auth"
import { BreadcrumbJsonLd, OrganizationJsonLd } from "@/components/json-ld"
import type { Metadata } from "next"
import {
    Globe,
    Zap,
    Shield,
    Clock,
    Code2,
    Sparkles,
    Target,
    Heart,
    Dumbbell,
    Brain,
    Github,
    Instagram,
    Mail,
    Quote,
    ArrowRight,
    Image as ImageIcon,
    Link,
    Users
} from "lucide-react"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params

    return {
        title: "About ImageToURL - Built by Boopul | Free Image Hosting",
        description: "Meet Boopul, the AI-powered creator behind ImageToURL. Learn about our mission to make image hosting simple, fast, and free for developers and creators.",
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

    return (
        <>
            <OrganizationJsonLd />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `https://imagetourl.cloud/${locale}` },
                    { name: "About", url: `https://imagetourl.cloud/${locale}/about` }
                ]}
            />

            <div className="bg-dark text-zinc-300 min-h-screen flex flex-col">
                {/* Ambient Glow Background */}
                <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[120px] pointer-events-none opacity-40 z-0" />
                <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none opacity-20 z-0" />
                <div className="fixed top-[40%] right-[20%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none opacity-30 z-0" />

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
                    <div className="max-w-5xl mx-auto">

                        {/* Hero Section */}
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-2 mb-6">
                                <Sparkles className="w-4 h-4 text-brand" />
                                <span className="text-sm text-brand">Built with passion</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                                Hi, I'm <span className="bg-gradient-to-r from-brand to-blue-400 bg-clip-text text-transparent">Boopul</span> 👋
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                                I'm an <span className="text-white font-medium">AI-powered creator</span>, <span className="text-white font-medium">no-code explorer</span>, and <span className="text-white font-medium">disciplined builder</span> who believes that consistency beats talent and action beats intention.
                            </p>
                        </div>

                        {/* Story Section */}
                        <section className="mb-20">
                            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Heart className="w-6 h-6 text-brand" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">My Story</h2>
                                        <p className="text-zinc-500">The journey that shaped who I am today</p>
                                    </div>
                                </div>
                                <p className="text-zinc-300 text-lg leading-relaxed">
                                    My journey hasn't been smooth or privileged. I grew up with limited resources, struggled academically in my early years, and paid my own college fees through persistence and self-learning. Those experiences shaped how I think, work, and build today — with <span className="text-white font-medium">clarity</span>, <span className="text-white font-medium">resilience</span>, and <span className="text-white font-medium">focus on long-term growth</span>.
                                </p>
                            </div>
                        </section>

                        {/* What I Do Section */}
                        <section className="mb-20">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-white mb-4">What I Do</h2>
                                <p className="text-zinc-400 max-w-2xl mx-auto">
                                    I enjoy working at the intersection of AI, no-code tools, design, automation, and personal development
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-brand/50 transition-all duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-br from-brand/20 to-brand/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Code2 className="w-6 h-6 text-brand" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Apps & Tools</h3>
                                    <p className="text-zinc-400 text-sm">Build small apps, tools, and websites using AI, no-code, and lightweight tech</p>
                                </div>

                                <div className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Brain className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">AI Workflows</h3>
                                    <p className="text-zinc-400 text-sm">Experiment with AI workflows to automate ideas and simplify complex tasks</p>
                                </div>

                                <div className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Sparkles className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Digital Assets</h3>
                                    <p className="text-zinc-400 text-sm">Design and contribute to digital assets and creative projects</p>
                                </div>

                                <div className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Target className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Self-Improvement</h3>
                                    <p className="text-zinc-400 text-sm">Create content around discipline, fitness, self-improvement, and stoic thinking</p>
                                </div>

                                <div className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Dumbbell className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Discipline & Fitness</h3>
                                    <p className="text-zinc-400 text-sm">Train regularly, follow structured routines, and treat physical health as a foundation</p>
                                </div>

                                <div className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-pink-500/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Users className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Communication</h3>
                                    <p className="text-zinc-400 text-sm">Continuously improve English communication and clarity of thought</p>
                                </div>
                            </div>

                            <p className="text-center text-zinc-400 mt-8 italic">
                                I prefer practical execution over theory, clean systems over noise, and steady progress over shortcuts.
                            </p>
                        </section>

                        {/* Philosophy Quote */}
                        <section className="mb-20">
                            <div className="relative bg-gradient-to-r from-brand/10 via-purple-500/10 to-blue-500/10 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
                                <Quote className="w-16 h-16 text-brand/20 absolute top-6 left-6" />
                                <Quote className="w-16 h-16 text-brand/20 absolute bottom-6 right-6 rotate-180" />

                                <h2 className="text-2xl font-bold text-white mb-8">Personal Philosophy</h2>

                                <div className="relative z-10 space-y-2">
                                    <p className="text-2xl md:text-3xl text-white font-light">Start small.</p>
                                    <p className="text-2xl md:text-3xl text-white font-light">Stay consistent.</p>
                                    <p className="text-2xl md:text-3xl text-white font-light">Build quietly.</p>
                                    <p className="text-2xl md:text-3xl bg-gradient-to-r from-brand to-blue-400 bg-clip-text text-transparent font-medium">Let results make the noise.</p>
                                </div>
                            </div>
                        </section>

                        {/* About ImageToURL */}
                        <section className="mb-20">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-white mb-4">About ImageToURL</h2>
                                <p className="text-zinc-400 max-w-2xl mx-auto">
                                    A tool I built to solve a real problem — sharing images should be simple
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center">
                                    <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Globe className="w-7 h-7 text-brand" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-2">Global CDN</h3>
                                    <p className="text-zinc-400 text-sm">Lightning-fast delivery from edge locations worldwide</p>
                                </div>

                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center">
                                    <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Zap className="w-7 h-7 text-yellow-400" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-2">Instant Links</h3>
                                    <p className="text-zinc-400 text-sm">Upload any image and get a shareable URL in seconds</p>
                                </div>

                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center">
                                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Shield className="w-7 h-7 text-emerald-400" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-2">Secure & Private</h3>
                                    <p className="text-zinc-400 text-sm">All uploads encrypted. No ads, no tracking</p>
                                </div>

                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center">
                                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Clock className="w-7 h-7 text-blue-400" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-2">Flexible Storage</h3>
                                    <p className="text-zinc-400 text-sm">Manage retention from 1 hour to forever</p>
                                </div>
                            </div>
                        </section>

                        {/* Connect Section */}
                        <section className="mb-12">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-white mb-4">Let's Connect</h2>
                                <p className="text-zinc-400 max-w-2xl mx-auto">
                                    If you're interested in AI, no-code tools, creative technology, fitness discipline, or personal growth — welcome, you're in the right place.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <a
                                    href="https://github.com/boopul22"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 flex flex-col items-center text-center"
                                >
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                                        <Github className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">GitHub</h3>
                                    <p className="text-zinc-500 text-sm mb-3">Projects, experiments, and code</p>
                                    <span className="inline-flex items-center gap-1 text-brand text-sm group-hover:gap-2 transition-all">
                                        View Profile <ArrowRight className="w-4 h-4" />
                                    </span>
                                </a>

                                <a
                                    href="https://www.instagram.com/no.code_boopul"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-pink-500/30 transition-all duration-300 flex flex-col items-center text-center"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-colors">
                                        <Instagram className="w-7 h-7 text-pink-400" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">Instagram</h3>
                                    <p className="text-zinc-500 text-sm mb-3">No-code, AI experiments, creator life</p>
                                    <span className="inline-flex items-center gap-1 text-pink-400 text-sm group-hover:gap-2 transition-all">
                                        Follow <ArrowRight className="w-4 h-4" />
                                    </span>
                                </a>

                                <a
                                    href="mailto:blog.boopul@gmail.com"
                                    className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-brand/30 transition-all duration-300 flex flex-col items-center text-center"
                                >
                                    <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                                        <Mail className="w-7 h-7 text-brand" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">Email</h3>
                                    <p className="text-zinc-500 text-sm mb-3">blog.boopul@gmail.com</p>
                                    <span className="inline-flex items-center gap-1 text-brand text-sm group-hover:gap-2 transition-all">
                                        Get in Touch <ArrowRight className="w-4 h-4" />
                                    </span>
                                </a>
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section className="text-center">
                            <div className="bg-gradient-to-br from-brand/20 via-purple-500/10 to-blue-500/20 border border-brand/20 rounded-3xl p-8 md:p-12">
                                <div className="w-20 h-20 bg-brand/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <ImageIcon className="w-10 h-10 text-brand" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Try ImageToURL?</h2>
                                <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                                    Upload your first image and get an instant shareable link. No registration required.
                                </p>
                                <a
                                    href={`/${locale}`}
                                    className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-medium px-8 py-4 rounded-full transition-all hover:gap-3"
                                >
                                    Start Uploading <ArrowRight className="w-5 h-5" />
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
