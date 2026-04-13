'use client'

import { SettingsNav } from './settings-nav'

interface SettingsLayoutProps {
  children: React.ReactNode
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
      {/* Left: Vertical nav */}
      <div className="w-full lg:w-56 shrink-0">
        <SettingsNav />
      </div>

      {/* Right: Page content */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
