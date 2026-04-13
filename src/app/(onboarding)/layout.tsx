'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const STEPS = [
  { path: '/welcome', label: 'Welcome' },
  { path: '/mode-selection', label: 'Mode' },
  { path: '/plan-selection', label: 'Plan' },
  { path: '/connect-exchange', label: 'Exchange' },
  { path: '/risk-config', label: 'Risk' },
  { path: '/review', label: 'Review' },
  { path: '/complete', label: 'Complete' },
]

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const currentStepIndex = STEPS.findIndex((s) => pathname === s.path)

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Top bar with logo and stepper */}
      <div className="w-full border-b border-border bg-bg-surface/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-heading font-bold tracking-wider text-teal">
              TORI <span className="text-text-primary">TRADES</span>
            </h1>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-0">
            {STEPS.map((step, i) => {
              const isCompleted = i < currentStepIndex
              const isActive = i === currentStepIndex
              const isFuture = i > currentStepIndex

              return (
                <div key={step.path} className="flex items-center">
                  {/* Step dot + label */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium font-body border-2 transition-colors',
                        isActive && 'bg-teal border-teal text-bg-base',
                        isCompleted && 'bg-teal/50 border-teal/50 text-bg-base',
                        isFuture && 'bg-bg-hover border-border text-text-muted'
                      )}
                    >
                      {isCompleted ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-xs font-body mt-1.5',
                        isActive && 'text-teal font-medium',
                        isCompleted && 'text-teal-muted',
                        isFuture && 'text-text-muted'
                      )}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Connecting line */}
                  {i < STEPS.length - 1 && (
                    <div
                      className={cn(
                        'w-8 sm:w-12 h-0.5 mx-1 mt-[-1rem]',
                        i < currentStepIndex ? 'bg-teal/50' : 'bg-border'
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  )
}
