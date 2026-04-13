'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { SettingsLayout } from '@/components/settings/settings-layout'

export default function AccountPage() {
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          Account
        </h1>

        {/* Profile Section */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary font-heading mb-4">
            Profile
          </h2>
          <div className="space-y-4">
            <Input
              label="Full Name"
              value="Demo Trader"
              readOnly
              className="cursor-default"
            />
            <Input
              label="Email"
              type="email"
              value="demo@toritrades.com"
              readOnly
              className="cursor-default"
            />
          </div>
        </Card>

        {/* Security Section */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary font-heading mb-4">
            Security
          </h2>
          <div className="space-y-4">
            {/* Password row */}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-text-primary font-body">
                  Password
                </p>
                <p className="text-xs text-text-muted font-body">
                  Last changed 30 days ago
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Change password
              </Button>
            </div>

            {/* Two-Factor Authentication row */}
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div>
                <p className="text-sm font-medium text-text-primary font-body">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-text-muted font-body">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Toggle checked={twoFactor} onChange={setTwoFactor} />
            </div>
          </div>
        </Card>
      </div>
    </SettingsLayout>
  )
}
