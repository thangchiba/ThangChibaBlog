'use client'
import React from 'react'

const Canvas = ({ mainCanvasRef, hiddenCanvasRef, startDrawing, draw, stopDrawing }) => {
  const mainCanvasSize = { width: 512, height: 112 }
  const saveImageSize = { width: 128, height: 28 }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <canvas
        ref={mainCanvasRef}
        {...mainCanvasSize}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
        style={{ touchAction: 'none' }}
        className="border rounded-md mb-4"
      />
      <canvas ref={hiddenCanvasRef} {...saveImageSize} style={{ display: 'none' }} />
    </>
  )
}

export default Canvas
