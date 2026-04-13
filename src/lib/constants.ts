import { PlanLimits, PlanTier } from './types'

export const PLAN_TIERS: Record<PlanTier, PlanLimits> = {
  free: {
    name: 'Free',
    price: 0,
    liveAccounts: 0,
    paperAccounts: 1,
    maxAllocation: 10,
    maxLeverage: 1,
    maxConcurrentPositions: 1,
    maxExposure: 10,
    maxEntriesPer24h: 1,
    assetCount: 2,
    assetLabel: '2 assets',
  },
  tier1: {
    name: 'Starter',
    price: 49,
    liveAccounts: 1,
    paperAccounts: 0,
    maxAllocation: 7.5,
    maxLeverage: 1,
    maxConcurrentPositions: 2,
    maxExposure: 20,
    maxEntriesPer24h: 2,
    assetCount: 6,
    assetLabel: '6 assets',
  },
  tier2: {
    name: 'Pro',
    price: 99,
    liveAccounts: 1,
    paperAccounts: 1,
    maxAllocation: 12.5,
    maxLeverage: 5,
    maxConcurrentPositions: 5,
    maxExposure: 45,
    maxEntriesPer24h: 5,
    assetCount: 12,
    assetLabel: '12 assets',
  },
  tier3: {
    name: 'Elite',
    price: 249,
    liveAccounts: 3,
    paperAccounts: 0,
    maxAllocation: 20,
    maxLeverage: 10,
    maxConcurrentPositions: 10,
    maxExposure: 75,
    maxEntriesPer24h: 8,
    assetCount: 'unlimited',
    assetLabel: 'Full universe',
  },
}

export const TIER_ORDER: PlanTier[] = ['free', 'tier1', 'tier2', 'tier3']

export const MARKETING_NAV = [
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
]

export const APP_NAV = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Automation', href: '/automation', icon: 'Bot' },
  { label: 'Positions', href: '/positions', icon: 'TrendingUp' },
  { label: 'Trades', href: '/trades', icon: 'History' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
]

export const SETTINGS_NAV = [
  { label: 'Account', href: '/settings/account', icon: 'User' },
  { label: 'Exchanges', href: '/settings/exchanges', icon: 'Link' },
  { label: 'Notifications', href: '/settings/notifications', icon: 'Bell' },
  { label: 'Risk', href: '/settings/risk', icon: 'Shield' },
  { label: 'Billing', href: '/settings/billing', icon: 'CreditCard' },
  { label: 'Support', href: '/settings/support', icon: 'HelpCircle' },
]
