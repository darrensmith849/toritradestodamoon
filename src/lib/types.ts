export type PlanTier = 'free' | 'tier1' | 'tier2' | 'tier3'

export interface PlanLimits {
  name: string
  price: number
  liveAccounts: number
  paperAccounts: number
  maxAllocation: number
  maxLeverage: number
  maxConcurrentPositions: number
  maxExposure: number
  maxEntriesPer24h: number
  assetCount: number | 'unlimited'
  assetLabel: string
}

export type AutomationMode = 'observe' | 'simulate' | 'auto-execute'

export interface Position {
  id: string
  asset: string
  side: 'long' | 'short'
  entryPrice: number
  currentPrice: number
  size: number
  pnl: number
  pnlPercent: number
  openedAt: string
  leverage: number
}

export interface Trade {
  id: string
  asset: string
  side: 'long' | 'short'
  entryPrice: number
  exitPrice: number
  pnl: number
  pnlPercent: number
  openedAt: string
  closedAt: string
  mode: AutomationMode
}

export interface User {
  id: string
  email: string
  name: string
  tier: PlanTier
  automationMode: AutomationMode
  exchangeConnected: boolean
  accountType: 'live' | 'paper'
  automationActive: boolean
}

export interface EquityPoint {
  date: string
  equity: number
}

export interface RiskUsage {
  allocation: { used: number; limit: number }
  leverage: { used: number; limit: number }
  concurrent: { used: number; limit: number }
  exposure: { used: number; limit: number }
  entries24h: { used: number; limit: number }
  assets: { used: number; limit: number | 'unlimited' }
}

export interface Asset {
  symbol: string
  name: string
  tierRequired: PlanTier
  enabled: boolean
}

export interface ExchangeConnection {
  exchange: string
  connected: boolean
  apiKeyPreview: string
  lastSync: string
  balance: number
}
