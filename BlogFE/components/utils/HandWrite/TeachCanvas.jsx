'use client'
import React, { useState } from 'react'
import Canvas from './Canvas'
import useCanvas from './useCanvas'

const TeachCanvas = () => {
  const [imageLabel, setImageLabel] = useState('')
  const {
    mainCanvasRef,
    hiddenCanvasRef,
    clearCanvas,
    sendToSave,
    startDrawing,
    draw,
    stopDrawing,
    result,
  } = useCanvas(imageLabel)
  return (
    <div className="flex flex-col items-center">
      <form className="border rounded-md p-4 shadow-md">
        <div className="mb-4">
          <input
            type="text"
            id="imageLabel"
            value={imageLabel}
            onChange={(e) => setImageLabel(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <Canvas
          mainCanvasRef={mainCanvasRef}
          hiddenCanvasRef={hiddenCanvasRef}
          startDrawing={startDrawing}
          draw={draw}
          stopDrawing={stopDrawing}
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={sendToSave}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-36 rounded"
          >
            Send
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-36 rounded"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default TeachCanvas
