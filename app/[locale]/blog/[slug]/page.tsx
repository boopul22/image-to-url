import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getAlternateLinks } from '@/lib/i18n/get-alternate-links'
import type { Locale } from '@/lib/i18n/config'
import { locales } from '@/lib/i18n/config'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { NavAuth } from '@/components/nav-auth'
import { BreadcrumbJsonLd } from '@/components/json-ld'
import { ArticleJsonLd } from '@/components/blog/article-json-ld'
import { BlogHeader } from '@/components/blog/blog-header'
import { RelatedPosts } from '@/components/blog/related-posts'
import { ShareButtons } from '@/components/blog/share-buttons'
import { ReadingProgress } from '@/components/blog/reading-progress'
import { MobileTocDrawer } from '@/components/blog/mobile-toc-drawer'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog/content'
import { processMDX } from '@/lib/blog/mdx'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imagetourl.cloud'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  const params: { locale: string; slug: string }[] = []

  for (const { slug } of slugs) {
    for (const locale of locales) {
      params.push({ locale, slug })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: 'Post Not Found | ImageToURL Blog',
    }
  }

  const { frontmatter } = post
  const title = frontmatter.seoTitle || frontmatter.title
  const description = frontmatter.seoDescription || frontmatter.description
  const languages = getAlternateLinks(`/blog/${slug}`, locale)

  const coverImageUrl = frontmatter.coverImage
    ? frontmatter.coverImage.startsWith('http')
      ? frontmatter.coverImage
      : `${BASE_URL}${frontmatter.coverImage}`
    : `${BASE_URL}/og-image.png`

  return {
    title: `${title} | ImageToURL Blog`,
    description,
    keywords: frontmatter.tags.join(', '),
    authors: [{ name: frontmatter.author }],
    alternates: {
      canonical: frontmatter.canonicalUrl || `${BASE_URL}/${locale}/blog/${slug}`,
      languages,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
      images: [
        {
          url: coverImageUrl,
          alt: frontmatter.coverImageAlt || frontmatter.title,
        },
      ],
      url: `${BASE_URL}/${locale}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverImageUrl],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  const dict = await getDictionary(locale)
  const content = await processMDX(post.content)
  const relatedPosts = await getRelatedPosts(post, locale, 3)

  return (
    <>
      <ReadingProgress />
      <ArticleJsonLd post={post} locale={locale} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/${locale}` },
          { name: 'Blog', url: `${BASE_URL}/${locale}/blog` },
          {
            name: post.frontmatter.category,
            url: `${BASE_URL}/${locale}/blog/category/${post.frontmatter.category.toLowerCase()}`,
          },
          { name: post.frontmatter.title, url: `${BASE_URL}/${locale}/blog/${slug}` },
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

        {/* Main Content - Responsive Grid Layout */}
        <main className="flex-grow relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 xl:gap-16">
              {/* Article Content - Main Column */}
              <article className="max-w-3xl">
                <BlogHeader post={post} locale={locale} />

                {/* MDX Content */}
                <div className="prose prose-sm sm:prose-base prose-invert prose-zinc max-w-none prose-headings:scroll-mt-20 prose-p:text-zinc-300 prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-img:rounded-lg">
                  {content}
                </div>

                {/* Share Buttons */}
                <ShareButtons
                  url={`/${locale}/blog/${slug}`}
                  title={post.frontmatter.title}
                  description={post.frontmatter.description}
                />

                {/* Related Posts */}
                <RelatedPosts posts={relatedPosts} locale={locale} />
              </article>

              {/* Desktop Sidebar - Table of Contents */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                    <TableOfContents headings={post.headings} />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer locale={locale} dict={dict.footer} />

        {/* Mobile TOC Drawer */}
        <MobileTocDrawer headings={post.headings} />
      </div>
    </>
  )
}
