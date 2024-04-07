// pages/api/tts.js
import { fetchTTS } from './ttsUtils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { inputText, model, voice } = req.body
  try {
    const audioBuffer = await fetchTTS(inputText, model, voice)
    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Length', audioBuffer.length.toString())
    res.end(audioBuffer)
  } catch (error) {
    console.error('Error in API route:', error)
    res.status(500).json({ error: 'Error fetching TTS' })
  }
}
