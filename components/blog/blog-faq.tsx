"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

export interface FAQItem {
  question: string
  answer: string
}

interface BlogFAQProps {
  items: FAQItem[]
  title?: string
}

export function BlogFAQ({ items, title = "Frequently Asked Questions" }: BlogFAQProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="my-10 sm:my-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10 border border-brand/20">
          <HelpCircle className="w-5 h-5 text-brand" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white m-0">
          {title}
        </h2>
      </div>

      {/* FAQ Accordion */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b border-zinc-800 last:border-b-0 px-0"
            >
              <AccordionTrigger className="px-5 py-4 text-left text-white hover:no-underline hover:bg-zinc-800/50 transition-colors text-sm sm:text-base font-medium gap-4 [&[data-state=open]]:bg-zinc-800/30">
                <span className="flex items-start gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand/20 text-brand text-xs font-semibold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-left">{item.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-0">
                <div className="pl-9 text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

/**
 * Schema component for FAQ structured data
 */
export function BlogFAQSchema({ items }: { items: FAQItem[] }) {
  if (!items || items.length === 0) return null

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  )
}
