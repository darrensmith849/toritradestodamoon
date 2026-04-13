'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs } from '@/components/ui/tabs'
import { ProgressBar } from '@/components/ui/progress-bar'
import { mockTrades } from '@/data/mock-trades'
import { mockRiskUsage } from '@/data/mock-risk'
import { formatCurrency, formatPercent, formatDate } from '@/lib/format'
import { getUsagePercent } from '@/lib/plan-limits'
import { cn } from '@/lib/utils'
import type { AutomationMode } from '@/lib/types'

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'observe', label: 'Observe' },
  { id: 'simulate', label: 'Simulate' },
  { id: 'auto-execute', label: 'Auto-Execute' },
]

const modeLabel: Record<AutomationMode, string> = {
  observe: 'Observe',
  simulate: 'Simulate',
  'auto-execute': 'Auto',
}

const modeBadgeVariant: Record<AutomationMode, 'teal' | 'warning' | 'success'> = {
  observe: 'teal',
  simulate: 'warning',
  'auto-execute': 'success',
}

export default function TradesPage() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered =
    activeTab === 'all'
      ? mockTrades
      : mockTrades.filter((t) => t.mode === activeTab)

  const entriesPercent = getUsagePercent(
    mockRiskUsage.entries24h.used,
    mockRiskUsage.entries24h.limit
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-text-primary mb-1">
          Trade History
        </h1>
      </div>

      {/* Entries usage indicator */}
      <Card className="!py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary font-body">
            Entries in last 24h: {mockRiskUsage.entries24h.used} of{' '}
            {mockRiskUsage.entries24h.limit}
          </span>
          <span className="text-sm font-medium text-text-primary font-body">
            {Math.round(entriesPercent)}%
          </span>
        </div>
        <ProgressBar value={entriesPercent} />
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Table */}
      {filtered.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-muted font-body">
            No trades found for this filter
          </p>
        </Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="text-text-muted text-xs border-b border-border">
                <th className="text-left pb-3 font-medium">Asset</th>
                <th className="text-left pb-3 font-medium">Side</th>
                <th className="text-right pb-3 font-medium">Entry</th>
                <th className="text-right pb-3 font-medium">Exit</th>
                <th className="text-right pb-3 font-medium">P&amp;L ($)</th>
                <th className="text-right pb-3 font-medium">P&amp;L (%)</th>
                <th className="text-center pb-3 font-medium">Mode</th>
                <th className="text-right pb-3 font-medium">Closed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((trade) => (
                <tr key={trade.id} className="text-text-secondary">
                  <td className="py-3 text-text-primary font-medium">
                    {trade.asset}
                  </td>
                  <td className="py-3">
                    <Badge
                      variant={trade.side === 'long' ? 'success' : 'danger'}
                      size="sm"
                    >
                      {trade.side.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    {formatCurrency(trade.entryPrice)}
                  </td>
                  <td className="py-3 text-right">
                    {formatCurrency(trade.exitPrice)}
                  </td>
                  <td
                    className={cn(
                      'py-3 text-right font-medium',
                      trade.pnl >= 0 ? 'text-success' : 'text-danger'
                    )}
                  >
                    {formatCurrency(trade.pnl)}
                  </td>
                  <td
                    className={cn(
                      'py-3 text-right font-medium',
                      trade.pnlPercent >= 0 ? 'text-success' : 'text-danger'
                    )}
                  >
                    {formatPercent(trade.pnlPercent)}
                  </td>
                  <td className="py-3 text-center">
                    <Badge
                      variant={modeBadgeVariant[trade.mode]}
                      size="sm"
                    >
                      {modeLabel[trade.mode]}
                    </Badge>
                  </td>
                  <td className="py-3 text-right text-text-muted whitespace-nowrap">
                    {formatDate(trade.closedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
