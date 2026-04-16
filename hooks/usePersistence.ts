'use client'

import { useCallback } from 'react'
import { Slide, ServicePlan } from '@/lib/types'

const PLAYLIST_KEY = 'verseflow-playlist'
const SERVICE_PLANS_KEY = 'verseflow-service-plans'
const MEDIA_LIBRARY_KEY = 'verseflow-media-library'

export function usePersistence() {
  // Playlist persistence
  const savePlaylist = useCallback((slides: Slide[], name: string) => {
    if (typeof window !== 'undefined') {
      const playlists = loadAllPlaylists()
      playlists[name] = slides
      localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlists))
    }
  }, [])

  const loadPlaylist = useCallback((name: string): Slide[] | null => {
    if (typeof window !== 'undefined') {
      const playlists = loadAllPlaylists()
      return playlists[name] || null
    }
    return null
  }, [])

  const loadAllPlaylists = useCallback((): Record<string, Slide[]> => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(PLAYLIST_KEY)
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  }, [])

  const deletePlaylist = useCallback((name: string) => {
    if (typeof window !== 'undefined') {
      const playlists = loadAllPlaylists()
      delete playlists[name]
      localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlists))
    }
  }, [])

  // Service plan persistence
  const saveServicePlan = useCallback((plan: ServicePlan) => {
    if (typeof window !== 'undefined') {
      const plans = loadAllServicePlans()
      plans[plan.id] = plan
      localStorage.setItem(SERVICE_PLANS_KEY, JSON.stringify(plans))
    }
  }, [])

  const loadServicePlan = useCallback((id: string): ServicePlan | null => {
    if (typeof window !== 'undefined') {
      const plans = loadAllServicePlans()
      return plans[id] || null
    }
    return null
  }, [])

  const loadAllServicePlans = useCallback((): Record<string, ServicePlan> => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SERVICE_PLANS_KEY)
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  }, [])

  const deleteServicePlan = useCallback((id: string) => {
    if (typeof window !== 'undefined') {
      const plans = loadAllServicePlans()
      delete plans[id]
      localStorage.setItem(SERVICE_PLANS_KEY, JSON.stringify(plans))
    }
  }, [])

  // Export/Import for offline capability
  const exportData = useCallback(() => {
    if (typeof window !== 'undefined') {
      return {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        playlists: loadAllPlaylists(),
        servicePlans: loadAllServicePlans(),
      }
    }
    return null
  }, [])

  const importData = useCallback((data: any) => {
    if (typeof window !== 'undefined') {
      if (data.playlists) {
        localStorage.setItem(PLAYLIST_KEY, JSON.stringify(data.playlists))
      }
      if (data.servicePlans) {
        localStorage.setItem(SERVICE_PLANS_KEY, JSON.stringify(data.servicePlans))
      }
    }
  }, [])

  return {
    savePlaylist,
    loadPlaylist,
    loadAllPlaylists,
    deletePlaylist,
    saveServicePlan,
    loadServicePlan,
    loadAllServicePlans,
    deleteServicePlan,
    exportData,
    importData,
  }
}
