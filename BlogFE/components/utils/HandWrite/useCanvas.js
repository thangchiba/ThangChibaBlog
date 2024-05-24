import { useCallback, useEffect, useRef, useState } from 'react'

const useCanvas = (imageLabel) => {
  const mainCanvasRef = useRef(null)
  const hiddenCanvasRef = useRef(null)
  const mainCanvasSize = { width: 512, height: 112 }
  const saveImageSize = { width: 128, height: 28 }

  console.log('Reload')
  // Drawing State (refs instead of state)
  const drawingRef = useRef(false)
  const positionRef = useRef({ x: 0, y: 0 })
  const [result, setResult] = useState('')

  useEffect(() => {
    const ctx = mainCanvasRef.current.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, mainCanvasSize.width, mainCanvasSize.height)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 6
  }, [mainCanvasSize.width, mainCanvasSize.height])

  const getCoordinates = useCallback((event) => {
    const rect = mainCanvasRef.current.getBoundingClientRect()
    return {
      x: event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left,
      y: event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top,
    }
  }, [])

  const startDrawing = useCallback(
    (event) => {
      event.stopPropagation()
      positionRef.current = getCoordinates(event)
      drawingRef.current = true
    },
    [getCoordinates]
  )

  const draw = useCallback(
    (event) => {
      if (!drawingRef.current) return

      const ctx = mainCanvasRef.current.getContext('2d')
      const { x, y } = getCoordinates(event)

      ctx.beginPath()
      ctx.moveTo(positionRef.current.x, positionRef.current.y)
      ctx.lineTo(x, y)
      ctx.stroke()

      positionRef.current = { x, y }
    },
    [getCoordinates]
  )

  const sendPredict = useCallback(async () => {
    const hiddenCtx = hiddenCanvasRef.current.getContext('2d')
    hiddenCtx.drawImage(mainCanvasRef.current, 0, 0, saveImageSize.width, saveImageSize.height)
    const dataURL = hiddenCanvasRef.current.toDataURL('image/png')

    // Loại bỏ phần đầu "data:image/png;base64," để chỉ còn lại base64 string
    const base64Image = dataURL.split(',')[1]

    console.log(base64Image)
    try {
      // const response = await fetch('http://192.168.1.104:55323/predict', {
      // const response = await fetch('http://192.168.1.74:8000/predict', {
      const response = await fetch('https://api.thangchiba.com/handwrite/predict', {
        method: 'POST',
        body: JSON.stringify({ image_data: base64Image }), // Gửi base64 string
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        const result = await response.json() // Lấy kết quả dự đoán từ server
        console.log('Prediction result:', result)
        setResult(result?.predicted_text)
        // Xử lý kết quả dự đoán ở đây (ví dụ: hiển thị lên giao diện)
      } else {
        console.error('Error predicting image:', response.statusText)
      }
    } catch (error) {
      console.error('Error predicting image:', error)
    }
  }, [saveImageSize.width, saveImageSize.height])
  const stopDrawing = useCallback(() => {
    drawingRef.current = false
    sendPredict()
  }, [sendPredict])

  const clearCanvas = useCallback(() => {
    const ctx = mainCanvasRef.current.getContext('2d')
    const hiddenCtx = hiddenCanvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, mainCanvasSize.width, mainCanvasSize.height)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, mainCanvasSize.width, mainCanvasSize.height)
    hiddenCtx.clearRect(0, 0, saveImageSize.width, saveImageSize.height)
  }, [mainCanvasSize.width, mainCanvasSize.height, saveImageSize.width, saveImageSize.height])

  // const sendToServer = useCallback(async () => {
  //   const hiddenCtx = hiddenCanvasRef.current.getContext("2d");
  //   hiddenCtx.drawImage(
  //     mainCanvasRef.current,
  //     0,
  //     0,
  //     saveImageSize.width,
  //     saveImageSize.height
  //   );
  //   const dataURL = hiddenCanvasRef.current.toDataURL("image/png");
  //
  //   try {
  //     const response = await fetch("/api/save-image", {
  //       method: "POST",
  //       body: JSON.stringify({ imageLabel, imageData: dataURL }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //
  //     if (response.ok) {
  //       console.log("Image saved successfully!");
  //       clearCanvas();
  //     } else {
  //       console.error("Error saving image:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error saving image:", error);
  //   }
  // }, [imageLabel, clearCanvas]);

  return {
    mainCanvasRef,
    hiddenCanvasRef,
    clearCanvas,
    sendPredict,
    startDrawing,
    draw,
    stopDrawing,
    result,
  }
}

export default useCanvas
