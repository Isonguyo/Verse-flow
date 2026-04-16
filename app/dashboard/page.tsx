'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/layouts/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BibleVerseComponent } from '@/components/core/bible-verse'
import { SongLyricsComponent } from '@/components/core/song-lyrics'
import { MediaSlideComponent } from '@/components/core/media-slide'
import { AISuggestionsPanel } from '@/components/core/ai-suggestions-panel'
import { BIBLE_VERSES, SONGS, MEDIA_ITEMS } from '@/lib/constants'
import { Slide } from '@/lib/types'
import { Play, Pause, SkipBack, SkipForward, Eye, Settings } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  // Initialize with sample slides
  const initialSlides: Slide[] = [
    {
      id: 'verse-1',
      type: 'verse',
      content: BIBLE_VERSES[0],
      addedAt: new Date(),
    },
    {
      id: 'song-1',
      type: 'song',
      content: SONGS[0],
      addedAt: new Date(),
    },
    {
      id: 'verse-2',
      type: 'verse',
      content: BIBLE_VERSES[2],
      addedAt: new Date(),
    },
    {
      id: 'media-1',
      type: 'media',
      content: MEDIA_ITEMS[0],
      addedAt: new Date(),
    },
  ]

  const [slides, setSlides] = useState<Slide[]>(initialSlides)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentSlide = slides[currentIndex]

  const handleAddSlide = () => {
    // PREMIUM: This is a placeholder for add slide functionality
    // TODO: Replace with actual slide selection interface
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      type: 'verse',
      content: BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)],
      addedAt: new Date(),
    }
    setSlides([...slides, newSlide])
  }

  const handleRemoveSlide = (index: number) => {
    setSlides(slides.filter((_, i) => i !== index))
    if (currentIndex >= slides.length - 1) {
      setCurrentIndex(Math.max(0, currentIndex - 1))
    }
  }

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const handlePreviousSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const renderSlide = () => {
    if (!currentSlide) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No slides yet. Add one to get started.</p>
        </div>
      )
    }

    switch (currentSlide.type) {
      case 'verse':
        return (
          <BibleVerseComponent
            verse={currentSlide.content as any}
            fontSize="large"
          />
        )
      case 'song':
        return (
          <SongLyricsComponent
            song={currentSlide.content as any}
            fontSize="large"
          />
        )
      case 'media':
        return (
          <MediaSlideComponent
            media={currentSlide.content as any}
          />
        )
    }
  }

  return (
    <div className="flex flex-1 h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <DashboardSidebar
        slides={slides}
        currentIndex={currentIndex}
        onSelectSlide={setCurrentIndex}
        onRemoveSlide={handleRemoveSlide}
        onAddSlide={handleAddSlide}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Preview Area */}
        <div className="flex-1 border-b border-border p-6 bg-background">
          <div className="h-full bg-card rounded-lg border border-border overflow-hidden">
            {renderSlide()}
          </div>
        </div>

        {/* Controls */}
        <div className="border-b border-border bg-card p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviousSlide}
                disabled={slides.length === 0}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={slides.length === 0}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextSlide}
                disabled={slides.length === 0}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">
                {slides.length > 0 ? `${currentIndex + 1} / ${slides.length}` : '0 / 0'}
              </span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm" asChild>
                <Link href="/live-display" target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  Live Display
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="grid grid-cols-3 gap-4 flex-1 p-6 overflow-auto">
          {/* AI Suggestions Panel */}
          <div className="col-span-1">
            <AISuggestionsPanel isPremium={false} currentText="" />
          </div>

          {/* Quick Actions */}
          <div className="col-span-1">
            <Card className="bg-card border-border p-6 h-full flex flex-col">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2 flex-1">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  Add Bible Verse
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  Add Song
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  Upload Media
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm" asChild>
                  <Link href="/song-search">Search Songs</Link>
                </Button>
              </div>
            </Card>
          </div>

          {/* Shortcuts */}
          <div className="col-span-1">
            <Card className="bg-card border-border p-6 h-full flex flex-col">
              <h3 className="font-semibold mb-4">Navigation</h3>
              <div className="space-y-2 flex-1">
                <Button variant="outline" className="w-full justify-start" size="sm" asChild>
                  <Link href="/media-library">Media Library</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm" asChild>
                  <Link href="/sermon-history">Sermon History</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
