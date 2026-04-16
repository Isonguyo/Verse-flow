'use client'

import { useState, useEffect } from 'react'
import { DashboardSidebar } from '@/components/layouts/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BibleVerseComponent } from '@/components/core/bible-verse'
import { SongLyricsComponent } from '@/components/core/song-lyrics'
import { MediaSlideComponent } from '@/components/core/media-slide'
import { AISuggestionsPanel } from '@/components/core/ai-suggestions-panel'
import { LiveDisplayWindow } from '@/components/core/live-display-window'
import { StageView } from '@/components/core/stage-view'
import { ThemeBuilder } from '@/components/core/theme-builder'
import { ServicePlanner } from '@/components/core/service-planner'
import { useTheme } from '@/hooks/useTheme'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { usePersistence } from '@/hooks/usePersistence'
import { BIBLE_VERSES, SONGS, MEDIA_ITEMS } from '@/lib/constants'
import { Slide, ServicePlan, Theme } from '@/lib/types'
import { Play, Pause, SkipBack, SkipForward, Eye, Settings, Monitor, Users, Menu } from 'lucide-react'
import Link from 'next/link'

export default function EnhancedDashboard() {
  const { currentTheme, saveCurrentTheme, prebuiltThemes } = useTheme()
  const { savePlaylist, loadPlaylist, saveServicePlan, loadServicePlan } = usePersistence()

  // Initialize sample slides
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
  const [isBlackScreen, setIsBlackScreen] = useState(false)
  const [showStageView, setShowStageView] = useState(false)
  const [showDualScreen, setShowDualScreen] = useState(false)
  const [showServicePlanner, setShowServicePlanner] = useState(false)
  const [showThemeBuilder, setShowThemeBuilder] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(currentTheme)
  const [servicePlan, setServicePlan] = useState<ServicePlan>({
    id: `plan-${Date.now()}`,
    name: 'Sunday Service',
    date: new Date(),
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const currentSlide = slides[currentIndex]
  const nextSlide = slides[currentIndex + 1] || null
  const upcomingSlides = slides.slice(currentIndex + 2)

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onNext: () => handleNextSlide(),
    onPrevious: () => handlePreviousSlide(),
    onToggleBlackScreen: () => setIsBlackScreen(!isBlackScreen),
    onTogglePause: () => setIsPlaying(!isPlaying),
    onToggleStageView: () => setShowStageView(!showStageView),
    onOpenSettings: () => setShowThemeBuilder(!showThemeBuilder),
  }, true)

  const handleAddSlide = () => {
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

  const handleSavePlaylist = (name: string) => {
    savePlaylist(slides, name)
    alert(`Playlist saved as "${name}"`)
  }

  const handleSaveServicePlan = () => {
    saveServicePlan(servicePlan)
    alert('Service plan saved')
  }

  // Render the main view
  if (showServicePlanner) {
    return (
      <div className="h-screen bg-slate-950 text-foreground flex flex-col">
        <header className="border-b border-slate-800 p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Service Planner</h1>
          <Button onClick={() => setShowServicePlanner(false)} variant="outline">
            Back to Dashboard
          </Button>
        </header>
        <div className="flex-1 overflow-auto p-4">
          <ServicePlanner servicePlan={servicePlan} onUpdate={setServicePlan} />
          <div className="mt-4">
            <Button onClick={handleSaveServicePlan}>Save Service Plan</Button>
          </div>
        </div>
      </div>
    )
  }

  if (showThemeBuilder) {
    return (
      <div className="h-screen bg-slate-950 text-foreground flex flex-col">
        <header className="border-b border-slate-800 p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Theme Builder</h1>
          <Button onClick={() => setShowThemeBuilder(false)} variant="outline">
            Back to Dashboard
          </Button>
        </header>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-3">Prebuilt Themes</h2>
            <div className="space-y-3">
              {Object.values(prebuiltThemes).map((theme) => (
                <ThemeBuilder
                  key={theme.id}
                  theme={theme}
                  onChange={setSelectedTheme}
                  isPrebuilt
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showDualScreen) {
    return (
      <div className="h-screen bg-slate-950 flex">
        {/* Operator View */}
        <div className="w-1/2 border-r border-slate-800 flex flex-col">
          <header className="border-b border-slate-800 p-2 flex items-center justify-between">
            <h3 className="font-semibold text-sm">Operator View</h3>
            <Button onClick={() => setShowDualScreen(false)} size="sm" variant="outline">
              Exit Dual Screen
            </Button>
          </header>
          <div className="flex-1 overflow-auto p-2 space-y-2">
            {/* Playlist preview */}
            <div className="space-y-1">
              {slides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`p-2 rounded text-xs cursor-pointer ${
                    idx === currentIndex
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  Slide {idx + 1}: {slide.type}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-800 p-2 space-y-2">
            <div className="flex gap-1">
              <Button onClick={handlePreviousSlide} size="sm">
                ←
              </Button>
              <Button onClick={() => setIsPlaying(!isPlaying)} size="sm" variant={isPlaying ? 'default' : 'outline'}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button onClick={handleNextSlide} size="sm">
                →
              </Button>
            </div>
          </div>
        </div>

        {/* Live Display */}
        <div className="w-1/2 flex flex-col">
          <header className="border-b border-slate-800 p-2">
            <h3 className="font-semibold text-sm">Live Display</h3>
          </header>
          <div className="flex-1 overflow-hidden">
            <LiveDisplayWindow
              currentSlide={currentSlide}
              theme={selectedTheme}
              isBlackScreen={isBlackScreen}
            />
          </div>
        </div>
      </div>
    )
  }

  if (showStageView) {
    return (
      <div className="h-screen bg-slate-900 flex flex-col">
        <header className="border-b border-slate-800 p-2 bg-slate-800">
          <Button onClick={() => setShowStageView(false)} size="sm" variant="outline">
            Exit Stage View (Press S)
          </Button>
        </header>
        <div className="flex-1 overflow-auto">
          <StageView
            currentSlide={currentSlide}
            nextSlide={nextSlide}
            upcomingSlides={upcomingSlides}
            theme={selectedTheme}
          />
        </div>
      </div>
    )
  }

  // Main Dashboard View
  return (
    <div className="h-screen bg-slate-950 text-foreground flex">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header with controls */}
        <header className="border-b border-slate-800 p-4 bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-slate-400">
                Slide {currentIndex + 1} of {slides.length}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowStageView(true)}
                size="sm"
                variant="outline"
                title="Press 'S' to show stage view"
              >
                <Users className="h-4 w-4 mr-1" />
                Stage View
              </Button>
              <Button
                onClick={() => setShowDualScreen(true)}
                size="sm"
                variant="outline"
                title="Open dual-screen operator mode"
              >
                <Monitor className="h-4 w-4 mr-1" />
                Dual Screen
              </Button>
              <Button
                onClick={() => setShowServicePlanner(true)}
                size="sm"
                variant="outline"
              >
                <Menu className="h-4 w-4 mr-1" />
                Service Plan
              </Button>
              <Button
                onClick={() => setShowThemeBuilder(true)}
                size="sm"
                variant="outline"
              >
                <Settings className="h-4 w-4 mr-1" />
                Themes
              </Button>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <div className="flex-1 overflow-auto flex">
          {/* Live preview */}
          <div className="flex-1 flex flex-col bg-slate-900">
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <LiveDisplayWindow
                currentSlide={currentSlide}
                theme={selectedTheme}
                isBlackScreen={isBlackScreen}
              />
            </div>

            {/* Controls */}
            <div className="border-t border-slate-800 p-4 bg-slate-900 space-y-3">
              <div className="flex gap-2">
                <Button onClick={handlePreviousSlide} variant="outline">
                  <SkipBack className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  onClick={() => setIsBlackScreen(!isBlackScreen)}
                  variant={isBlackScreen ? 'destructive' : 'outline'}
                >
                  {isBlackScreen ? 'Resume' : 'Black Screen (B)'}
                </Button>
                <Button onClick={handleNextSlide} variant="outline">
                  Next
                  <SkipForward className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="flex gap-2 text-xs text-slate-400">
                <span>Arrow keys: Navigate • B: Black screen • S: Stage view • Ctrl+,: Settings</span>
              </div>
            </div>
          </div>

          {/* Sidebar with playlist and suggestions */}
          <div className="w-80 border-l border-slate-800 flex flex-col bg-slate-950">
            <div className="border-b border-slate-800 p-3 flex items-center justify-between">
              <h2 className="font-semibold">Playlist</h2>
              <Button onClick={handleAddSlide} size="sm">
                Add
              </Button>
            </div>

            <div className="flex-1 overflow-auto space-y-1 p-2">
              {slides.map((slide, idx) => (
                <Card
                  key={slide.id}
                  className={`p-2 cursor-pointer transition-colors ${
                    idx === currentIndex
                      ? 'bg-indigo-600 border-indigo-500'
                      : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-200">
                        {slide.type === 'verse' && 'Verse'}
                        {slide.type === 'song' && 'Song'}
                        {slide.type === 'media' && 'Media'}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {slide.content?.title || 'Untitled'}
                      </p>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveSlide(idx)
                      }}
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="border-t border-slate-800 p-3">
              <AISuggestionsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
