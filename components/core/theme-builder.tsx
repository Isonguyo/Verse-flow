'use client'

import { useState } from 'react'
import { Theme } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Copy, X } from 'lucide-react'

interface ThemeBuilderProps {
  theme: Theme
  onChange: (theme: Theme) => void
  onSave?: (theme: Theme) => void
  onDelete?: (id: string) => void
  isPrebuilt?: boolean
}

export function ThemeBuilder({
  theme,
  onChange,
  onSave,
  onDelete,
  isPrebuilt = false,
}: ThemeBuilderProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleThemeChange = (field: keyof Theme, value: any) => {
    onChange({ ...theme, [field]: value })
  }

  return (
    <div className="space-y-4 rounded-lg border border-slate-700 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{theme.name}</h3>
          {isPrebuilt && <span className="text-xs text-slate-400">Prebuilt Theme</span>}
        </div>
        <div className="flex gap-2">
          {!isPrebuilt && onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(theme.id)}
              className="text-red-400 hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide' : 'Edit'}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-3 bg-slate-900 p-3 rounded">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Font Family
              </label>
              <Input
                value={theme.fontFamily}
                onChange={(e) => handleThemeChange('fontFamily', e.target.value)}
                placeholder="Font family"
                className="text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Font Size
              </label>
              <Input
                type="number"
                min="20"
                max="72"
                value={theme.fontSize}
                onChange={(e) => handleThemeChange('fontSize', parseInt(e.target.value))}
                className="text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Text Alignment
              </label>
              <Select value={theme.textAlignment} onValueChange={(v) => handleThemeChange('textAlignment', v)}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Transition Type
              </label>
              <Select value={theme.transitionType} onValueChange={(v) => handleThemeChange('transitionType', v)}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="slide">Slide</SelectItem>
                  <SelectItem value="zoom">Zoom</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Background Color
              </label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                  className="h-9 w-12 cursor-pointer"
                />
                <Input
                  value={theme.backgroundColor}
                  onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                  placeholder="#000000"
                  className="flex-1 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Text Color
              </label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={theme.textColor}
                  onChange={(e) => handleThemeChange('textColor', e.target.value)}
                  className="h-9 w-12 cursor-pointer"
                />
                <Input
                  value={theme.textColor}
                  onChange={(e) => handleThemeChange('textColor', e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-700 flex gap-2">
            {onSave && !isPrebuilt && (
              <Button
                size="sm"
                onClick={() => onSave(theme)}
                variant="default"
              >
                Save Theme
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                // TODO: Copy to clipboard logic
              }}
            >
              <Copy className="h-4 w-4 mr-1" />
              Duplicate
            </Button>
          </div>
        </div>
      )}

      <div
        className="h-16 rounded overflow-hidden border border-slate-600"
        style={{
          backgroundColor: theme.backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: theme.textAlignment === 'left' ? 'flex-start' : theme.textAlignment === 'right' ? 'flex-end' : 'center',
          paddingLeft: theme.textAlignment === 'left' ? '1rem' : 0,
          paddingRight: theme.textAlignment === 'right' ? '1rem' : 0,
        }}
      >
        <span style={{ color: theme.textColor, fontSize: '18px', fontFamily: theme.fontFamily }}>
          Preview Text
        </span>
      </div>
    </div>
  )
}
