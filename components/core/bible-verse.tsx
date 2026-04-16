'use client'

import { BibleVerse } from '@/lib/types'

interface BibleVerseProps {
  verse: BibleVerse
  isFullScreen?: boolean
  fontSize?: 'small' | 'medium' | 'large'
}

export function BibleVerseComponent({
  verse,
  isFullScreen = false,
  fontSize = 'large',
}: BibleVerseProps) {
  const fontSizeClass = {
    small: 'text-3xl',
    medium: 'text-4xl',
    large: 'text-5xl',
  }[fontSize]

  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 ${
        isFullScreen
          ? 'min-h-screen bg-gradient-to-b from-background to-card'
          : 'bg-card rounded-lg border border-border'
      } p-8`}
    >
      {/* Version Badge */}
      <div className="text-sm font-medium text-primary uppercase tracking-wide">
        {verse.version}
      </div>

      {/* Verse Text */}
      <p className={`${fontSizeClass} font-serif text-center leading-relaxed`}>
        "{verse.text}"
      </p>

      {/* Reference */}
      <p className="text-lg text-muted-foreground font-semibold">
        {verse.reference}
      </p>
    </div>
  )
}
