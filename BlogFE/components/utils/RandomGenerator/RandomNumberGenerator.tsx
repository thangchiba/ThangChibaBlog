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
    <div className="w-full mt-5 mx-auto  bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Min:
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Max:
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400"
          />
        </label>
      </div>
      {randomNumber !== null && (
        <p className="text-center text-lg font-semibold text-indigo-600 dark:text-yellow-300">
          Random Number: <span className="font-bold text-xl">{randomNumber}</span>
        </p>
      )}
    </div>
  )
}

export default RandomNumberGenerator
