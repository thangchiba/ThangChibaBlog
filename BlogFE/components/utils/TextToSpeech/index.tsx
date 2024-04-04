import React, { useState } from 'react'
import { fetchTTS } from './ttsUtils'
import LoadingIndicator from '~/components/common/LoadingIndicator'

const TextToSpeech: React.FC = () => {
  const [inputText, setInputText] = useState<string>('')
  const [audioSrc, setAudioSrc] = useState<string | null>(null)
  const [downloadLink, setDownloadLink] = useState<string>('')
  const [model, setModel] = useState<string>('tts-1-hd')
  const [voice, setVoice] = useState<string>('fable')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleFetchTTS = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const audioBlob = await fetchTTS(inputText, model, voice)
      console.log('length of blob ' + audioBlob.length)
      const url = URL.createObjectURL(audioBlob)
      setAudioSrc(url)
      setDownloadLink(url)
    } catch (error) {
      console.error('Error fetching TTS:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="border-2 border-amber-400 rounded-lg p-4 space-y-3">
      {isLoading && <LoadingIndicator />}
      <textarea
        id="content"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={8}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter content here..."
      ></textarea>

      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <span>Model</span>
        </span>
        <select
          id="models"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="tts-1-hd">Model 1 HD (Quality)</option>
          <option value="tts-1">Model 1 (Speed)</option>
        </select>
      </div>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <span>Voices</span>
        </span>
        <select
          id="voices"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="alloy">Alloy Voice</option>
          <option value="echo">Echo Voice</option>
          <option value="fable">Fable Voice</option>
          <option value="onyx">Onyx Voice</option>
          <option value="nova">Nova Voice</option>
          <option value="shimmer">Shimmer Voice</option>
        </select>
      </div>
      <button
        type="submit"
        onClick={handleFetchTTS}
        disabled={isLoading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Generate Speech
      </button>

      {audioSrc && (
        <div className="w-full">
          <div className="border-t-2 my-5 w-full"></div>
          <div className="flex items-center justify-between">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio controls src={audioSrc} className="mr-2 w-full">
              Your browser does not support the audio element.
            </audio>
            <a
              href={downloadLink}
              download="speech.mp3"
              className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 23 23"
              >
                <path d="M13 7H7v6H5l7 7 7-7h-2V7z" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </form>
  )
}

export default TextToSpeech
