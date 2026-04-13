'use client'

import { PlanProvider } from './plan-context'
import { UserProvider } from './user-context'
import { AutomationProvider } from './automation-context'
import { TierSwitchPanel } from '@/hooks/use-tier-switch'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlanProvider>
      <UserProvider>
        <AutomationProvider>
          {children}
          <TierSwitchPanel />
        </AutomationProvider>
      </UserProvider>
    </PlanProvider>
  )
}
