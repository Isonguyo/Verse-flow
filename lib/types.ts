// TypeScript interfaces for VerseFlow

export interface BibleVerse {
  id: string
  reference: string
  text: string
  version: 'KJV' | 'NIV' | 'NKJV'
}

export interface SongSection {
  id: string
  type: 'verse' | 'chorus' | 'bridge' | 'pre-chorus' | 'outro' | 'intro'
  lyrics: string
  order: number
}

export interface Song {
  id: string
  title: string
  artist: string
  lyrics: string
  verses: string[]
  sections?: SongSection[]
  bpm?: number
  duration?: number
}

export interface MediaItem {
  id: string
  title: string
  type: 'image' | 'video'
  url: string
  duration?: number
}

export interface Theme {
  id: string
  name: string
  fontFamily: string
  fontSize: number
  fontWeight: 'normal' | 'bold' | '700' | '600'
  textAlignment: 'left' | 'center' | 'right'
  backgroundColor: string
  textColor: string
  accentColor: string
  backgroundStyle: 'solid' | 'gradient' | 'image' | 'video'
  backgroundValue?: string
  transitionType: 'fade' | 'slide' | 'zoom' | 'none'
  transitionDuration: number
  isPrebuilt?: boolean
}

export interface Slide {
  id: string
  type: 'verse' | 'song' | 'media' | 'blank' | 'logo'
  content: BibleVerse | Song | MediaItem | null
  duration?: number
  addedAt: Date
  themeOverride?: Partial<Theme>
  notes?: string
}

export interface ServicePlanItem {
  id: string
  type: 'prayer' | 'song' | 'sermon' | 'offering' | 'media' | 'announcement'
  title: string
  duration: number
  slides?: Slide[]
  order: number
}

export interface ServicePlan {
  id: string
  name: string
  date: Date
  items: ServicePlanItem[]
  createdAt: Date
  updatedAt: Date
}

export interface UserSettings {
  bibleVersion: 'KJV' | 'NIV' | 'NKJV'
  themeId: string
  premiumEnabled: boolean
  aiSuggestionsEnabled: boolean
  autoAdvanceSlides: boolean
  slideDisplayTime: number
  dualScreenMode: boolean
  stageModeEnabled: boolean
  keyboardShortcutsEnabled: boolean
  countdownEnabled: boolean
}

export interface AISuggestion {
  id: string
  type: 'verse' | 'song' | 'theme'
  title: string
  description: string
  relevanceScore: number
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
