'use client'

import { usePlanContext } from '@/contexts/plan-context'
import type { PlanTier } from '@/lib/types'
import { PLAN_TIERS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const tiers: PlanTier[] = ['free', 'tier1', 'tier2', 'tier3']

export function TierSwitchPanel() {
  const { tier, setTier } = usePlanContext()

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex items-center gap-1 bg-bg-surface border border-border rounded-xl p-2 shadow-card-lg">
      <span className="text-xs text-text-muted font-body px-2">Tier:</span>
      {tiers.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTier(t)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium font-body rounded-lg transition-all duration-150',
            tier === t
              ? 'bg-teal text-bg-base'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
          )}
        >
          {PLAN_TIERS[t].name}
        </button>
      ))}
    </div>
  )
}
