import React, { useEffect, useRef, useState } from 'react'
import InputWithLabel from '~/components/ui/InputWithLabel'

const HandwritingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [label, setLabel] = useState('')
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    // This will run after the canvas is mounted
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.lineWidth = 3 // Set the line width to 3 (or your desired thickness)
        ctx.lineCap = 'round' // Optional: Makes the line ends rounded for a smoother look
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    const rect = canvasRef.current.getBoundingClientRect()
    let clientX, clientY

    if (e.type === 'mousemove') {
      clientX = (e as React.MouseEvent).clientX
      clientY = (e as React.MouseEvent).clientY
    } else {
      clientX = (e as React.TouchEvent).touches[0].clientX
      clientY = (e as React.TouchEvent).touches[0].clientY
    }

    if (ctx) {
      ctx.lineTo(clientX - rect.left, clientY - rect.top)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) ctx.beginPath()
    }
  }

  const handleSave = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      const dataURL = canvasRef.current.toDataURL()
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      // Send dataURL and label to server for saving
      console.log('Saving:', label, dataURL)

      const link = document.createElement('a')
      link.download = `${label}.png`
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleClear = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }

  return (
    <form className="w-[512px]">
      <div className="flex flex-col space-y-4">
        <InputWithLabel
          label="Label"
          value={label}
          onChange={setLabel}
          placeholder="Enter label"
          labelWidth={120}
        />

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={512} /* Increased canvas size */
            height={128}
            className="border bg-white border-red cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{
              touchAction: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
            }}
          />
          <canvas
            width={128}
            height={32}
            className="absolute top-0 left-0 pointer-events-none" /* Position on top of main canvas */
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600-700 text-white font-bold py-2 px-4 rounded w-1/3"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default HandwritingCanvas
