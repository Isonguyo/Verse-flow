'use client'

import { Slide, Theme } from '@/lib/types'
import { BibleVerseComponent } from './bible-verse'
import { SongLyricsComponent } from './song-lyrics'
import { Card } from '@/components/ui/card'
import { Clock } from 'lucide-react'

interface StageViewProps {
  currentSlide: Slide | null
  nextSlide: Slide | null
  upcomingSlides: Slide[]
  theme: Theme
  slideNotes?: string
}

export function StageView({
  currentSlide,
  nextSlide,
  upcomingSlides,
  theme,
  slideNotes,
}: StageViewProps) {
  return (
    <div className="h-full overflow-auto bg-slate-900 text-white p-4 space-y-4">
      <div className="text-sm text-slate-400 mb-4">STAGE VIEW - FOR PREACHER/CHOIR</div>

      {/* Current Slide */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-300">NOW SHOWING</h3>
        <Card className="bg-slate-800 border-slate-700 p-4">
          {currentSlide ? (
            <div className="space-y-2">
              <div
                className="rounded h-32 flex items-center justify-center text-sm text-slate-400"
                style={{
                  backgroundColor: theme.backgroundColor,
                  border: `2px solid ${theme.accentColor}`,
                }}
              >
                {currentSlide.type === 'verse' && 'Bible Verse'}
                {currentSlide.type === 'song' && 'Song Lyrics'}
                {currentSlide.type === 'media' && 'Media'}
              </div>
              {slideNotes && (
                <div className="text-xs text-slate-400 mt-2">
                  <p className="font-semibold mb-1">Notes:</p>
                  <p>{slideNotes}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-400">No slide</p>
          )}
        </Card>
      </div>

      {/* Next Slide Preview */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-300">NEXT SLIDE</h3>
        <Card className="bg-slate-800 border-slate-700 p-4">
          {nextSlide ? (
            <div
              className="rounded h-20 flex items-center justify-center text-xs text-slate-400"
              style={{
                backgroundColor: theme.backgroundColor,
              }}
            >
              {nextSlide.type === 'verse' && 'Bible Verse'}
              {nextSlide.type === 'song' && 'Song Lyrics'}
              {nextSlide.type === 'media' && 'Media'}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No upcoming slides</p>
          )}
        </Card>
      </div>

      {/* Upcoming Slides */}
      {upcomingSlides.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300">UPCOMING ({upcomingSlides.length})</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {upcomingSlides.map((slide, idx) => (
              <div key={slide.id} className="text-xs bg-slate-700 p-2 rounded">
                <span className="text-slate-400">#{idx + 1}</span> {' '}
                <span className="text-slate-200">
                  {slide.type === 'verse' && 'Verse'}
                  {slide.type === 'song' && 'Song'}
                  {slide.type === 'media' && 'Media'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timer */}
      <div className="pt-4 border-t border-slate-700">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="h-4 w-4" />
          <span>Press &apos;S&apos; to close stage view</span>
        </div>
      </div>
    </div>
  )
}
