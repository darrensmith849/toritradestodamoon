'use client'

import { cn } from '@/lib/utils'

interface TickerItem {
  pair: string
  price: string
  change: string
  positive: boolean
}

const tickerData: TickerItem[] = [
  { pair: 'BTC/USDT', price: '$67,420', change: '+1.2%', positive: true },
  { pair: 'ETH/USDT', price: '$3,342', change: '+0.8%', positive: true },
  { pair: 'SOL/USDT', price: '$171.40', change: '+2.1%', positive: true },
  { pair: 'BNB/USDT', price: '$598.20', change: '-0.3%', positive: false },
  { pair: 'XRP/USDT', price: '$0.5412', change: '+0.6%', positive: true },
  { pair: 'DOGE/USDT', price: '$0.1584', change: '-1.1%', positive: false },
  { pair: 'ADA/USDT', price: '$0.4821', change: '+1.8%', positive: true },
  { pair: 'AVAX/USDT', price: '$38.92', change: '+3.4%', positive: true },
  { pair: 'DOT/USDT', price: '$7.24', change: '-0.5%', positive: false },
  { pair: 'LINK/USDT', price: '$14.87', change: '+1.5%', positive: true },
  { pair: 'MATIC/USDT', price: '$0.7832', change: '+0.9%', positive: true },
  { pair: 'UNI/USDT', price: '$9.41', change: '-0.2%', positive: false },
]

function TickerItemDisplay({ item }: { item: TickerItem }) {
  return (
    <span className="inline-flex items-center gap-2 px-4">
      <span className="text-text-secondary font-medium">{item.pair}</span>
      <span className="text-text-primary">{item.price}</span>
      <span
        className={cn(
          'font-medium',
          item.positive ? 'text-success' : 'text-danger'
        )}
      >
        {item.change}
      </span>
    </span>
  )
}

function Separator() {
  return (
    <span className="inline-flex items-center px-2">
      <span className="w-1 h-1 rounded-full bg-border" />
    </span>
  )
}

export function LiveTicker({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full border-y border-border/50 bg-bg-surface/30 backdrop-blur-sm overflow-hidden',
        className
      )}
    >
      <div className="ticker-wrap py-2.5">
        <div className="ticker-content text-xs font-body">
          {/* First copy */}
          {tickerData.map((item, i) => (
            <span key={`a-${i}`} className="inline-flex items-center">
              <TickerItemDisplay item={item} />
              {i < tickerData.length - 1 && <Separator />}
            </span>
          ))}
          {/* Separator between copies */}
          <Separator />
          {/* Duplicate for seamless loop */}
          {tickerData.map((item, i) => (
            <span key={`b-${i}`} className="inline-flex items-center">
              <TickerItemDisplay item={item} />
              {i < tickerData.length - 1 && <Separator />}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
