import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PLAN_TIERS } from '@/lib/constants'
import type { PlanTier } from '@/lib/types'

interface UpgradePromptProps {
  currentTier: PlanTier
  targetTier: PlanTier
  feature: string
}

export function UpgradePrompt({
  currentTier,
  targetTier,
  feature,
}: UpgradePromptProps) {
  const current = PLAN_TIERS[currentTier]
  const target = PLAN_TIERS[targetTier]

  return (
    <Card variant="elevated" className="max-w-md">
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-text-muted font-body">
            Unlock this feature
          </p>
          <h4 className="text-lg font-semibold text-text-primary font-heading">
            {feature}
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-xl bg-bg-subtle border border-border p-3 text-center">
            <Badge variant="neutral" size="sm">
              Current
            </Badge>
            <p className="mt-2 text-sm font-medium text-text-primary font-body">
              {current.name}
            </p>
            <p className="text-xs text-text-muted font-body">
              ${current.price}/mo
            </p>
          </div>

          <ArrowRight className="w-4 h-4 text-text-muted shrink-0" />

          <div className="flex-1 rounded-xl bg-teal-dim border border-teal/20 p-3 text-center">
            <Badge variant="teal" size="sm">
              Upgrade
            </Badge>
            <p className="mt-2 text-sm font-medium text-teal font-body">
              {target.name}
            </p>
            <p className="text-xs text-teal-muted font-body">
              ${target.price}/mo
            </p>
          </div>
        </div>

        <Button variant="primary" size="md" className="w-full">
          Upgrade to {target.name}
        </Button>
      </div>
    </Card>
  )
}
