'use client'
import React, { useState } from 'react'
import Canvas from './Canvas'
import useCanvas from './useCanvas'

const PredictCanvas = () => {
  const [imageLabel, setImageLabel] = useState('')
  const [selectedModel, setSelectedModel] = useState('digits')

  const models = [
    { modelEndpoint: 'digits', nameModel: 'Number' },
    { modelEndpoint: 'general', nameModel: 'General' },
  ]

  const { mainCanvasRef, hiddenCanvasRef, clearCanvas, startDrawing, draw, stopDrawing, result } =
    useCanvas(imageLabel, selectedModel)
  return (
    <div className="flex items-center w-screen">
      <form className="border rounded-md p-4 shadow-md">
        <div className="flex mb-2">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 w-24">
            <span>Model : </span>
          </span>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {models.map((model) => (
              <option key={model.modelEndpoint} value={model.modelEndpoint}>
                {model.nameModel}
              </option>
            ))}
          </select>
        </div>
        <div className="flex mb-2">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <span>Predict Result : </span>
          </span>
          <label className="text-yellow-700 dark:text-yellow-700 rounded-none rounded-e-lg bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {result || '...'}
          </label>
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

export default PredictCanvas
