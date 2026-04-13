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
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GradientOrb } from '@/components/ui/gradient-orb'
import { GridBackground } from '@/components/ui/grid-background'
import { TradingFlow } from '@/components/marketing/trading-flow'
import { LiveTicker } from '@/components/marketing/live-ticker'
import { StatsRow } from '@/components/marketing/stats-row'
import { ModeShowcase } from '@/components/marketing/mode-showcase'

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
    name: 'Starter',
    price: 49,
    description: 'For traders getting started with systematic execution.',
    features: [
      '1 live account',
      '7.5% max allocation per trade',
      '3x max leverage',
      '2 concurrent positions',
      '20% total exposure',
      '3 entries per 24h',
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
      '12.5% max allocation per trade',
      '5x max leverage',
      '5 concurrent positions',
      '45% total exposure',
      '8 entries per 24h',
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
      '20% max allocation per trade',
      '10x max leverage',
      '10 concurrent positions',
      '75% total exposure',
      '20 entries per 24h',
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
        <section className="relative py-32 sm:py-40 lg:py-48 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background layers */}
          <GridBackground />
          <GradientOrb
            color="teal"
            size={600}
            className="absolute -top-40 -left-40 opacity-30 animate-float"
            animate
          />
          <GradientOrb
            color="blue"
            size={500}
            className="absolute -bottom-32 -right-32 opacity-20 animate-float-slow"
            animate
          />
          <div className="noise-overlay pointer-events-none absolute inset-0" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal-dim/30 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-teal" />
              <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body shimmer-text">
                Built for serious traders
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-slide-up text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-text-primary leading-[1.08] tracking-tight">
              Your Trading
              <br />
              <span className="shimmer-text text-teal">Operating System</span>
            </h1>

            {/* Subheadline */}
            <p className="animate-slide-up-delay-1 mt-6 text-lg sm:text-xl text-text-secondary font-body max-w-2xl mx-auto leading-relaxed">
              Connect your exchange. Set your risk limits. Choose your mode.
              TORI handles the rest&nbsp;&mdash; within the rules{' '}
              <span className="text-text-primary font-medium">you</span> define.
            </p>

            {/* CTAs */}
            <div className="animate-slide-up-delay-2 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="group inline-flex items-center justify-center h-12 px-8 text-base font-semibold font-body bg-teal text-bg-base rounded-pill hover:brightness-110 transition-all duration-200 shadow-glow hover:shadow-glow-lg"
              >
                Start free
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-body border border-teal/30 text-teal rounded-pill hover:bg-teal/10 transition-all duration-200"
              >
                View pricing
              </Link>
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
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
                        <AnimatedCounter
                          value={plan.price}
                          prefix="$"
                          duration={1200}
                          className="text-4xl font-heading font-bold text-text-primary"
                        />
                        <span className="text-sm text-text-muted font-body">/mo</span>
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
