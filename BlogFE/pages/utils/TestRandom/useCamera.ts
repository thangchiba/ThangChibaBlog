import React, { useRef, useState } from 'react'

const useCamera = (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const [videoStarted, setVideoStarted] = useState<boolean>(false)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (videoRef.current) {
      videoRef.current.srcObject = stream
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play()
        if (canvasRef.current) {
          canvasRef.current.width = videoRef.current.videoWidth
          canvasRef.current.height = videoRef.current.videoHeight
        }
      }
      setVideoStarted(true)
      streamRef.current = stream
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setVideoStarted(false)
  }

  return { startCamera, stopCamera, videoStarted }
}

export default useCamera
