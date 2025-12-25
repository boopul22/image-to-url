import { UploadZone } from "@/components/upload-zone"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/faq-section"
import { NavAuth } from "@/components/nav-auth"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import { Check, ArrowRight, ExternalLink } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface Step {
  title: string
  description: string
}

interface ExternalResource {
  name: string
  href: string
  description: string
}

interface UseCaseTemplateProps {
  locale: Locale
  dict: any
  useCaseDict: {
    title: string
    subtitle: string
    description: string
    benefits: {
      title: string
      items: { title: string; description: string }[]
    }
    steps: {
      title: string
      items: Step[]
    }
    tips: {
      title: string
      items: string[]
    }
    faq: {
      title: string
      items: FAQItem[]
    }
    cta: {
      title: string
      description: string
    }
    externalResources?: {
      title: string
      resources: ExternalResource[]
    }
  }
}

export function UseCaseTemplate({ locale, dict, useCaseDict }: UseCaseTemplateProps) {
  return (
    <div className="bg-dark text-zinc-300 min-h-screen flex flex-col">
      {/* Ambient Glow Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[120px] pointer-events-none opacity-40 z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none opacity-20 z-0" />

      {/* Navigation */}
      <Header locale={locale} dict={dict.nav}>
        <Suspense
          fallback={
            <Button
              size="sm"
              className="bg-white text-dark rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              disabled
            >
              {dict.nav.signIn}
            </Button>
          }
        >
          <NavAuth locale={locale} signInText={dict.nav.signIn} />
        </Suspense>
      </Header>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-4 py-12 md:py-16">
          <div className="w-full max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-4 leading-[1.1]">
              {useCaseDict.title}
            </h1>
            <p className="text-lg text-brand font-medium mb-3">
              {useCaseDict.subtitle}
            </p>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {useCaseDict.description}
            </p>
          </div>

          <UploadZone dict={dict} />
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
              {useCaseDict.benefits.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {useCaseDict.benefits.items.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-white/5 border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-zinc-400 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="py-16 px-4 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
              {useCaseDict.steps.title}
            </h2>
            <div className="space-y-6">
              {useCaseDict.steps.items.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-brand/20 text-brand flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{step.title}</h3>
                    <p className="text-zinc-400 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
              {useCaseDict.tips.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {useCaseDict.tips.items.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <Check className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection title={useCaseDict.faq.title} items={useCaseDict.faq.items} />

        {/* External Resources Section */}
        {useCaseDict.externalResources && useCaseDict.externalResources.resources.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
                {useCaseDict.externalResources.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {useCaseDict.externalResources.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand/30 transition-all group flex items-start gap-3"
                  >
                    <ExternalLink className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium mb-1 group-hover:text-brand transition-colors">
                        {resource.name}
                      </h3>
                      <p className="text-zinc-500 text-sm">{resource.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white/[0.02]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              {useCaseDict.cta.title}
            </h2>
            <p className="text-zinc-400 mb-8">
              {useCaseDict.cta.description}
            </p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full font-medium hover:bg-brand/90 transition-colors"
            >
              Start Uploading
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer locale={locale} dict={dict.footer} />
    </div>
  )
}
