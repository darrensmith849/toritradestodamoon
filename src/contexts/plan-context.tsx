'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import type { PlanTier } from '@/lib/types'

interface PlanContextValue {
  tier: PlanTier
  setTier: (tier: PlanTier) => void
}

const PlanContext = createContext<PlanContextValue | null>(null)

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTierState] = useState<PlanTier>('tier2')

  const setTier = useCallback((t: PlanTier) => {
    setTierState(t)
  }, [])

  return (
    <PlanContext.Provider value={{ tier, setTier }}>
      {children}
    </PlanContext.Provider>
  )
}

export function usePlanContext(): PlanContextValue {
  const ctx = useContext(PlanContext)
  if (!ctx) {
    throw new Error('usePlanContext must be used within a PlanProvider')
  }
  return ctx
}
