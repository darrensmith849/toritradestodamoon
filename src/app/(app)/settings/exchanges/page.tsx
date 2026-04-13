'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusDot } from '@/components/ui/status-dot'
import { Select } from '@/components/ui/select'
import { PlanGate } from '@/components/plan-gate/plan-gate'
import { SettingsLayout } from '@/components/settings/settings-layout'
import { usePlanContext } from '@/contexts/plan-context'
import { formatCurrency } from '@/lib/format'
import { connectedExchange } from '@/data/mock-exchange'
import { Link2, Plus } from 'lucide-react'

const EXCHANGE_OPTIONS = [
  { value: '', label: 'Select exchange...' },
  { value: 'coinbase', label: 'Coinbase' },
  { value: 'kraken', label: 'Kraken' },
  { value: 'okx', label: 'OKX' },
  { value: 'kucoin', label: 'KuCoin' },
]

export default function ExchangesPage() {
  usePlanContext()
  const [selectedExchange, setSelectedExchange] = useState('')

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          Exchange Connections
        </h1>

        {/* Connected exchange card */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-bg-subtle">
                <Link2 className="w-5 h-5 text-teal" />
              </div>
              <div>
                <p className="text-base font-semibold text-text-primary font-heading">
                  {connectedExchange.exchange}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <StatusDot variant="active" pulse />
                  <span className="text-xs text-success font-body">Connected</span>
                </div>
              </div>
            </div>
            <Badge variant="success" size="sm">
              Active
            </Badge>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary font-body">API Key</span>
              <span className="text-sm font-mono text-text-primary font-body">
                {connectedExchange.apiKeyPreview}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary font-body">
                Last synced
              </span>
              <span className="text-sm text-text-primary font-body">
                2 minutes ago
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary font-body">Balance</span>
              <span className="text-sm font-medium text-text-primary font-body">
                {formatCurrency(connectedExchange.balance)}
              </span>
            </div>
          </div>

          <Button variant="danger" size="sm">
            Disconnect
          </Button>
        </Card>

        {/* Add exchange card */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Plus className="w-5 h-5 text-text-muted" />
            <h2 className="text-base font-semibold text-text-primary font-heading">
              Connect another exchange
            </h2>
          </div>

          <PlanGate requiredTier="tier3">
            <div className="space-y-4">
              <Select
                label="Exchange"
                options={EXCHANGE_OPTIONS}
                value={selectedExchange}
                onChange={setSelectedExchange}
              />
              <Button
                variant="primary"
                size="md"
                disabled={!selectedExchange}
                leftIcon={<Link2 className="w-4 h-4" />}
              >
                Connect Exchange
              </Button>
            </div>
          </PlanGate>
        </Card>
      </div>
    </SettingsLayout>
  )
}
