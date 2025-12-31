import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getAlternateLinks } from '@/lib/i18n/get-alternate-links'
import type { Locale } from '@/lib/i18n/config'
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
  const languages = getAlternateLinks('/blog', locale)

  return {
    title: 'Blog - Image Hosting Tips & Tutorials | ImageToURL',
    description:
      'Learn about image optimization, CDN performance, free image hosting, and web development best practices. Tips, tutorials, and guides for developers and creators.',
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
      title: 'ImageToURL Blog - Tips & Tutorials',
      description:
        'Tips, tutorials, and insights about image hosting and web development.',
      type: 'website',
      url: `${BASE_URL}/${locale}/blog`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ImageToURL Blog',
      description:
        'Tips, tutorials, and insights about image hosting and web development.',
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
  const allPosts = await getAllPosts(locale)

  return (
    <>
      <BlogListJsonLd locale={locale} posts={posts} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/${locale}` },
          { name: 'Blog', url: `${BASE_URL}/${locale}/blog` },
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
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                ImageToURL Blog
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
                Tips, tutorials, and insights about image hosting, optimization,
                and web development
              </p>

              {/* Search Button */}
              <BlogSearch posts={allPosts} locale={locale} />
            </div>

            {/* Categories */}
            <div className="mb-12">
              <CategoryList categories={categories} locale={locale} />
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Featured Posts
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
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
              <h2 className="text-2xl font-bold text-white mb-6">
                {featuredPosts.length > 0 ? 'Latest Posts' : 'All Posts'}
                <span className="text-zinc-500 font-normal text-lg ml-2">
                  ({totalPosts})
                </span>
              </h2>

              {posts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-zinc-500 text-lg">No posts found yet.</p>
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
