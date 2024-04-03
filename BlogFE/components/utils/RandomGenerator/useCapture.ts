import CryptoJS from 'crypto-js'
import React from 'react'

const useCapture = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  setHashString: React.Dispatch<React.SetStateAction<string>>
) => {
  const captureAndHashImage = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader()
            reader.onloadend = () => {
              const base64data = reader.result
              if (typeof base64data === 'string') {
                const hash = CryptoJS.SHA256(base64data).toString(CryptoJS.enc.Hex)
                setHashString(hash)
              }
            }
            reader.readAsDataURL(blob)
          }
        })
      }
    }
  }

  return { captureAndHashImage }
}

export default useCapture
