'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusDot } from '@/components/ui/status-dot'
import { mockEquity } from '@/data/mock-equity'
import { mockPositions } from '@/data/mock-positions'
import { mockTrades } from '@/data/mock-trades'
import { mockRiskUsage } from '@/data/mock-risk'
import { formatCurrency, formatPercent } from '@/lib/format'
import { getUsagePercent, getUsageBarColor } from '@/lib/plan-limits'
import { cn } from '@/lib/utils'

const displayPositions = mockPositions.slice(0, 5)
const displayTrades = mockTrades.slice(0, 5)

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-surface border border-border rounded-lg px-3 py-2 shadow-card">
        <p className="text-sm font-medium text-text-primary font-body">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const riskMeters = [
    {
      label: 'Allocation',
      used: mockRiskUsage.allocation.used,
      limit: mockRiskUsage.allocation.limit,
      suffix: '%',
    },
    {
      label: 'Leverage',
      used: mockRiskUsage.leverage.used,
      limit: mockRiskUsage.leverage.limit,
      suffix: 'x',
    },
    {
      label: 'Positions',
      used: mockRiskUsage.concurrent.used,
      limit: mockRiskUsage.concurrent.limit,
      suffix: '',
    },
    {
      label: 'Exposure',
      used: mockRiskUsage.exposure.used,
      limit: mockRiskUsage.exposure.limit,
      suffix: '%',
    },
    {
      label: 'Entries (24h)',
      used: mockRiskUsage.entries24h.used,
      limit: mockRiskUsage.entries24h.limit,
      suffix: '',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Row 1: Equity + PnL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equity Chart (spans 2) */}
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-text-muted font-body mb-1">
                Portfolio Value
              </p>
              <p className="text-3xl font-bold text-text-primary font-heading">
                $11,847.32
              </p>
            </div>
            <Badge variant="success">+18.5% all time</Badge>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockEquity}>
                <defs>
                  <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="rgb(89, 218, 221)"
                      stopOpacity={0.15}
                    />
                    <stop
                      offset="95%"
                      stopColor="rgb(89, 218, 221)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'rgb(100, 116, 139)' }}
                  tickFormatter={(val: string) => {
                    const d = new Date(val)
                    return `${d.getMonth() + 1}/${d.getDate()}`
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'rgb(100, 116, 139)' }}
                  tickFormatter={(val: number) => `$${(val / 1000).toFixed(1)}k`}
                  domain={['dataMin - 200', 'dataMax + 200']}
                  width={55}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="equity"
                  stroke="rgb(89, 218, 221)"
                  strokeWidth={2}
                  fill="url(#tealGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* PnL Card */}
        <Card>
          <p className="text-sm text-text-muted font-body mb-1">
            Today&apos;s P&amp;L
          </p>
          <p className="text-3xl font-bold text-success font-heading mb-4">
            +$234.50
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary font-body">Win Rate</span>
              <span className="text-sm font-medium text-text-primary font-body">
                68%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary font-body">
                Avg Trade
              </span>
              <span className="text-sm font-medium text-success font-body">
                +2.3%
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2: Automation + Account */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automation Status */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-muted font-body">Automation Status</p>
            <Badge variant="teal">Simulate</Badge>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <StatusDot variant="active" pulse />
            <span className="text-sm font-medium text-text-primary font-body">
              Active
            </span>
          </div>
          <p className="text-xs text-text-muted font-body mb-2">
            Running for 4h 23m
          </p>
          <p className="text-xs text-text-secondary font-body">
            Last action: Opened SOL long at $168.40
          </p>
        </Card>

        {/* Account Card */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-muted font-body">Exchange</p>
            <div className="flex items-center gap-2">
              <StatusDot variant="active" />
              <span className="text-sm text-success font-body">Connected</span>
            </div>
          </div>
          <p className="text-lg font-bold text-text-primary font-heading mb-1">
            Binance
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-text-secondary font-body">Balance</span>
            <span className="text-sm font-medium text-text-primary font-body">
              $11,847.32
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-text-secondary font-body">Plan</span>
            <Badge variant="teal">Pro</Badge>
          </div>
        </Card>
      </div>

      {/* Row 3: Risk Usage Meters */}
      <Card>
        <p className="text-sm text-text-muted font-body mb-5">Risk Usage</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {riskMeters.map((meter) => {
            const percent = getUsagePercent(meter.used, meter.limit)
            const barColor = getUsageBarColor(percent)

            return (
              <div key={meter.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-text-secondary font-body">
                    {meter.label}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-bg-subtle overflow-hidden mb-1.5">
                  <div
                    className={cn('h-full rounded-full transition-all duration-300', barColor)}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-xs font-medium text-text-primary font-body">
                  {meter.used}{meter.suffix} / {meter.limit}{meter.suffix}
                </p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Row 4: Positions + Recent Trades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Positions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-text-primary font-body">
                Open Positions
              </p>
              <Badge variant="neutral" size="sm">
                {displayPositions.length}
              </Badge>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="text-text-muted text-xs">
                  <th className="text-left pb-3 font-medium">Asset</th>
                  <th className="text-left pb-3 font-medium">Side</th>
                  <th className="text-right pb-3 font-medium">Entry</th>
                  <th className="text-right pb-3 font-medium">Current</th>
                  <th className="text-right pb-3 font-medium">Size</th>
                  <th className="text-right pb-3 font-medium">P&amp;L</th>
                  <th className="text-right pb-3 font-medium">P&amp;L %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {displayPositions.map((pos) => (
                  <tr key={pos.id} className="text-text-secondary">
                    <td className="py-2.5 text-text-primary font-medium">
                      {pos.asset}
                    </td>
                    <td className="py-2.5">
                      <Badge
                        variant={pos.side === 'long' ? 'success' : 'danger'}
                        size="sm"
                      >
                        {pos.side.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-right">{formatCurrency(pos.entryPrice)}</td>
                    <td className="py-2.5 text-right">{formatCurrency(pos.currentPrice)}</td>
                    <td className="py-2.5 text-right">{pos.size}</td>
                    <td
                      className={cn(
                        'py-2.5 text-right font-medium',
                        pos.pnl >= 0 ? 'text-success' : 'text-danger'
                      )}
                    >
                      {formatCurrency(pos.pnl)}
                    </td>
                    <td
                      className={cn(
                        'py-2.5 text-right font-medium',
                        pos.pnlPercent >= 0 ? 'text-success' : 'text-danger'
                      )}
                    >
                      {formatPercent(pos.pnlPercent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Trades */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-text-primary font-body">
              Recent Trades
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="text-text-muted text-xs">
                  <th className="text-left pb-3 font-medium">Asset</th>
                  <th className="text-left pb-3 font-medium">Side</th>
                  <th className="text-right pb-3 font-medium">Entry</th>
                  <th className="text-right pb-3 font-medium">Exit</th>
                  <th className="text-right pb-3 font-medium">P&amp;L</th>
                  <th className="text-right pb-3 font-medium">Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {displayTrades.map((trade) => (
                  <tr key={trade.id} className="text-text-secondary">
                    <td className="py-2.5 text-text-primary font-medium">
                      {trade.asset}
                    </td>
                    <td className="py-2.5">
                      <Badge
                        variant={trade.side === 'long' ? 'success' : 'danger'}
                        size="sm"
                      >
                        {trade.side.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-right">
                      {formatCurrency(trade.entryPrice)}
                    </td>
                    <td className="py-2.5 text-right">
                      {formatCurrency(trade.exitPrice)}
                    </td>
                    <td
                      className={cn(
                        'py-2.5 text-right font-medium',
                        trade.pnl >= 0 ? 'text-success' : 'text-danger'
                      )}
                    >
                      {formatCurrency(trade.pnl)}
                    </td>
                    <td className="py-2.5 text-right">
                      <Badge variant="neutral" size="sm">
                        {trade.mode === 'auto-execute'
                          ? 'Auto'
                          : trade.mode === 'simulate'
                          ? 'Sim'
                          : 'Obs'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
