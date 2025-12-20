import type React from "react"
import type { Metadata } from "next"
import { locales, type Locale, defaultLocale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getAlternateLinks } from "@/lib/i18n/get-alternate-links"

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const alternates = getAlternateLinks("/", locale)

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    generator: "v0.app",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://imagetourl.cloud"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(alternates.map((alt) => [alt.locale, alt.url])),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: "ImageToURL",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: '/apple-touch-icon.png',
    },
    other: {
      "x-default": `${process.env.NEXT_PUBLIC_SITE_URL || "https://imagetourl.cloud"}/${defaultLocale}`,
    },
  }
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  return <>{children}</>
}
