import { useState, useCallback } from 'react'
import { Slide } from '@/lib/types'

export function usePlaylist(initialSlides: Slide[] = []) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides)
  const [currentIndex, setCurrentIndex] = useState(0)

  const addSlide = useCallback((slide: Slide) => {
    setSlides((prev) => [...prev, slide])
  }, [])

  const removeSlide = useCallback((slideId: string) => {
    setSlides((prev) => prev.filter((slide) => slide.id !== slideId))
  }, [])

  const reorderSlides = useCallback((startIndex: number, endIndex: number) => {
    const result = Array.from(slides)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    setSlides(result)
  }, [slides])

  const getCurrentSlide = useCallback(() => {
    return slides[currentIndex]
  }, [slides, currentIndex])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const previousSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  return {
    slides,
    currentIndex,
    setCurrentIndex,
    addSlide,
    removeSlide,
    reorderSlides,
    getCurrentSlide,
    nextSlide,
    previousSlide,
  }
}
