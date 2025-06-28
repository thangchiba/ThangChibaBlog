import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma.server'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 20
      const source = req.query.source as string
      const startDate = req.query.startDate as string
      const endDate = req.query.endDate as string
      const skip = (page - 1) * limit

      const where: any = {}

      if (source) {
        where.source = source
      }

      if (startDate || endDate) {
        where.timestamp = {}
        if (startDate) {
          where.timestamp.gte = new Date(startDate)
        }
        if (endDate) {
          where.timestamp.lte = new Date(endDate + 'T23:59:59.999Z')
        }
      }

      const [webhooks, total] = await Promise.all([
        prisma.webhook.findMany({
          where,
          orderBy: { timestamp: 'desc' },
          skip,
          take: limit,
        }),
        prisma.webhook.count({ where }),
      ])

      const totalPages = Math.ceil(total / limit)

      res.status(200).json({
        success: true,
        data: webhooks,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      })
    } catch (error) {
      console.error('Error fetching webhooks:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      })
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Webhook ID is required',
        })
      }

      await prisma.webhook.delete({
        where: { id: id as string },
      })

      res.status(200).json({
        success: true,
        message: 'Webhook deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting webhook:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
