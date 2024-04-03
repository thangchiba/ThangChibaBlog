import React, { useEffect, useRef, useState } from 'react'

interface CameraDevice {
  label: string
  deviceId: string
}

const useCameraAndCanvas = (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const [videoStarted, setVideoStarted] = useState<boolean>(false)
  const [cameraDevices, setCameraDevices] = useState<CameraDevice[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  const listCameras = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices
      .filter((device) => device.kind === 'videoinput')
      .map((device) => ({
        label: device.label,
        deviceId: device.deviceId,
      }))
    console.log({ videoDevices })
    setCameraDevices(videoDevices)
  }

  const startCamera = async (deviceId?: string) => {
    const constraints = { video: deviceId ? { deviceId: { exact: deviceId } } : true }
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    if (videoRef.current) {
      videoRef.current.srcObject = stream
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play()
        if (canvasRef.current) {
          canvasRef.current.width = videoRef.current.videoWidth
          canvasRef.current.height = videoRef.current.videoHeight
          drawVideoOnCanvas()
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

  const drawVideoOnCanvas = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (video && canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        const draw = () => {
          if (!video.paused && !video.ended) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            requestAnimationFrame(draw)
          }
        }
        draw()
      }
    }
  }

  // Call listCameras to populate the cameraDevices state
  useEffect(() => {
    listCameras()
  }, [])

  return {
    startCamera,
    stopCamera,
    drawVideoOnCanvas,
    videoStarted,
    cameraDevices,
  }
}

export default useCameraAndCanvas
