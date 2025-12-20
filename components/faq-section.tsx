"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title: string
  items: FAQItem[]
}

export function FAQSection({ title, items }: FAQSectionProps) {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
        {title}
      </h2>
      <Accordion type="single" collapsible className="w-full space-y-3">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-white/5 border border-white/10 rounded-lg px-4 data-[state=open]:bg-white/[0.07]"
          >
            <AccordionTrigger className="text-left text-white hover:no-underline py-4 text-sm md:text-base font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400 text-sm leading-relaxed pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
