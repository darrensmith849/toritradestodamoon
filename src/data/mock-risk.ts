import type { RiskUsage } from '@/lib/types'

export const mockRiskUsage: RiskUsage = {
  allocation: { used: 8.5, limit: 12.5 },
  leverage: { used: 3, limit: 5 },
  concurrent: { used: 3, limit: 5 },
  exposure: { used: 28, limit: 45 },
  entries24h: { used: 5, limit: 8 },
  assets: { used: 4, limit: 12 },
}
