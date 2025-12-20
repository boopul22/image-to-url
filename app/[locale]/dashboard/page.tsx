import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { DashboardContent } from "./components/dashboard-content"
import { NavAuth } from "@/components/nav-auth"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

export default async function DashboardPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <div className="min-h-screen bg-dark text-zinc-300 flex flex-col">
      {/* Background Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[120px] pointer-events-none opacity-40 z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none opacity-20 z-0" />

      {/* Navigation */}
      <Header locale={locale} dict={dict.nav}>
        <Suspense fallback={<div className="w-9 h-9" />}>
          <NavAuth locale={locale} signInText={dict.nav.signIn} />
        </Suspense>
      </Header>

      {/* Main Content */}
      <main className="flex-grow relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2">{dict.dashboard?.title || "Dashboard"}</h1>
          <p className="text-zinc-400">{dict.dashboard?.myUploads ? `${dict.dashboard.myUploads}` : "Manage your uploaded images and URLs"}</p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl p-6 border border-white/5 h-24 animate-pulse" />
                <div className="bg-surface rounded-xl p-6 border border-white/5 h-24 animate-pulse" />
              </div>
              <div className="bg-surface rounded-xl p-6 border border-white/5 h-48 animate-pulse" />
            </div>
          }
        >
          <DashboardContent locale={locale} />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer locale={locale} dict={dict.footer} />
    </div>
  )
}
