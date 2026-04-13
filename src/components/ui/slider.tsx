'use client'

import { cn } from '@/lib/utils'
import { Lock } from 'lucide-react'

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  planLimit?: number
  label?: string
  suffix?: string
  disabled?: boolean
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  planLimit,
  label,
  suffix = '',
  disabled = false,
}: SliderProps) {
  const effectiveMax = planLimit !== undefined && planLimit < max ? planLimit : max
  const fillPercent = ((value - min) / (max - min)) * 100
  const limitPercent =
    planLimit !== undefined ? ((planLimit - min) / (max - min)) * 100 : 100

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = parseFloat(e.target.value)
    const clamped = Math.min(raw, effectiveMax)
    onChange(clamped)
  }

  return (
    <div className={cn('w-full', disabled && 'opacity-50 pointer-events-none')}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary font-body">{label}</span>
          <span className="text-sm font-medium text-text-primary font-body">
            {value}
            {suffix}
          </span>
        </div>
      )}

      <div className="relative w-full h-2">
        {/* Background track */}
        <div className="absolute inset-0 rounded-full bg-bg-subtle" />

        {/* Filled portion */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-teal"
          style={{ width: `${fillPercent}%` }}
        />

        {/* Locked zone */}
        {planLimit !== undefined && planLimit < max && (
          <div
            className="absolute inset-y-0 right-0 rounded-r-full bg-bg-hover/60"
            style={{ left: `${limitPercent}%` }}
          >
            <div className="absolute -top-6 right-0 flex items-center gap-1 text-xs text-text-muted">
              <Lock className="w-3 h-3" />
              <span>Locked</span>
            </div>
          </div>
        )}

        {/* Native range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-text-muted font-body">
          {min}
          {suffix}
        </span>
        <span className="text-xs text-text-muted font-body">
          {max}
          {suffix}
        </span>
      </div>
    </div>
  )
}
