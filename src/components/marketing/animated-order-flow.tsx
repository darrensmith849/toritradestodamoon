'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Data generators                                                    */
/* ------------------------------------------------------------------ */

const PAIRS = [
  { symbol: 'BTC/USDT', basePrice: 67420 },
  { symbol: 'ETH/USDT', basePrice: 3342 },
  { symbol: 'SOL/USDT', basePrice: 171.4 },
  { symbol: 'BNB/USDT', basePrice: 598.2 },
  { symbol: 'XRP/USDT', basePrice: 0.5412 },
  { symbol: 'DOGE/USDT', basePrice: 0.1584 },
  { symbol: 'ADA/USDT', basePrice: 0.4821 },
  { symbol: 'AVAX/USDT', basePrice: 38.92 },
]

interface Trade {
  id: number
  time: string
  pair: string
  side: 'BUY' | 'SELL'
  price: string
  amount: string
}

let tradeIdCounter = 0

function formatTime(): string {
  const now = new Date()
  return now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function generateTrade(): Trade {
  const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)]
  const side: 'BUY' | 'SELL' = Math.random() > 0.45 ? 'BUY' : 'SELL'
  const priceVariation = pair.basePrice * (0.998 + Math.random() * 0.004)

  // Format price based on magnitude
  let priceStr: string
  if (pair.basePrice >= 1000) {
    priceStr = priceVariation.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else if (pair.basePrice >= 1) {
    priceStr = priceVariation.toFixed(2)
  } else {
    priceStr = priceVariation.toFixed(4)
  }

  // Random amount
  let amount: number
  if (pair.basePrice >= 10000) {
    amount = 0.001 + Math.random() * 0.5
  } else if (pair.basePrice >= 100) {
    amount = 0.1 + Math.random() * 10
  } else if (pair.basePrice >= 1) {
    amount = 1 + Math.random() * 500
  } else {
    amount = 100 + Math.random() * 50000
  }

  return {
    id: tradeIdCounter++,
    time: formatTime(),
    pair: pair.symbol,
    side,
    price: priceStr,
    amount: amount < 10 ? amount.toFixed(4) : amount < 1000 ? amount.toFixed(2) : Math.round(amount).toLocaleString(),
  }
}

function generateInitialTrades(count: number): Trade[] {
  return Array.from({ length: count }, () => generateTrade())
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const MAX_VISIBLE = 8

interface AnimatedOrderFlowProps {
  className?: string
}

export function AnimatedOrderFlow({ className }: AnimatedOrderFlowProps) {
  const [trades, setTrades] = useState<Trade[]>(() =>
    generateInitialTrades(MAX_VISIBLE)
  )
  const [latestId, setLatestId] = useState<number>(-1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const addTrade = useCallback(() => {
    const newTrade = generateTrade()
    setLatestId(newTrade.id)
    setTrades((prev) => [newTrade, ...prev.slice(0, MAX_VISIBLE - 1)])
  }, [])

  useEffect(() => {
    // Add first "live" trade after a beat
    const initialTimeout = setTimeout(() => {
      addTrade()
    }, 800)

    intervalRef.current = setInterval(() => {
      addTrade()
    }, 1500 + Math.random() * 1000)

    return () => {
      clearTimeout(initialTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [addTrade])

  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
        </span>
        <span className="text-[10px] font-heading font-semibold text-text-secondary uppercase tracking-wider">
          Order Flow
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[52px_80px_40px_1fr_64px] gap-x-2 px-2 pb-1.5 border-b border-border mb-1">
        <span className="text-[9px] font-body font-medium text-text-muted uppercase tracking-wider">
          Time
        </span>
        <span className="text-[9px] font-body font-medium text-text-muted uppercase tracking-wider">
          Pair
        </span>
        <span className="text-[9px] font-body font-medium text-text-muted uppercase tracking-wider">
          Side
        </span>
        <span className="text-[9px] font-body font-medium text-text-muted uppercase tracking-wider text-right">
          Price
        </span>
        <span className="text-[9px] font-body font-medium text-text-muted uppercase tracking-wider text-right">
          Size
        </span>
      </div>

      {/* Trade rows */}
      <div className="space-y-0">
        {trades.map((trade, i) => {
          const isNew = trade.id === latestId
          const isOldest = i >= MAX_VISIBLE - 2

          return (
            <div
              key={trade.id}
              className={cn(
                'grid grid-cols-[52px_80px_40px_1fr_64px] gap-x-2 px-2 py-1 rounded-sm transition-all duration-500',
                isNew && 'animate-fade-in',
                isOldest && 'opacity-30',
                !isNew && !isOldest && 'opacity-70'
              )}
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
              }}
            >
              <span className="text-[11px] text-text-muted tabular-nums truncate">
                {trade.time}
              </span>
              <span className="text-[11px] text-text-secondary font-medium tabular-nums truncate">
                {trade.pair}
              </span>
              <span
                className={cn(
                  'text-[11px] font-semibold tabular-nums',
                  trade.side === 'BUY' ? 'text-success' : 'text-danger'
                )}
              >
                {trade.side}
              </span>
              <span className="text-[11px] text-text-primary tabular-nums text-right truncate">
                {trade.price}
              </span>
              <span className="text-[11px] text-text-muted tabular-nums text-right truncate">
                {trade.amount}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
