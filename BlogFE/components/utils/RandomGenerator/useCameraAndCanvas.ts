import React, { useCallback, useEffect, useRef, useState } from 'react'

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

  const listCameras = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices
        .filter((device) => device.kind === 'videoinput')
        .map((device) => ({
          label: device.label || `Device ${device.deviceId.substr(0, 8)}`,
          deviceId: device.deviceId,
        }))

      if (videoDevices.length === 0) {
        setTimeout(listCameras, 500) // Retry after a delay
      } else {
        setCameraDevices(videoDevices)
      }
    } catch (error) {
      console.error('Error enumerating devices:', error)
    }
  }, [])

  const startCamera = async (deviceId?: string) => {
    try {
      await listCameras() // Update the camera list each time before starting the camera
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
    } catch (error) {
      console.error('Error starting camera:', error)
    }
  }

  const stopCamera = useCallback(() => {
    try {
      streamRef.current?.getTracks().forEach((track) => track.stop())
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      setVideoStarted(false)
    } catch (error) {
      console.error('Error stopping camera:', error)
    }
  }, [videoRef])

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

  useEffect(() => {
    listCameras()
  }, [listCameras])

  return {
    startCamera,
    stopCamera,
    drawVideoOnCanvas,
    videoStarted,
    cameraDevices,
  }
}

export default useCameraAndCanvas
