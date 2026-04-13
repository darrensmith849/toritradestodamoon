'use client'

import { cn } from '@/lib/utils'

interface PillOption {
  id: string
  label: string
}

interface PillToggleProps {
  options: PillOption[]
  active: string
  onChange: (id: string) => void
}

export function PillToggle({ options, active, onChange }: PillToggleProps) {
  return (
    <div className="inline-flex items-center bg-bg-subtle rounded-full p-1">
      {options.map((opt) => {
        const isActive = opt.id === active
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              'px-4 py-1.5 text-sm font-medium font-body rounded-full transition-all duration-150',
              isActive
                ? 'bg-teal text-bg-base'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
