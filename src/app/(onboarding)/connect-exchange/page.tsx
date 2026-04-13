'use client'

import { useState } from 'react'
import { CheckCircle, Info } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ConnectExchangePage() {
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [connected, setConnected] = useState(false)

  function handleConnect() {
    setConnected(true)
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Connect your exchange
        </h2>
        <p className="text-text-secondary font-body">
          Your API keys are encrypted and never shared.
        </p>
      </div>

      <div className="bg-bg-panel border border-border rounded-xl p-6 mb-6">
        {/* Exchange header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#F0B90B]/10 flex items-center justify-center">
            <span className="text-[#F0B90B] font-bold text-sm font-heading">B</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary font-heading">
              Binance
            </h3>
            <p className="text-xs text-text-muted font-body">Spot & Futures</p>
          </div>
          {connected && (
            <CheckCircle className="w-5 h-5 text-success ml-auto" />
          )}
        </div>

        {connected ? (
          <div className="flex items-center gap-3 p-4 bg-success/5 border border-success/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-success shrink-0" />
            <div>
              <p className="text-sm font-medium text-success font-body">
                Exchange connected successfully
              </p>
              <p className="text-xs text-text-muted font-body mt-0.5">
                API key ending in ...{apiKey.slice(-4) || 'XXXX'}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-4">
              <Input
                label="API Key"
                type="text"
                placeholder="Enter your Binance API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Input
                label="API Secret"
                type="password"
                placeholder="Enter your Binance API secret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-2 p-3 bg-bg-subtle rounded-lg mb-5">
              <Info className="w-4 h-4 text-teal shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary font-body">
                Use read-only + trading permissions. Never enable withdrawal.
              </p>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={handleConnect}
            >
              Connect
            </Button>
          </>
        )}
      </div>

      {!connected && (
        <div className="text-center mb-8">
          <Button variant="ghost" href="/risk-config" className="text-text-muted">
            Skip for now
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button variant="ghost" href="/plan-selection">
          Back
        </Button>
        <Button variant="primary" href="/risk-config">
          Continue
        </Button>
      </div>
    </div>
  )
}
