import type React from "react"
import type { Metadata } from "next"
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { CookieConsentWrapper } from '@/components/cookie-consent-wrapper'
import { LocaleUpdater } from '@/components/locale-updater'
import { SeoNav } from '@/components/seo-nav'
import { locales, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getAlternateLinks } from "@/lib/i18n/get-alternate-links"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imagetourl.cloud"

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
  const languages = getAlternateLinks("/", locale)

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    generator: "v0.app",
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${BASE_URL}/${locale}`,
      siteName: "ImageToURL",
      locale: locale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          alt: "ImageToURL - Free Image Hosting",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${BASE_URL}/og-image.png`],
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
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  // Get the correct text direction for RTL languages
  const rtlLocales = ['ar', 'ur', 'fa']
  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased selection:bg-brand selection:text-white overflow-x-hidden`}>
        {/* Server-side navigation for SEO crawlers */}
        <SeoNav locale={locale} />

        <ThemeProvider defaultTheme="dark" storageKey="imagetourl-theme">
          <LocaleUpdater locale={locale} />
          <CookieConsentWrapper>
            <Script
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7803867089582138"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
            {children}
          </CookieConsentWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

