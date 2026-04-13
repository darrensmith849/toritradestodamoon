'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PLAN_TIERS, TIER_ORDER } from '@/lib/constants'
import type { PlanTier } from '@/lib/types'

export default function PlanSelectionPage() {
  const [selected, setSelected] = useState<PlanTier>('tier2')

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Select your plan
        </h2>
        <p className="text-text-secondary font-body">
          Choose the tier that fits your trading needs. Upgrade anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {TIER_ORDER.map((tier) => {
          const plan = PLAN_TIERS[tier]
          const isSelected = selected === tier

          return (
            <button
              key={tier}
              type="button"
              onClick={() => setSelected(tier)}
              className={cn(
                'flex flex-col p-5 rounded-xl border transition-all duration-150 text-left',
                isSelected
                  ? 'border-teal shadow-glow bg-bg-panel'
                  : 'border-border bg-bg-panel hover:border-border-accent'
              )}
            >
              <h3 className="text-lg font-semibold font-heading text-text-primary mb-1">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold font-heading text-teal mb-4">
                {plan.price === 0 ? (
                  'Free'
                ) : (
                  <>
                    ${plan.price}
                    <span className="text-sm font-normal text-text-muted">/mo</span>
                  </>
                )}
              </p>

              <ul className="space-y-2 text-sm font-body text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                  {plan.liveAccounts > 0
                    ? `${plan.liveAccounts} live account${plan.liveAccounts > 1 ? 's' : ''}`
                    : `${plan.paperAccounts} paper account`}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                  {plan.maxLeverage}x max leverage
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                  {plan.maxConcurrentPositions} {plan.liveAccounts > 0 ? 'concurrent' : 'simulated'} position{plan.maxConcurrentPositions > 1 ? 's' : ''}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                  {plan.assetLabel}
                </li>
              </ul>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" href="/mode-selection">
          Back
        </Button>
        <Button variant="primary" href="/connect-exchange">
          Continue
        </Button>
      </div>
    </div>
  )
}
