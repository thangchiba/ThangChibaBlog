import React, { useState, useEffect } from 'react'

type HashTrackerProps = {
  hashString: string
  captureCount: number
}

type HashCount = {
  [key: string]: number
}

const HashTracker: React.FC<HashTrackerProps> = ({ hashString, captureCount }) => {
  const [hashCounts, setHashCounts] = useState<HashCount>({})

  useEffect(() => {
    if (captureCount === 0) return
    if (hashString) {
      setHashCounts((prevCounts) => {
        // Check if the hash already exists in the state
        const existingCount = prevCounts[hashString]

        // Update the count for the hash, increment if exists, otherwise set to 1
        const updatedCount = existingCount ? existingCount + 1 : 1

        // Return the updated state
        return {
          ...prevCounts,
          [hashString]: updatedCount,
        }
      })
    }
  }, [hashString, captureCount]) // This effect should run whenever hashString changes

  return (
    <div>
      <h3>Hash Counts: {Object.keys(hashCounts).length}</h3>
      <table>
        <thead>
          <tr>
            <th>Hash String</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(hashCounts).map(([hash, count]) => (
            <tr key={hash}>
              <td>{hash}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HashTracker
