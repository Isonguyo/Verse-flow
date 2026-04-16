// TypeScript interfaces for VerseFlow

export interface BibleVerse {
  id: string
  reference: string
  text: string
  version: 'KJV' | 'NIV' | 'NKJV'
}

export interface Song {
  id: string
  title: string
  artist: string
  lyrics: string
  verses: string[]
  bpm?: number
}

export interface MediaItem {
  id: string
  title: string
  type: 'image' | 'video'
  url: string
  duration?: number
}

export interface Slide {
  id: string
  type: 'verse' | 'song' | 'media'
  content: BibleVerse | Song | MediaItem
  duration?: number
  addedAt: Date
}

export interface UserSettings {
  bibleVersion: 'KJV' | 'NIV' | 'NKJV'
  theme: 'light' | 'dark'
  fontSize: 'small' | 'medium' | 'large'
  backgroundColor: string
  textColor: string
  premiumEnabled: boolean
  aiSuggestionsEnabled: boolean
  autoAdvanceSlides: boolean
  slideDisplayTime: number
  dualScreenMode: boolean
}

export interface AppContextType {
  settings: UserSettings
  updateSettings: (settings: Partial<UserSettings>) => void
  currentSlideIndex: number
  setCurrentSlideIndex: (index: number) => void
  isPremium: boolean
}

export interface Testimonial {
  name: string
  church: string
  quote: string
}
