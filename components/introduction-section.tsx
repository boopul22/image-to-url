interface IntroductionSectionProps {
  title: string
  paragraphs: string[]
}

export function IntroductionSection({ title, paragraphs }: IntroductionSectionProps) {
  return (
    <section className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
          {title}
        </h2>
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-zinc-400 text-sm md:text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
