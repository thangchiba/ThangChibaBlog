import React from 'react'

const useCanvas = (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
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

  return { drawVideoOnCanvas }
}

export default useCanvas
