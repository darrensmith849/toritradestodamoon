'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { PLAN_TIERS } from '@/lib/constants'

export default function RiskConfigPage() {
  const plan = PLAN_TIERS.tier2

  const [allocation, setAllocation] = useState(8)
  const [leverage, setLeverage] = useState(3)
  const [positions, setPositions] = useState(3)
  const [exposure, setExposure] = useState(30)

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Configure your risk profile
        </h2>
        <p className="text-text-secondary font-body">
          Set your limits. These are enforced on every trade.
        </p>
      </div>

      <div className="bg-bg-panel border border-border rounded-xl p-6 space-y-8 mb-10">
        <Slider
          label="Max allocation per trade"
          value={allocation}
          onChange={setAllocation}
          min={1}
          max={25}
          step={0.5}
          planLimit={plan.maxAllocation}
          suffix="%"
        />

        <Slider
          label="Max leverage"
          value={leverage}
          onChange={setLeverage}
          min={1}
          max={20}
          step={1}
          planLimit={plan.maxLeverage}
          suffix="x"
        />

        <Slider
          label="Max concurrent positions"
          value={positions}
          onChange={setPositions}
          min={1}
          max={15}
          step={1}
          planLimit={plan.maxConcurrentPositions}
        />

        <Slider
          label="Max portfolio exposure"
          value={exposure}
          onChange={setExposure}
          min={5}
          max={100}
          step={1}
          planLimit={plan.maxExposure}
          suffix="%"
        />
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" href="/connect-exchange">
          Back
        </Button>
        <Button variant="primary" href="/review">
          Continue
        </Button>
      </div>
    </div>
  )
}
