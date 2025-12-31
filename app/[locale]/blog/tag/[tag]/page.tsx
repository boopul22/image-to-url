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
import { getPostsByTag, getAllTags } from '@/lib/blog/content'
import { Tag } from 'lucide-react'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imagetourl.cloud'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; tag: string }>
}): Promise<Metadata> {
  const { locale, tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const languages = getAlternateLinks(`/blog/tag/${tag}`, locale)

  return {
    title: `#${decodedTag} - Blog | ImageToURL`,
    description: `Browse all posts tagged with #${decodedTag} on the ImageToURL blog.`,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/tag/${tag}`,
      languages,
    },
    openGraph: {
      title: `#${decodedTag} Posts | ImageToURL Blog`,
      description: `Browse all posts tagged with #${decodedTag} on the ImageToURL blog.`,
      type: 'website',
    },
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ locale: Locale; tag: string }>
}) {
  const { locale, tag } = await params
  const dict = await getDictionary(locale)
  const decodedTag = decodeURIComponent(tag)
  const posts = await getPostsByTag(decodedTag, locale)
  const allTags = await getAllTags(locale)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/${locale}` },
          { name: 'Blog', url: `${BASE_URL}/${locale}/blog` },
          { name: `#${decodedTag}`, url: `${BASE_URL}/${locale}/blog/tag/${tag}` },
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
                <Tag className="w-8 h-8 text-brand" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                #{decodedTag}
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} with this tag
              </p>
            </div>

            {/* All Tags */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-2 justify-center">
                {allTags.slice(0, 20).map((t) => (
                  <Link
                    key={t.slug}
                    href={`/${locale}/blog/tag/${t.slug}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      t.slug.toLowerCase() === decodedTag.toLowerCase()
                        ? 'bg-brand text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
                    }`}
                  >
                    #{t.name}
                    <span className="ml-1.5 text-xs opacity-70">({t.count})</span>
                  </Link>
                ))}
              </div>
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
                  No posts found with this tag.
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
