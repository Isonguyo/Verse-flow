'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    description: 'Perfect for small churches getting started',
    price: '0',
    features: [
      'Manual Bible verse projection',
      'Song lyrics display',
      'Local media slides',
      'Basic playlist management',
      'Single device operation',
      'Up to 100 slides per presentation',
    ],
  },
  {
    name: 'Premium',
    description: 'For churches wanting advanced features',
    price: '9.99',
    period: 'per month',
    highlighted: true,
    features: [
      'All Free features',
      'AI-powered suggestions for verses & songs',
      'Audio-to-text verse detection',
      'Cloud sync across devices',
      'Multi-user collaboration',
      'Dual-screen mode',
      'Advanced analytics & sermon history',
      'Priority support',
      'Custom backgrounds & themes',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    price: 'Custom',
    features: [
      'All Premium features',
      'Dedicated account manager',
      'Custom integrations',
      'On-site training',
      'Advanced security options',
      'Multi-location sync',
      'API access',
      'SLA guarantee',
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade when you need advanced features
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-primary text-primary-foreground border-primary ring-2 ring-primary transform md:scale-105'
                  : 'bg-background border-border'
              }`}
            >
              {/* Plan Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? 'opacity-90' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.period && <span className={plan.highlighted ? 'opacity-90' : 'text-muted-foreground'}>{plan.period}</span>}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                className="mb-8"
                variant={plan.highlighted ? 'secondary' : 'default'}
                asChild
              >
                <a href="/dashboard">Get Started</a>
              </Button>

              {/* Features List */}
              <div className="space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include 30-day free trial. No credit card required.
          </p>
          <p className="text-sm text-muted-foreground">
            Interested in custom pricing? <a href="#contact" className="text-primary hover:underline">Contact our team</a>
          </p>
        </div>
      </div>
    </section>
  )
}
