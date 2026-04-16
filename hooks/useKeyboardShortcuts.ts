'use client'

import { useEffect } from 'react'

interface KeyboardHandlers {
  onNext?: () => void
  onPrevious?: () => void
  onToggleBlackScreen?: () => void
  onTogglePause?: () => void
  onOpenSettings?: () => void
  onToggleStageView?: () => void
}

export function useKeyboardShortcuts(handlers: KeyboardHandlers, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Arrow Right or Space → Next slide
      if (event.key === 'ArrowRight' || (event.key === ' ' && !event.ctrlKey)) {
        event.preventDefault()
        handlers.onNext?.()
      }

      // Arrow Left → Previous slide
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        handlers.onPrevious?.()
      }

      // 'B' → Toggle black screen
      if (event.key === 'b' || event.key === 'B') {
        event.preventDefault()
        handlers.onToggleBlackScreen?.()
      }

      // 'P' → Toggle pause
      if (event.key === 'p' || event.key === 'P') {
        event.preventDefault()
        handlers.onTogglePause?.()
      }

      // Escape or 'S' → Stage view
      if (event.key === 'Escape' || event.key === 's' || event.key === 'S') {
        event.preventDefault()
        handlers.onToggleStageView?.()
      }

      // Ctrl/Cmd + ',' → Settings
      if ((event.ctrlKey || event.metaKey) && event.key === ',') {
        event.preventDefault()
        handlers.onOpenSettings?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlers, enabled])
}
