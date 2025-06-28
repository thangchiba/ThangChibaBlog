import crypto from 'crypto'

export interface WebhookVerificationResult {
  isValid: boolean
  reason?: string
  signature?: string
}

export interface WebhookEventInfo {
  source: string
  eventType: string
  signature?: string
}

/**
 * Validate Zoom webhook URL challenge
 * This is required when setting up Zoom webhooks
 */
export const validateZoomWebhookUrl = (plainToken: string, secret: string): string => {
  return crypto.createHmac('sha256', secret).update(plainToken).digest('hex')
}

/**
 * Verify Zoom webhook signature
 * Zoom uses format: v0=hash where hash is HMAC-SHA256 of timestamp + payload
 */
export const verifyZoomWebhookSignature = (
  payload: string,
  signature: string,
  secret: string,
  timestamp?: string
): WebhookVerificationResult => {
  try {
    // Zoom signature format: v0=hash
    if (!signature.startsWith('v0=')) {
      return {
        isValid: false,
        reason: 'Invalid signature format. Expected v0=hash',
      }
    }

    const receivedHash = signature.substring(3) // Remove 'v0=' prefix

    // Zoom concatenates timestamp + payload for signature
    const message = timestamp ? `${timestamp}.${payload}` : payload
    const expectedHash = crypto.createHmac('sha256', secret).update(message).digest('hex')

    const isValid = receivedHash === expectedHash

    return {
      isValid,
      signature: `v0=${expectedHash}`,
      reason: isValid ? 'Zoom signature verified' : 'Invalid Zoom signature',
    }
  } catch (error) {
    return {
      isValid: false,
      reason: `Zoom verification error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    }
  }
}

/**
 * Verify webhook signature using HMAC-SHA256
 * Following Zoom's webhook verification pattern
 */
export const verifyWebhookSignature = (
  payload: string,
  signature: string,
  secret: string
): WebhookVerificationResult => {
  try {
    // Create expected signature
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

    // Compare signatures (in production, consider using timing-safe comparison)
    const isValid = signature === expectedSignature

    return {
      isValid,
      signature: expectedSignature,
      reason: isValid ? 'Signature verified' : 'Invalid signature',
    }
  } catch (error) {
    return {
      isValid: false,
      reason: `Verification error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

/**
 * Detect webhook source and event type from headers and body
 * Following professional webhook standards
 */
export const detectWebhookInfo = (headers: any, body: any): WebhookEventInfo => {
  const headerKeys = Object.keys(headers).map((k) => k.toLowerCase())
  const bodyStr = typeof body === 'string' ? body : JSON.stringify(body)
  const bodyObj = typeof body === 'object' ? body : {}

  // Zoom webhook detection (improved)
  if (
    headers['x-zm-signature'] ||
    headers['x-zoom-signature'] ||
    headers['authorization']?.includes('Bearer') ||
    bodyObj.event === 'endpoint.url_validation' ||
    headers['user-agent']?.includes('Zoom')
  ) {
    const eventType = bodyObj.event || bodyObj.type || 'unknown'
    return {
      source: 'zoom',
      eventType: eventType,
      signature: headers['x-zm-signature'] || headers['x-zoom-signature'],
    }
  }

  // GitHub webhook detection
  if (headers['x-github-event']) {
    return {
      source: 'github',
      eventType: headers['x-github-event'],
      signature: headers['x-hub-signature-256'],
    }
  }

  // Stripe webhook detection
  if (headers['stripe-signature']) {
    const eventType = bodyObj.type || 'unknown'
    return {
      source: 'stripe',
      eventType: eventType,
      signature: headers['stripe-signature'],
    }
  }

  // Discord webhook detection
  if (headers['x-discord-signature']) {
    const eventType = bodyObj.type ? `discord.${bodyObj.type}` : 'discord.unknown'
    return {
      source: 'discord',
      eventType: eventType,
      signature: headers['x-discord-signature'],
    }
  }

  // Slack webhook detection
  if (headers['x-slack-signature']) {
    const eventType = bodyObj.type ? `slack.${bodyObj.type}` : 'slack.unknown'
    return {
      source: 'slack',
      eventType: eventType,
      signature: headers['x-slack-signature'],
    }
  }

  // Shopify webhook detection
  if (headers['x-shopify-shop-domain']) {
    const topic = headers['x-shopify-topic'] || 'unknown'
    const eventType = `shopify.${topic}`
    return {
      source: 'shopify',
      eventType: eventType,
      signature: headers['x-shopify-hmac-sha256'],
    }
  }

  // Generic webhook detection
  if (headers['x-webhook-signature'] || headers['x-webhook-key']) {
    const eventType = bodyObj.event || bodyObj.type || 'custom.unknown'
    return {
      source: 'custom',
      eventType: eventType,
      signature: headers['x-webhook-signature'] || headers['x-webhook-key'],
    }
  }

  // Try to detect from User-Agent
  const userAgent = headers['user-agent'] || ''
  if (userAgent.includes('Zoom')) {
    return { source: 'zoom', eventType: 'unknown' }
  }
  if (userAgent.includes('GitHub')) {
    return { source: 'github', eventType: 'unknown' }
  }
  if (userAgent.includes('Stripe')) {
    return { source: 'stripe', eventType: 'unknown' }
  }

  // Default fallback
  return {
    source: 'unknown',
    eventType: 'unknown',
  }
}

/**
 * Get webhook secret for verification
 * In production, this should be stored securely (e.g., environment variables, database)
 */
export const getWebhookSecret = (source: string): string => {
  // In production, fetch from secure storage
  const secrets: Record<string, string> = {
    zoom: process.env.ZOOM_WEBHOOK_SECRET || '',
    github: process.env.GITHUB_WEBHOOK_SECRET || '',
    stripe: process.env.STRIPE_WEBHOOK_SECRET || '',
    discord: process.env.DISCORD_WEBHOOK_SECRET || '',
    slack: process.env.SLACK_WEBHOOK_SECRET || '',
    shopify: process.env.SHOPIFY_WEBHOOK_SECRET || '',
    custom: process.env.CUSTOM_WEBHOOK_SECRET || '',
  }

  return secrets[source] || ''
}

/**
 * Calculate processing time
 */
export const calculateProcessingTime = (startTime: number): number => {
  return Date.now() - startTime
}

/**
 * Format webhook status for display
 */
export const formatWebhookStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    received: 'Received',
    processing: 'Processing',
    delivered: 'Delivered',
    failed: 'Failed',
    retrying: 'Retrying',
  }
  return statusMap[status] || status
}

/**
 * Get status color for UI
 */
export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    received: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    retrying: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
  }
  return colorMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}
