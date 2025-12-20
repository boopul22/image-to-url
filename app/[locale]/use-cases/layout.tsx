import type React from "react"
import type { Metadata } from "next"
import { locales, type Locale } from "@/lib/i18n/config"

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
}

export default async function UseCasesLayout({
  children,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  return <>{children}</>
}
