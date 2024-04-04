import React from 'react'

type LoadingProp = {
  label?: string
}

const LoadingIndicator: React.FC<LoadingProp> = ({ label }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="text-center">
        <div className="w-48 h-48 bg-black bg-opacity-75 rounded-lg flex flex-col justify-center items-center">
          <div className="mb-4 text-2xl font-bold text-white animate-pulse">
            {label ? label : 'Downloading'}
          </div>
          <div className="w-16 h-16 border-4 border-t-4 border-l-green-500 border-r-red-500 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingIndicator
