'use client'

import { useState } from 'react'
import { Eye, PlayCircle, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { AutomationMode } from '@/lib/types'

const modes: {
  id: AutomationMode
  icon: typeof Eye
  title: string
  description: string
}[] = [
  {
    id: 'observe',
    icon: Eye,
    title: 'Observe',
    description: "Watch the market with TORI's analysis. No trades are placed.",
  },
  {
    id: 'simulate',
    icon: PlayCircle,
    title: 'Simulate',
    description: 'Paper trade with real market data. Test before going live.',
  },
  {
    id: 'auto-execute',
    icon: Zap,
    title: 'Auto-Execute',
    description: 'TORI executes trades within your strict risk parameters.',
  },
]

export default function ModeSelectionPage() {
  const [selected, setSelected] = useState<AutomationMode>('simulate')

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Choose your trading mode
        </h2>
        <p className="text-text-secondary font-body">
          You can change this anytime from your dashboard.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {modes.map((mode) => {
          const isSelected = selected === mode.id
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => setSelected(mode.id)}
              className={cn(
                'w-full flex items-start gap-4 p-5 rounded-xl border transition-all duration-150 text-left',
                isSelected
                  ? 'border-teal shadow-glow bg-bg-panel'
                  : 'border-border bg-bg-panel hover:border-border-accent'
              )}
            >
              <div
                className={cn(
                  'shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
                  isSelected ? 'bg-teal-dim' : 'bg-bg-subtle'
                )}
              >
                <mode.icon
                  className={cn(
                    'w-5 h-5',
                    isSelected ? 'text-teal' : 'text-text-muted'
                  )}
                />
              </div>
              <div>
                <h3
                  className={cn(
                    'text-sm font-semibold font-heading mb-1',
                    isSelected ? 'text-text-primary' : 'text-text-secondary'
                  )}
                >
                  {mode.title}
                </h3>
                <p className="text-sm text-text-secondary font-body">
                  {mode.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" href="/welcome">
          Back
        </Button>
        <Button variant="primary" href="/plan-selection">
          Continue
        </Button>
      </div>
    </div>
  )
}
