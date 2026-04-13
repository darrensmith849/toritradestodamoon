import { Shield, Bot, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Shield,
    title: 'Strict risk controls',
    description: 'Every trade is governed by plan-enforced limits on allocation, leverage, and exposure.',
  },
  {
    icon: Bot,
    title: 'Three automation modes',
    description: 'Observe, simulate, or auto-execute. Choose how TORI participates in your trading.',
  },
  {
    icon: BarChart3,
    title: 'Real-time dashboard',
    description: 'Monitor positions, P&L, and risk usage in a single unified view.',
  },
]

export default function WelcomePage() {
  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl font-heading font-bold text-text-primary mb-3">
        Welcome to TORI Trades
      </h2>
      <p className="text-text-secondary font-body mb-10">
        Let&apos;s get your trading operating system set up. This takes about 2 minutes.
      </p>

      <div className="space-y-6 mb-10">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start gap-4 text-left bg-bg-panel border border-border rounded-xl p-5"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-teal-dim flex items-center justify-center">
              <feature.icon className="w-5 h-5 text-teal" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary font-heading mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary font-body">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button variant="primary" size="lg" href="/mode-selection">
        Let&apos;s get started
      </Button>
    </div>
  )
}
