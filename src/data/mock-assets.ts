import type { Asset } from '@/lib/types'

export const mockAssets: Asset[] = [
  // Tier 1 assets (6)
  { symbol: 'BTC', name: 'Bitcoin', tierRequired: 'tier1', enabled: true },
  { symbol: 'ETH', name: 'Ethereum', tierRequired: 'tier1', enabled: true },
  { symbol: 'SOL', name: 'Solana', tierRequired: 'tier1', enabled: true },
  { symbol: 'BNB', name: 'BNB', tierRequired: 'tier1', enabled: true },
  { symbol: 'AVAX', name: 'Avalanche', tierRequired: 'tier1', enabled: true },
  { symbol: 'LINK', name: 'Chainlink', tierRequired: 'tier1', enabled: true },

  // Tier 2 assets (6 additional = 12 total)
  { symbol: 'DOGE', name: 'Dogecoin', tierRequired: 'tier2', enabled: true },
  { symbol: 'ARB', name: 'Arbitrum', tierRequired: 'tier2', enabled: true },
  { symbol: 'MATIC', name: 'Polygon', tierRequired: 'tier2', enabled: true },
  { symbol: 'NEAR', name: 'NEAR Protocol', tierRequired: 'tier2', enabled: true },
  { symbol: 'DOT', name: 'Polkadot', tierRequired: 'tier2', enabled: true },
  { symbol: 'ADA', name: 'Cardano', tierRequired: 'tier2', enabled: true },

  // Tier 3 assets (8 additional = 20 total)
  { symbol: 'UNI', name: 'Uniswap', tierRequired: 'tier3', enabled: true },
  { symbol: 'AAVE', name: 'Aave', tierRequired: 'tier3', enabled: true },
  { symbol: 'OP', name: 'Optimism', tierRequired: 'tier3', enabled: true },
  { symbol: 'MKR', name: 'Maker', tierRequired: 'tier3', enabled: true },
  { symbol: 'CRV', name: 'Curve', tierRequired: 'tier3', enabled: true },
  { symbol: 'FTM', name: 'Fantom', tierRequired: 'tier3', enabled: true },
  { symbol: 'ATOM', name: 'Cosmos', tierRequired: 'tier3', enabled: true },
  { symbol: 'INJ', name: 'Injective', tierRequired: 'tier3', enabled: true },
]
