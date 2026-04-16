'use client'

import { Song } from '@/lib/types'

interface SongLyricsProps {
  song: Song
  isFullScreen?: boolean
  fontSize?: 'small' | 'medium' | 'large'
}

export function SongLyricsComponent({
  song,
  isFullScreen = false,
  fontSize = 'large',
}: SongLyricsProps) {
  const fontSizeClass = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl',
  }[fontSize]

  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 ${
        isFullScreen
          ? 'min-h-screen bg-gradient-to-b from-background to-card'
          : 'bg-card rounded-lg border border-border'
      } p-8`}
    >
      {/* Song Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">{song.title}</h2>
        <p className="text-muted-foreground">{song.artist}</p>
      </div>

      {/* Divider */}
      <div className="w-24 h-1 bg-primary rounded-full" />

      {/* Lyrics */}
      <div className={`${fontSizeClass} text-center whitespace-pre-wrap leading-relaxed font-serif max-w-2xl`}>
        {song.lyrics}
      </div>

      {/* BPM Badge (if available) */}
      {song.bpm && (
        <div className="text-sm text-muted-foreground mt-4">
          {song.bpm} BPM
        </div>
      )}
    </div>
  )
}
