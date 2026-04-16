'use client'

import { Badge } from '@/components/ui/badge'
import { Lock } from 'lucide-react'

interface PremiumBadgeProps {
  children?: React.ReactNode
  showLabel?: boolean
}

export function PremiumBadge({ children, showLabel = true }: PremiumBadgeProps) {
  return (
    <Badge variant="secondary" className="gap-1">
      <Lock className="h-3 w-3" />
      {showLabel && 'Premium'}
      {children}
    </Badge>
  )
}
