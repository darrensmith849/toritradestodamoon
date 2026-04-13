'use client'

import { useRef, useEffect, useState } from 'react'
import { Eye, PlayCircle, Zap, Shield, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Flow Node ──────────────────────────────────────────── */

interface FlowNodeProps {
  icon: React.ReactNode
  label: string
  sublabel?: string
  accent?: boolean
  glow?: boolean
  className?: string
  delay?: number
  visible?: boolean
  pulse?: boolean
}

function FlowNode({
  icon,
  label,
  sublabel,
  accent = false,
  glow = false,
  className,
  delay = 0,
  visible = false,
  pulse = false,
}: FlowNodeProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          'relative flex items-center justify-center w-14 h-14 rounded-2xl border transition-all duration-500',
          accent
            ? 'bg-teal/10 border-teal/30 text-teal'
            : 'bg-bg-panel border-border text-text-secondary',
          glow && 'shadow-glow'
        )}
      >
        {icon}
        {pulse && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal" />
          </span>
        )}
        {glow && (
          <div className="absolute inset-0 rounded-2xl border border-teal/20 animate-pulse-glow" />
        )}
      </div>
      <span
        className={cn(
          'text-xs font-medium font-body text-center leading-tight',
          accent ? 'text-teal' : 'text-text-secondary'
        )}
      >
        {label}
      </span>
      {sublabel && (
        <span className="text-[10px] text-text-muted font-body text-center">
          {sublabel}
        </span>
      )}
    </div>
  )
}

/* ─── Animated Connection Line (horizontal) ──────────────── */

function HorizontalLine({
  visible,
  delay = 0,
}: {
  visible: boolean
  delay?: number
}) {
  return (
    <div
      className={cn(
        'relative h-px flex-1 min-w-[40px] self-center transition-all duration-700',
        visible ? 'opacity-100' : 'opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Base line */}
      <div className="absolute inset-0 bg-border" />
      {/* Animated dot traveling along the line */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-[2px] rounded-full bg-gradient-to-r from-transparent via-teal to-transparent animate-data-flow"
        />
      </div>
      {/* Arrow tip */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-teal/40" />
    </div>
  )
}

/* ─── Animated Connection Line (vertical for mobile) ─────── */

function VerticalLine({
  visible,
  delay = 0,
}: {
  visible: boolean
  delay?: number
}) {
  return (
    <div
      className={cn(
        'relative w-px h-8 self-center transition-all duration-700',
        visible ? 'opacity-100' : 'opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-border" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] border-t-teal/40" />
    </div>
  )
}

/* ─── Branch Row ─────────────────────────────────────────── */

interface BranchProps {
  icon: React.ReactNode
  mode: string
  result: string
  visible: boolean
  delay: number
}

function Branch({ icon, mode, result, visible, delay }: BranchProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-panel/60 border border-border transition-all duration-700',
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal/10 text-teal shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-text-primary font-body">
          {mode}
        </span>
        <span className="text-[10px] text-text-muted font-body">{result}</span>
      </div>
      {/* Mini animated connector */}
      <div className="ml-auto flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-teal/40 animate-pulse-soft" />
        <div className="w-8 h-px bg-border" />
      </div>
    </div>
  )
}

/* ─── Orbiting Dots for Engine Node ──────────────────────── */

function OrbitingDots({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        'absolute inset-0 transition-opacity duration-1000',
        visible ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* Orbit track */}
      <div className="absolute inset-[-16px] rounded-full border border-teal/[0.08]" />
      {/* Dot 1 */}
      <div
        className="absolute inset-[-16px]"
        style={{ animation: 'orbit 12s linear infinite' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-teal/60"
        />
      </div>
      {/* Dot 2 */}
      <div
        className="absolute inset-[-16px]"
        style={{ animation: 'orbit 12s linear infinite reverse', animationDelay: '-4s' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-teal/40"
        />
      </div>
      {/* Dot 3 */}
      <div
        className="absolute inset-[-16px]"
        style={{ animation: 'orbit 18s linear infinite', animationDelay: '-8s' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-teal/30"
        />
      </div>
    </div>
  )
}

/* ─── Engine Node (Central) ──────────────────────────────── */

function EngineNode({
  visible,
  delay,
}: {
  visible: boolean
  delay: number
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-2 transition-all duration-700',
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-teal/[0.08] border border-teal/20 shadow-glow">
        <Activity className="w-7 h-7 text-teal" />
        <OrbitingDots visible={visible} />
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-teal/[0.06] to-transparent" />
      </div>
      <span className="text-xs font-semibold text-teal font-body text-center">
        TORI Engine
      </span>
      <span className="text-[10px] text-text-muted font-body text-center">
        Analysis Core
      </span>
    </div>
  )
}

/* ─── Main Trading Flow Diagram ──────────────────────────── */

export function TradingFlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn('w-full', className)}>
      {/* ── Desktop layout (horizontal) ── */}
      <div className="hidden lg:flex items-center justify-center gap-0 px-4">
        {/* Market Data node */}
        <FlowNode
          icon={<div className="w-2 h-2 rounded-full bg-teal animate-pulse-soft" />}
          label="Market Data"
          sublabel="Real-time feeds"
          pulse
          visible={visible}
          delay={0}
        />

        <HorizontalLine visible={visible} delay={200} />

        {/* TORI Engine */}
        <EngineNode visible={visible} delay={400} />

        <HorizontalLine visible={visible} delay={600} />

        {/* Output branches */}
        <div className="flex flex-col gap-2">
          <Branch
            icon={<Eye className="w-4 h-4" />}
            mode="Observe"
            result="Signal Logged"
            visible={visible}
            delay={800}
          />
          <Branch
            icon={<PlayCircle className="w-4 h-4" />}
            mode="Simulate"
            result="Paper Trade"
            visible={visible}
            delay={950}
          />
          <Branch
            icon={<Zap className="w-4 h-4" />}
            mode="Auto-Execute"
            result="Live Order"
            visible={visible}
            delay={1100}
          />
        </div>

        <HorizontalLine visible={visible} delay={1200} />

        {/* Risk Gate */}
        <FlowNode
          icon={<Shield className="w-5 h-5" />}
          label="Risk Gate"
          sublabel="Validated"
          accent
          glow
          visible={visible}
          delay={1300}
        />
      </div>

      {/* ── Mobile layout (vertical) ── */}
      <div className="flex lg:hidden flex-col items-center gap-0 px-4">
        <FlowNode
          icon={<div className="w-2 h-2 rounded-full bg-teal animate-pulse-soft" />}
          label="Market Data"
          sublabel="Real-time feeds"
          pulse
          visible={visible}
          delay={0}
        />

        <VerticalLine visible={visible} delay={200} />

        <EngineNode visible={visible} delay={400} />

        <VerticalLine visible={visible} delay={600} />

        <div className="flex flex-col gap-2 w-full max-w-xs">
          <Branch
            icon={<Eye className="w-4 h-4" />}
            mode="Observe"
            result="Signal Logged"
            visible={visible}
            delay={800}
          />
          <Branch
            icon={<PlayCircle className="w-4 h-4" />}
            mode="Simulate"
            result="Paper Trade"
            visible={visible}
            delay={950}
          />
          <Branch
            icon={<Zap className="w-4 h-4" />}
            mode="Auto-Execute"
            result="Live Order"
            visible={visible}
            delay={1100}
          />
        </div>

        <VerticalLine visible={visible} delay={1200} />

        <FlowNode
          icon={<Shield className="w-5 h-5" />}
          label="Risk Gate"
          sublabel="Validated"
          accent
          glow
          visible={visible}
          delay={1300}
        />
      </div>
    </div>
  )
}
