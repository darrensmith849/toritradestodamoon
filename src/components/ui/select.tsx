import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
}

export function Select({
  label,
  options,
  value,
  onChange,
  className,
  disabled = false,
}: SelectProps) {
  const selectId = label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm text-text-secondary font-body mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            'w-full appearance-none bg-bg-subtle border border-border rounded-xl px-4 h-11 text-text-primary font-body text-sm',
            'focus:border-teal-ring focus:ring-1 focus:ring-teal-ring outline-none',
            'transition-colors duration-150',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'pr-10',
            className
          )}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
      </div>
    </div>
  )
}
