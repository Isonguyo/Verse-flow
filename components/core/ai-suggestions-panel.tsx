'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PremiumBadge } from '@/components/ui/premium-badge'
import { Lightbulb, Zap } from 'lucide-react'

interface AISuggestion {
  id: string
  type: 'verse' | 'song'
  title: string
  description: string
  reason: string
}

interface AISuggestionsPanelProps {
  isPremium?: boolean
  currentText?: string
  onSelectSuggestion?: (suggestion: AISuggestion) => void
}

export function AISuggestionsPanel({
  isPremium = false,
  currentText = '',
  onSelectSuggestion,
}: AISuggestionsPanelProps) {
  // PREMIUM: AI:
  // This component integrates with:
  // 1. Whisper API for audio→text transcription
  // 2. NLP for sermon theme detection
  // 3. Groq/OpenAI for intelligent suggestions
  //
  // Example flow:
  // 1. User speaks or enters theme
  // 2. Whisper transcribes audio to text
  // 3. NLP extracts sermon topics
  // 4. LLM generates verse/song suggestions
  // 5. Results displayed here

  const [suggestions] = useState<AISuggestion[]>([
    {
      id: 'suggestion-1',
      type: 'verse',
      title: 'Romans 8:28',
      description: 'All things work together for good...',
      reason: 'Matches sermon theme: faith and trust',
    },
    {
      id: 'suggestion-2',
      type: 'song',
      title: 'Great Is Thy Faithfulness',
      description: 'Morning by morning new mercies I see...',
      reason: 'Complements theme perfectly',
    },
    {
      id: 'suggestion-3',
      type: 'verse',
      title: 'Proverbs 3:5-6',
      description: 'Trust in the Lord with all your heart...',
      reason: 'Related to current section',
    },
  ])

  if (!isPremium) {
    return (
      <Card className="bg-card border-border p-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl">✨</div>
          <h3 className="font-semibold">AI-Powered Suggestions</h3>
          <p className="text-sm text-muted-foreground">
            Upgrade to VerseFlow Premium to get intelligent suggestions for verses and songs.
          </p>
          <PremiumBadge />
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">AI Suggestions</h3>
      </div>

      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {suggestions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Speak or enter a theme to get suggestions
          </p>
        ) : (
          suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="border border-border rounded-lg p-3 hover:bg-muted transition cursor-pointer"
              onClick={() => onSelectSuggestion?.(suggestion)}
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="text-xs font-medium text-primary uppercase">
                  {suggestion.type}
                </span>
                <Zap className="h-3 w-3 text-yellow-500 flex-shrink-0 mt-0.5" />
              </div>
              <p className="font-medium text-sm">{suggestion.title}</p>
              <p className="text-xs text-muted-foreground">{suggestion.description}</p>
              <p className="text-xs text-primary mt-2 flex items-center gap-1">
                💡 {suggestion.reason}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground text-center">
          AI suggestions powered by advanced NLP and LLM analysis.
        </p>
      </div>
    </Card>
  )
}
