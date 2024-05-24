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
    sendToServer,
    startDrawing,
    draw,
    stopDrawing,
    result,
  } = useCanvas(imageLabel)
  return (
    <div className="flex flex-col items-center">
      <form className="border rounded-md p-4 shadow-md">
        {/*<div className="mb-4">*/}
        {/*  <input*/}
        {/*      type="text"*/}
        {/*      id="imageLabel"*/}
        {/*      value={imageLabel}*/}
        {/*      onChange={(e) => setImageLabel(e.target.value)}*/}
        {/*      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="mb-4">
          <input
            type="text"
            id="imageLabel"
            value={result}
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
            onClick={sendToServer}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-36 rounded-r mr-2"
          >
            Send
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            className="bg-red-700 hover:bg-red-300 text-white font-bold py-2 px-8 rounded-l"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default TeachCanvas
