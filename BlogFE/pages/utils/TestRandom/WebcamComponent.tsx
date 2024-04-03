import React, { useEffect, useState } from 'react'

interface WebcamInfo {
  name: string
  qualityRating: number
  builtInMicrophone: string
  frameRate: number
  megaPixels: number
  resolution: string
  aspectRatio: number
}

const WebcamComponent: React.FC = () => {
  const [webcamInfo, setWebcamInfo] = useState<WebcamInfo | null>(null)

  useEffect(() => {
    async function getWebcamInfo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        const tracks = stream.getVideoTracks()
        const settings = tracks[0].getSettings()

        // Example calculations and defaults for demo purposes
        const resolution = `${settings.width}×${settings.height}`
        const megaPixels = ((settings.width || 0) * (settings.height || 0)) / 1000000

        setWebcamInfo({
          name: tracks[0].label,
          qualityRating: 221, // This would need a method to be calculated
          builtInMicrophone: stream.getAudioTracks().length > 0 ? 'Yes' : 'None',
          frameRate: settings.frameRate || 0,
          megaPixels: megaPixels,
          resolution: resolution,
          aspectRatio: settings.aspectRatio || 1.33,
        })

        // Clean up the stream
        return () => {
          tracks.forEach((track) => track.stop())
        }
      } catch (error) {
        console.error('Error accessing the webcam', error)
      }
    }

    getWebcamInfo()
  }, [])

  return (
    <div>
      {webcamInfo ? (
        <div>
          <p>Webcam Name: {webcamInfo.name}</p>
          <p>Quality Rating: {webcamInfo.qualityRating}</p>
          <p>Built-in Microphone: {webcamInfo.builtInMicrophone}</p>
          <p>Frame rate: {webcamInfo.frameRate} FPS</p>
          <p>Webcam MegaPixels: {webcamInfo.megaPixels} MP</p>
          <p>Webcam Resolution: {webcamInfo.resolution}</p>
          <p>Aspect Ratio: {webcamInfo.aspectRatio}</p>
        </div>
      ) : (
        <p>No webcam information available</p>
      )}
    </div>
  )
}

export default WebcamComponent
