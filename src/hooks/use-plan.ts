import { usePlanContext } from '@/contexts/plan-context'
import { getPlanLimits } from '@/lib/plan-limits'

export function usePlan() {
  const { tier, setTier } = usePlanContext()
  const limits = getPlanLimits(tier)

  return { tier, limits, setTier }
}
