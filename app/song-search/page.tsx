'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SONGS } from '@/lib/constants'
import { Song } from '@/lib/types'
import { Search, Plus } from 'lucide-react'
import Link from 'next/link'

export default function SongSearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<Song[]>(SONGS)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setResults(SONGS)
      return
    }

    const filtered = SONGS.filter(
      (song) =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.lyrics.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Song Search</h1>
          <p className="text-muted-foreground">Find and add worship songs to your presentations</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, artist, or lyrics..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.length === 0 ? (
            <Card className="bg-card border-border p-12 text-center">
              <p className="text-muted-foreground">No songs found matching "{searchQuery}"</p>
            </Card>
          ) : (
            results.map((song) => (
              <Card key={song.id} className="bg-card border-border p-6 hover:border-primary transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{song.title}</h3>
                    <p className="text-muted-foreground">{song.artist}</p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {song.lyrics.substring(0, 150)}...
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {song.bpm && (
                      <span className="text-xs bg-muted px-3 py-1 rounded-full">
                        {song.bpm} BPM
                      </span>
                    )}
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add to Playlist
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Info */}
        <div className="mt-12 p-6 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">
            {/* AI: Groq/OpenAI LLM integration point */}
            {/* TODO: Connect to backend to fetch complete song library and add AI-powered search suggestions */}
            Currently showing {results.length} songs from the default library.
          </p>
        </div>
      </div>
    </div>
  )
}
