import { cn } from '@/lib/utils'

type StatusDotVariant = 'active' | 'warning' | 'inactive' | 'danger'

interface StatusDotProps {
  variant?: StatusDotVariant
  pulse?: boolean
  className?: string
}

const variantStyles: Record<StatusDotVariant, string> = {
  active: 'bg-success',
  warning: 'bg-warning',
  inactive: 'bg-text-muted',
  danger: 'bg-danger',
}

export function StatusDot({
  variant = 'active',
  pulse = false,
  className,
}: StatusDotProps) {
  return (
    <span className={cn('relative inline-flex', className)}>
      <span
        className={cn(
          'w-2 h-2 rounded-full',
          variantStyles[variant]
        )}
      />
      {pulse && variant === 'active' && (
        <span className="absolute inline-flex w-2 h-2 rounded-full bg-success opacity-75 animate-ping" />
      )}
    </span>
  )
}
