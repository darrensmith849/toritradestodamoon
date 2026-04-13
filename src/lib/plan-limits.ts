import { PLAN_TIERS, TIER_ORDER } from './constants'
import { PlanLimits, PlanTier } from './types'

export function getPlanLimits(tier: PlanTier): PlanLimits {
  return PLAN_TIERS[tier]
}

export function getTierIndex(tier: PlanTier): number {
  return TIER_ORDER.indexOf(tier)
}

export function isTierSufficient(currentTier: PlanTier, requiredTier: PlanTier): boolean {
  return getTierIndex(currentTier) >= getTierIndex(requiredTier)
}

export function getNextTier(current: PlanTier): PlanTier | null {
  const idx = getTierIndex(current)
  return idx < TIER_ORDER.length - 1 ? TIER_ORDER[idx + 1] : null
}

export function getUsagePercent(used: number, limit: number): number {
  if (limit === 0) return 100
  return Math.min((used / limit) * 100, 100)
}

export function isAtLimit(used: number, limit: number | 'unlimited'): boolean {
  if (limit === 'unlimited') return false
  return used >= limit
}

export function getUsageColor(percent: number): string {
  if (percent >= 90) return 'text-danger'
  if (percent >= 70) return 'text-warning'
  return 'text-teal'
}

export function getUsageBarColor(percent: number): string {
  if (percent >= 90) return 'bg-danger'
  if (percent >= 70) return 'bg-warning'
  return 'bg-teal'
}
