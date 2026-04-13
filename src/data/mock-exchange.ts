import type { ExchangeConnection } from '@/lib/types'

export const connectedExchange: ExchangeConnection = {
  exchange: 'Bybit',
  connected: true,
  apiKeyPreview: 'byt_...x4kR',
  lastSync: '2026-04-13T12:30:00Z',
  balance: 24850.75,
}

export const disconnectedExchange: ExchangeConnection = {
  exchange: '',
  connected: false,
  apiKeyPreview: '',
  lastSync: '',
  balance: 0,
}
