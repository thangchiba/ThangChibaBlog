import { useState } from 'react'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/outline'

export default function WebhookInfo() {
  const [copied, setCopied] = useState(false)
  const webhookUrl = `${
    typeof window !== 'undefined' ? window.location.origin : ''
  }/api/receive-hook`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const examples = [
    {
      name: 'GitHub',
      description: 'GitHub webhook payload',
      headers: {
        'Content-Type': 'application/json',
        'X-GitHub-Event': 'push',
        'X-GitHub-Delivery': 'example-delivery-id',
      },
      body: {
        ref: 'refs/heads/main',
        repository: {
          name: 'example-repo',
          full_name: 'user/example-repo',
        },
        commits: [
          {
            id: 'abc123',
            message: 'Update README',
            author: {
              name: 'John Doe',
              email: 'john@example.com',
            },
          },
        ],
      },
    },
    {
      name: 'Stripe',
      description: 'Stripe payment webhook',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': 't=1234567890,v1=example-signature',
      },
      body: {
        id: 'evt_1234567890',
        object: 'event',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_1234567890',
            amount: 2000,
            currency: 'usd',
            status: 'succeeded',
          },
        },
      },
    },
    {
      name: 'Discord',
      description: 'Discord bot webhook',
      headers: {
        'Content-Type': 'application/json',
        'X-Discord-Signature': 'discord-signature',
      },
      body: {
        type: 1,
        token: 'discord-token',
        member: {
          user: {
            id: '123456789',
            username: 'testuser',
          },
        },
        data: {
          name: 'ping',
        },
      },
    },
    {
      name: 'Slack',
      description: 'Slack app webhook',
      headers: {
        'Content-Type': 'application/json',
        'X-Slack-Signature': 'slack-signature',
      },
      body: {
        token: 'slack-token',
        team_id: 'T123456',
        api_app_id: 'A123456',
        event: {
          type: 'message',
          user: 'U123456',
          text: 'Hello world',
          ts: '1234567890.123456',
        },
      },
    },
    {
      name: 'Shopify',
      description: 'Shopify webhook',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Shop-Domain': 'example.myshopify.com',
        'X-Shopify-Hmac-Sha256': 'shopify-hmac',
      },
      body: {
        id: 123456789,
        email: 'customer@example.com',
        created_at: '2024-01-01T12:00:00Z',
        total_price: '29.99',
        currency: 'USD',
        line_items: [
          {
            id: 123456,
            title: 'Example Product',
            quantity: 1,
            price: '29.99',
          },
        ],
      },
    },
    {
      name: 'Custom',
      description: 'Custom webhook payload',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': 'custom-signature',
      },
      body: {
        event: 'user.created',
        timestamp: '2024-01-01T00:00:00Z',
        data: {
          userId: '12345',
          email: 'user@example.com',
          name: 'John Doe',
        },
      },
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Webhook Endpoint
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Use this endpoint to send webhooks. All incoming webhooks will be stored and can be viewed
          on this page.
        </p>

        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <code className="flex-1 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {webhookUrl}
          </code>
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <ClipboardIcon className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
          Usage Examples
        </h3>
        <div className="space-y-4">
          {examples.map((example, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{example.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{example.description}</p>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Headers:
                  </h5>
                  <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto text-gray-800 dark:text-gray-200">
                    {JSON.stringify(example.headers, null, 2)}
                  </pre>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Body:
                  </h5>
                  <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto text-gray-800 dark:text-gray-200">
                    {JSON.stringify(example.body, null, 2)}
                  </pre>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <strong>cURL example:</strong>
                  <br />
                  <code className="block mt-1 p-2 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                    curl -X POST {webhookUrl} \
                    <br />
                    &nbsp;&nbsp;-H "Content-Type: application/json" \
                    <br />
                    &nbsp;&nbsp;-d '{JSON.stringify(example.body)}'
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Features</h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Automatic source detection (GitHub, Stripe, etc.)</li>
          <li>• IP address and User-Agent tracking</li>
          <li>• Full request headers and body storage</li>
          <li>• Real-time webhook monitoring</li>
          <li>• Filter by webhook source</li>
          <li>• Pagination support</li>
        </ul>
      </div>
    </div>
  )
}
