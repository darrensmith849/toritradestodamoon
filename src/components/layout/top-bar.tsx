'use client'

import { Bell, Search } from 'lucide-react'
import { StatusDot } from '@/components/ui/status-dot'

export default function TopBar() {
  return (
    <header className="h-14 border-b border-border bg-bg-surface/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: Search placeholder */}
      <div className="flex items-center gap-2 text-text-muted">
        <Search className="w-4 h-4" />
        <span className="text-sm font-body">Search...</span>
      </div>

      {/* Right: Status + notifications */}
      <div className="flex items-center gap-5">
        {/* Automation status */}
        <div className="flex items-center gap-2">
          <StatusDot variant="active" pulse />
          <span className="text-sm text-text-secondary font-body">Simulate</span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-teal" />
        </button>
      </div>
    </header>
  )
}
