import type { Metadata } from 'next'
import {
  User,
  Link as LinkIcon,
  Shield,
  Settings,
  Zap,
} from 'lucide-react'
export const metadata: Metadata = {
  title: 'How It Works | TORI Trades',
}

const steps = [
  {
    number: 1,
    icon: User,
    title: 'Create your account',
    description:
      'Sign up and choose your plan. Start with Starter or go Pro.',
  },
  {
    number: 2,
    icon: LinkIcon,
    title: 'Connect your exchange',
    description:
      'Securely connect your Binance account with API keys. Your funds stay in your control.',
  },
  {
    number: 3,
    icon: Shield,
    title: 'Configure risk controls',
    description:
      'Set your maximum allocation, leverage, position limits, and exposure caps.',
  },
  {
    number: 4,
    icon: Settings,
    title: 'Choose your mode',
    description:
      'Start with Observe to watch, Simulate to paper trade, or Auto-Execute for live automation.',
  },
  {
    number: 5,
    icon: Zap,
    title: 'Start trading',
    description:
      'TORI operates within your rules. Monitor everything from your dashboard.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body">
            HOW IT WORKS
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary">
            Get started in five steps
          </h1>
        </div>

        {/* Vertical stepper */}
        <div className="relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === steps.length - 1

            return (
              <div key={step.number} className="relative flex gap-6 pb-12 last:pb-0">
                {/* Left column: number circle + dashed connector */}
                <div className="flex flex-col items-center shrink-0">
                  {/* Numbered circle */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 border-teal bg-bg-base">
                    <span className="text-sm font-heading font-bold text-teal">
                      {step.number}
                    </span>
                  </div>
                  {/* Dashed connector line */}
                  {!isLast && (
                    <div className="w-px flex-1 border-l-2 border-dashed border-border mt-2" />
                  )}
                </div>

                {/* Right column: content */}
                <div className="pt-1.5 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-teal-dim flex items-center justify-center">
                      <Icon className="w-4 h-4 text-teal" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary font-body leading-relaxed pl-12">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
