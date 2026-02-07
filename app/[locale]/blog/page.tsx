import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getAlternateLinks } from '@/lib/i18n/get-alternate-links'
import type { Locale } from '@/lib/i18n/config'
import { locales } from '@/lib/i18n/config'

// Force static generation for SEO and Cloudflare Workers compatibility
export const dynamic = 'force-static'

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { NavAuth } from '@/components/nav-auth'
import { BreadcrumbJsonLd } from '@/components/json-ld'
import { BlogListJsonLd } from '@/components/blog/article-json-ld'
import { BlogCard } from '@/components/blog/blog-card'
import { BlogPagination } from '@/components/blog/pagination'
import { CategoryList } from '@/components/blog/category-list'
import { SearchDialog, useSearchShortcut } from '@/components/blog/search-dialog'
import { getPaginatedPosts, getAllCategories, getFeaturedPosts, getAllPosts } from '@/lib/blog/content'
import { Search } from 'lucide-react'
import { BlogSearch } from './blog-search'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imagetourl.cloud'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const languages = getAlternateLinks('/blog', locale)

  return {
    title: dict.blog.title + " - Image Hosting Tips & Tutorials | ImageToURL",
    description: dict.blog.latestPosts + " about image optimization, CDN performance, free image hosting, and web development best practices.",
    keywords: [
      'image hosting blog',
      'image optimization tips',
      'cdn performance',
      'web development tutorials',
      'free image hosting guide',
    ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages,
    },
    openGraph: {
      title: dict.blog.title + " - Tips & Tutorials",
      description: dict.blog.latestPosts + " about image hosting and web development.",
      type: 'website',
      url: `${BASE_URL}/${locale}/blog`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.blog.title,
      description: dict.blog.latestPosts + " about image hosting and web development.",
    },
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const { posts, totalPages, currentPage, totalPosts } = await getPaginatedPosts(locale, 1)
  const categories = await getAllCategories(locale)
  const featuredPosts = await getFeaturedPosts(locale, 2)

  // Create lightweight search index - only essential fields for client-side search
  // This reduces client bundle size by ~80% compared to passing full PostMeta
  const allPosts = await getAllPosts(locale)
  const searchIndex = allPosts.map(post => ({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description.slice(0, 150), // Truncate for smaller payload
    category: post.frontmatter.category,
    tags: post.frontmatter.tags,
  }))

  return (
    <>
      <BlogListJsonLd locale={locale} posts={posts} />
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, url: `${BASE_URL}/${locale}` },
          { name: dict.blog.title, url: `${BASE_URL}/${locale}/blog` },
        ]}
      />

      <div className="bg-dark text-zinc-300 min-h-screen flex flex-col">
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
        <main className="flex-grow relative z-10 px-4 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                ImageToURL {dict.blog.title}
              </h1>
              <p className="text-base text-zinc-400 max-w-2xl mx-auto mb-6">
                {dict.blog.latestPosts} {dict.blog.subtitle}
              </p>

              {/* Search Button */}
              <BlogSearch searchIndex={searchIndex} locale={locale} dict={dict.search} />
            </div>

            {/* Categories */}
            <div className="mb-8">
              <CategoryList categories={categories} locale={locale} dict={dict.blog} />
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-10">
                <h2 className="text-lg font-semibold text-white mb-4">
                  {dict.blog.featured}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {featuredPosts.map((post) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      locale={locale}
                      featured
                    />
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">
                {featuredPosts.length > 0 ? dict.blog.latestPosts : dict.blog.allPosts}
                <span className="text-zinc-500 font-normal text-sm ml-2">
                  ({totalPosts})
                </span>
              </h2>

              {posts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {posts.map((post) => (
                      <BlogCard key={post.slug} post={post} locale={locale} />
                    ))}
                  </div>

                  <BlogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath={`/${locale}/blog`}
                  />
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-zinc-500 text-lg">{dict.blog.noPosts}</p>
                  <p className="text-zinc-600 mt-2">
                    Check back soon for new content!
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>

        {/* Footer */}
        <Footer locale={locale} dict={dict.footer} />
      </div>
    </>
  )
}
