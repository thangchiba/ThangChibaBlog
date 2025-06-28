import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma.server'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Accept all HTTP methods
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

  if (!allowedMethods.includes(req.method || '')) {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const headers = JSON.stringify(req.headers)
    const body = JSON.stringify(req.body || req.query) // Use query for GET requests
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress
    const userAgent = req.headers['user-agent'] as string

    // Try to detect webhook source from headers - more flexible approach
    let source = 'unknown'

    // Check for common webhook signature headers
    const signatureHeaders = [
      'x-github-event',
      'stripe-signature',
      'x-payload-signature',
      'x-webhook-signature',
      'x-discord-signature',
      'x-slack-signature',
      'x-twitter-signature',
      'x-shopify-shop-domain',
      'x-mailgun-signature',
      'x-sendgrid-signature',
      'x-zapier-signature',
      'x-ifttt-signature',
      'x-webhook-key',
      'authorization',
      'x-api-key',
    ]

    for (const header of signatureHeaders) {
      if (req.headers[header]) {
        // Extract source name from header
        if (header === 'x-github-event') {
          source = 'github'
        } else if (header === 'stripe-signature') {
          source = 'stripe'
        } else if (header === 'x-payload-signature') {
          source = 'payload'
        } else if (header === 'x-discord-signature') {
          source = 'discord'
        } else if (header === 'x-slack-signature') {
          source = 'slack'
        } else if (header === 'x-twitter-signature') {
          source = 'twitter'
        } else if (header === 'x-shopify-shop-domain') {
          source = 'shopify'
        } else if (header === 'x-mailgun-signature') {
          source = 'mailgun'
        } else if (header === 'x-sendgrid-signature') {
          source = 'sendgrid'
        } else if (header === 'x-zapier-signature') {
          source = 'zapier'
        } else if (header === 'x-ifttt-signature') {
          source = 'ifttt'
        } else if (header === 'x-webhook-signature' || header === 'x-webhook-key') {
          source = 'custom'
        } else {
          // For other headers, try to extract a meaningful name
          const headerValue = req.headers[header] as string
          if (headerValue && headerValue.length > 0) {
            source = header.replace('x-', '').replace('-signature', '').replace('-key', '')
          }
        }
        break
      }
    }

    // If still unknown, try to detect from User-Agent
    if (source === 'unknown' && userAgent) {
      const ua = userAgent.toLowerCase()
      if (ua.includes('github')) source = 'github'
      else if (ua.includes('stripe')) source = 'stripe'
      else if (ua.includes('discord')) source = 'discord'
      else if (ua.includes('slack')) source = 'slack'
      else if (ua.includes('shopify')) source = 'shopify'
      else if (ua.includes('mailgun')) source = 'mailgun'
      else if (ua.includes('sendgrid')) source = 'sendgrid'
      else if (ua.includes('zapier')) source = 'zapier'
      else if (ua.includes('ifttt')) source = 'ifttt'
      else if (ua.includes('curl') || ua.includes('postman') || ua.includes('insomnia'))
        source = 'test'
    }

    const webhook = await prisma.webhook.create({
      data: {
        method: req.method || 'GET',
        headers,
        body,
        source,
        ip,
        userAgent,
      },
    })

    console.log(`Webhook received from ${source} (${req.method}):`, webhook.id)

    res.status(200).json({
      success: true,
      message: 'Webhook received successfully',
      id: webhook.id,
      method: req.method,
      source: source,
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
