'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlanBadge } from '@/components/layout/plan-badge'
import { SettingsLayout } from '@/components/settings/settings-layout'
import { usePlanContext } from '@/contexts/plan-context'
import { getPlanLimits } from '@/lib/plan-limits'
import { formatCurrency, formatLeverage } from '@/lib/format'
import { CreditCard, Receipt, CheckCircle2 } from 'lucide-react'

const BILLING_HISTORY = [
  {
    date: 'Apr 1, 2026',
    description: 'Pro Plan — Monthly',
    amount: 99,
    status: 'Paid',
  },
  {
    date: 'Mar 1, 2026',
    description: 'Pro Plan — Monthly',
    amount: 99,
    status: 'Paid',
  },
  {
    date: 'Feb 1, 2026',
    description: 'Pro Plan — Monthly',
    amount: 99,
    status: 'Paid',
  },
  {
    date: 'Jan 1, 2026',
    description: 'Starter Plan — Monthly',
    amount: 49,
    status: 'Paid',
  },
]

export default function BillingPage() {
  const { tier } = usePlanContext()
  const limits = getPlanLimits(tier)

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          Billing
        </h1>

        {/* Current Plan */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary font-heading">
              Current Plan
            </h2>
            <PlanBadge tier={tier} />
          </div>

          <p className="text-3xl font-bold text-text-primary font-heading mb-1">
            ${limits.price}
            <span className="text-base font-normal text-text-muted">/month</span>
          </p>

          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2 text-sm text-text-secondary font-body">
              <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
              Max allocation: {limits.maxAllocation}% per trade
            </li>
            <li className="flex items-center gap-2 text-sm text-text-secondary font-body">
              <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
              Max leverage: {formatLeverage(limits.maxLeverage)}
            </li>
            <li className="flex items-center gap-2 text-sm text-text-secondary font-body">
              <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
              Up to {limits.maxConcurrentPositions} concurrent positions
            </li>
            <li className="flex items-center gap-2 text-sm text-text-secondary font-body">
              <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
              {limits.assetLabel}
            </li>
            <li className="flex items-center gap-2 text-sm text-text-secondary font-body">
              <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
              {limits.maxEntriesPer24h} entries per 24h
            </li>
          </ul>

          <div className="mt-5">
            <Button variant="secondary" size="md">
              Change plan
            </Button>
          </div>
        </Card>

        {/* Payment Method */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-text-muted" />
            <h2 className="text-base font-semibold text-text-primary font-heading">
              Payment Method
            </h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary font-body">
                Visa ending in 4242
              </p>
              <p className="text-xs text-text-muted font-body mt-0.5">
                Expires 12/26
              </p>
            </div>
            <Button variant="ghost" size="sm">
              Update
            </Button>
          </div>
        </Card>

        {/* Billing History */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-5 h-5 text-text-muted" />
            <h2 className="text-base font-semibold text-text-primary font-heading">
              Billing History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="text-text-muted text-xs">
                  <th className="text-left pb-3 font-medium">Date</th>
                  <th className="text-left pb-3 font-medium">Description</th>
                  <th className="text-right pb-3 font-medium">Amount</th>
                  <th className="text-right pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {BILLING_HISTORY.map((row, i) => (
                  <tr key={i} className="text-text-secondary">
                    <td className="py-3 text-text-primary">{row.date}</td>
                    <td className="py-3">{row.description}</td>
                    <td className="py-3 text-right font-medium text-text-primary">
                      {formatCurrency(row.amount)}
                    </td>
                    <td className="py-3 text-right">
                      <Badge variant="success" size="sm">
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </SettingsLayout>
  )
}
