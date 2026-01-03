import { Briefcase, Code, Share2, FileText, ShoppingCart, Gamepad2 } from "lucide-react"

interface UseCaseItem {
  title: string
  description: string
}

interface UseCasesSectionProps {
  title: string
  items: UseCaseItem[]
}

const iconMap = [Briefcase, Code, Share2, FileText, ShoppingCart, Gamepad2]

export function UseCasesSection({ title, items }: UseCasesSectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = iconMap[index % iconMap.length]
            return (
              <div
                key={index}
                className="p-5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-brand/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand" />
                </div>
                <h3 className="text-white font-medium mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
