'use client'

import { useState, useCallback } from 'react'
import { Theme } from '@/lib/types'
import { PREBUILT_THEMES, DEFAULT_THEME } from '@/lib/themes'

const THEME_STORAGE_KEY = 'verseflow-themes'
const CURRENT_THEME_KEY = 'verseflow-current-theme'

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME)
  const [customThemes, setCustomThemes] = useState<Theme[]>([])

  // Load themes from localStorage
  const loadThemes = useCallback(() => {
    if (typeof window !== 'undefined') {
      const savedThemes = localStorage.getItem(THEME_STORAGE_KEY)
      const savedCurrent = localStorage.getItem(CURRENT_THEME_KEY)

      if (savedThemes) {
        setCustomThemes(JSON.parse(savedThemes))
      }

      if (savedCurrent) {
        const theme = JSON.parse(savedCurrent)
        setCurrentTheme(theme)
      }
    }
  }, [])

  // Save current theme
  const saveCurrentTheme = useCallback((theme: Theme) => {
    setCurrentTheme(theme)
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_THEME_KEY, JSON.stringify(theme))
    }
  }, [])

  // Create and save custom theme
  const createTheme = useCallback((theme: Theme) => {
    const newTheme = { ...theme, id: `custom-${Date.now()}` }
    const updated = [...customThemes, newTheme]
    setCustomThemes(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updated))
    }
    return newTheme
  }, [customThemes])

  // Update custom theme
  const updateTheme = useCallback((id: string, updates: Partial<Theme>) => {
    const updated = customThemes.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    )
    setCustomThemes(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updated))
    }
  }, [customThemes])

  // Delete custom theme
  const deleteTheme = useCallback((id: string) => {
    const updated = customThemes.filter((t) => t.id !== id)
    setCustomThemes(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updated))
    }
  }, [customThemes])

  const allThemes = {
    ...PREBUILT_THEMES,
    ...customThemes.reduce((acc, t) => ({ ...acc, [t.id]: t }), {}),
  }

  return {
    currentTheme,
    customThemes,
    allThemes,
    prebuiltThemes: PREBUILT_THEMES,
    saveCurrentTheme,
    createTheme,
    updateTheme,
    deleteTheme,
    loadThemes,
  }
}
