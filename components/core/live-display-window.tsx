'use client'

import { useEffect, useState } from 'react'
import { Slide, Theme } from '@/lib/types'
import { BibleVerseComponent } from './bible-verse'
import { SongLyricsComponent } from './song-lyrics'
import { MediaSlideComponent } from './media-slide'
import { getTransitionStyle } from '@/lib/transitions'

interface LiveDisplayWindowProps {
  currentSlide: Slide | null
  theme: Theme
  isBlackScreen?: boolean
  showLogo?: boolean
  logoUrl?: string
}

export function LiveDisplayWindow({
  currentSlide,
  theme,
  isBlackScreen = false,
  showLogo = false,
  logoUrl,
}: LiveDisplayWindowProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const handleFullscreenClick = () => {
    const element = document.getElementById('live-display-container')
    if (element && !isFullscreen) {
      element.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  if (isBlackScreen) {
    return (
      <div
        id="live-display-container"
        className="w-full h-full bg-black flex items-center justify-center cursor-pointer"
        onClick={handleFullscreenClick}
      >
        <div className="text-center text-white text-opacity-50">
          <p className="text-2xl">Display Paused</p>
          <p className="text-sm mt-2">Press &apos;B&apos; to resume</p>
        </div>
      </div>
    )
  }

  if (showLogo && logoUrl) {
    return (
      <div
        id="live-display-container"
        className="w-full h-full flex items-center justify-center cursor-pointer"
        style={{
          backgroundColor: theme.backgroundColor,
        }}
        onClick={handleFullscreenClick}
      >
        <img
          src={logoUrl}
          alt="Church Logo"
          className="max-w-xl max-h-96 object-contain"
        />
      </div>
    )
  }

  if (!currentSlide) {
    return (
      <div
        id="live-display-container"
        className="w-full h-full flex items-center justify-center cursor-pointer"
        style={{
          backgroundColor: theme.backgroundColor,
        }}
        onClick={handleFullscreenClick}
      >
        <p style={{ color: theme.textColor }} className="text-2xl text-opacity-50">
          No Content
        </p>
      </div>
    )
  }

  return (
    <div
      id="live-display-container"
      className="w-full h-full flex items-center justify-center cursor-pointer overflow-hidden"
      style={{
        backgroundColor: theme.backgroundColor,
        ...getTransitionStyle(theme.transitionType, theme.transitionDuration),
      }}
      onClick={handleFullscreenClick}
    >
      <div className="w-full h-full flex items-center justify-center px-8">
        {currentSlide.type === 'verse' && (
          <BibleVerseComponent verse={currentSlide.content as any} theme={theme} />
        )}
        {currentSlide.type === 'song' && (
          <SongLyricsComponent song={currentSlide.content as any} theme={theme} />
        )}
        {currentSlide.type === 'media' && (
          <MediaSlideComponent media={currentSlide.content as any} theme={theme} />
        )}
      </div>
    </div>
  )
}
