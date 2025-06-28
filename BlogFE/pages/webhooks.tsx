import { useState, useEffect } from 'react'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  RefreshIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/outline'
import WebhookInfo from '../components/WebhookInfo'

interface Webhook {
  id: string
  method: string
  headers: string
  body: string
  source: string
  timestamp: string
  ip?: string
  userAgent?: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface WebhooksResponse {
  success: boolean
  data: Webhook[]
  pagination: Pagination
}

interface WebhooksPageProps {
  initialWebhooks: Webhook[]
  initialPagination: Pagination
}

const sourceColors = {
  github:
    'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
  stripe:
    'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
  payload:
    'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
  custom:
    'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
  discord:
    'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
  slack:
    'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
  twitter:
    'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:border-sky-800',
  shopify:
    'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
  mailgun:
    'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800',
  sendgrid:
    'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
  zapier:
    'bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800',
  ifttt:
    'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800',
  unknown:
    'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
}

const methodColors = {
  GET: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  POST: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  DELETE: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  PATCH: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
}

export default function WebhooksPage({ initialWebhooks, initialPagination }: WebhooksPageProps) {
  const [webhooks, setWebhooks] = useState<Webhook[]>(initialWebhooks)
  const [pagination, setPagination] = useState<Pagination>(initialPagination)
  const [loading, setLoading] = useState(false)
  const [selectedSource, setSelectedSource] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [expandedWebhooks, setExpandedWebhooks] = useState<Set<string>>(new Set())
  const [showInfo, setShowInfo] = useState(false)
  const router = useRouter()

  const fetchWebhooks = async (page: number = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(selectedSource && { source: selectedSource }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      })

      const response = await fetch(`/api/webhooks?${params}`)
      const data: WebhooksResponse = await response.json()

      if (data.success) {
        setWebhooks(data.data)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Error fetching webhooks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    fetchWebhooks(newPage)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage.toString() },
    })
  }

  const handleFilter = () => {
    fetchWebhooks(1)
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        source: selectedSource,
        startDate,
        endDate,
        page: '1',
      },
    })
  }

  const handleClearFilters = () => {
    setSelectedSource('')
    setStartDate('')
    setEndDate('')
    fetchWebhooks(1)
    router.push({
      pathname: router.pathname,
      query: { page: '1' },
    })
  }

  const handleDeleteWebhook = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa webhook này?')) return

    try {
      const response = await fetch(`/api/webhooks?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setWebhooks(webhooks.filter((webhook) => webhook.id !== id))
      } else {
        alert('Lỗi khi xóa webhook')
      }
    } catch (error) {
      console.error('Error deleting webhook:', error)
      alert('Lỗi khi xóa webhook')
    }
  }

  const toggleWebhookExpansion = (id: string) => {
    const newExpanded = new Set(expandedWebhooks)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedWebhooks(newExpanded)
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const parseJsonSafely = (jsonString: string) => {
    try {
      return JSON.parse(jsonString)
    } catch {
      return null
    }
  }

  // Get unique sources from webhooks
  const uniqueSources = Array.from(new Set(webhooks.map((w) => w.source))).sort()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Webhook Monitor
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor and inspect incoming webhooks in real-time
              </p>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              {showInfo ? 'Hide Info' : 'Show Endpoint Info'}
            </button>
          </div>
        </div>

        {/* Webhook Info Section */}
        {showInfo && (
          <div className="mb-8">
            <WebhookInfo />
          </div>
        )}

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label
                htmlFor="source-select"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Source
              </label>
              <select
                id="source-select"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Sources</option>
                {uniqueSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="end-date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="flex items-end space-x-2">
              <button
                onClick={handleFilter}
                className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Filter
              </button>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FilterIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {pagination.total} webhooks found
              </span>
            </div>

            <button
              onClick={() => fetchWebhooks(pagination.page)}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Webhooks List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {webhooks.map((webhook) => (
            <div
              key={webhook.id}
              className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              {/* Webhook Item */}
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        methodColors[webhook.method as keyof typeof methodColors] ||
                        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {webhook.method}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {webhook.source}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatTimestamp(webhook.timestamp)}
                    </span>
                    {webhook.ip && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        IP: {webhook.ip}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleWebhookExpansion(webhook.id)}
                      className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {expandedWebhooks.has(webhook.id) ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteWebhook(webhook.id)}
                      className="p-1 text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400"
                      title="Delete webhook"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedWebhooks.has(webhook.id) && (
                  <div className="mt-4 space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Headers
                      </h3>
                      <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto text-gray-800 dark:text-gray-200">
                        {JSON.stringify(parseJsonSafely(webhook.headers), null, 2)}
                      </pre>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Body
                      </h3>
                      <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto text-gray-800 dark:text-gray-200">
                        {JSON.stringify(parseJsonSafely(webhook.body), null, 2)}
                      </pre>
                    </div>

                    {webhook.userAgent && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          User Agent
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 break-all">
                          {webhook.userAgent}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}{' '}
              results
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNext}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {webhooks.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No webhooks found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {selectedSource || startDate || endDate
                ? 'No webhooks match your filters.'
                : 'No webhooks have been received yet.'}
            </p>
            {!showInfo && (
              <button
                onClick={() => setShowInfo(true)}
                className="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                View Endpoint Info
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading webhooks...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { page = '1', source = '', startDate = '', endDate = '' } = context.query
    const params = new URLSearchParams({
      page: page as string,
      limit: '20',
      ...(source && { source: source as string }),
      ...(startDate && { startDate: startDate as string }),
      ...(endDate && { endDate: endDate as string }),
    })

    const protocol = context.req.headers['x-forwarded-proto'] || 'http'
    const host = context.req.headers.host
    const response = await fetch(`${protocol}://${host}/api/webhooks?${params}`)
    const data: WebhooksResponse = await response.json()

    return {
      props: {
        initialWebhooks: data.success ? data.data : [],
        initialPagination: data.success
          ? data.pagination
          : {
              page: 1,
              limit: 20,
              total: 0,
              totalPages: 0,
              hasNext: false,
              hasPrev: false,
            },
      },
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)
    return {
      props: {
        initialWebhooks: [],
        initialPagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      },
    }
  }
}
