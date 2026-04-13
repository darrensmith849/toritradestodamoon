import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PLAN_TIERS } from '@/lib/constants'
import type { PlanTier } from '@/lib/types'

interface LockedOverlayProps {
  requiredTier: PlanTier
  children: React.ReactNode
}

export function LockedOverlay({ requiredTier, children }: LockedOverlayProps) {
  const tierName = PLAN_TIERS[requiredTier].name

  return (
    <div className="relative">
      {/* Blurred children */}
      <div className="blur-sm opacity-40 pointer-events-none select-none" aria-hidden>
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-base/40 rounded-2xl">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-bg-hover">
          <Lock className="w-5 h-5 text-text-muted" />
        </div>
        <p className="text-sm text-text-secondary font-body">
          Available on <span className="text-text-primary font-medium">{tierName}</span>
        </p>
        <Button variant="primary" size="sm">
          Upgrade
        </Button>
      </div>
    </div>
  )
}
