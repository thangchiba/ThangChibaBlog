import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma.server'
import {
  detectWebhookInfo,
  verifyWebhookSignature,
  verifyZoomWebhookSignature,
  getWebhookSecret,
  calculateProcessingTime,
  validateZoomWebhookUrl,
} from '../../utils/webhookUtils'
import crypto from 'crypto'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const startTime = Date.now()

  // Accept all HTTP methods
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

  if (!allowedMethods.includes(req.method || '')) {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Handle Zoom webhook URL validation challenge
    if (req.body && req.body.event === 'endpoint.url_validation') {
      const ZOOM_WEBHOOK_SECRET_TOKEN = process.env.ZOOM_WEBHOOK_SECRET || ''

      if (!ZOOM_WEBHOOK_SECRET_TOKEN) {
        console.error('ZOOM_WEBHOOK_SECRET not configured')
        return res.status(500).json({
          error: 'Zoom webhook secret not configured',
        })
      }

      const plainToken = req.body.payload?.plainToken
      if (!plainToken) {
        return res.status(400).json({
          error: 'Missing plainToken in payload',
        })
      }

      // Use utility function for validation
      const hashForValidate = validateZoomWebhookUrl(plainToken, ZOOM_WEBHOOK_SECRET_TOKEN)

      console.log('Zoom URL validation challenge completed')

      return res.status(200).json({
        plainToken: plainToken,
        encryptedToken: hashForValidate,
      })
    }

    const headers = JSON.stringify(req.headers)
    const body = JSON.stringify(req.body || req.query) // Use query for GET requests
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress
    const userAgent = req.headers['user-agent'] as string

    // Detect info (optionally)
    const webhookInfo = detectWebhookInfo(req.headers, req.body || req.query)

    // Signature verification (optional)
    let signatureValid = null
    let verifiedAt = null
    let signature = webhookInfo.signature || null
    if (signature) {
      const secret = getWebhookSecret(webhookInfo.source)
      if (secret) {
        let verificationResult
        if (webhookInfo.source === 'zoom') {
          // Use Zoom-specific verification
          const timestamp = req.headers['x-zm-request-timestamp'] as string
          verificationResult = verifyZoomWebhookSignature(body, signature, secret, timestamp)
        } else {
          // Use generic verification for other sources
          verificationResult = verifyWebhookSignature(body, signature, secret)
        }
        signatureValid = verificationResult.isValid
        verifiedAt = new Date()
      }
    }

    // Calculate processing time
    const processingTime = calculateProcessingTime(startTime)

    const webhook = await prisma.webhook.create({
      data: {
        method: req.method,
        headers,
        body,
        source: webhookInfo.source || null,
        eventType: webhookInfo.eventType || null,
        timestamp: new Date(),
        ip,
        userAgent,

        // Security & verification
        signature,
        signatureValid,
        verifiedAt,

        // Processing metadata
        processingTime,

        // Delivery status (default to received)
        deliveryStatus: 'received',
        retryCount: 0,
      },
    })

    console.log(
      `Webhook received from ${webhookInfo.source} (${req.method}): ${webhookInfo.eventType} - ID: ${webhook.id}`
    )

    res.status(200).json({
      success: true,
      message: 'Webhook received successfully',
      id: webhook.id,
      method: req.method,
      source: webhookInfo.source,
      eventType: webhookInfo.eventType,
      signatureValid,
      processingTime,
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
