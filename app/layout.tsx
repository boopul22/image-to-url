import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { CookieConsentWrapper } from '@/components/cookie-consent-wrapper'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
}

export const metadata: Metadata = {
  title: 'ImageToURL',
  description: 'Upload and share images instantly',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7803867089582138"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body className={`${inter.variable} font-sans antialiased selection:bg-brand selection:text-white overflow-x-hidden`}>
        <ThemeProvider defaultTheme="dark" storageKey="imagetourl-theme">
          <CookieConsentWrapper>
            {children}
          </CookieConsentWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
