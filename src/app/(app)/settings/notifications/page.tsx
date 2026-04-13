'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Toggle } from '@/components/ui/toggle'
import { SettingsLayout } from '@/components/settings/settings-layout'

interface NotificationSetting {
  id: string
  label: string
  description: string
  defaultValue: boolean
}

const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: 'trade-executed',
    label: 'Trade Executed',
    description: 'Get notified when a trade is opened or modified',
    defaultValue: true,
  },
  {
    id: 'position-closed',
    label: 'Position Closed',
    description: 'Get notified when a position is closed with P&L summary',
    defaultValue: true,
  },
  {
    id: 'drawdown-alert',
    label: 'Drawdown Alert',
    description: 'Get alerted when portfolio drawdown exceeds your threshold',
    defaultValue: true,
  },
  {
    id: 'daily-summary',
    label: 'Daily Summary',
    description: 'Receive a daily email with your trading performance',
    defaultValue: false,
  },
  {
    id: 'weekly-report',
    label: 'Weekly Report',
    description: 'Receive a weekly detailed performance report',
    defaultValue: false,
  },
]

export default function NotificationsPage() {
  const [settings, setSettings] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {}
    NOTIFICATION_SETTINGS.forEach((s) => {
      map[s.id] = s.defaultValue
    })
    return map
  })

  function toggleSetting(id: string) {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          Notifications
        </h1>

        <Card>
          <div className="divide-y divide-border">
            {NOTIFICATION_SETTINGS.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 pr-4">
                  <p className="text-sm font-medium text-text-primary font-body">
                    {setting.label}
                  </p>
                  <p className="text-xs text-text-muted font-body mt-0.5">
                    {setting.description}
                  </p>
                </div>
                <Toggle
                  checked={settings[setting.id] ?? false}
                  onChange={() => toggleSetting(setting.id)}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </SettingsLayout>
  )
}
