'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MEDIA_ITEMS } from '@/lib/constants'
import { Plus, Upload, Play } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function MediaLibraryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Media Library</h1>
          <p className="text-muted-foreground">Manage images and videos for your presentations</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Actions */}
        <div className="flex gap-3 mb-8">
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Media
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        {/* Media Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MEDIA_ITEMS.map((item) => (
            <Card
              key={item.id}
              className="bg-card border-border overflow-hidden hover:border-primary transition group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-black overflow-hidden">
                {item.type === 'image' && (
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.backgroundColor = '#333'
                    }}
                  />
                )}
                {item.type === 'video' && (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground">
                    <Play className="h-8 w-8 text-background" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground capitalize mt-1">
                  {item.type}
                  {item.duration && ` • ${Math.floor(item.duration / 60)}min`}
                </p>
                <Button variant="ghost" size="sm" className="w-full mt-3 gap-2">
                  <Plus className="h-3 w-3" />
                  Add to Playlist
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State / Info */}
        {MEDIA_ITEMS.length === 0 && (
          <Card className="bg-card border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">No media files yet</p>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Your First Image
            </Button>
          </Card>
        )}

        {/* TODO Note */}
        <div className="mt-12 p-6 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">
            {/* PREMIUM: Cloud sync for media files */}
            {/* TODO: Implement Vercel Blob integration for file uploads and cloud storage */}
            Currently showing media from local library. Upgrade to Premium for cloud sync.
          </p>
        </div>
      </div>
    </div>
  )
}
