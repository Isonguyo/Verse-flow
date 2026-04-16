'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { UserSettings, AppContextType } from '@/lib/types'
import { DEFAULT_SETTINGS } from '@/lib/constants'

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPremium] = useState(false)

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const value: AppContextType = {
    settings,
    updateSettings,
    currentSlideIndex,
    setCurrentSlideIndex,
    isPremium,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
