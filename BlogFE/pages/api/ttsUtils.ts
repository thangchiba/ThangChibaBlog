import axios from 'axios'

// Function to split the text into chunks
export const splitText = (text: string, maxLength: number): string[] => {
  const sentences = text.match(/[^.!?]+[.!?]*/g) || []
  let chunks: string[] = []
  let currentChunk = ''
  sentences.forEach((sentence) => {
    if (currentChunk.length + sentence.length > maxLength) {
      chunks.push(currentChunk)
      currentChunk = ''
    }
    currentChunk += sentence
  })

  if (currentChunk.length) {
    chunks.push(currentChunk)
  }

  return chunks
}

// Function to fetch TTS for each chunk and concatenate the results
export const fetchTTS = async (
  inputText: string,
  model: string,
  voice: string
): Promise<Buffer> => {
  const endpoint = 'https://api.openai.com/v1/audio/speech'
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY
  const chunks = splitText(inputText, 4096) // Adjust the max length as needed

  let audioBuffers = []
  for (const chunk of chunks) {
    const data = {
      model: model,
      voice: voice,
      input: chunk,
    }

    const response = await axios.post(endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      responseType: 'arraybuffer',
    })

    audioBuffers.push(Buffer.from(response.data))
  }

  // Concatenate all buffers into one
  const combinedBuffer = Buffer.concat(audioBuffers)
  return combinedBuffer
}
