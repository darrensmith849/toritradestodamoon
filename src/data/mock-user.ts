import type { User } from '@/lib/types'

export const tier1User: User = {
  id: 'usr_starter_001',
  email: 'starter@toritrades.com',
  name: 'Alex Starter',
  tier: 'tier1',
  automationMode: 'observe',
  exchangeConnected: true,
  accountType: 'live',
  automationActive: true,
}

export const tier2User: User = {
  id: 'usr_pro_001',
  email: 'pro@toritrades.com',
  name: 'Jordan Pro',
  tier: 'tier2',
  automationMode: 'simulate',
  exchangeConnected: true,
  accountType: 'live',
  automationActive: true,
}

export const tier3User: User = {
  id: 'usr_elite_001',
  email: 'elite@toritrades.com',
  name: 'Morgan Elite',
  tier: 'tier3',
  automationMode: 'auto-execute',
  exchangeConnected: true,
  accountType: 'live',
  automationActive: true,
}
