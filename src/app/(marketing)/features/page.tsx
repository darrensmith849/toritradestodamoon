import type { Metadata } from 'next'
import {
  Shield,
  Bot,
  Lock,
  Link as LinkIcon,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Features | TORI Trades',
}

const features = [
  {
    icon: Shield,
    label: 'Risk Engine',
    heading: 'Military-grade risk controls',
    description:
      'Set hard limits on allocation, leverage, exposure, and position count. TORI enforces them — no exceptions.',
  },
  {
    icon: Bot,
    label: 'Automation Modes',
    heading: 'Three modes, one platform',
    description:
      'Observe market behavior. Simulate with paper trades. Auto-execute with live capital — all within your risk parameters.',
  },
  {
    icon: Lock,
    label: 'Plan-Based Limits',
    heading: 'Transparent plan limits',
    description:
      'Every plan defines exactly what you can do. No hidden restrictions, no surprise fees. Scale up when you\'re ready.',
  },
  {
    icon: LinkIcon,
    label: 'Exchange Integration',
    heading: 'Connect your exchange',
    description:
      'Bring your own Binance account. Your keys, your funds, your control. TORI never holds your capital.',
  },
  {
    icon: BarChart3,
    label: 'Real-Time Dashboard',
    heading: 'Live trading dashboard',
    description:
      'Monitor equity, PnL, positions, and risk usage in real time. Premium analytics without the noise.',
  },
]

export default function FeaturesPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body">
            FEATURES
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary">
            Everything you need to trade with precision
          </h1>
        </div>

        {/* Feature sections — alternating layout */}
        <div className="space-y-24">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isReversed = index % 2 === 1

            return (
              <section
                key={feature.label}
                className={cn(
                  'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
                  isReversed && 'lg:[direction:rtl]'
                )}
              >
                {/* Content side */}
                <div className={cn(isReversed && 'lg:[direction:ltr]')}>
                  <div className="w-14 h-14 rounded-full bg-teal-dim flex items-center justify-center mb-6">
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
                </div>

                {/* Visual side — styled card placeholder */}
                <div className={cn(isReversed && 'lg:[direction:ltr]')}>
                  <div className="bg-bg-panel border border-border rounded-2xl p-8 shadow-card">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-teal-dim flex items-center justify-center">
                        <Icon className="w-5 h-5 text-teal" />
                      </div>
                      <div>
                        <p className="text-sm font-heading font-semibold text-text-primary">
                          {feature.heading}
                        </p>
                        <p className="text-xs text-text-muted font-body">
                          {feature.label}
                        </p>
                      </div>
                    </div>
                    {/* Visual content lines */}
                    <div className="space-y-3">
                      <div className="h-2 rounded-full bg-bg-subtle overflow-hidden">
                        <div className="h-full w-3/4 rounded-full bg-teal" />
                      </div>
                      <div className="h-2 rounded-full bg-bg-subtle overflow-hidden">
                        <div className="h-full w-1/2 rounded-full bg-teal/60" />
                      </div>
                      <div className="h-2 rounded-full bg-bg-subtle overflow-hidden">
                        <div className="h-full w-5/6 rounded-full bg-teal/40" />
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      {[
                        { label: 'Active', value: 'On' },
                        { label: 'Enforced', value: 'Yes' },
                        { label: 'Alerts', value: '3' },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <p className="text-lg font-heading font-bold text-text-primary">
                            {stat.value}
                          </p>
                          <p className="text-xs text-text-muted font-body">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
