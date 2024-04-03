import React, { useState, useEffect } from 'react'

const CameraSelector = () => {
  const [cameras, setCameras] = useState([])
  const [selectedCamera, setSelectedCamera] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    navigator?.mediaDevices?.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput')
      setCameras(videoDevices)
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].label)
      }
    })
  }, [])

  const handleSelectCamera = (camera) => {
    setSelectedCamera(camera.label)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <form className="w-full mx-auto">
        <select
          id="camera"
          onSelect={(e) => handleSelectCamera(e.target)}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {cameras.map((camera, index) => (
            <option key={'camera' + index}>{camera.label || `Camera ${index + 1}`} </option>
          ))}
        </select>
      </form>
    </div>
  )
}

export default CameraSelector
