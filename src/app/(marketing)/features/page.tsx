'use client'

import {
  Shield,
  Bot,
  Lock,
  Link as LinkIcon,
  BarChart3,
  Eye,
  PlayCircle,
  Zap,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useEffect, useRef, useState } from 'react'

/* ------------------------------------------------------------------ */
/*  Animated bar — fills on scroll                                     */
/* ------------------------------------------------------------------ */
function AnimatedBar({
  width,
  opacity = 1,
  delay = 0,
}: {
  width: string
  opacity?: number
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [fill, setFill] = useState('0%')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setFill(width), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [width, delay])

  return (
    <div ref={ref} className="h-2 rounded-full bg-bg-subtle overflow-hidden">
      <div
        className="h-full rounded-full bg-teal transition-all duration-1000 ease-out"
        style={{ width: fill, opacity }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Pulsing activity line — simulates live data                        */
/* ------------------------------------------------------------------ */
function PulsingLine() {
  return (
    <div className="flex items-center gap-1 h-6">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-teal/30"
          style={{
            height: `${20 + Math.sin(i * 0.8) * 60 + Math.random() * 20}%`,
            animationDelay: `${i * 100}ms`,
            animation: 'pulseSoft 2s ease-in-out infinite',
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Feature visual cards — unique per feature                          */
/* ------------------------------------------------------------------ */

function RiskEngineVisual() {
  return (
    <div className="bg-bg-panel border border-border rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-teal-dim flex items-center justify-center">
          <Shield className="w-4 h-4 text-teal" />
        </div>
        <span className="text-sm font-heading font-semibold text-text-primary">Risk Engine</span>
        <span className="ml-auto text-[10px] text-teal font-body px-2 py-0.5 rounded-full bg-teal-dim border border-teal/20">
          ENFORCING
        </span>
      </div>
      <div className="space-y-4">
        {[
          { label: 'Allocation', pct: '68%', delay: 0 },
          { label: 'Leverage', pct: '40%', delay: 100 },
          { label: 'Exposure', pct: '82%', delay: 200 },
          { label: 'Positions', pct: '50%', delay: 300 },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-text-muted font-body">{item.label}</span>
              <span className="text-xs text-text-secondary font-body">{item.pct}</span>
            </div>
            <AnimatedBar width={item.pct} delay={item.delay} />
          </div>
        ))}
      </div>
    </div>
  )
}

function AutomationModesVisual() {
  const [activeMode, setActiveMode] = useState(0)
  const modes = [
    { icon: Eye, label: 'Observe', status: 'Watching', color: 'text-text-secondary' },
    { icon: PlayCircle, label: 'Simulate', status: 'Paper trading', color: 'text-warning' },
    { icon: Zap, label: 'Auto-Execute', status: 'Live', color: 'text-teal' },
  ]

  useEffect(() => {
    const interval = setInterval(() => setActiveMode((m) => (m + 1) % 3), 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-bg-panel border border-border rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-teal-dim flex items-center justify-center">
          <Bot className="w-4 h-4 text-teal" />
        </div>
        <span className="text-sm font-heading font-semibold text-text-primary">Mode Selector</span>
      </div>
      <div className="space-y-2">
        {modes.map((mode, i) => {
          const Icon = mode.icon
          const isActive = i === activeMode
          return (
            <div
              key={mode.label}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-500',
                isActive ? 'bg-teal-dim border border-teal/20' : 'bg-bg-subtle border border-transparent'
              )}
            >
              <Icon className={cn('w-4 h-4', isActive ? 'text-teal' : 'text-text-muted')} />
              <span className={cn('text-sm font-body', isActive ? 'text-text-primary font-medium' : 'text-text-muted')}>
                {mode.label}
              </span>
              {isActive && (
                <span className={cn('ml-auto text-xs font-body', mode.color)}>
                  {mode.status}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PlanLimitsVisual() {
  return (
    <div className="bg-bg-panel border border-border rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-teal-dim flex items-center justify-center">
          <Lock className="w-4 h-4 text-teal" />
        </div>
        <span className="text-sm font-heading font-semibold text-text-primary">Plan Limits</span>
        <span className="ml-auto text-[10px] text-teal font-body px-2 py-0.5 rounded-full bg-teal-dim border border-teal/20">
          PRO
        </span>
      </div>
      <div className="space-y-3">
        {[
          { label: '5x max leverage', active: true },
          { label: '5 concurrent positions', active: true },
          { label: '12 enabled assets', active: true },
          { label: '10x max leverage', active: false },
          { label: '10 concurrent positions', active: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            {item.active ? (
              <Check className="w-3.5 h-3.5 text-teal shrink-0" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-text-muted/40 shrink-0" />
            )}
            <span className={cn(
              'text-sm font-body',
              item.active ? 'text-text-secondary' : 'text-text-muted/40'
            )}>
              {item.label}
            </span>
            {!item.active && (
              <span className="ml-auto text-[9px] text-text-muted/40 font-body">ELITE</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ExchangeVisual() {
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setConnected(true), 1500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="bg-bg-panel border border-border rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-teal-dim flex items-center justify-center">
          <LinkIcon className="w-4 h-4 text-teal" />
        </div>
        <span className="text-sm font-heading font-semibold text-text-primary">Binance</span>
        <div className={cn(
          'ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-body font-medium transition-all duration-500',
          connected ? 'bg-success/10 text-success' : 'bg-bg-hover text-text-muted'
        )}>
          <span className={cn(
            'w-1.5 h-1.5 rounded-full transition-colors duration-500',
            connected ? 'bg-success' : 'bg-text-muted'
          )} />
          {connected ? 'Connected' : 'Connecting...'}
        </div>
      </div>
      <div className="space-y-3 text-sm font-body">
        <div className="flex justify-between">
          <span className="text-text-muted">API Key</span>
          <span className="text-text-secondary font-mono text-xs">sk-****...7f3a</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Permissions</span>
          <span className="text-text-secondary">Read + Trade</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Balance</span>
          <span className={cn(
            'text-text-primary font-medium transition-opacity duration-500',
            connected ? 'opacity-100' : 'opacity-0'
          )}>$11,847.32</span>
        </div>
      </div>
    </div>
  )
}

function DashboardVisual() {
  return (
    <div className="bg-bg-panel border border-border rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-teal-dim flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-teal" />
        </div>
        <span className="text-sm font-heading font-semibold text-text-primary">Portfolio</span>
        <span className="ml-auto text-lg font-heading font-bold text-text-primary">$11,847</span>
      </div>
      <div className="mb-4">
        <PulsingLine />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'P&L', value: '+$234', color: 'text-success' },
          { label: 'Win Rate', value: '68%', color: 'text-text-primary' },
          { label: 'Positions', value: '3/5', color: 'text-teal' },
        ].map((stat) => (
          <div key={stat.label} className="bg-bg-subtle rounded-lg p-2.5 text-center">
            <p className={cn('text-sm font-heading font-bold', stat.color)}>{stat.value}</p>
            <p className="text-[10px] text-text-muted font-body mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Feature data with visuals                                          */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: Shield,
    label: 'Risk Engine',
    heading: 'Military-grade risk controls',
    description:
      'Set hard limits on allocation, leverage, exposure, and position count. TORI enforces them — no exceptions.',
    Visual: RiskEngineVisual,
  },
  {
    icon: Bot,
    label: 'Automation Modes',
    heading: 'Three modes, one platform',
    description:
      'Observe market behavior. Simulate with paper trades. Auto-execute with live capital — all within your risk parameters.',
    Visual: AutomationModesVisual,
  },
  {
    icon: Lock,
    label: 'Plan-Based Limits',
    heading: 'Transparent plan limits',
    description:
      "Every plan defines exactly what you can do. No hidden restrictions, no surprise fees. Scale up when you're ready.",
    Visual: PlanLimitsVisual,
  },
  {
    icon: LinkIcon,
    label: 'Exchange Integration',
    heading: 'Connect your exchange',
    description:
      'Bring your own Binance account. Your keys, your funds, your control. TORI never holds your capital.',
    Visual: ExchangeVisual,
  },
  {
    icon: BarChart3,
    label: 'Real-Time Dashboard',
    heading: 'Live trading dashboard',
    description:
      'Monitor equity, PnL, positions, and risk usage in real time. Premium analytics without the noise.',
    Visual: DashboardVisual,
  },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FeaturesPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body">
              FEATURES
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary">
              Everything you need to trade with precision
            </h1>
            <p className="mt-4 text-lg text-text-secondary font-body max-w-2xl mx-auto">
              From risk enforcement to real-time analytics — every tool built for disciplined execution.
            </p>
          </div>
        </ScrollReveal>

        {/* Feature sections — alternating layout */}
        <div className="space-y-28">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const Visual = feature.Visual
            const isReversed = index % 2 === 1

            return (
              <section
                key={feature.label}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                {/* Content side */}
                <ScrollReveal
                  direction={isReversed ? 'right' : 'left'}
                  className={cn(isReversed && 'lg:order-2')}
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-dim flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-teal" />
                  </div>
                  <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body">
                    {feature.label}
                  </span>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-4">
                    {feature.heading}
                  </h2>
                  <p className="text-text-secondary font-body leading-relaxed text-base">
                    {feature.description}
                  </p>
                </ScrollReveal>

                {/* Visual side */}
                <ScrollReveal
                  direction={isReversed ? 'left' : 'right'}
                  delay={150}
                  className={cn(isReversed && 'lg:order-1')}
                >
                  <Visual />
                </ScrollReveal>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
