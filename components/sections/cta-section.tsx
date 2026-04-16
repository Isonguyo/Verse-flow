'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section id="download" className="py-24 px-4 bg-card">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold">
          Ready to Transform Your Presentations?
        </h2>

        <p className="text-xl text-muted-foreground">
          Start free today. No credit card required. Upgrade anytime.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="h-12 px-8 text-base">
            <Link href="/dashboard">Get Started Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base">
            <a href="#features">Learn More</a>
          </Button>
        </div>

        {/* Features Summary */}
        <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-border">
          <div>
            <p className="text-3xl font-bold text-primary mb-2">100%</p>
            <p className="text-muted-foreground">Free to start</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-2">&lt;2min</p>
            <p className="text-muted-foreground">Setup time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-2">24/7</p>
            <p className="text-muted-foreground">Email support</p>
          </div>
        </div>
      </div>
    </section>
  )
}
