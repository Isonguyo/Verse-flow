'use client'

import { useState } from 'react'
import { ServicePlan, ServicePlanItem } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, GripVertical, Clock } from 'lucide-react'

interface ServicePlannerProps {
  servicePlan: ServicePlan
  onUpdate: (plan: ServicePlan) => void
}

export function ServicePlanner({ servicePlan, onUpdate }: ServicePlannerProps) {
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItemType, setNewItemType] = useState<ServicePlanItem['type']>('song')
  const [newItemTitle, setNewItemTitle] = useState('')
  const [newItemDuration, setNewItemDuration] = useState(5)

  const handleAddItem = () => {
    if (!newItemTitle.trim()) return

    const newItem: ServicePlanItem = {
      id: `item-${Date.now()}`,
      type: newItemType,
      title: newItemTitle,
      duration: newItemDuration,
      order: servicePlan.items.length,
      slides: [],
    }

    const updated = {
      ...servicePlan,
      items: [...servicePlan.items, newItem],
      updatedAt: new Date(),
    }

    onUpdate(updated)
    setNewItemTitle('')
    setNewItemDuration(5)
    setIsAddingItem(false)
  }

  const handleRemoveItem = (id: string) => {
    const updated = {
      ...servicePlan,
      items: servicePlan.items.filter((item) => item.id !== id),
      updatedAt: new Date(),
    }
    onUpdate(updated)
  }

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    const items = [...servicePlan.items]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (targetIndex < 0 || targetIndex >= items.length) return

    ;[items[index], items[targetIndex]] = [items[targetIndex], items[index]]

    const updated = {
      ...servicePlan,
      items: items.map((item, idx) => ({ ...item, order: idx })),
      updatedAt: new Date(),
    }

    onUpdate(updated)
  }

  const totalDuration = servicePlan.items.reduce((sum, item) => sum + item.duration, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Service Plan</h2>
          <p className="text-sm text-slate-400">
            {servicePlan.items.length} items • {totalDuration} minutes
          </p>
        </div>
        <Button onClick={() => setIsAddingItem(!isAddingItem)} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Item
        </Button>
      </div>

      {isAddingItem && (
        <Card className="bg-slate-800 border-slate-700 p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1 block">Type</label>
              <Select value={newItemType} onValueChange={(v) => setNewItemType(v as any)}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prayer">Prayer</SelectItem>
                  <SelectItem value="song">Song</SelectItem>
                  <SelectItem value="sermon">Sermon</SelectItem>
                  <SelectItem value="offering">Offering</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1 block">Title</label>
              <Input
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                placeholder="e.g., Opening Prayer"
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1 block">Duration (min)</label>
              <Input
                type="number"
                min="1"
                max="120"
                value={newItemDuration}
                onChange={(e) => setNewItemDuration(parseInt(e.target.value))}
                className="text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddItem} size="sm" variant="default">
              Add
            </Button>
            <Button onClick={() => setIsAddingItem(false)} size="sm" variant="outline">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {servicePlan.items.length === 0 ? (
          <Card className="bg-slate-800 border-slate-700 p-8 text-center">
            <p className="text-slate-400">No service items yet. Add one to get started.</p>
          </Card>
        ) : (
          servicePlan.items.map((item, index) => (
            <Card key={item.id} className="bg-slate-800 border-slate-700 p-3 flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-slate-600 cursor-grab" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
                    {item.type}
                  </span>
                  <h4 className="font-medium text-foreground">{item.title}</h4>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.duration} min
                  </div>
                  {item.slides && (
                    <span>{item.slides.length} slides</span>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMoveItem(index, 'up')}
                  disabled={index === 0}
                  className="text-xs"
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMoveItem(index, 'down')}
                  disabled={index === servicePlan.items.length - 1}
                  className="text-xs"
                >
                  ↓
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
