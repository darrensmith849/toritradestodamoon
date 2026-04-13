import type { RiskUsage } from '@/lib/types'

export const freeRiskUsage: RiskUsage = {
  allocation: { used: 5, limit: 10 },
  leverage: { used: 1, limit: 1 },
  concurrent: { used: 0, limit: 1 },
  exposure: { used: 5, limit: 10 },
  entries24h: { used: 0, limit: 1 },
  assets: { used: 1, limit: 2 },
}

export const tier1RiskUsage: RiskUsage = {
  allocation: { used: 7.0, limit: 7.5 },
  leverage: { used: 3, limit: 3 },
  concurrent: { used: 2, limit: 2 },
  exposure: { used: 18, limit: 20 },
  entries24h: { used: 2, limit: 3 },
  assets: { used: 4, limit: 6 },
}

export const tier2RiskUsage: RiskUsage = {
  allocation: { used: 8.0, limit: 12.5 },
  leverage: { used: 3, limit: 5 },
  concurrent: { used: 3, limit: 5 },
  exposure: { used: 25, limit: 45 },
  entries24h: { used: 4, limit: 8 },
  assets: { used: 7, limit: 12 },
}

export const tier3RiskUsage: RiskUsage = {
  allocation: { used: 10.0, limit: 20 },
  leverage: { used: 4, limit: 10 },
  concurrent: { used: 7, limit: 10 },
  exposure: { used: 35, limit: 75 },
  entries24h: { used: 8, limit: 20 },
  assets: { used: 14, limit: 'unlimited' },
}
