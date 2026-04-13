'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs } from '@/components/ui/tabs'
import { ProgressBar } from '@/components/ui/progress-bar'
import { mockPositions } from '@/data/mock-positions'
import { formatCurrency, formatPercent, formatLeverage, formatDate } from '@/lib/format'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'long', label: 'Long' },
  { id: 'short', label: 'Short' },
]

const planMaxPositions = 5

export default function PositionsPage() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered =
    activeTab === 'all'
      ? mockPositions
      : mockPositions.filter((p) => p.side === activeTab)

  const currentCount = mockPositions.length > planMaxPositions ? planMaxPositions : mockPositions.length
  const usagePercent = (currentCount / planMaxPositions) * 100

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-text-primary mb-1">
          Positions
        </h1>
      </div>

      {/* Plan limit banner */}
      <Card className="!py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary font-body">
            {currentCount} of {planMaxPositions} positions used
          </span>
          <span className="text-sm font-medium text-text-primary font-body">
            {Math.round(usagePercent)}%
          </span>
        </div>
        <ProgressBar value={usagePercent} />
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Table */}
      {filtered.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-muted font-body">
            No {activeTab} positions
          </p>
        </Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="text-text-muted text-xs border-b border-border">
                <th className="text-left pb-3 font-medium">Asset</th>
                <th className="text-left pb-3 font-medium">Side</th>
                <th className="text-right pb-3 font-medium">Leverage</th>
                <th className="text-right pb-3 font-medium">Entry Price</th>
                <th className="text-right pb-3 font-medium">Current Price</th>
                <th className="text-right pb-3 font-medium">Size</th>
                <th className="text-right pb-3 font-medium">P&amp;L ($)</th>
                <th className="text-right pb-3 font-medium">P&amp;L (%)</th>
                <th className="text-right pb-3 font-medium">Opened</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((pos) => (
                <tr key={pos.id} className="text-text-secondary">
                  <td className="py-3 text-text-primary font-medium">
                    {pos.asset}
                  </td>
                  <td className="py-3">
                    <Badge
                      variant={pos.side === 'long' ? 'success' : 'danger'}
                      size="sm"
                    >
                      {pos.side.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    {formatLeverage(pos.leverage)}
                  </td>
                  <td className="py-3 text-right">
                    {formatCurrency(pos.entryPrice)}
                  </td>
                  <td className="py-3 text-right">
                    {formatCurrency(pos.currentPrice)}
                  </td>
                  <td className="py-3 text-right">{pos.size}</td>
                  <td
                    className={cn(
                      'py-3 text-right font-medium',
                      pos.pnl >= 0 ? 'text-success' : 'text-danger'
                    )}
                  >
                    {formatCurrency(pos.pnl)}
                  </td>
                  <td
                    className={cn(
                      'py-3 text-right font-medium',
                      pos.pnlPercent >= 0 ? 'text-success' : 'text-danger'
                    )}
                  >
                    {formatPercent(pos.pnlPercent)}
                  </td>
                  <td className="py-3 text-right text-text-muted whitespace-nowrap">
                    {formatDate(pos.openedAt)}
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
