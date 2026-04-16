'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PremiumBadge } from '@/components/ui/premium-badge'
import { Calendar, Search, MoreVertical, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface SermonRecord {
  id: string
  date: Date
  title: string
  slides: number
  duration: number
}

export default function SermonHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Sample sermon history data
  const sermons: SermonRecord[] = [
    {
      id: '1',
      date: new Date('2024-04-14'),
      title: 'Faith and Trust',
      slides: 12,
      duration: 45,
    },
    {
      id: '2',
      date: new Date('2024-04-07'),
      title: 'Grace Upon Grace',
      slides: 8,
      duration: 38,
    },
    {
      id: '3',
      date: new Date('2024-03-31'),
      title: 'The Resurrection',
      slides: 15,
      duration: 52,
    },
    {
      id: '4',
      date: new Date('2024-03-24'),
      title: 'Walking in Light',
      slides: 10,
      duration: 40,
    },
  ]

  const filteredSermons = sermons.filter((sermon) =>
    sermon.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Sermon History</h1>
              <p className="text-muted-foreground">View and manage past presentations</p>
            </div>
            <PremiumBadge showLabel={false}>
              <span className="text-xs">Analytics</span>
            </PremiumBadge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="flex gap-2 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sermons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        {/* Sermons List */}
        <div className="space-y-4">
          {filteredSermons.length === 0 ? (
            <Card className="bg-card border-border p-12 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? 'No sermons found' : 'No sermon history yet'}
              </p>
            </Card>
          ) : (
            filteredSermons.map((sermon) => (
              <Card
                key={sermon.id}
                className="bg-card border-border p-6 hover:border-primary transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{sermon.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {sermon.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>{sermon.slides} slides</span>
                      <span>{sermon.duration} minutes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard">View</Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Premium Features */}
        <div className="mt-12 p-6 bg-card rounded-lg border border-border">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span>📊 Analytics</span>
            <PremiumBadge showLabel={false} />
          </h3>
          <p className="text-muted-foreground text-sm">
            Upgrade to Premium to see detailed analytics about your presentations, including
            most-used verses, popular songs, and presentation statistics.
          </p>
        </div>
      </div>
    </div>
  )
}
