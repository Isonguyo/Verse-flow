'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-background to-card px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
          <span className="h-2 w-2 rounded-full bg-primary"></span>
          <p className="text-sm text-muted-foreground">
            Now available: Desktop app with live display
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Powerful Presentations for
          <span className="block text-primary"> Every Worship Service</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          VerseFlow is the professional presentation software designed specifically for churches. Project Bible verses, worship songs, and media with beautiful, distraction-free displays.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" asChild className="h-12 px-8 text-base">
            <Link href="/dashboard">Get Started Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base">
            <a href="#features">View Features</a>
          </Button>
        </div>

        {/* Social Proof */}
        <div className="pt-12 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by church leaders and AV teams worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {/* Church logos would go here */}
            <div className="h-8 px-4 bg-muted rounded flex items-center text-sm font-medium">
              Grace Community
            </div>
            <div className="h-8 px-4 bg-muted rounded flex items-center text-sm font-medium">
              Bethel Fellowship
            </div>
            <div className="h-8 px-4 bg-muted rounded flex items-center text-sm font-medium">
              Hope Christian
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
