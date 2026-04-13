import Link from 'next/link'
import {
  Eye,
  PlayCircle,
  Zap,
  Shield,
  ArrowRight,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { cn } from '@/lib/utils'

const modes = [
  {
    icon: Eye,
    title: 'Observe',
    description:
      'Watch the market with TORI\'s analysis. No trades executed. Learn how the system thinks.',
  },
  {
    icon: PlayCircle,
    title: 'Simulate',
    description:
      'Paper trade with real market data. Test strategies risk-free before going live.',
  },
  {
    icon: Zap,
    title: 'Auto-Execute',
    description:
      'Let TORI execute trades within your strict risk parameters. Full control, automated precision.',
  },
]

const riskControls = [
  'Max allocation per trade',
  'Leverage limits',
  'Position caps',
  'Exposure ceiling',
  'Daily entry limits',
  'Asset restrictions',
]

const trustedMetrics = [
  '3 Modes',
  'Strict Risk Controls',
  'Plan-Based Limits',
  'Your Keys, Your Rules',
]

const miniPlans = [
  { name: 'Starter', price: 49 },
  { name: 'Pro', price: 99 },
  { name: 'Elite', price: 249 },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* ============================
            HERO SECTION
        ============================ */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary leading-tight">
              Your Trading
              <br />
              <span className="text-teal">Operating System</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-text-secondary font-body max-w-2xl mx-auto leading-relaxed">
              Connect your exchange. Set your risk limits. Choose your mode.
              TORI handles the rest — within the rules you define.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold font-body bg-teal text-bg-base rounded-pill hover:brightness-110 transition-all duration-150"
              >
                Start free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-body border border-teal/30 text-teal rounded-pill hover:bg-teal/10 transition-all duration-150"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ============================
            TRUSTED BAR
        ============================ */}
        <section className="border-y border-border bg-bg-surface/50 py-6 px-4">
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
            <span className="text-xs text-text-muted font-body uppercase tracking-wider mr-0 sm:mr-6">
              Built for serious traders
            </span>
            <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-0">
              {trustedMetrics.map((metric, i) => (
                <div key={metric} className="flex items-center">
                  {i > 0 && (
                    <span className="hidden sm:block w-px h-4 bg-border mx-6" />
                  )}
                  <span className="text-sm text-text-secondary font-body font-medium">
                    {metric}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================
            MODE EXPLAINER SECTION
        ============================ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body">
                HOW IT WORKS
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-text-primary">
                Three modes. One platform.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {modes.map((mode) => {
                const Icon = mode.icon
                return (
                  <div
                    key={mode.title}
                    className="bg-bg-panel border border-border rounded-2xl p-8 text-center"
                  >
                    <div className="mx-auto w-14 h-14 rounded-full bg-teal-dim flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-teal" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
                      {mode.title}
                    </h3>
                    <p className="text-sm text-text-secondary font-body leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================
            RISK CONTROL SECTION
        ============================ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: text */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary mb-8">
                  Built-in risk controls at every level
                </h2>
                <ul className="space-y-4">
                  {riskControls.map((control) => (
                    <li key={control} className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-teal shrink-0" />
                      <span className="text-text-secondary font-body">
                        {control}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: mock risk dashboard card */}
              <div className="bg-bg-panel border border-border rounded-2xl p-6 shadow-card">
                <h4 className="text-sm font-heading font-semibold text-text-primary mb-6">
                  Risk Dashboard
                </h4>
                <div className="space-y-5">
                  {[
                    { label: 'Allocation', value: 65, limit: '7.5%' },
                    { label: 'Leverage', value: 40, limit: '3x' },
                    { label: 'Exposure', value: 82, limit: '20%' },
                    { label: 'Positions', value: 50, limit: '2 / 2' },
                    { label: 'Entries (24h)', value: 33, limit: '1 / 3' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-text-secondary font-body">
                          {item.label}
                        </span>
                        <span className="text-xs text-text-muted font-body">
                          {item.limit}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-bg-subtle overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-300',
                            item.value >= 90
                              ? 'bg-danger'
                              : item.value >= 70
                              ? 'bg-warning'
                              : 'bg-teal'
                          )}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================
            PLAN CTA SECTION
        ============================ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl bg-bg-surface/50 border border-border rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary mb-10">
              Choose the plan that fits your strategy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {miniPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="bg-bg-panel border border-border rounded-xl p-6 text-center"
                >
                  <p className="text-sm text-text-secondary font-body mb-1">
                    {plan.name}
                  </p>
                  <p className="text-2xl font-heading font-bold text-text-primary">
                    ${plan.price}
                    <span className="text-sm font-normal text-text-muted">/mo</span>
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-body border border-teal/30 text-teal rounded-pill hover:bg-teal/10 transition-all duration-150"
            >
              Compare plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ============================
            FINAL CTA SECTION
        ============================ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary mb-4">
              Ready to trade with discipline?
            </h2>
            <p className="text-lg text-text-secondary font-body mb-10">
              Start with Observe mode. Upgrade when you&#39;re ready.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold font-body bg-teal text-bg-base rounded-pill hover:brightness-110 transition-all duration-150"
            >
              Get started
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
