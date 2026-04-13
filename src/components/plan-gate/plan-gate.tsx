'use client'

import { usePlanContext } from '@/contexts/plan-context'
import { isTierSufficient } from '@/lib/plan-limits'
import type { PlanTier } from '@/lib/types'
import { LockedOverlay } from './locked-overlay'

interface PlanGateProps {
  requiredTier: PlanTier
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PlanGate({ requiredTier, children, fallback }: PlanGateProps) {
  const { tier } = usePlanContext()

  if (isTierSufficient(tier, requiredTier)) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <LockedOverlay requiredTier={requiredTier}>
      {children}
    </LockedOverlay>
  )
}
