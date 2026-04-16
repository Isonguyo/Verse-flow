'use client'

import { useState } from 'react'
import { Slide } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GripVertical, X, Plus } from 'lucide-react'

interface DashboardSidebarProps {
  slides: Slide[]
  currentIndex: number
  onSelectSlide: (index: number) => void
  onRemoveSlide: (index: number) => void
  onAddSlide?: () => void
}

export function DashboardSidebar({
  slides,
  currentIndex,
  onSelectSlide,
  onRemoveSlide,
  onAddSlide,
}: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={`border-r border-border bg-card transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4 flex items-center justify-between">
          {!isCollapsed && <h2 className="font-semibold text-sm">Playlist</h2>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? '→' : '←'}
          </Button>
        </div>

        {/* Slides List */}
        <div className="flex-1 overflow-y-auto p-2">
          {slides.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              {!isCollapsed && 'No slides yet'}
            </div>
          ) : (
            <div className="space-y-2">
              {slides.map((slide, index) => (
                <Card
                  key={slide.id}
                  className={`p-3 cursor-pointer transition ${
                    index === currentIndex
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary'
                      : 'hover:bg-muted'
                  } ${isCollapsed ? 'flex items-center justify-center' : ''}`}
                  onClick={() => onSelectSlide(index)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <GripVertical className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">
                          {slide.type === 'verse'
                            ? 'Bible Verse'
                            : slide.type === 'song'
                              ? 'Song'
                              : 'Media'}
                        </p>
                        <p className="text-xs opacity-75 truncate">
                          {slide.type === 'verse'
                            ? (slide.content as any).reference
                            : slide.type === 'song'
                              ? (slide.content as any).title
                              : (slide.content as any).title}
                        </p>
                      </div>
                    )}
                  </div>
                  {!isCollapsed && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveSlide(index)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Add Slide Button */}
        {!isCollapsed && (
          <div className="border-t border-border p-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={onAddSlide}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
