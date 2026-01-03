import { Shield, Globe, Zap, Clock } from "lucide-react"

interface TrustSectionProps {
  title: string
  subtitle: string
}

const trustBadges = [
  { icon: Shield, label: "Enterprise Security" },
  { icon: Globe, label: "Global CDN" },
  { icon: Zap, label: "Instant Delivery" },
  { icon: Clock, label: "99.9% Uptime" },
]

export function TrustSection({ title, subtitle }: TrustSectionProps) {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          {title}
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {trustBadges.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
          >
            <Icon className="w-4 h-4 text-brand" aria-hidden="true" />
            <span className="text-zinc-300 text-xs md:text-sm font-medium">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Placeholder for future testimonials */}
      {/*
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        Testimonial cards will go here
      </div>
      */}
    </section>
  )
}
