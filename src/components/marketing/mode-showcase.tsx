'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Eye, PlayCircle, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

/* ─── Types ──────────────────────────────────────────────── */

type Mode = 'observe' | 'simulate' | 'execute'

interface SignalEntry {
  time: string
  pair: string
  signal: string
  confidence: number
  type: 'long' | 'short'
}

interface TradeEntry {
  time: string
  pair: string
  side: 'BUY' | 'SELL'
  entry: string
  exit: string
  pnl: string
  positive: boolean
}

interface OrderEntry {
  time: string
  id: string
  pair: string
  side: 'BUY' | 'SELL'
  amount: string
  status: 'FILLED' | 'PENDING' | 'PARTIAL'
  price: string
}

/* ─── Mock Data ──────────────────────────────────────────── */

const signalPool: SignalEntry[] = [
  { time: '14:32:01', pair: 'BTC/USDT', signal: 'RSI Divergence', confidence: 87, type: 'long' },
  { time: '14:32:04', pair: 'ETH/USDT', signal: 'MACD Cross', confidence: 72, type: 'long' },
  { time: '14:32:08', pair: 'SOL/USDT', signal: 'Volume Spike', confidence: 91, type: 'short' },
  { time: '14:32:12', pair: 'BNB/USDT', signal: 'Support Break', confidence: 65, type: 'short' },
  { time: '14:32:15', pair: 'AVAX/USDT', signal: 'EMA Cross 20/50', confidence: 78, type: 'long' },
  { time: '14:32:19', pair: 'DOT/USDT', signal: 'BB Squeeze', confidence: 83, type: 'long' },
  { time: '14:32:23', pair: 'LINK/USDT', signal: 'OBV Breakout', confidence: 69, type: 'short' },
  { time: '14:32:27', pair: 'ADA/USDT', signal: 'Momentum Shift', confidence: 74, type: 'long' },
]

const tradePool: TradeEntry[] = [
  { time: '14:28:00', pair: 'BTC/USDT', side: 'BUY', entry: '$67,120', exit: '$67,450', pnl: '+$330.00', positive: true },
  { time: '14:24:30', pair: 'ETH/USDT', side: 'SELL', entry: '$3,380', exit: '$3,342', pnl: '+$38.00', positive: true },
  { time: '14:20:15', pair: 'SOL/USDT', side: 'BUY', entry: '$168.20', exit: '$167.80', pnl: '-$4.00', positive: false },
  { time: '14:16:45', pair: 'BNB/USDT', side: 'BUY', entry: '$594.00', exit: '$598.20', pnl: '+$42.00', positive: true },
  { time: '14:12:00', pair: 'AVAX/USDT', side: 'SELL', entry: '$39.80', exit: '$38.92', pnl: '+$8.80', positive: true },
  { time: '14:08:20', pair: 'LINK/USDT', side: 'BUY', entry: '$14.52', exit: '$14.87', pnl: '+$3.50', positive: true },
]

const orderPool: OrderEntry[] = [
  { time: '14:32:02', id: 'ORD-7841', pair: 'BTC/USDT', side: 'BUY', amount: '0.015 BTC', status: 'FILLED', price: '$67,420' },
  { time: '14:32:05', id: 'ORD-7842', pair: 'ETH/USDT', side: 'SELL', amount: '0.8 ETH', status: 'FILLED', price: '$3,342' },
  { time: '14:32:09', id: 'ORD-7843', pair: 'SOL/USDT', side: 'BUY', amount: '12 SOL', status: 'PENDING', price: '$171.40' },
  { time: '14:32:14', id: 'ORD-7844', pair: 'AVAX/USDT', side: 'BUY', amount: '25 AVAX', status: 'PARTIAL', price: '$38.92' },
  { time: '14:32:18', id: 'ORD-7845', pair: 'BNB/USDT', side: 'SELL', amount: '1.2 BNB', status: 'FILLED', price: '$598.20' },
  { time: '14:32:22', id: 'ORD-7846', pair: 'DOT/USDT', side: 'BUY', amount: '80 DOT', status: 'FILLED', price: '$7.24' },
]

/* ─── Tab Config ─────────────────────────────────────────── */

const modes: { id: Mode; label: string; icon: typeof Eye }[] = [
  { id: 'observe', label: 'Observe', icon: Eye },
  { id: 'simulate', label: 'Simulate', icon: PlayCircle },
  { id: 'execute', label: 'Auto-Execute', icon: Zap },
]

/* ─── Observe Panel ──────────────────────────────────────── */

function ObservePanel() {
  const [entries, setEntries] = useState<SignalEntry[]>([])
  const indexRef = useRef(0)

  useEffect(() => {
    // Start with first two entries
    setEntries(signalPool.slice(0, 2))
    indexRef.current = 2

    const interval = setInterval(() => {
      setEntries((prev) => {
        const next = signalPool[indexRef.current % signalPool.length]
        indexRef.current++
        const updated = [next, ...prev]
        return updated.slice(0, 6)
      })
    }, 2200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-0">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-bg-panel/40">
        <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        <span className="text-[10px] uppercase tracking-wider text-text-muted font-body font-medium">
          Signal Log — Live
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[60px_80px_1fr_60px] gap-2 px-4 py-2 text-[10px] text-text-muted font-body uppercase tracking-wider border-b border-border/30">
        <span>Time</span>
        <span>Pair</span>
        <span>Signal</span>
        <span className="text-right">Conf</span>
      </div>

      {/* Entries */}
      <div className="flex flex-col">
        {entries.map((entry, i) => (
          <div
            key={`${entry.pair}-${entry.time}-${i}`}
            className={cn(
              'grid grid-cols-[60px_80px_1fr_60px] gap-2 px-4 py-2 text-xs font-mono border-b border-border/20 transition-all duration-500',
              i === 0 ? 'bg-teal/[0.04]' : 'bg-transparent'
            )}
            style={{
              opacity: i === 0 ? 1 : Math.max(0.3, 1 - i * 0.15),
            }}
          >
            <span className="text-text-muted">{entry.time}</span>
            <span className="text-text-primary font-medium">{entry.pair}</span>
            <span className="text-text-secondary">{entry.signal}</span>
            <span
              className={cn(
                'text-right font-medium',
                entry.confidence >= 80
                  ? 'text-success'
                  : entry.confidence >= 70
                  ? 'text-warning'
                  : 'text-text-muted'
              )}
            >
              {entry.confidence}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Simulate Panel ─────────────────────────────────────── */

function SimulatePanel() {
  const [entries, setEntries] = useState<TradeEntry[]>([])

  useEffect(() => {
    setEntries(tradePool.slice(0, 2))
    let index = 2

    const interval = setInterval(() => {
      setEntries((prev) => {
        const next = tradePool[index % tradePool.length]
        index++
        const updated = [next, ...prev]
        return updated.slice(0, 5)
      })
    }, 2800)

    return () => clearInterval(interval)
  }, [])

  // Calculate total P&L
  const totalPnl = entries.reduce((sum, e) => {
    const val = parseFloat(e.pnl.replace(/[$,+]/g, ''))
    return sum + val
  }, 0)

  return (
    <div className="flex flex-col gap-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-bg-panel/40">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider text-text-muted font-body font-medium">
            Paper Trading — Simulation
          </span>
        </div>
        <span
          className={cn(
            'text-xs font-mono font-medium',
            totalPnl >= 0 ? 'text-success' : 'text-danger'
          )}
        >
          P&L: {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[56px_72px_40px_72px_72px_72px] gap-1.5 px-4 py-2 text-[10px] text-text-muted font-body uppercase tracking-wider border-b border-border/30">
        <span>Time</span>
        <span>Pair</span>
        <span>Side</span>
        <span>Entry</span>
        <span>Exit</span>
        <span className="text-right">P&L</span>
      </div>

      {/* Entries */}
      <div className="flex flex-col">
        {entries.map((entry, i) => (
          <div
            key={`${entry.pair}-${entry.time}-${i}`}
            className={cn(
              'grid grid-cols-[56px_72px_40px_72px_72px_72px] gap-1.5 px-4 py-2 text-xs font-mono border-b border-border/20 transition-all duration-500',
              i === 0 ? 'bg-teal/[0.04]' : 'bg-transparent'
            )}
          >
            <span className="text-text-muted">{entry.time}</span>
            <span className="text-text-primary font-medium">{entry.pair}</span>
            <span
              className={cn(
                'font-medium',
                entry.side === 'BUY' ? 'text-success' : 'text-danger'
              )}
            >
              {entry.side}
            </span>
            <span className="text-text-secondary">{entry.entry}</span>
            <span className="text-text-secondary">{entry.exit}</span>
            <span
              className={cn(
                'text-right font-medium',
                entry.positive ? 'text-success' : 'text-danger'
              )}
            >
              {entry.pnl}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Execute Panel ──────────────────────────────────────── */

function ExecutePanel() {
  const [entries, setEntries] = useState<OrderEntry[]>([])

  useEffect(() => {
    setEntries(orderPool.slice(0, 2))
    let index = 2

    const interval = setInterval(() => {
      setEntries((prev) => {
        const next = orderPool[index % orderPool.length]
        index++
        const updated = [next, ...prev]
        return updated.slice(0, 5)
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-0">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-bg-panel/40">
        <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
        <span className="text-[10px] uppercase tracking-wider text-text-muted font-body font-medium">
          Live Order Flow — Auto-Execute
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[56px_68px_68px_36px_72px_64px_68px] gap-1 px-4 py-2 text-[10px] text-text-muted font-body uppercase tracking-wider border-b border-border/30">
        <span>Time</span>
        <span>ID</span>
        <span>Pair</span>
        <span>Side</span>
        <span>Amount</span>
        <span>Price</span>
        <span className="text-right">Status</span>
      </div>

      {/* Entries */}
      <div className="flex flex-col">
        {entries.map((entry, i) => (
          <div
            key={`${entry.id}-${i}`}
            className={cn(
              'grid grid-cols-[56px_68px_68px_36px_72px_64px_68px] gap-1 px-4 py-2 text-xs font-mono border-b border-border/20 transition-all duration-500',
              i === 0 ? 'bg-teal/[0.04]' : 'bg-transparent'
            )}
          >
            <span className="text-text-muted">{entry.time}</span>
            <span className="text-text-muted">{entry.id}</span>
            <span className="text-text-primary font-medium">{entry.pair}</span>
            <span
              className={cn(
                'font-medium',
                entry.side === 'BUY' ? 'text-success' : 'text-danger'
              )}
            >
              {entry.side}
            </span>
            <span className="text-text-secondary">{entry.amount}</span>
            <span className="text-text-secondary">{entry.price}</span>
            <span
              className={cn(
                'text-right text-[10px] font-medium',
                entry.status === 'FILLED'
                  ? 'text-success'
                  : entry.status === 'PARTIAL'
                  ? 'text-warning'
                  : 'text-text-muted'
              )}
            >
              {entry.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main ModeShowcase ──────────────────────────────────── */

export function ModeShowcase({ className }: { className?: string }) {
  const [activeMode, setActiveMode] = useState<Mode>('observe')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleModeChange = useCallback(
    (mode: Mode) => {
      if (mode === activeMode) return
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveMode(mode)
        setIsTransitioning(false)
      }, 200)
    },
    [activeMode]
  )

  return (
    <ScrollReveal>
      <div className={cn('w-full max-w-3xl mx-auto', className)}>
        {/* Tab selector */}
        <div className="flex items-center justify-center gap-1 p-1 rounded-xl bg-bg-panel/60 border border-border mb-6 sm:mb-8">
          {modes.map((mode) => {
            const Icon = mode.icon
            const isActive = activeMode === mode.id
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleModeChange(mode.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-300 flex-1 justify-center',
                  isActive
                    ? 'bg-teal/10 text-teal border border-teal/20 shadow-glow'
                    : 'text-text-muted hover:text-text-secondary border border-transparent'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content panel */}
        <div
          className={cn(
            'relative rounded-xl border border-border bg-bg-surface/80 backdrop-blur-sm overflow-hidden transition-opacity duration-200',
            isTransitioning ? 'opacity-0' : 'opacity-100'
          )}
        >
          {/* Terminal-style top bar */}
          <div className="flex items-center gap-1.5 px-4 py-2 bg-bg-panel/60 border-b border-border/50">
            <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
            <span className="ml-3 text-[10px] text-text-muted font-mono">
              tori-{activeMode}.terminal
            </span>
          </div>

          {/* Panel content */}
          <div className="min-h-[260px] overflow-x-auto">
            {activeMode === 'observe' && <ObservePanel />}
            {activeMode === 'simulate' && <SimulatePanel />}
            {activeMode === 'execute' && <ExecutePanel />}
          </div>

          {/* Bottom status bar */}
          <div className="flex items-center justify-between px-4 py-1.5 border-t border-border/30 bg-bg-panel/30">
            <span className="text-[10px] text-text-muted font-mono">
              {activeMode === 'observe' && 'Monitoring 24 pairs'}
              {activeMode === 'simulate' && 'Paper portfolio: $10,000.00'}
              {activeMode === 'execute' && 'Connected: Binance API'}
            </span>
            <span className="text-[10px] text-success font-mono flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-success animate-pulse" />
              Connected
            </span>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
