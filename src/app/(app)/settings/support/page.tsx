'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { SettingsLayout } from '@/components/settings/settings-layout'
import { cn } from '@/lib/utils'
import { Send, ChevronDown } from 'lucide-react'

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

interface FaqItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I connect my exchange?',
    answer:
      'Navigate to Settings > Exchanges and click "Connect another exchange." Select your exchange from the dropdown, then enter your API key and secret. Make sure to enable trading permissions on your exchange API settings.',
  },
  {
    question: 'Can I change my plan at any time?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time from Settings > Billing. When upgrading, the new limits take effect immediately. When downgrading, changes apply at the start of your next billing cycle.',
  },
  {
    question: 'What happens if I hit my risk limits?',
    answer:
      'When any risk limit is reached, the automation engine will stop opening new positions until the limit is no longer exceeded. Existing positions are not affected. You will receive a notification when a limit is hit.',
  },
  {
    question: 'How do I enable Auto-Execute mode?',
    answer:
      'Auto-Execute mode is available on the Pro plan and above. Go to the Automation page and select "Auto-Execute" from the mode selector. You must have a connected exchange with sufficient balance.',
  },
  {
    question: 'Where can I see my trade history?',
    answer:
      'Your complete trade history is available on the Trades page, accessible from the sidebar navigation. You can filter by date range, asset, side, and mode. Each trade shows entry/exit prices, P&L, and the automation mode used.',
  },
]

export default function SupportPage() {
  const [subject, setSubject] = useState('')
  const [priority, setPriority] = useState('medium')
  const [description, setDescription] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function toggleFaq(index: number) {
    setOpenFaq((prev) => (prev === index ? null : index))
  }

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          Support
        </h1>

        {/* Contact Form */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary font-heading mb-4">
            Contact Us
          </h2>

          <div className="space-y-4">
            <Input
              label="Subject"
              placeholder="Brief description of your issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <Select
              label="Priority"
              options={PRIORITY_OPTIONS}
              value={priority}
              onChange={setPriority}
            />

            <div className="w-full">
              <label
                htmlFor="support-description"
                className="block text-sm text-text-secondary font-body mb-1.5"
              >
                Description
              </label>
              <textarea
                id="support-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your issue in detail..."
                rows={5}
                className={cn(
                  'w-full bg-bg-subtle border border-border rounded-xl px-4 py-3 text-text-primary font-body text-sm',
                  'placeholder:text-text-muted',
                  'focus:border-teal-ring focus:ring-1 focus:ring-teal-ring outline-none',
                  'transition-colors duration-150 resize-none'
                )}
              />
            </div>

            <Button
              variant="primary"
              size="md"
              leftIcon={<Send className="w-4 h-4" />}
              disabled={!subject.trim() || !description.trim()}
            >
              Send message
            </Button>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary font-heading mb-4">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-border">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index

              return (
                <div key={index} className="py-3 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <span className="text-sm font-medium text-text-primary font-body pr-4 group-hover:text-teal transition-colors">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-text-muted shrink-0 transition-transform duration-200',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-sm text-text-secondary font-body leading-relaxed">
                      {item.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </SettingsLayout>
  )
}
