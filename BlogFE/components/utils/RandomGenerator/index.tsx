import React, { useEffect, useRef, useState } from 'react'
import RandomNumberGenerator from './RandomNumberGenerator'
import HashTracker from './HashTracker'
import WebcamComponent from './WebcamComponent'
import CameraSelector from '~/components/utils/RandomGenerator/CameraSelector'
import useCapture from '~/components/utils/RandomGenerator/useCapture'
import useCameraAndCanvas from '~/components/utils/RandomGenerator/useCameraAndCanvas'

const RandomGenerator = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hashString, setHashString] = useState<string>('')
  const [captureCount, setCaptureCount] = useState<number>(0)
  const [isInfoHovered, setIsInfoHovered] = useState<boolean>(false)
  const { startCamera, videoStarted, stopCamera, cameraDevices } = useCameraAndCanvas(
    videoRef,
    canvasRef
  )
  const { captureAndHashImage } = useCapture(canvasRef, setHashString)
  const [selectedCameraId, setSelectedCameraId] = useState<string>('')

  const handleSelectCamera = (deviceId: string) => {
    setSelectedCameraId(deviceId)
    if (videoStarted) startCamera(deviceId)
  }
  // If needed, call stopCamera when the component unmounts
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return (
    <div className="relative text-center p-2 border-2 rounded-lg border-green-400">
      <div className="relative inline-block">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={videoRef} className="w-full h-auto hidden" />
        <canvas ref={canvasRef} className="w-full h-auto block" />
        {videoStarted && (
          <div>
            <div className="absolute top-2.5 left-2.5 bg-transparent  w-1/4 cursor-pointer">
              <CameraSelector cameraDevices={cameraDevices} onSelectCamera={handleSelectCamera} />
            </div>
            <button
              className="absolute top-2.5 right-2.5 bg-transparent w-6 cursor-pointer text-red-600 text-2xl"
              onClick={stopCamera}
              style={{ outline: 'none' }}
              aria-label="Close camera"
            >
              x
            </button>
            <div
              className="absolute bottom-2.5 right-2.5 bg-gray-500 text-white w-6 h-6 rounded-full text-center leading-6 cursor-pointer"
              onMouseEnter={() => setIsInfoHovered(true)}
              onMouseLeave={() => setIsInfoHovered(false)}
            >
              i
            </div>
            {isInfoHovered && (
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white dark:bg-black rounded-lg border border-black z-10 text-left p-2.5">
                <WebcamComponent cameraId={selectedCameraId} />
              </div>
            )}
          </div>
        )}

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
          {!videoStarted && (
            <button
              className="py-2.5 px-5 rounded-full bg-green-500 text-white cursor-pointer"
              onClick={() => startCamera(selectedCameraId)}
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
      {hashString && videoStarted && (
        <div className="w-full mx-auto bg-white dark:bg-gray-800 shadow rounded-lg py-2">
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <span>Hash</span>
            </span>
            <input
              type="string"
              disabled={true}
              value={hashString}
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Min Value"
            />
          </div>
          <RandomNumberGenerator hashString={hashString} />
        </div>
      )}
    </div>
  )
}

export default RandomGenerator
