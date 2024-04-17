import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import InputWithLabel from '~/components/ui/InputWithLabel'
import FilePreview from './FilePreview' // Make sure the path to this component is correct

const UploadForm = () => {
  const [path, setPath] = useState('')
  const [files, setFiles] = useState([])
  const [previewFiles, setPreviewFiles] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((currentFiles) => [...currentFiles, ...acceptedFiles])
    const newPreviewFiles = acceptedFiles.map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
      size: file.size,
    }))
    setPreviewFiles((currentPreviewFiles) => [...currentPreviewFiles, ...newPreviewFiles])
  }, [])

  const removeFile = (fileName) => {
    setFiles((currentFiles) => currentFiles.filter((file) => file.name !== fileName))
    setPreviewFiles((currentPreviewFiles) =>
      currentPreviewFiles.filter((file) => file.name !== fileName)
    )
    // Optionally revoke the URL to avoid memory leaks
    const fileToRemove = previewFiles.find((file) => file.name === fileName)
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.preview)
    }
  }

  const uploadFiles = async () => {
    if (!files.length) return

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('path', path)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        // Optionally update UI or state here upon successful upload
      } else {
        alert(`Upload of ${file.name} failed.`)
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: previewFiles.length !== 0,
  })

  return (
    <div className="p-6">
      <InputWithLabel
        label="Upload Path"
        value={path}
        onChange={setPath}
        placeholder="Enter path of file here"
      />
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 rounded-md p-6 text-center cursor-pointer flex flex-col space-y-5"
      >
        <input {...getInputProps()} />
        {previewFiles.length === 0 && (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        {previewFiles.map((file, index) => (
          <FilePreview key={index} file={file} onRemove={removeFile} />
        ))}
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={uploadFiles}
      >
        Upload Files
      </button>
    </div>
  )
}

export default UploadForm
