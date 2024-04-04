import React, { useState, useEffect } from 'react'

type RandomNumberGeneratorProps = {
  hashString: string
}

const RandomNumberGenerator: React.FC<RandomNumberGeneratorProps> = ({ hashString }) => {
  const [min, setMin] = useState<number>(0)
  const [max, setMax] = useState<number>(100)
  const [randomNumber, setRandomNumber] = useState<number | null>(null)

  useEffect(() => {
    if (hashString) {
      // Convert a portion of the hash into an integer
      const hashPart = hashString.substring(0, 8) // taking first 8 hex characters for simplicity
      const hashInt = parseInt(hashPart, 16)

      // Ensure min is less than max
      const adjustedMin = Math.min(min, max)
      const adjustedMax = Math.max(min, max)

      // Calculate the random number within the specified range
      const num = adjustedMin + (hashInt % (adjustedMax - adjustedMin + 1))
      setRandomNumber(num)
    }
  }, [hashString, min, max])

  return (
    <div className="flex justify-between align-middle items-center my-3">
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <span>Min</span>
        </span>
        <input
          type="number"
          value={min}
          onChange={(e) => setMin(parseInt(e.target.value))}
          className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Min Value"
        />
      </div>

      {randomNumber !== null && (
        <p className="text-center align-middle text-lg font-semibold text-indigo-600 dark:text-yellow-300">
          <span className="font-bold text-5xl">{randomNumber}</span>
        </p>
      )}

      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <span>Max</span>
        </span>
        <input
          type="number"
          value={max}
          onChange={(e) => setMax(parseInt(e.target.value))}
          className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Max Value"
        />
      </div>
    </div>
  )
}

export default RandomNumberGenerator
