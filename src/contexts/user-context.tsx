'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import type { User } from '@/lib/types'

interface UserContextValue {
  user: User
  setUser: (user: User) => void
}

const defaultUser: User = {
  id: 'usr_demo_001',
  email: 'demo@toritrades.com',
  name: 'Demo Trader',
  tier: 'tier2',
  automationMode: 'simulate',
  exchangeConnected: true,
  accountType: 'live',
  automationActive: true,
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User>(defaultUser)

  const setUser = useCallback((u: User) => {
    setUserState(u)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext(): UserContextValue {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return ctx
}
