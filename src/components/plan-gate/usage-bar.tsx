import { cn } from '@/lib/utils'
import { getUsagePercent, getUsageBarColor } from '@/lib/plan-limits'

interface UsageBarProps {
  used: number
  limit: number | 'unlimited'
  label: string
  unit?: string
}

export function UsageBar({ used, limit, label, unit = '' }: UsageBarProps) {
  const isUnlimited = limit === 'unlimited'
  const percent = isUnlimited ? 0 : getUsagePercent(used, limit as number)
  const barColor = isUnlimited ? 'bg-teal' : getUsageBarColor(percent)

  const displayLimit = isUnlimited ? '\u221E' : `${limit}${unit}`
  const displayUsed = `${used}${unit}`

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary font-body">{label}</span>
        <span className="text-sm font-medium text-text-primary font-body">
          {displayUsed}/{displayLimit}
        </span>
      </div>
      <div className="h-2 rounded-full bg-bg-subtle overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-300', barColor)}
          style={{ width: isUnlimited ? '15%' : `${percent}%` }}
        />
      </div>
    </div>
  )
}
