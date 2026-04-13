'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PLAN_TIERS, TIER_ORDER } from '@/lib/constants'
import { PillToggle } from '@/components/ui/pill-toggle'
import type { PlanTier } from '@/lib/types'

export default function PricingPage() {
  const [billing, setBilling] = useState<string>('monthly')

  const multiplier = billing === 'annual' ? 0.8 : 1

  const planFeatures: Record<PlanTier, string[]> = {
    tier1: [
      '1 live account',
      '7.5% max allocation per trade',
      '3x max leverage',
      '2 concurrent positions',
      '20% total exposure',
      '3 entries per 24h',
      '6 enabled assets',
    ],
    tier2: [
      '1 live + 1 paper account',
      '12.5% max allocation',
      '5x max leverage',
      '5 concurrent positions',
      '45% total exposure',
      '8 entries per 24h',
      '12 enabled assets',
    ],
    tier3: [
      'Up to 3 live accounts',
      '20% max allocation',
      '10x max leverage',
      '10 concurrent positions',
      '75% total exposure',
      '20 entries per 24h',
      'Full asset universe',
    ],
  }

  const comparisonRows = [
    { label: 'Live Accounts', tier1: '1', tier2: '1', tier3: 'Up to 3' },
    { label: 'Paper Accounts', tier1: '0', tier2: '1', tier3: '0' },
    { label: 'Max Allocation', tier1: '7.5%', tier2: '12.5%', tier3: '20%' },
    { label: 'Max Leverage', tier1: '3x', tier2: '5x', tier3: '10x' },
    { label: 'Concurrent Positions', tier1: '2', tier2: '5', tier3: '10' },
    { label: 'Total Exposure', tier1: '20%', tier2: '45%', tier3: '75%' },
    { label: 'Entries per 24h', tier1: '3', tier2: '8', tier3: '20' },
    { label: 'Enabled Assets', tier1: '6', tier2: '12', tier3: 'Unlimited' },
  ]

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-teal uppercase tracking-wider font-body">
            PRICING
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary">
            Choose your plan
          </h1>
          <p className="mt-4 text-lg text-text-secondary font-body max-w-xl mx-auto">
            Every plan includes strict risk controls. Scale as your strategy
            grows.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <PillToggle
            options={[
              { id: 'monthly', label: 'Monthly' },
              { id: 'annual', label: 'Annual' },
            ]}
            active={billing}
            onChange={setBilling}
          />
          {billing === 'annual' && (
            <span className="text-xs font-medium text-teal bg-teal-dim rounded-full px-2.5 py-1 font-body">
              Save 20%
            </span>
          )}
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {TIER_ORDER.map((tierKey) => {
            const plan = PLAN_TIERS[tierKey]
            const features = planFeatures[tierKey]
            const isHighlighted = tierKey === 'tier2'
            const price = Math.round(plan.price * multiplier)

            return (
              <div
                key={tierKey}
                className={cn(
                  'relative bg-bg-panel rounded-2xl p-8 flex flex-col',
                  isHighlighted
                    ? 'border-2 border-teal/30 shadow-glow'
                    : 'border border-border'
                )}
              >
                {/* Popular badge */}
                {isHighlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-bg-base text-xs font-semibold font-body px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}

                {/* Plan name + price */}
                <div className="mb-6">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-heading font-bold text-text-primary">
                      ${price}
                    </span>
                    <span className="text-sm text-text-muted font-body">/mo</span>
                  </div>
                  {billing === 'annual' && (
                    <p className="text-xs text-text-muted font-body mt-1">
                      Billed annually (${price * 12}/yr)
                    </p>
                  )}
                </div>

                {/* Feature list */}
                <ul className="space-y-3 flex-1 mb-8">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary font-body">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <Link
                  href="/sign-up"
                  className={cn(
                    'inline-flex items-center justify-center h-11 px-6 text-sm font-semibold font-body rounded-pill transition-all duration-150 w-full',
                    isHighlighted
                      ? 'bg-teal text-bg-base hover:brightness-110'
                      : 'border border-teal/30 text-teal hover:bg-teal/10'
                  )}
                >
                  Get started
                </Link>
              </div>
            )
          })}
        </div>

        {/* Feature comparison table */}
        <div className="mb-20">
          <h2 className="text-2xl font-heading font-bold text-text-primary text-center mb-8">
            Feature comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm text-text-muted font-body font-normal py-3 pr-4">
                    Feature
                  </th>
                  {TIER_ORDER.map((tierKey) => (
                    <th
                      key={tierKey}
                      className="text-center text-sm text-text-secondary font-heading font-semibold py-3 px-4"
                    >
                      {PLAN_TIERS[tierKey].name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-border/50">
                    <td className="text-sm text-text-secondary font-body py-3 pr-4">
                      {row.label}
                    </td>
                    <td className="text-sm text-text-primary font-body text-center py-3 px-4">
                      {row.tier1}
                    </td>
                    <td className="text-sm text-text-primary font-body text-center py-3 px-4">
                      {row.tier2}
                    </td>
                    <td className="text-sm text-text-primary font-body text-center py-3 px-4">
                      {row.tier3}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-3">
            Start with Observe mode
          </h2>
          <p className="text-text-secondary font-body mb-8 max-w-md mx-auto">
            Try TORI risk-free. Watch the system analyze markets before
            committing any capital.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold font-body bg-teal text-bg-base rounded-pill hover:brightness-110 transition-all duration-150"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  )
}
