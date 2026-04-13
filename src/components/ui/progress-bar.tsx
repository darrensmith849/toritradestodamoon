import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  label?: string
  showLabel?: boolean
  className?: string
}

function getBarColor(percent: number): string {
  if (percent >= 90) return 'bg-danger'
  if (percent >= 70) return 'bg-warning'
  return 'bg-teal'
}

export function ProgressBar({
  value,
  label,
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div className={cn('w-full', className)}>
      {(label || showLabel) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-sm text-text-secondary font-body">{label}</span>
          )}
          {showLabel && (
            <span className="text-sm font-medium text-text-primary font-body">
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 rounded-full bg-bg-subtle overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-300', getBarColor(clamped))}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
