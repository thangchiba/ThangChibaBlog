import React from 'react'

interface FilePreviewProps {
  file: File & { preview: string; size: number; url?: string }
  onRemove: (fileName: string) => void
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  const formatSize = (size: number) => {
    if (size >= 1024 * 1024 * 1024) return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
    if (size >= 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB'
    return (size / 1024).toFixed(2) + ' KB'
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert('URL copied to clipboard!')
      },
      (err) => {
        alert('Failed to copy URL: ' + err)
      }
    )
  }

  return (
    <div className="relative flex p-0 md:p-2 border rounded-lg items-center space-x-4 my-2">
      <img src={file.preview} alt={file.name} className="w-24 h-24 object-cover" />
      <div className="flex flex-col flex-grow py-1">
        <p className="text-md truncate font-semibold text-left">File Name: {file.name}</p>
        <p className="text-md text-left">Size: {formatSize(file.size)}</p>
        <p className="text-md text-left">Type: {file.type}</p>
        {file.url && (
          <div className="flex">
            <p className="text-green-800 hidden md:block dark:text-green-500 text-left">
              {file.url}
            </p>
            <button
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-0 px-4 rounded transition-colors duration-300 cursor-pointer"
              onClick={() => copyToClipboard(file.url)}
            >
              Copy URL
            </button>
          </div>
        )}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault()
          onRemove(file.name)
        }}
        className="absolute top-0 right-0 text-red-500 bg-transparent text-3xl px-2 rounded hover:bg-red-100"
        style={{ top: '-5px', right: '0px' }} // Adjust these values as needed for alignment
      >
        ×
      </button>
    </div>
  )
}

export default FilePreview
