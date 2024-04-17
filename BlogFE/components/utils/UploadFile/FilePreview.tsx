import React from 'react'

interface FilePreviewProps {
  file: File & { preview: string; size: number; uploadedURL?: string }
  onRemove: (fileName: string) => void
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  const formatSize = (size: number) => {
    if (size >= 1024 * 1024 * 1024) return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
    if (size >= 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB'
    return (size / 1024).toFixed(2) + ' KB'
  }

  const formattedName = file.name.length > 24 ? file.name.substring(0, 24) + '...' : file.name

  return (
    <div className="relative p-2 border rounded-lg">
      <button
        onClick={(e) => {
          e.preventDefault()
          onRemove(file.name)
        }}
        className="absolute w-8 h-8 right-0 top-0 text-red-500 bg-transparent text-3xl"
      >
        ×
      </button>
      <img src={file.preview} alt={file.name} className="max-h-40 mx-auto" />
      <p className="text-md truncate mt-2">
        {formattedName} - {formatSize(file.size)}
      </p>
      <p>{file.uploadedURL}</p>
    </div>
  )
}

export default FilePreview
