'use client'

import { Card } from '@/components/ui/card'
import { TESTIMONIALS } from '@/lib/constants'
import { Quote } from 'lucide-react'

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Church Leaders
          </h2>
          <p className="text-lg text-muted-foreground">
            See what churches are saying about VerseFlow
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.name} className="bg-card border-border p-8 flex flex-col">
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary mb-4" />

              {/* Quote */}
              <blockquote className="text-lg mb-6 flex-1">
                <p className="italic">"{testimonial.quote}"</p>
              </blockquote>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.church}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
