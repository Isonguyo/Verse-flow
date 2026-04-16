'use client'

import { Card } from '@/components/ui/card'
import { BookOpen, Music, Image as ImageIcon, Wand2, Smartphone, Share2 } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Bible Verse Projection',
    description: 'Project Bible verses in multiple translations with beautiful, readable typography.',
  },
  {
    icon: Music,
    title: 'Worship Song Lyrics',
    description: 'Display song lyrics with seamless transitions for your worship team.',
  },
  {
    icon: ImageIcon,
    title: 'Media Slides',
    description: 'Show images and videos as part of your presentation flow.',
  },
  {
    icon: Wand2,
    title: 'AI Suggestions',
    description: 'Get intelligent suggestions for verses and songs based on your sermon theme (Premium).',
  },
  {
    icon: Smartphone,
    title: 'Dual Display Mode',
    description: 'Run operator controls on one screen and display on another simultaneously.',
  },
  {
    icon: Share2,
    title: 'Cloud Sync',
    description: 'Sync your playlists across devices and collaborate with your worship team.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Designed for Modern Church Ministry
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for professional, distraction-free presentations
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="bg-card border-border p-6 hover:border-primary transition">
                <div className="mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
