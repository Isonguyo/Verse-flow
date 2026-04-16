'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/context/AppContext'
import { PremiumBadge } from '@/components/ui/premium-badge'
import Link from 'next/link'

export default function SettingsPage() {
  const { settings, updateSettings } = useAppContext()
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    updateSettings(localSettings)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Settings</h1>
          <p className="text-muted-foreground">Customize your VerseFlow experience</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="outline" className="mb-8" asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>

        <div className="space-y-6">
          {/* Bible Version Settings */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-xl font-semibold mb-4">Bible Translation</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Default Bible Version</label>
                <select
                  value={localSettings.bibleVersion}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      bibleVersion: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="KJV">King James Version (KJV)</option>
                  <option value="NIV">New International Version (NIV)</option>
                  <option value="NKJV">New King James Version (NKJV)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Display Settings */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-xl font-semibold mb-4">Display</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Theme</label>
                <select
                  value={localSettings.theme}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      theme: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Font Size</label>
                <select
                  value={localSettings.fontSize}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      fontSize: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Auto-advance Slides (seconds)</label>
                <input
                  type="number"
                  value={localSettings.slideDisplayTime}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      slideDisplayTime: parseInt(e.target.value),
                    })
                  }
                  min="0"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
            </div>
          </Card>

          {/* Premium Features */}
          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Premium Features</h2>
              <PremiumBadge />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium text-sm">AI Suggestions</p>
                  <p className="text-xs text-muted-foreground">
                    Get intelligent suggestions for verses and songs
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground">
                  Locked
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium text-sm">Cloud Sync</p>
                  <p className="text-xs text-muted-foreground">
                    Sync presentations across devices
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground">
                  Locked
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium text-sm">Dual Screen Mode</p>
                  <p className="text-xs text-muted-foreground">
                    Operator view + public display simultaneously
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground">
                  Locked
                </span>
              </div>

              <Button className="w-full mt-4" asChild>
                <a href="#pricing">Upgrade to Premium</a>
              </Button>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button onClick={handleSave}>Save Changes</Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
