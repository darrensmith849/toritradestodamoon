import { cn } from '@/lib/utils'
import { PLAN_TIERS } from '@/lib/constants'
import type { PlanTier } from '@/lib/types'

interface PlanBadgeProps {
  tier: PlanTier
  className?: string
}

const tierStyles: Record<PlanTier, string> = {
  free: 'bg-bg-hover text-text-muted',
  tier1: 'bg-bg-hover text-text-secondary',
  tier2: 'bg-teal-dim text-teal',
  tier3: 'bg-teal-dim text-teal',
}

export function PlanBadge({ tier, className }: PlanBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-body',
        tierStyles[tier],
        className
      )}
    >
      {PLAN_TIERS[tier].name}
    </span>
  )
}
