'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Toggle } from '@/components/ui/toggle'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { useAutomationContext } from '@/contexts/automation-context'
import { usePlanContext } from '@/contexts/plan-context'
import { getPlanLimits, isTierSufficient } from '@/lib/plan-limits'
import { PLAN_TIERS } from '@/lib/constants'
import { mockAssets } from '@/data/mock-assets'
import { cn } from '@/lib/utils'
import type { AutomationMode, Asset } from '@/lib/types'
import {
  Eye,
  FlaskConical,
  Zap,
  Lock,
  AlertTriangle,
  OctagonX,
  Pause,
} from 'lucide-react'

const MODE_OPTIONS: {
  value: AutomationMode
  label: string
  icon: React.ReactNode
  description: string
  requiredTier?: 'tier2' | 'tier3'
}[] = [
  {
    value: 'observe',
    label: 'Observe',
    icon: <Eye className="w-4 h-4" />,
    description:
      'Monitor the market and generate trade signals without taking any action. Ideal for learning how the system works.',
  },
  {
    value: 'simulate',
    label: 'Simulate',
    icon: <FlaskConical className="w-4 h-4" />,
    description:
      'Execute paper trades based on signals. Positions are tracked virtually with no real capital at risk.',
  },
  {
    value: 'auto-execute',
    label: 'Auto-Execute',
    icon: <Zap className="w-4 h-4" />,
    description:
      'Automatically execute real trades on your connected exchange. All risk controls are enforced on every order.',
    requiredTier: 'tier2',
  },
]

export default function AutomationPage() {
  const { mode, setMode, isActive, toggleActive } = useAutomationContext()
  const { tier } = usePlanContext()
  const limits = getPlanLimits(tier)

  const [allocation, setAllocation] = useState(8)
  const [leverage, setLeverage] = useState(3)
  const [concurrent, setConcurrent] = useState(3)
  const [exposure, setExposure] = useState(30)
  const [entries, setEntries] = useState(5)

  const [showUpgradeMessage, setShowUpgradeMessage] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const [enabledAssets, setEnabledAssets] = useState<Record<string, boolean>>(
    () => {
      const map: Record<string, boolean> = {}
      mockAssets.forEach((a) => {
        map[a.symbol] = a.enabled && isTierSufficient(tier, a.tierRequired)
      })
      return map
    }
  )

  const enabledCount = Object.values(enabledAssets).filter(Boolean).length
  const assetLimit = limits.assetCount === 'unlimited' ? mockAssets.length : limits.assetCount

  function handleModeChange(newMode: AutomationMode) {
    const option = MODE_OPTIONS.find((o) => o.value === newMode)
    if (option?.requiredTier && !isTierSufficient(tier, option.requiredTier)) {
      setShowUpgradeMessage(true)
      setTimeout(() => setShowUpgradeMessage(false), 3000)
      return
    }
    setMode(newMode)
  }

  function toggleAsset(symbol: string) {
    setEnabledAssets((prev) => {
      const isCurrentlyEnabled = prev[symbol]
      if (!isCurrentlyEnabled && enabledCount >= assetLimit) return prev
      return { ...prev, [symbol]: !isCurrentlyEnabled }
    })
  }

  const currentModeOption = MODE_OPTIONS.find((o) => o.value === mode)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Mode Section */}
      <Card>
        <h2 className="text-lg font-semibold text-text-primary font-heading mb-4">
          Automation Mode
        </h2>

        {/* Segmented control */}
        <div className="inline-flex items-center rounded-xl bg-bg-subtle p-1 gap-1">
          {MODE_OPTIONS.map((option) => {
            const isActive = mode === option.value
            const isLocked =
              option.requiredTier && !isTierSufficient(tier, option.requiredTier)

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleModeChange(option.value)}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium font-body transition-all duration-150',
                  isActive
                    ? 'bg-teal text-bg-base shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {option.icon}
                {option.label}
                {isLocked && <Lock className="w-3.5 h-3.5 ml-1 opacity-60" />}
              </button>
            )
          })}
        </div>

        {/* Upgrade message */}
        {showUpgradeMessage && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-warning/10 border border-warning/20 px-4 py-3">
            <Lock className="w-4 h-4 text-warning shrink-0" />
            <p className="text-sm text-warning font-body">
              Auto-Execute requires the{' '}
              <span className="font-semibold">{PLAN_TIERS.tier2.name}</span> plan
              or higher.{' '}
              <button className="underline font-semibold hover:brightness-110">
                Upgrade now
              </button>
            </p>
          </div>
        )}

        {/* Mode description */}
        <p className="mt-4 text-sm text-text-secondary font-body">
          {currentModeOption?.description}
        </p>

        {/* Master toggle */}
        <div className="mt-5 flex items-center justify-between rounded-xl bg-bg-subtle px-4 py-3">
          <span className="text-sm font-medium text-text-primary font-body">
            Automation Active
          </span>
          <Toggle checked={isActive} onChange={toggleActive} />
        </div>
      </Card>

      {/* Risk Controls Section */}
      <Card>
        <h2 className="text-lg font-semibold text-text-primary font-heading mb-1">
          Risk Controls
        </h2>
        <p className="text-sm text-text-muted font-body mb-6">
          These limits are enforced on every trade. Your plan defines the maximum.
        </p>

        <div className="space-y-8">
          {/* Max Allocation per Trade */}
          <div>
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
            {allocation >= limits.maxAllocation && (
              <p className="mt-1 text-xs text-warning font-body">At plan limit</p>
            )}
          </div>

          {/* Max Leverage */}
          <div>
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
            {leverage >= limits.maxLeverage && (
              <p className="mt-1 text-xs text-warning font-body">At plan limit</p>
            )}
          </div>

          {/* Max Concurrent Positions */}
          <div>
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
            {concurrent >= limits.maxConcurrentPositions && (
              <p className="mt-1 text-xs text-warning font-body">At plan limit</p>
            )}
          </div>

          {/* Max Portfolio Exposure */}
          <div>
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
            {exposure >= limits.maxExposure && (
              <p className="mt-1 text-xs text-warning font-body">At plan limit</p>
            )}
          </div>

          {/* Max Entries per 24h */}
          <div>
            <Slider
              label="Max Entries per 24h"
              value={entries}
              onChange={setEntries}
              min={1}
              max={30}
              step={1}
              planLimit={limits.maxEntriesPer24h}
              suffix=""
            />
            {entries >= limits.maxEntriesPer24h && (
              <p className="mt-1 text-xs text-warning font-body">At plan limit</p>
            )}
          </div>
        </div>
      </Card>

      {/* Asset Selection Section */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary font-heading">
            Enabled Assets
          </h2>
          <span className="text-sm text-text-secondary font-body">
            {enabledCount}/{limits.assetCount === 'unlimited' ? '\u221E' : limits.assetCount} assets
            selected
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {mockAssets.map((asset: Asset) => {
            const isAccessible = isTierSufficient(tier, asset.tierRequired)
            const isEnabled = enabledAssets[asset.symbol] ?? false
            const requiredTierName = PLAN_TIERS[asset.tierRequired].name

            return (
              <div
                key={asset.symbol}
                className={cn(
                  'flex items-center justify-between rounded-xl border px-4 py-3 transition-colors duration-150',
                  isAccessible
                    ? 'border-border bg-bg-subtle hover:border-border-accent'
                    : 'border-border/50 bg-bg-subtle/50 opacity-60'
                )}
              >
                <div className="min-w-0">
                  <p
                    className={cn(
                      'text-sm font-semibold font-body',
                      isAccessible ? 'text-text-primary' : 'text-text-muted'
                    )}
                  >
                    {asset.symbol}
                  </p>
                  <p className="text-xs text-text-muted font-body truncate">
                    {asset.name}
                  </p>
                  {!isAccessible && (
                    <div className="flex items-center gap-1 mt-1">
                      <Lock className="w-3 h-3 text-text-muted" />
                      <span className="text-xs text-text-muted font-body">
                        {requiredTierName}
                      </span>
                    </div>
                  )}
                </div>
                <Toggle
                  checked={isEnabled}
                  onChange={() => toggleAsset(asset.symbol)}
                  disabled={!isAccessible}
                />
              </div>
            )
          })}
        </div>
      </Card>

      {/* Emergency Controls Section */}
      <Card className="bg-danger/5 border-danger/20">
        <h2 className="text-lg font-semibold text-danger font-heading mb-4">
          Emergency Controls
        </h2>

        <div className="space-y-4">
          {/* Pause All Trading */}
          <div className="flex items-center justify-between rounded-xl bg-bg-base/50 px-4 py-3 border border-danger/10">
            <div className="flex items-center gap-3">
              <Pause className="w-5 h-5 text-danger" />
              <span className="text-sm font-medium text-text-primary font-body">
                Pause All Trading
              </span>
            </div>
            <Toggle checked={isPaused} onChange={setIsPaused} />
          </div>

          {/* Emergency Kill Switch */}
          <div className="space-y-3">
            <Button
              variant="danger"
              size="lg"
              className="w-full"
              leftIcon={<OctagonX className="w-5 h-5" />}
            >
              Emergency Kill Switch
            </Button>
            <div className="flex items-start gap-2 px-1">
              <AlertTriangle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
              <p className="text-xs text-danger/80 font-body">
                This will immediately close all open positions and halt automation.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
