import React, { useEffect, useRef, useState } from 'react'
import CryptoJS from 'crypto-js'
import RandomNumberGenerator from './RandomNumberGenerator'
import HashTracker from './HashTracker'
import WebcamComponent from './WebcamComponent'
import CameraSelector from '~/pages/utils/TestRandom/CameraSelector'

const TestRandom = () => {
  const [videoStarted, setVideoStarted] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hashString, setHashString] = useState<string>('')
  const [captureCount, setCaptureCount] = useState<number>(0) // Track capture events
  const [isInfoHovered, setIsInfoHovered] = useState(false)
  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          // @ts-ignore
          videoRef.current.play()
          if (canvasRef.current && videoRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth
            canvasRef.current.height = videoRef.current.videoHeight
            drawVideoOnCanvas() // Start drawing video on canvas
          }
        }
      }
      setVideoStarted(true)
    }
  }

  const drawVideoOnCanvas = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (video && canvas) {
      const context = canvas.getContext('2d')
      const draw = () => {
        if (!video.paused && !video.ended) {
          // @ts-ignore
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          requestAnimationFrame(draw)
        }
      }
      draw()
    }
  }

  const captureAndHashImage = () => {
    const startTime = performance.now() // Start timing before capture
    const canvas = canvasRef.current
    const video = videoRef.current
    if (canvas && video) {
      const context = canvas.getContext('2d')
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)

      canvas.toBlob((blob) => {
        const reader = new FileReader()
        reader.onloadend = function () {
          const base64data = reader.result
          if (typeof base64data === 'string') {
            const hash = CryptoJS.SHA256(base64data).toString(CryptoJS.enc.Hex)
            setHashString(hash) // Store hash as a string
          }
        }
        const endTime = performance.now() // End timing after hash generation
        console.log(`Hash generation time: ${endTime - startTime} milliseconds`)
        if (blob) {
          reader.readAsDataURL(blob)
        }
      })
    }

    setCaptureCount((prevCount) => prevCount + 1) // Increment capture count
  }

  return (
    <div className="relative text-center max-w-2xl p-2 border-2 rounded-lg border-amber-700">
      {/*<CameraSelector />*/}
      <div className="relative inline-block">
        <video ref={videoRef} className="w-full h-auto hidden" />
        <canvas ref={canvasRef} className="w-full h-auto block" />

        <div className="absolute top-2.5 left-2.5 bg-transparent  w-1/4 cursor-pointer">
          <CameraSelector />
        </div>

        <div
          className="absolute top-2.5 right-2.5 bg-gray-500 text-white w-6 h-6 rounded-full text-center leading-6 cursor-pointer"
          onMouseEnter={() => setIsInfoHovered(true)}
          onMouseLeave={() => setIsInfoHovered(false)}
        >
          i
        </div>

        {isInfoHovered && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-black rounded-lg border border-black z-10 text-left p-2.5">
            <WebcamComponent />
          </div>
        )}

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
          {!videoStarted && (
            <button
              className="py-2.5 px-5 rounded-full bg-green-500 text-white cursor-pointer"
              onClick={startCamera}
            >
              Start Camera
            </button>
          )}
          {videoStarted && (
            <button
              className="py-2 px-5 rounded-full bg-pink-300 text-black cursor-pointer hover:bg-pink-400 active:bg-pink-500 transform transition duration-150 ease-in-out hover:scale-105 active:scale-95"
              onClick={captureAndHashImage}
            >
              Capture
            </button>
          )}
        </div>
      </div>

      {/*<p>Capture count: {captureCount}</p>*/}
      {hashString && (
        <div>
          <p className="flex flex-wrap break-all animate-fade-in border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition duration-300">
            Hash : {hashString}
          </p>
          <RandomNumberGenerator hashString={hashString} />
        </div>
      )}
    </div>
  )
}

export default TestRandom
