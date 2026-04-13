'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import type { AutomationMode } from '@/lib/types'

interface RiskConfig {
  allocation: number
  leverage: number
  maxExposure: number
  entriesPer24h: number
}

interface AutomationContextValue {
  mode: AutomationMode
  setMode: (mode: AutomationMode) => void
  isActive: boolean
  toggleActive: () => void
  riskConfig: RiskConfig
  setRiskConfig: (config: RiskConfig) => void
}

const defaultRiskConfig: RiskConfig = {
  allocation: 8,
  leverage: 3,
  maxExposure: 30,
  entriesPer24h: 5,
}

const AutomationContext = createContext<AutomationContextValue | null>(null)

export function AutomationProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<AutomationMode>('simulate')
  const [isActive, setIsActive] = useState(true)
  const [riskConfig, setRiskConfigState] = useState<RiskConfig>(defaultRiskConfig)

  const setMode = useCallback((m: AutomationMode) => {
    setModeState(m)
  }, [])

  const toggleActive = useCallback(() => {
    setIsActive((prev) => !prev)
  }, [])

  const setRiskConfig = useCallback((config: RiskConfig) => {
    setRiskConfigState(config)
  }, [])

  return (
    <AutomationContext.Provider
      value={{
        mode,
        setMode,
        isActive,
        toggleActive,
        riskConfig,
        setRiskConfig,
      }}
    >
      {children}
    </AutomationContext.Provider>
  )
}

export function useAutomationContext(): AutomationContextValue {
  const ctx = useContext(AutomationContext)
  if (!ctx) {
    throw new Error(
      'useAutomationContext must be used within an AutomationProvider'
    )
  }
  return ctx
}
