import type { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import AWS from 'aws-sdk'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max file size
  },
})

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const uploadSingle = upload.single('file')

  uploadSingle(req, res, function (err) {
    if (err) return res.status(500).send(err)

    const file = req.file
    const path = req.body.path ? req.body.path + '/' : ''
    const filePath = `${path}${file.originalname}` // Specify your path and filename

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filePath,
      Body: file.buffer,
      ContentType: file.mimetype,
    }

    s3.upload(params, function (s3Err, data) {
      if (s3Err) {
        console.error(s3Err)
        return res.status(500).json({ error: 'Failed to upload file', details: s3Err })
      }

      res.status(200).json({ message: 'File uploaded successfully', url: data.Location })
    })
  })
}
