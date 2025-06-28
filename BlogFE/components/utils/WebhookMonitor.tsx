import React from 'react'
import Link from 'next/link'
import WebhooksPage from '~/pages/webhooks'

const WebhookMonitor: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Webhook Monitor
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Monitor and inspect incoming webhooks from GitHub, Stripe, and custom sources in
            real-time
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/webhooks"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-medium text-center"
          >
            Open Webhook Monitor
          </Link>
          <Link
            href="/webhook-demo"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors font-medium text-center"
          >
            View Demo
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">GitHub</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Push events, pull requests</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Stripe</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Payment events, subscriptions
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Custom</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Any webhook format</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Endpoint URL:
          </h3>
          <code className="text-xs bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-blue-800 dark:text-blue-200 break-all">
            {typeof window !== 'undefined' ? window.location.origin : 'localhost'}/api/receive-hook
          </code>
        </div>
      </div>
    </div>
  )
}

export default WebhookMonitor
