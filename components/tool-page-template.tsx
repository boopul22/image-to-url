import { UploadZone } from "@/components/upload-zone"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/faq-section"
import { NavAuth } from "@/components/nav-auth"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import { Check, Zap, Shield, Globe, Clock, Download, ExternalLink } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface RelatedTool {
  name: string
  href: string
  description: string
}

interface ExternalResource {
  name: string
  href: string
  description: string
}

interface ToolPageTemplateProps {
  locale: Locale
  dict: any
  toolDict: {
    title: string
    subtitle: string
    description: string
    features: {
      title: string
      items: string[]
    }
    howItWorks: {
      title: string
      steps: { title: string; description: string }[]
    }
    faq: {
      title: string
      items: FAQItem[]
    }
    relatedTools: {
      title: string
      tools: RelatedTool[]
    }
    externalResources?: {
      title: string
      resources: ExternalResource[]
    }
  }
}

export function ToolPageTemplate({ locale, dict, toolDict }: ToolPageTemplateProps) {
  return (
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
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-4 py-12 md:py-16">
          <div className="w-full max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-4 leading-[1.1]">
              {toolDict.title}
            </h1>
            <p className="text-lg text-brand font-medium mb-3">
              {toolDict.subtitle}
            </p>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {toolDict.description}
            </p>
          </div>

          <UploadZone dict={dict} />
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
              {toolDict.howItWorks.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {toolDict.howItWorks.steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-brand/20 text-brand flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-zinc-400 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
              {toolDict.features.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {toolDict.features.items.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <Check className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection title={toolDict.faq.title} items={toolDict.faq.items} />

        {/* Related Tools Section */}
        <section className="py-16 px-4 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
              {toolDict.relatedTools.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {toolDict.relatedTools.tools.map((tool, index) => (
                <Link
                  key={index}
                  href={`/${locale}${tool.href}`}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand/30 transition-all group"
                >
                  <h3 className="text-white font-medium mb-1 group-hover:text-brand transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-zinc-500 text-sm">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* External Resources Section */}
        {toolDict.externalResources && toolDict.externalResources.resources.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
                {toolDict.externalResources.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {toolDict.externalResources.resources.map((resource, index) => (
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
      </main>

      {/* Footer */}
      <Footer locale={locale} dict={dict.footer} />
    </div>
  )
}
