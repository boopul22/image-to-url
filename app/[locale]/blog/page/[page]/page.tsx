import { Suspense } from 'react'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getAlternateLinks } from '@/lib/i18n/get-alternate-links'
import type { Locale } from '@/lib/i18n/config'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { NavAuth } from '@/components/nav-auth'
import { BreadcrumbJsonLd } from '@/components/json-ld'
import { BlogCard } from '@/components/blog/blog-card'
import { BlogPagination } from '@/components/blog/pagination'
import { CategoryList } from '@/components/blog/category-list'
import { getPaginatedPosts, getAllCategories, getTotalPages } from '@/lib/blog/content'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imagetourl.cloud'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; page: string }>
}): Promise<Metadata> {
  const { locale, page } = await params
  const pageNum = parseInt(page, 10)
  const languages = getAlternateLinks(`/blog/page/${page}`, locale)

  return {
    title: `Blog - Page ${pageNum} | ImageToURL`,
    description: `Browse page ${pageNum} of the ImageToURL blog. Tips, tutorials, and guides about image hosting and web development.`,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/page/${page}`,
      languages,
    },
    robots: {
      index: pageNum <= 5, // Only index first 5 pages
      follow: true,
    },
  }
}

export default async function PaginatedBlogPage({
  params,
}: {
  params: Promise<{ locale: Locale; page: string }>
}) {
  const { locale, page } = await params
  const pageNum = parseInt(page, 10)

  // Redirect page 1 to main blog page
  if (pageNum === 1) {
    redirect(`/${locale}/blog`)
  }

  // Validate page number
  if (isNaN(pageNum) || pageNum < 1) {
    notFound()
  }

  const totalPages = await getTotalPages(locale)

  // Check if page exists
  if (pageNum > totalPages) {
    notFound()
  }

  const dict = await getDictionary(locale)
  const { posts, currentPage } = await getPaginatedPosts(locale, pageNum)
  const categories = await getAllCategories(locale)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/${locale}` },
          { name: 'Blog', url: `${BASE_URL}/${locale}/blog` },
          { name: `Page ${pageNum}`, url: `${BASE_URL}/${locale}/blog/page/${page}` },
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
                Blog
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Page {pageNum} of {totalPages}
              </p>
            </div>

            {/* Categories */}
            <div className="mb-12">
              <CategoryList categories={categories} locale={locale} />
            </div>

            {/* Posts */}
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
          </div>
        </main>

        {/* Footer */}
        <Footer locale={locale} dict={dict.footer} />
      </div>
    </>
  )
}
