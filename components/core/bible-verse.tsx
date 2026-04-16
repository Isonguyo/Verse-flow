'use client'

import { BibleVerse, Theme } from '@/lib/types'
import { DEFAULT_THEME } from '@/lib/themes'

interface BibleVerseProps {
  verse: BibleVerse
  isFullScreen?: boolean
  fontSize?: 'small' | 'medium' | 'large'
  theme?: Theme
}

export function BibleVerseComponent({
  verse,
  isFullScreen = false,
  fontSize = 'large',
  theme = DEFAULT_THEME,
}: BibleVerseProps) {
  const fontSizeClass = {
    small: 'text-3xl',
    medium: 'text-4xl',
    large: 'text-5xl',
  }[fontSize]

  const customStyle = theme ? {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    color: theme.textColor,
    textAlign: theme.textAlignment as any,
  } : {}

  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 ${
        isFullScreen ? 'min-h-screen' : 'bg-card rounded-lg border border-border'
      } p-8`}
      style={{
        backgroundColor: theme?.backgroundColor,
      }}
    >
      {/* Version Badge */}
      <div
        className="text-sm font-medium uppercase tracking-wide"
        style={{ color: theme?.accentColor }}
      >
        {verse.version}
      </div>

      {/* Verse Text */}
      <p
        className={`${fontSizeClass} font-serif leading-relaxed max-w-4xl`}
        style={{
          fontFamily: theme?.fontFamily,
          fontSize: `${theme?.fontSize}px`,
          color: theme?.textColor,
          textAlign: theme?.textAlignment,
        }}
      >
        "{verse.text}"
      </p>

      {/* Reference */}
      <p
        className="text-lg font-semibold"
        style={{
          color: theme?.accentColor,
        }}
      >
        {verse.reference}
      </p>
    </div>
  )
}
