import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/content';
import { generatePostMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { NavAuth } from '@/components/nav-auth';

interface PageProps {
    params: Promise<{ locale: Locale; slug: string }>;
}

// Revalidate blog posts every hour for fresh content with ISR
export const revalidate = 3600

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return generatePostMetadata(slug, post.frontmatter);
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug, locale } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const dict = await getDictionary(locale);
    const relatedPosts = getRelatedPosts(slug, 3);
    const articleJsonLd = generateArticleJsonLd(slug, post.frontmatter, post.readingTime);
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: 'Home', url: `/${locale}` },
        { name: 'Blog', url: `/${locale}/blog` },
        { name: post.frontmatter.title, url: `/${locale}/blog/${slug}` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
                    <article className="container mx-auto px-4 py-12 max-w-4xl">
                        {/* Breadcrumb */}
                        <nav className="mb-8 text-sm">
                            <ol className="flex items-center gap-2 text-zinc-500">
                                <li>
                                    <Link href={`/${locale}`} className="hover:text-brand transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>/</li>
                                <li>
                                    <Link href={`/${locale}/blog`} className="hover:text-brand transition-colors">
                                        Blog
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-zinc-300 truncate max-w-[200px]">{post.frontmatter.title}</li>
                            </ol>
                        </nav>

                        {/* Header */}
                        <header className="mb-10">
                            {/* Category & Tags */}
                            <div className="flex items-center gap-3 mb-4">
                                {post.frontmatter.category && (
                                    <span className="px-3 py-1 text-sm font-medium bg-brand/10 text-brand rounded-full">
                                        {post.frontmatter.category}
                                    </span>
                                )}
                                {post.frontmatter.featured && (
                                    <span className="px-3 py-1 text-sm font-medium bg-yellow-500/10 text-yellow-400 rounded-full">
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                {post.frontmatter.title}
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-zinc-400 mb-6">
                                {post.frontmatter.description}
                            </p>

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 pb-6 border-b border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-zinc-300">{post.frontmatter.author}</span>
                                </div>
                                <span>•</span>
                                <time dateTime={post.frontmatter.publishedAt}>
                                    {formatDate(post.frontmatter.publishedAt)}
                                </time>
                                <span>•</span>
                                <span>{post.readingTime}</span>
                            </div>
                        </header>

                        {/* Featured Image */}
                        {post.frontmatter.image && (
                            <figure className="mb-10 -mx-4 md:mx-0">
                                <Image
                                    src={post.frontmatter.image.src}
                                    alt={post.frontmatter.image.alt || post.frontmatter.title}
                                    width={1200}
                                    height={630}
                                    className="w-full rounded-none md:rounded-2xl"
                                    priority
                                />
                            </figure>
                        )}

                        {/* Content */}
                        <div className="prose prose-lg prose-invert prose-zinc max-w-none prose-headings:text-white prose-a:text-brand prose-strong:text-white prose-code:text-zinc-300">
                            <MDXRemote
                                source={post.content}
                                components={mdxComponents}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [remarkGfm],
                                        rehypePlugins: [rehypeSlug],
                                    },
                                }}
                            />
                        </div>

                        {/* Tags */}
                        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-zinc-800">
                                <h3 className="text-sm font-medium text-zinc-500 mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.frontmatter.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
                                            className="px-3 py-1.5 text-sm font-medium bg-zinc-800 hover:bg-brand/10 hover:text-brand rounded-full transition-colors"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="container mx-auto px-4 py-16 max-w-4xl border-t border-zinc-800">
                            <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
                            <div className="grid gap-6 md:grid-cols-3">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.slug}
                                        href={`/${locale}/blog/${relatedPost.slug}`}
                                        className="group block p-4 rounded-xl border border-zinc-800 hover:border-brand/50 transition-colors"
                                    >
                                        <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-brand transition-colors">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-sm text-zinc-400 line-clamp-2">
                                            {relatedPost.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
                <Footer locale={locale} dict={dict.footer} />
            </div>
        </>
    );
}
