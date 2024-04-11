import React from 'react'

interface MorseSpeedSliderProps {
  wpm: number
  onWpmChange: (wpm: number) => void
}

const MorseSpeedSlider: React.FC<MorseSpeedSliderProps> = ({ wpm, onWpmChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-600 rounded-lg py-1 mt-5">
      <span className="w-4/12 inline-flex items-center px-3 text-xl text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
        <span className="">Speed(WPM) : </span>
        <span className="font-bold text-3xl text-yellow-300"> {wpm}</span>
      </span>
      <div className="w-7/12">
        <input
          type="range"
          min="1"
          max="50"
          value={wpm}
          onChange={(e) => onWpmChange(Number(e.target.value))}
          className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full h-2 appearance-none cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  )
}

export default MorseSpeedSlider
