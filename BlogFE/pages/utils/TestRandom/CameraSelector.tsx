import React from 'react'

const CameraSelector = ({ cameraDevices, onSelectCamera }) => {
  const [selectedCameraId, setSelectedCameraId] = React.useState<string>('')

  React.useEffect(() => {
    if (cameraDevices.length > 0 && !selectedCameraId) {
      setSelectedCameraId(cameraDevices[0].deviceId)
      onSelectCamera(cameraDevices[0].deviceId)
    }
  }, [cameraDevices, selectedCameraId, onSelectCamera])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = event.target.value
    setSelectedCameraId(deviceId)
    onSelectCamera(deviceId)
  }

  return (
    <div className="relative">
      <select
        id="camera"
        value={selectedCameraId}
        onChange={handleChange}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {cameraDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CameraSelector
