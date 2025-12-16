import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n/config"

// Prevent dashboard pages from being indexed
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  // Auth protection is handled by proxy.ts middleware
  return <>{children}</>
}
