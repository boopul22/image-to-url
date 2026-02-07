"use client"

import { Star } from "lucide-react"

interface Testimonial {
    name: string
    role: string
    company: string
    quote: string
    avatar: string
    rating: number
}

interface TestimonialsSectionProps {
    title: string
    testimonials: Testimonial[]
}

export function TestimonialsSection({ title, testimonials }: TestimonialsSectionProps) {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                    {title}
                </h2>
                <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">
                    Trusted by developers, designers, and creators worldwide
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1"
                    >
                        {/* Rating */}
                        <div className="flex gap-1 mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < testimonial.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-zinc-600"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Quote */}
                        <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                            &ldquo;{testimonial.quote}&rdquo;
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand/50 to-blue-500/50 flex items-center justify-center text-white font-semibold text-sm">
                                {testimonial.avatar}
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm">{testimonial.name}</p>
                                <p className="text-zinc-500 text-xs">
                                    {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
                                </p>
                            </div>
                        </div>

                        {/* Decorative gradient */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                ))}
            </div>
        </section>
    )
}
