'use client'

import Image from 'next/image'
import { MediaItem } from '@/lib/types'

interface MediaSlideProps {
  media: MediaItem
  isFullScreen?: boolean
}

export function MediaSlideComponent({
  media,
  isFullScreen = false,
}: MediaSlideProps) {
  const isVideo = media.type === 'video'
  const isImage = media.type === 'image'

  return (
    <div
      className={`flex items-center justify-center ${
        isFullScreen
          ? 'min-h-screen bg-black'
          : 'bg-black rounded-lg border border-border overflow-hidden'
      }`}
    >
      {isImage && (
        // Image display
        <div className={`relative w-full ${isFullScreen ? 'h-screen' : 'h-96'}`}>
          <Image
            src={media.url}
            alt={media.title}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              // Fallback for missing images
              const target = e.target as HTMLImageElement
              target.style.backgroundColor = '#333'
              target.style.display = 'flex'
              target.style.alignItems = 'center'
              target.style.justifyContent = 'center'
            }}
          />
        </div>
      )}

      {isVideo && (
        // Video display with fallback
        <div className={`relative w-full ${isFullScreen ? 'h-screen' : 'h-96'}`}>
          <video
            src={media.url}
            controls={!isFullScreen}
            autoPlay
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback for missing videos
              const parent = e.currentTarget.parentElement
              if (parent) {
                parent.innerHTML =
                  '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">Video not found</div>'
              }
            }}
          >
            Your browser doesn&apos;t support HTML5 video.
          </video>
        </div>
      )}

      {/* Media Info Overlay (in non-fullscreen mode) */}
      {!isFullScreen && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <p className="text-white font-semibold">{media.title}</p>
          {media.duration && (
            <p className="text-gray-300 text-sm">{Math.floor(media.duration / 60)}min</p>
          )}
        </div>
      )}
    </div>
  )
}
