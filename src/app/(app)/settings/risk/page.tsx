'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { SettingsLayout } from '@/components/settings/settings-layout'
import { usePlanContext } from '@/contexts/plan-context'
import { getPlanLimits, getUsagePercent, getUsageBarColor } from '@/lib/plan-limits'
import { mockRiskUsage } from '@/data/mock-risk'
import { cn } from '@/lib/utils'

export default function RiskPage() {
  const { tier } = usePlanContext()
  const limits = getPlanLimits(tier)

  const [maxDrawdown, setMaxDrawdown] = useState(15)
  const [autoPauseThreshold, setAutoPauseThreshold] = useState('5')

  const [allocation, setAllocation] = useState(8)
  const [leverage, setLeverage] = useState(3)
  const [exposure, setExposure] = useState(30)
  const [entriesPer24h, setEntriesPer24h] = useState(5)
  const [concurrent, setConcurrent] = useState(3)

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
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          Risk Management
        </h1>

        {/* Global Risk Preferences */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary font-heading mb-1">
            Global Risk Preferences
          </h2>
          <p className="text-sm text-text-muted font-body mb-6">
            Set your personal risk thresholds. These apply across all automation modes.
          </p>

          <div className="space-y-8">
            <Slider
              label="Max Allocation per Trade"
              value={allocation}
              onChange={setAllocation}
              min={1}
              max={25}
              step={0.5}
              planLimit={limits.maxAllocation}
              suffix="%"
            />

            <Slider
              label="Max Leverage"
              value={leverage}
              onChange={setLeverage}
              min={1}
              max={20}
              step={1}
              planLimit={limits.maxLeverage}
              suffix="x"
            />

            <Slider
              label="Max Concurrent Positions"
              value={concurrent}
              onChange={setConcurrent}
              min={1}
              max={15}
              step={1}
              planLimit={limits.maxConcurrentPositions}
              suffix=""
            />

            <Slider
              label="Max Portfolio Exposure"
              value={exposure}
              onChange={setExposure}
              min={5}
              max={100}
              step={5}
              planLimit={limits.maxExposure}
              suffix="%"
            />

            <Slider
              label="Max Entries per 24h"
              value={entriesPer24h}
              onChange={setEntriesPer24h}
              min={1}
              max={30}
              step={1}
              planLimit={limits.maxEntriesPer24h}
              suffix=""
            />

            <Slider
              label="Max Drawdown Threshold"
              value={maxDrawdown}
              onChange={setMaxDrawdown}
              min={5}
              max={50}
              step={1}
              suffix="%"
            />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-text-secondary font-body">
                  Pause automation if daily loss exceeds
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <Input
                    value={autoPauseThreshold}
                    onChange={(e) => setAutoPauseThreshold(e.target.value)}
                    type="number"
                    min={1}
                    max={50}
                  />
                </div>
                <span className="text-sm text-text-secondary font-body">%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Current Risk Status */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary font-heading mb-5">
            Current Risk Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      className={cn(
                        'h-full rounded-full transition-all duration-300',
                        barColor
                      )}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="text-xs font-medium text-text-primary font-body">
                    {meter.used}
                    {meter.suffix} / {meter.limit}
                    {meter.suffix}
                  </p>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </SettingsLayout>
  )
}
