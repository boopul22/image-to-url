import { Upload, Zap, Link2 } from "lucide-react"

interface HowToStep {
  title: string
  description: string
}

interface HowToSectionProps {
  title: string
  steps: HowToStep[]
}

const stepIcons = [Upload, Zap, Link2]

export function HowToSection({ title, steps }: HowToSectionProps) {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-10">
        {title}
      </h2>
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => {
          const Icon = stepIcons[index] || Upload
          return (
            <li
              key={index}
              className="relative bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/[0.07] transition-colors"
            >
              {/* Step number badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-4 bg-brand/10 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6 text-brand" aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="text-white font-medium mb-2">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
