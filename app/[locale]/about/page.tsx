import type { Metadata } from "next";
import {
    IconSparkles,
    IconBook,
    IconBooks,
    IconBolt,
    IconCpu,
    IconBrandOpenai,
    IconPalette,
    IconTrendingUp,
    IconBarbell,
    IconMessageCircle,
    IconBulb,
    IconRocket,
    IconDownload,
    IconPhoto,
    IconLanguage,
    IconBrandGithub,
    IconBrandInstagram,
    IconMail,
    IconWorld,
    IconExternalLink
} from "@tabler/icons-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { NavAuth } from "@/components/nav-auth";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";


export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    const enDict = await getDictionary('en');
    const aboutDict = (dict as any).aboutBoopul || (enDict as any).aboutBoopul;

    return {
        title: aboutDict.meta.title,
        description: aboutDict.meta.description,
        keywords: aboutDict.meta.keywords,
        openGraph: {
            title: aboutDict.meta.ogTitle,
            description: aboutDict.meta.ogDescription,
            type: "website",
            url: `https://imagetourl.cloud/${locale}/about`,
            siteName: "ImageToURL",
            images: [
                {
                    url: "https://imagetourl.cloud/og-image-about.png",
                    width: 1200,
                    height: 630,
                    alt: aboutDict.meta.title
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: aboutDict.meta.title,
            description: aboutDict.meta.description,
            images: ["https://imagetourl.cloud/og-image-about.png"],
        },
        alternates: {
            canonical: `https://imagetourl.cloud/${locale}/about`,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    const enDict = await getDictionary('en');
    const aboutDict = (dict as any).aboutBoopul || (enDict as any).aboutBoopul;

    return (
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
                    {/* Header Section */}
                    <div className="text-center mb-12 animate-fade-in">
                        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-sm">
                            <IconSparkles size={16} />
                            <span className="font-medium">{aboutDict.hero.badge}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            {aboutDict.hero.title}
                        </h1>
                        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                            {aboutDict.hero.description}
                        </p>
                    </div>

                    {/* My Story Section */}
                    <div className="mb-12 p-8 rounded-2xl glass-panel animate-slide-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-brand/20 flex items-center justify-center">
                                <IconBook size={24} className="text-brand" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{aboutDict.story.title}</h2>
                        </div>
                        <p className="text-zinc-500 text-sm mb-3">{aboutDict.story.subtitle}</p>
                        <p className="text-zinc-300 leading-relaxed text-lg">
                            {aboutDict.story.content}
                        </p>
                    </div>

                    {/* What I Do Section */}
                    <div className="mb-12 animate-slide-up opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <IconBolt size={24} className="text-brand" />
                            {aboutDict.whatIDo.title}
                        </h2>
                        <p className="text-zinc-500 text-sm mb-6">
                            {aboutDict.whatIDo.subtitle}
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <WhatIDoCard
                                icon={<IconCpu size={20} />}
                                title={aboutDict.whatIDo.cards.apps.title}
                                description={aboutDict.whatIDo.cards.apps.description}
                                color="brand"
                            />
                            <WhatIDoCard
                                icon={<IconBrandOpenai size={20} />}
                                title={aboutDict.whatIDo.cards.ai.title}
                                description={aboutDict.whatIDo.cards.ai.description}
                                color="blue"
                            />
                            <WhatIDoCard
                                icon={<IconPalette size={20} />}
                                title={aboutDict.whatIDo.cards.digital.title}
                                description={aboutDict.whatIDo.cards.digital.description}
                                color="purple"
                            />
                            <WhatIDoCard
                                icon={<IconTrendingUp size={20} />}
                                title={aboutDict.whatIDo.cards.self.title}
                                description={aboutDict.whatIDo.cards.self.description}
                                color="orange"
                            />
                            <WhatIDoCard
                                icon={<IconBarbell size={20} />}
                                title={aboutDict.whatIDo.cards.discipline.title}
                                description={aboutDict.whatIDo.cards.discipline.description}
                                color="red"
                            />
                            <WhatIDoCard
                                icon={<IconMessageCircle size={20} />}
                                title={aboutDict.whatIDo.cards.comm.title}
                                description={aboutDict.whatIDo.cards.comm.description}
                                color="cyan"
                            />
                        </div>
                        <p className="text-zinc-500 text-sm mt-6 italic">
                            {aboutDict.whatIDo.footer}
                        </p>
                    </div>

                    {/* Personal Philosophy Section */}
                    <div className="mb-12 p-8 rounded-2xl glass-panel animate-slide-up opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-brand/20 flex items-center justify-center">
                                <IconBulb size={24} className="text-brand" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{aboutDict.philosophy.title}</h2>
                        </div>
                        <div className="space-y-3">
                            {aboutDict.philosophy.items.map((item: string, index: number) => (
                                <p key={index} className="text-white text-lg font-medium">{item}</p>
                            ))}
                        </div>
                    </div>

                    {/* My Other Projects Section */}
                    <div className="mb-12 animate-slide-up opacity-0" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <IconRocket size={24} className="text-brand" />
                            {aboutDict.projects.title}
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <ProjectCard
                                icon={<IconDownload size={24} />}
                                title={aboutDict.projects.items.extractpics.title}
                                description={aboutDict.projects.items.extractpics.description}
                                href="https://extractpics.com/"
                                color="brand"
                                visitLabel={aboutDict.projects.visit}
                            />
                            <ProjectCard
                                icon={<IconPhoto size={24} />}
                                title={aboutDict.projects.items.imagetourl.title}
                                description={aboutDict.projects.items.imagetourl.description}
                                href="https://imagetourl.cloud/"
                                color="blue"
                                visitLabel={aboutDict.projects.visit}
                            />
                            <ProjectCard
                                icon={<IconBooks size={24} />}
                                title={aboutDict.projects.items.storiespdf.title}
                                description={aboutDict.projects.items.storiespdf.description}
                                href="https://storiespdf.com/"
                                color="purple"
                                visitLabel={aboutDict.projects.visit}
                            />
                            <ProjectCard
                                icon={<IconLanguage size={24} />}
                                title={aboutDict.projects.items.tamilkathai.title}
                                description={aboutDict.projects.items.tamilkathai.description}
                                href="https://tamilkathai.in/"
                                color="orange"
                                visitLabel={aboutDict.projects.visit}
                            />
                        </div>
                    </div>

                    {/* Let's Connect Section */}
                    <div className="p-8 rounded-2xl glass-panel animate-slide-up opacity-0" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <IconWorld size={24} className="text-brand" />
                            {aboutDict.connect.title}
                        </h2>
                        <p className="text-zinc-300 leading-relaxed mb-6">
                            {aboutDict.connect.description}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <ConnectCard
                                icon={<IconBrandGithub size={20} />}
                                title={aboutDict.connect.items.github.title}
                                description={aboutDict.connect.items.github.description}
                                href="https://github.com/boopul22"
                                color="purple"
                            />
                            <ConnectCard
                                icon={<IconBrandInstagram size={20} />}
                                title={aboutDict.connect.items.instaPersonal.title}
                                description={aboutDict.connect.items.instaPersonal.description}
                                href="https://www.instagram.com/boopul"
                                color="pink"
                            />
                            <ConnectCard
                                icon={<IconBrandInstagram size={20} />}
                                title={aboutDict.connect.items.instaDev.title}
                                description={aboutDict.connect.items.instaDev.description}
                                href="https://www.instagram.com/no.code_boopul"
                                color="pink"
                            />
                            <ConnectCard
                                icon={<IconMail size={20} />}
                                title={aboutDict.connect.items.email.title}
                                description={aboutDict.connect.items.email.description}
                                href="mailto:blog.boopul@gmail.com"
                                color="blue"
                                isEmail
                            />
                            <ConnectCard
                                icon={<IconWorld size={20} />}
                                title={aboutDict.connect.items.portfolio.title}
                                description={aboutDict.connect.items.portfolio.description}
                                href="https://www.bipul.online/"
                                color="brand"
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer locale={locale} dict={dict.footer} />
        </div>
    );
}

function WhatIDoCard({
    icon,
    title,
    description,
    color
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: 'brand' | 'blue' | 'purple' | 'orange' | 'red' | 'cyan';
}) {
    const colorClasses = {
        brand: 'bg-brand/10 text-brand',
        blue: 'bg-blue-500/10 text-blue-500',
        purple: 'bg-purple-500/10 text-purple-500',
        orange: 'bg-orange-500/10 text-orange-500',
        red: 'bg-red-500/10 text-red-500',
        cyan: 'bg-cyan-500/10 text-cyan-500',
    };

    return (
        <div className="p-6 rounded-2xl glass-panel hover:border-brand/30 transition-all duration-300">
            <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}>
                {icon}
            </div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-zinc-500 text-sm">{description}</p>
        </div>
    );
}

function ProjectCard({
    icon,
    title,
    description,
    href,
    color,
    visitLabel
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    color: 'brand' | 'blue' | 'purple' | 'orange';
    visitLabel: string;
}) {
    const colorClasses = {
        brand: {
            icon: 'bg-brand/20 text-brand',
            button: 'bg-brand/10 border-brand/30 text-brand hover:bg-brand/20',
        },
        blue: {
            icon: 'bg-blue-500/20 text-blue-500',
            button: 'bg-blue-500/10 border-blue-500/30 text-blue-500 hover:bg-blue-500/20',
        },
        purple: {
            icon: 'bg-purple-500/20 text-purple-500',
            button: 'bg-purple-500/10 border-purple-500/30 text-purple-500 hover:bg-purple-500/20',
        },
        orange: {
            icon: 'bg-orange-500/20 text-orange-500',
            button: 'bg-orange-500/10 border-orange-500/30 text-orange-500 hover:bg-orange-500/20',
        },
    };

    return (
        <div className="p-6 rounded-2xl glass-panel hover:border-brand/30 transition-all duration-300">
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${colorClasses[color].icon} flex items-center justify-center flex-shrink-0`}>
                    {icon}
                </div>
                <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                    <p className="text-zinc-400 leading-relaxed mb-4 text-sm">{description}</p>
                    <Link
                        href={href}
                        target="_blank"
                        rel="dofollow"
                        className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm ${colorClasses[color].button}`}
                    >
                        <IconExternalLink size={16} />
                        <span>{visitLabel.replace('{title}', title)}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ConnectCard({
    icon,
    title,
    description,
    href,
    color,
    isEmail = false
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    color: 'brand' | 'blue' | 'purple' | 'pink';
    isEmail?: boolean;
}) {
    const colorClasses = {
        brand: 'bg-brand/10 text-brand group-hover:bg-brand/20',
        blue: 'bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20',
        purple: 'bg-purple-500/10 text-purple-500 group-hover:bg-purple-500/20',
        pink: 'bg-pink-500/10 text-pink-500 group-hover:bg-pink-500/20',
    };

    return (
        <Link
            href={href}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "dofollow"}
            className="p-4 rounded-xl glass-panel hover:border-brand/30 transition-all duration-300 group"
        >
            <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${colorClasses[color]}`}>
                    {icon}
                </div>
                <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{title}</h3>
                    <p className="text-zinc-500 text-sm">{description}</p>
                </div>
                {!isEmail && (
                    <IconExternalLink size={16} className="text-zinc-500 group-hover:text-brand transition-colors" />
                )}
            </div>
        </Link>
    );
}