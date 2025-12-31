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
import { BlogCard } from '@/components/blog/blog-card'
import { CategoryList } from '@/components/blog/category-list'
import { getPostsByCategory, getAllCategories } from '@/lib/blog/content'
import { Folder } from 'lucide-react'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imagetourl.cloud'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>
}): Promise<Metadata> {
  const { locale, category } = await params
  const decodedCategory = decodeURIComponent(category)
  const categoryName = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)
  const languages = getAlternateLinks(`/blog/category/${category}`, locale)

  return {
    title: `${categoryName} - Blog | ImageToURL`,
    description: `Browse all ${categoryName.toLowerCase()} posts on the ImageToURL blog. Tips, tutorials, and guides about ${categoryName.toLowerCase()}.`,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/category/${category}`,
      languages,
    },
    openGraph: {
      title: `${categoryName} Posts | ImageToURL Blog`,
      description: `Browse all ${categoryName.toLowerCase()} posts on the ImageToURL blog.`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>
}) {
  const { locale, category } = await params
  const dict = await getDictionary(locale)
  const decodedCategory = decodeURIComponent(category)
  const posts = await getPostsByCategory(decodedCategory, locale)
  const categories = await getAllCategories(locale)

  const categoryName = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/${locale}` },
          { name: 'Blog', url: `${BASE_URL}/${locale}/blog` },
          { name: categoryName, url: `${BASE_URL}/${locale}/blog/category/${category}` },
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand/10 mb-4">
                <Folder className="w-8 h-8 text-brand" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {categoryName}
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
              </p>
            </div>

            {/* Categories */}
            <div className="mb-12">
              <CategoryList
                categories={categories}
                locale={locale}
                activeCategory={decodedCategory}
              />
            </div>

            {/* Posts */}
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-zinc-500 text-lg">
                  No posts found in this category.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer locale={locale} dict={dict.footer} />
      </div>
    </>
  )
}
