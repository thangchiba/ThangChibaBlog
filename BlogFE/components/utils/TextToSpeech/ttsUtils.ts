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

export const fetchTTS = async (inputText: string, model: string, voice: string): Promise<Blob> => {
  console.log('zo fetch')
  const endpoint = 'https://api.openai.com/v1/audio/speech'
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY // Use environment variable for API key
  console.log(apiKey)
  const chunks = splitText(inputText, 4096)
  // eslint-disable-next-line no-undef
  let combinedBlobParts: BlobPart[] = []
  console.log(chunks)

  for (const chunk of chunks) {
    const data = {
      model: model,
      voice: voice,
      input: chunk,
    }

    console.log({ endpoint, data, apiKey })
    const response = await axios.post(endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      responseType: 'blob',
    })

    combinedBlobParts.push(response.data)
  }

  return new Blob(combinedBlobParts, { type: 'audio/mpeg' })
}
