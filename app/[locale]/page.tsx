import { UploadZone } from "@/components/upload-zone"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { NavAuth } from "@/components/nav-auth"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { WebApplicationJsonLd, OrganizationJsonLd, FAQJsonLd, BreadcrumbJsonLd, WebSiteJsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <>
      {/* Structured Data for SEO */}
      <WebSiteJsonLd locale={locale} />
      <WebApplicationJsonLd
        locale={locale}
        title={dict.meta.title}
        description={dict.meta.description}
      />
      <OrganizationJsonLd />
      {dict.faq && <FAQJsonLd items={dict.faq.items} />}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.imagetourl.cloud"}/${locale}` }
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
        <main className="flex-grow relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-20">
          <div className="w-full max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-brand mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              {dict.hero.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-6 leading-[1.1]">
              {dict.hero.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
                {dict.hero.titleGradient}
              </span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed text-balance">
              {dict.hero.description}
            </p>
          </div>

          <UploadZone dict={dict} />

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-3 gap-8 md:gap-20 text-center animate-slide-up opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            <div>
              <h3 className="text-2xl font-semibold text-white tracking-tight mb-1">10M+</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">{dict.stats.imagesUploaded}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white tracking-tight mb-1">99.9%</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">{dict.stats.uptime}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white tracking-tight mb-1">&lt;50ms</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">{dict.stats.latency}</p>
            </div>
          </div>
        </main>

        {/* FAQ Section */}
        {dict.faq && (
          <FAQSection title={dict.faq.title} items={dict.faq.items} />
        )}

        {/* Footer */}
        <Footer locale={locale} dict={dict.footer} />
      </div>
    </>
  )
}
