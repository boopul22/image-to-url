import { Lightbulb } from "lucide-react"

interface TipsSectionProps {
  title: string
  items: string[]
}

export function TipsSection({ title, items }: TipsSectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((tip, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                <span className="text-brand font-semibold text-sm">{index + 1}</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed pt-1">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
