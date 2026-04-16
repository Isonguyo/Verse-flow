'use client'

import { useState, useEffect } from 'react'
import { BIBLE_VERSES, SONGS, MEDIA_ITEMS } from '@/lib/constants'
import { BibleVerseComponent } from '@/components/core/bible-verse'
import { SongLyricsComponent } from '@/components/core/song-lyrics'
import { MediaSlideComponent } from '@/components/core/media-slide'
import { Slide } from '@/lib/types'

export default function LiveDisplayPage() {
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

  const [slides] = useState<Slide[]>(initialSlides)
  const [currentIndex, setCurrentIndex] = useState(0)

  // TODO: Replace with WebSocket connection to dashboard for real-time sync
  // ELECTRON: Add IPC channel listener for slide updates from Electron app
  // Example: ipcRenderer.on('slide-changed', (event, newIndex) => setCurrentIndex(newIndex))

  const currentSlide = slides[currentIndex]

  useEffect(() => {
    // PREMIUM: Enable websocket updates for real-time sync
    // const ws = new WebSocket('ws://localhost:3000/live-display')
    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data)
    //   if (data.type === 'slide-update') {
    //     setCurrentIndex(data.slideIndex)
    //   }
    // }
    // return () => ws.close()
  }, [])

  const renderSlide = () => {
    if (!currentSlide) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <p className="text-muted-foreground text-2xl">Waiting for presentation to start...</p>
        </div>
      )
    }

    switch (currentSlide.type) {
      case 'verse':
        return <BibleVerseComponent verse={currentSlide.content as any} isFullScreen fontSize="large" />
      case 'song':
        return <SongLyricsComponent song={currentSlide.content as any} isFullScreen fontSize="large" />
      case 'media':
        return <MediaSlideComponent media={currentSlide.content as any} isFullScreen />
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {renderSlide()}

      {/* Development Mode Indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 text-xs text-muted-foreground bg-background/50 px-3 py-2 rounded">
          Slide {currentIndex + 1} of {slides.length}
        </div>
      )}
    </div>
  )
}
