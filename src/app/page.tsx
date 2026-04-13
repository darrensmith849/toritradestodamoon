'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Shield,
  ArrowRight,
  Lock,
  Key,
  Ban,
  Check,
  Sparkles,
  ChevronRight,
  Bot,
  BarChart3,
  Zap,
  Eye,
  TrendingUp,
  Activity,
  CircleDot,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { GradientOrb } from '@/components/ui/gradient-orb'
import { GridBackground } from '@/components/ui/grid-background'
import { TradingFlow } from '@/components/marketing/trading-flow'
import { LiveTicker } from '@/components/marketing/live-ticker'
import { StatsRow } from '@/components/marketing/stats-row'
import { ModeShowcase } from '@/components/marketing/mode-showcase'
import { AnimatedCounter } from '@/components/ui/animated-counter'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const riskControls = [
  {
    label: 'Max allocation per trade',
    description: 'Cap the percentage of your portfolio risked on any single position.',
  },
  {
    label: 'Leverage limits',
    description: 'Hard-coded leverage ceilings that cannot be overridden mid-trade.',
  },
  {
    label: 'Position caps',
    description: 'Limit simultaneous open positions to prevent over-exposure.',
  },
  {
    label: 'Exposure ceiling',
    description: 'Total portfolio exposure is bounded — even during volatility spikes.',
  },
  {
    label: 'Daily entry limits',
    description: 'Prevent overtrading by restricting how many new entries are placed per day.',
  },
  {
    label: 'Asset restrictions',
    description: 'Whitelist or blacklist specific assets from the execution engine.',
  },
]

const riskBars = [
  { label: 'Allocation', value: 65, limit: '7.5%' },
  { label: 'Leverage', value: 40, limit: '3x' },
  { label: 'Exposure', value: 82, limit: '20%' },
  { label: 'Positions', value: 50, limit: '2 / 2' },
  { label: 'Entries (24h)', value: 33, limit: '1 / 3' },
]

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Observe and simulate. No live trading.',
    features: [
      'Observe + Simulate only',
      '1 paper account',
      '1x leverage',
      '1 simulated position',
      '10% max allocation',
      '1 entry per 24h',
      '2 enabled assets',
    ],
    highlighted: false,
  },
  {
    name: 'Starter',
    price: 49,
    description: 'Your first live trading account with strict limits.',
    features: [
      '1 live account',
      '1x leverage',
      '2 concurrent positions',
      '7.5% max allocation',
      '20% total exposure',
      '2 entries per 24h',
      '6 enabled assets',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 99,
    description: 'Full power for active traders who demand precision.',
    features: [
      '1 live + 1 paper account',
      '5x max leverage',
      '5 concurrent positions',
      '12.5% max allocation',
      '45% total exposure',
      '5 entries per 24h',
      '12 enabled assets',
    ],
    highlighted: true,
  },
  {
    name: 'Elite',
    price: 249,
    description: 'Institutional-grade tools for serious portfolio managers.',
    features: [
      'Up to 3 live accounts',
      '10x max leverage',
      '10 concurrent positions',
      '20% max allocation',
      '75% total exposure',
      '8 entries per 24h',
      'Full supported asset universe',
    ],
    highlighted: false,
  },
]

const trustIndicators = [
  { icon: Lock, label: '256-bit encryption', sub: 'Bank-grade security' },
  { icon: Key, label: 'Your keys, your funds', sub: 'Non-custodial architecture' },
  { icon: Shield, label: 'SOC 2 compliant', sub: 'Audited infrastructure' },
  { icon: Ban, label: 'No withdrawal access', sub: 'Read & trade only' },
]

const featureStrip = [
  { icon: Shield, label: 'Risk Controls' },
  { icon: Bot, label: 'Auto-Execute' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Zap, label: 'Fast Execution' },
  { icon: Lock, label: 'Your Keys' },
  { icon: Eye, label: 'Observe Mode' },
]

/* ------------------------------------------------------------------ */
/*  Mini Sparkline Chart (pure divs)                                   */
/* ------------------------------------------------------------------ */

function MiniSparkline() {
  const bars = [35, 42, 38, 55, 48, 62, 58, 70, 65, 74, 68, 78, 72, 80, 76, 85, 82, 88]
  return (
    <div className="flex items-end gap-[2px] h-10">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-teal/40 to-teal"
          style={{
            height: `${h}%`,
            opacity: 0.4 + (i / bars.length) * 0.6,
            animationDelay: `${i * 60}ms`,
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mock Dashboard Preview                                             */
/* ------------------------------------------------------------------ */

function MockDashboardPreview() {
  return (
    <div className="relative max-w-lg mx-auto mt-12">
      {/* Ambient glow behind the card */}
      <div
        className="absolute -inset-8 rounded-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245,185,60,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* The card */}
      <div className="relative bg-bg-panel border border-border rounded-2xl p-5 sm:p-6 shadow-card-lg animate-float">
        {/* Scan-line overlay */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal animate-pulse-soft" />
            <span className="text-xs font-heading font-semibold text-text-secondary uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-dim/50 border border-teal/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
            </span>
            <span className="text-[10px] text-success font-body font-medium">Live</span>
          </div>
        </div>

        {/* Equity + daily P&L */}
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-2xl sm:text-3xl font-heading font-bold text-text-primary tabular-nums">
            $11,847.32
          </span>
          <span className="inline-flex items-center gap-0.5 text-sm font-body font-semibold text-success">
            <TrendingUp className="w-3.5 h-3.5" />
            +2.34%
          </span>
        </div>
        <p className="text-[11px] text-text-muted font-body mb-4">Today&apos;s P&amp;L: +$271.42</p>

        {/* Mini sparkline chart */}
        <div className="mb-4 px-1">
          <MiniSparkline />
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-4" />

        {/* Active positions grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-subtle rounded-lg px-3 py-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-heading font-semibold text-text-primary">BTC</span>
              <span className="text-[10px] font-body font-medium text-teal px-1.5 py-0.5 rounded bg-teal-dim/50">
                LONG
              </span>
            </div>
            <span className="text-sm font-body font-semibold text-success tabular-nums">+1.02%</span>
          </div>
          <div className="bg-bg-subtle rounded-lg px-3 py-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-heading font-semibold text-text-primary">ETH</span>
              <span className="text-[10px] font-body font-medium text-teal px-1.5 py-0.5 rounded bg-teal-dim/50">
                LONG
              </span>
            </div>
            <span className="text-sm font-body font-semibold text-success tabular-nums">+1.73%</span>
          </div>
          <div className="bg-bg-subtle rounded-lg px-3 py-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-heading font-semibold text-text-primary">SOL</span>
              <span className="text-[10px] font-body font-medium text-teal px-1.5 py-0.5 rounded bg-teal-dim/50">
                LONG
              </span>
            </div>
            <span className="text-sm font-body font-semibold text-success tabular-nums">+1.69%</span>
          </div>
          <div className="bg-bg-subtle rounded-lg px-3 py-2.5 flex items-center justify-center gap-2">
            <Activity className="w-3.5 h-3.5 text-teal" />
            <span className="text-xs font-body font-medium text-teal">3 Active</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-[10px] text-text-muted font-body">Risk utilization: 42%</span>
          <div className="flex items-center gap-1">
            <CircleDot className="w-3 h-3 text-success" />
            <span className="text-[10px] text-success font-body font-medium">All systems nominal</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated Risk Bar (fills on scroll)                                */
/* ------------------------------------------------------------------ */

function AnimatedRiskBar({
  label,
  value,
  limit,
  delay = 0,
}: {
  label: string
  value: number
  limit: string
  delay?: number
}) {
  const barRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = barRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(value), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, delay])

  return (
    <div ref={barRef}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-text-secondary font-body">{label}</span>
        <span className="text-xs text-text-muted font-body">{limit}</span>
      </div>
      <div className="h-2 rounded-full bg-bg-subtle overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-out',
            value >= 90 ? 'bg-danger' : value >= 70 ? 'bg-warning' : 'bg-teal'
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 overflow-x-hidden">
        {/* ============================================================
            SECTION 1 — HERO
        ============================================================ */}
        <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background layers */}
          <GridBackground />
          <GradientOrb
            color="teal"
            size={700}
            className="absolute -top-48 -left-48 opacity-30 animate-float"
            animate
          />
          <GradientOrb
            color="teal"
            size={500}
            className="absolute -bottom-40 -right-40 opacity-20 animate-float-slow"
            animate
          />
          <GradientOrb
            color="blue"
            size={400}
            className="absolute top-1/3 right-0 opacity-10 animate-float-slower"
            animate
          />
          <div className="noise-overlay pointer-events-none absolute inset-0" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal-dim/30 mb-10">
              <Sparkles className="w-3.5 h-3.5 text-teal" />
              <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body shimmer-text">
                Built for serious traders
              </span>
            </div>

            {/* Hero Stats Row — animated numbers */}
            <div className="animate-slide-up flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 mb-10">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary">
                  <AnimatedCounter value={12.4} prefix="$" suffix="M+" decimals={1} duration={2200} />
                </div>
                <p className="text-xs sm:text-sm text-text-muted font-body mt-1 uppercase tracking-wider">
                  Volume Processed
                </p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary">
                  <AnimatedCounter value={99.9} suffix="%" decimals={1} duration={2000} />
                </div>
                <p className="text-xs sm:text-sm text-text-muted font-body mt-1 uppercase tracking-wider">
                  Uptime
                </p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-teal">
                  <AnimatedCounter value={50} prefix="<" suffix="ms" duration={1800} />
                </div>
                <p className="text-xs sm:text-sm text-text-muted font-body mt-1 uppercase tracking-wider">
                  Execution
                </p>
              </div>
            </div>

            {/* Headline — punchy 3-line treatment */}
            <h1 className="animate-slide-up-delay-1 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[1.05] tracking-tight">
              <span className="text-text-primary">Execute Smarter.</span>
              <br />
              <span className="shimmer-text text-teal">Trade Harder.</span>
              <br />
              <span className="text-text-primary">Risk Nothing.</span>
            </h1>

            {/* Subheadline */}
            <p className="animate-slide-up-delay-2 mt-7 text-lg sm:text-xl lg:text-2xl text-text-secondary font-body max-w-2xl mx-auto leading-relaxed">
              The premium trading OS that enforces your rules, executes your strategy,
              and never breaks your limits.
            </p>

            {/* CTAs */}
            <div className="animate-slide-up-delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="group inline-flex items-center justify-center h-14 px-10 text-lg font-semibold font-body bg-teal text-bg-base rounded-pill hover:brightness-110 transition-all duration-200 shadow-glow hover:shadow-glow-lg"
              >
                Start trading free
                <ArrowRight className="ml-2.5 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href="#mode-showcase"
                className="inline-flex items-center justify-center h-14 px-10 text-lg font-body border border-teal/30 text-teal rounded-pill hover:bg-teal/10 transition-all duration-200"
              >
                See it in action
              </a>
            </div>

            {/* Feature Strip — 6 icon badges */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {featureStrip.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 animate-fade-in"
                    style={{ animationDelay: `${0.4 + i * 0.08}s`, animationFillMode: 'backwards' }}
                  >
                    <div className="w-7 h-7 rounded-full bg-teal/15 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-teal" />
                    </div>
                    <span className="text-xs sm:text-sm font-body font-medium text-text-secondary">
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Mock Dashboard Preview */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
            >
              <MockDashboardPreview />
            </div>

            {/* Powered-by strip */}
            <div
              className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 animate-fade-in"
              style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}
            >
              <span className="text-[11px] text-text-muted font-body uppercase tracking-wider">
                Powered by
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-teal/15 flex items-center justify-center">
                  <span className="text-[8px] font-heading font-bold text-teal">B</span>
                </div>
                <span className="text-xs text-text-muted font-body">Binance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-text-muted" />
                <span className="text-xs text-text-muted font-body">Real-time Data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-text-muted" />
                <span className="text-xs text-text-muted font-body">Military-grade Security</span>
              </div>
            </div>
          </div>

          {/* Glow line divider */}
          <div className="absolute bottom-0 left-0 right-0 glow-line" />
        </section>

        {/* ============================================================
            SECTION 2 — LIVE TICKER
        ============================================================ */}
        <section className="relative border-y border-border bg-bg-surface/40">
          <LiveTicker />
        </section>

        {/* ============================================================
            SECTION 3 — STATS ROW
        ============================================================ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
          <ScrollReveal>
            <StatsRow />
          </ScrollReveal>
        </section>

        {/* ============================================================
            SECTION 4 — MODE SHOWCASE (How It Works)
        ============================================================ */}
        <section id="mode-showcase" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body">
                  HOW IT WORKS
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary leading-tight">
                  Three modes. One platform.
                  <br />
                  <span className="text-text-secondary">Full control.</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <ModeShowcase />
            </ScrollReveal>
          </div>
        </section>

        {/* ============================================================
            SECTION 5 — TRADING FLOW DIAGRAM
        ============================================================ */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-bg-surface/30 relative overflow-hidden">
          <GradientOrb
            color="teal"
            size={400}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 animate-float-slow"
            animate
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body">
                  THE PIPELINE
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary">
                  See the system in action
                </h2>
                <p className="mt-4 text-lg text-text-secondary font-body max-w-2xl mx-auto">
                  From market signal to execution, every step passes through your risk parameters.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <TradingFlow />
            </ScrollReveal>

            <ScrollReveal delay={350}>
              <p className="mt-12 text-center text-sm text-text-muted font-body max-w-xl mx-auto">
                Every trade is validated against your risk rules before execution.
                If a signal exceeds your limits, it is rejected automatically&nbsp;&mdash;
                no exceptions, no overrides.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ============================================================
            SECTION 6 — RISK ENGINE
        ============================================================ */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left column — text + features */}
              <div>
                <ScrollReveal direction="left">
                  <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body">
                    RISK ENGINE
                  </span>
                  <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4 leading-tight">
                    Built-in risk controls
                    <br />
                    <span className="text-text-secondary">at every level</span>
                  </h2>
                  <p className="text-text-secondary font-body mb-8 leading-relaxed">
                    Your rules are enforced before any trade reaches your exchange.
                    TORI cannot bypass your limits — by design.
                  </p>
                </ScrollReveal>

                <ul className="space-y-5">
                  {riskControls.map((control, i) => (
                    <ScrollReveal key={control.label} delay={i * 80} direction="left">
                      <li className="flex items-start gap-3">
                        <div className="mt-0.5 w-8 h-8 rounded-lg bg-teal-dim flex items-center justify-center shrink-0">
                          <Shield className="w-4 h-4 text-teal" />
                        </div>
                        <div>
                          <span className="text-text-primary font-body font-medium text-sm">
                            {control.label}
                          </span>
                          <p className="text-text-muted font-body text-xs mt-0.5 leading-relaxed">
                            {control.description}
                          </p>
                        </div>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>

              {/* Right column — risk dashboard */}
              <ScrollReveal direction="right" delay={100}>
                <div className="relative">
                  {/* Scan-line overlay */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10">
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                      }}
                    />
                  </div>

                  <div className="bg-bg-panel border border-border rounded-2xl p-6 sm:p-8 shadow-card relative">
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-sm font-heading font-semibold text-text-primary">
                        Risk Dashboard
                      </h4>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-dim/50 border border-teal/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                        </span>
                        <span className="text-[10px] text-teal font-body font-medium uppercase tracking-wider">
                          Real-time monitoring
                        </span>
                      </div>
                    </div>

                    {/* Progress bars */}
                    <div className="space-y-5">
                      {riskBars.map((item, i) => (
                        <AnimatedRiskBar
                          key={item.label}
                          label={item.label}
                          value={item.value}
                          limit={item.limit}
                          delay={i * 120}
                        />
                      ))}
                    </div>

                    {/* Footer info */}
                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-[11px] text-text-muted font-body">
                        Last updated: just now
                      </span>
                      <span className="text-[11px] text-teal font-body font-medium">
                        All systems nominal
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 7 — PLAN COMPARISON
        ============================================================ */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body">
                  PRICING
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary">
                  Choose your plan
                </h2>
                <p className="mt-4 text-lg text-text-secondary font-body max-w-xl mx-auto">
                  Start with Starter. Scale to Elite. Every plan includes core risk controls.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {plans.map((plan, i) => (
                <ScrollReveal key={plan.name} delay={i * 120}>
                  <div
                    className={cn(
                      'relative bg-bg-panel border rounded-2xl p-8 transition-all duration-300 card-lift h-full flex flex-col',
                      plan.highlighted
                        ? 'border-teal/30 shadow-glow'
                        : 'border-border shadow-card'
                    )}
                  >
                    {/* Popular badge */}
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal text-bg-base text-[11px] font-body font-semibold uppercase tracking-wider">
                          <Sparkles className="w-3 h-3" />
                          Most popular
                        </span>
                      </div>
                    )}

                    {/* Plan header */}
                    <div className="mb-6">
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-text-muted font-body mt-1">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-border">
                      <div className="flex items-baseline gap-1">
                        {plan.price === 0 ? (
                          <span className="text-4xl font-heading font-bold text-text-primary">Free</span>
                        ) : (
                          <>
                            <span className="text-4xl font-heading font-bold text-text-primary tabular-nums">
                              ${plan.price}
                            </span>
                            <span className="text-sm text-text-muted font-body">/mo</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                          <span className="text-sm text-text-secondary font-body">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/sign-up"
                      className={cn(
                        'inline-flex items-center justify-center h-11 w-full text-sm font-semibold font-body rounded-pill transition-all duration-200',
                        plan.highlighted
                          ? 'bg-teal text-bg-base hover:brightness-110 shadow-glow hover:shadow-glow-lg'
                          : 'border border-teal/30 text-teal hover:bg-teal/10'
                      )}
                    >
                      Get started
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Compare link */}
            <ScrollReveal delay={400}>
              <div className="mt-10 text-center">
                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-1.5 text-sm font-body text-teal hover:underline"
                >
                  Compare all features
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ============================================================
            SECTION 8 — SOCIAL PROOF / TRUST
        ============================================================ */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <h2 className="text-center text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-12">
                Trusted by traders worldwide
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustIndicators.map((item, i) => {
                const Icon = item.icon
                return (
                  <ScrollReveal key={item.label} delay={i * 100}>
                    <div className="bg-bg-panel border border-border rounded-xl p-6 text-center card-lift">
                      <div className="mx-auto w-12 h-12 rounded-full bg-teal-dim/50 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-teal" />
                      </div>
                      <p className="text-sm font-heading font-semibold text-text-primary mb-1">
                        {item.label}
                      </p>
                      <p className="text-xs text-text-muted font-body">{item.sub}</p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 9 — FINAL CTA
        ============================================================ */}
        <section className="relative py-32 sm:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background effects */}
          <div className="radial-glow absolute inset-0 pointer-events-none" />
          <GradientOrb
            color="teal"
            size={500}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 animate-pulse-glow"
            animate
          />
          <div className="noise-overlay pointer-events-none absolute inset-0" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6 leading-tight">
                Ready to trade
                <br />
                <span className="text-teal">with discipline?</span>
              </h2>
              <p className="text-lg text-text-secondary font-body mb-10 max-w-xl mx-auto">
                Join thousands of traders who use TORI to remove emotion from execution
                and protect their capital — automatically.
              </p>
              <Link
                href="/sign-up"
                className="group inline-flex items-center justify-center h-14 px-10 text-base font-semibold font-body bg-teal text-bg-base rounded-pill hover:brightness-110 transition-all duration-200 shadow-glow-lg hover:shadow-glow-xl"
              >
                Get started for free
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <p className="mt-6 text-sm text-text-muted font-body">
                Start with Observe mode. No credit card required.
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
