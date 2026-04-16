'use client'

import { Song, Theme } from '@/lib/types'
import { DEFAULT_THEME } from '@/lib/themes'

interface SongLyricsProps {
  song: Song
  isFullScreen?: boolean
  fontSize?: 'small' | 'medium' | 'large'
  theme?: Theme
}

export function SongLyricsComponent({
  song,
  isFullScreen = false,
  fontSize = 'large',
  theme = DEFAULT_THEME,
}: SongLyricsProps) {
  const fontSizeClass = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl',
  }[fontSize]

  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 ${
        isFullScreen ? 'min-h-screen' : 'bg-card rounded-lg border border-border'
      } p-8`}
      style={{
        backgroundColor: theme?.backgroundColor,
      }}
    >
      {/* Song Header */}
      <div
        className="text-center"
        style={{
          color: theme?.textColor,
          fontFamily: theme?.fontFamily,
        }}
      >
        <h2 className="text-3xl font-bold mb-2">{song.title}</h2>
        <p style={{ color: theme?.accentColor }}>{song.artist}</p>
      </div>

      {/* Divider */}
      <div
        className="w-24 h-1 rounded-full"
        style={{ backgroundColor: theme?.accentColor }}
      />

      {/* Lyrics */}
      <div
        className={`${fontSizeClass} text-center whitespace-pre-wrap leading-relaxed font-serif max-w-2xl`}
        style={{
          fontFamily: theme?.fontFamily,
          fontSize: `${theme?.fontSize}px`,
          color: theme?.textColor,
          textAlign: theme?.textAlignment as any,
        }}
      >
        {song.lyrics}
      </div>

      {/* BPM Badge (if available) */}
      {song.bpm && (
        <div style={{ color: theme?.accentColor }} className="mt-4">
          {song.bpm} BPM
        </div>
      )}
    </div>
  )
}
