'use client'

import { cn } from '@/lib/utils'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

interface StatItem {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  /** Override display for special formats like "< 50ms" */
  displayOverride?: string
}

const stats: StatItem[] = [
  {
    value: 2.4,
    prefix: '$',
    suffix: 'M+',
    decimals: 1,
    label: 'Volume Tracked',
  },
  {
    value: 15000,
    prefix: '',
    suffix: '+',
    decimals: 0,
    label: 'Trades Executed',
  },
  {
    value: 99.9,
    prefix: '',
    suffix: '%',
    decimals: 1,
    label: 'Uptime',
  },
  {
    value: 50,
    prefix: '< ',
    suffix: 'ms',
    decimals: 0,
    label: 'Execution Speed',
  },
]

export function StatsRow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full grid grid-cols-2 lg:grid-cols-4 gap-0',
        className
      )}
    >
      {stats.map((stat, index) => (
        <ScrollReveal key={stat.label} delay={index * 150} direction="up">
          <div
            className={cn(
              'flex flex-col items-center justify-center py-8 px-4 text-center',
              index < stats.length - 1 && 'lg:border-r lg:border-border/50',
              index < 2 && 'border-b lg:border-b-0 border-border/50',
              index === 0 && 'border-r border-border/50 lg:border-r',
              index === 1 && 'lg:border-r'
            )}
          >
            <div className="text-3xl sm:text-4xl font-heading font-bold text-text-primary tracking-tight">
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                duration={2000 + index * 200}
              />
            </div>
            <p className="mt-2 text-sm text-text-muted font-body">
              {stat.label}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
