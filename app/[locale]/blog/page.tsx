import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllPostsMeta } from '@/lib/content';
import { generateBlogListMetadata, generateBlogListJsonLd } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { NavAuth } from '@/components/nav-auth';

export const metadata: Metadata = generateBlogListMetadata();

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    const posts = getAllPostsMeta();
    const jsonLd = generateBlogListJsonLd();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

                <main className="flex-grow relative z-10">
                    {/* Hero Section */}
                    <section className="relative overflow-hidden py-20 md:py-28">
                        <div className="container mx-auto px-4 relative">
                            <div className="max-w-3xl mx-auto text-center">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                    Blog
                                </h1>
                                <p className="text-lg md:text-xl text-zinc-400">
                                    Explore articles about image hosting, web development, SEO optimization, and modern web technologies.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Posts Grid */}
                    <section className="container mx-auto px-4 pb-20">
                        {posts.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-zinc-400 text-lg">No posts yet. Check back soon!</p>
                            </div>
                        ) : (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {posts.map((post) => (
                                    <article
                                        key={post.slug}
                                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
                                    >
                                        {/* Image */}
                                        <Link href={`/${locale}/blog/${post.slug}`} className="relative aspect-video overflow-hidden">
                                            {post.image ? (
                                                <Image
                                                    src={post.image.src}
                                                    alt={post.image.alt || post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center">
                                                    <span className="text-4xl">📝</span>
                                                </div>
                                            )}
                                            {post.featured && (
                                                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-brand text-white rounded-full">
                                                    Featured
                                                </span>
                                            )}
                                        </Link>

                                        {/* Content */}
                                        <div className="flex flex-1 flex-col p-6">
                                            {/* Meta */}
                                            <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
                                                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                                                <span>•</span>
                                                <span>{post.readingTime}</span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-brand transition-colors">
                                                <Link href={`/${locale}/blog/${post.slug}`}>
                                                    {post.title}
                                                </Link>
                                            </h2>

                                            {/* Description */}
                                            <p className="text-zinc-400 text-sm line-clamp-3 mb-4 flex-1">
                                                {post.description}
                                            </p>

                                            {/* Tags */}
                                            {post.tags && post.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-auto">
                                                    {post.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2.5 py-0.5 text-xs font-medium bg-brand/10 text-brand rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
                <Footer locale={locale} dict={dict.footer} />
            </div>
        </>
    );
}
