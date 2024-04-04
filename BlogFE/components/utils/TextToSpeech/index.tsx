import React, { useState } from 'react'
import { fetchTTS } from './ttsUtils' // Import fetchTTS from the utility file

const TextToSpeech: React.FC = () => {
  const [inputText, setInputText] = useState<string>('')
  const [audioSrc, setAudioSrc] = useState<string | null>(null)
  const [downloadLink, setDownloadLink] = useState<string>('')
  const [model, setModel] = useState<string>('tts-1-hd')
  const [voice, setVoice] = useState<string>('fable')

  const handleFetchTTS = async () => {
    try {
      const audioBlob = await fetchTTS(inputText, model, voice)
      console.log('length of blob ' + audioBlob.length)
      const url = URL.createObjectURL(audioBlob)
      setAudioSrc(url)
      setDownloadLink(url)
    } catch (error) {
      console.error('Error fetching TTS:', error)
    }
  }

  return (
    <div className="p-4">
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to speech"
      />
      <div className="flex flex-col mt-2">
        <select className="mb-2" value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="tts-1-hd">Model 1 HD (Quality)</option>
          <option value="tts-1">Model 1 (Speed)</option>
          {/* Add more models as needed */}
        </select>
        <select value={voice} onChange={(e) => setVoice(e.target.value)}>
          <option value="fable">Fable Voice</option>
          <option value="aria">Aria Voice</option>
          {/* Add more voices as needed */}
        </select>
      </div>
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={handleFetchTTS}
      >
        Generate Speech
      </button>
      {audioSrc && (
        <div className="mt-4">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio controls src={audioSrc}>
            Your browser does not support the audio element.
          </audio>
          <a
            href={downloadLink}
            download="speech.mp3"
            className="block mt-2 text-blue-500 hover:underline"
          >
            Download MP3
          </a>
        </div>
      )}
    </div>
  )
}

export default TextToSpeech
