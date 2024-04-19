import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import InputWithLabel from '~/components/ui/InputWithLabel'
import FilePreview from './FilePreview' // Make sure the path to this component is correct

const UploadForm = () => {
  const [path, setPath] = useState('')
  const [password, setPassword] = useState('')
  const [files, setFiles] = useState([])
  const [previewFiles, setPreviewFiles] = useState([])
  console.log(files)

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((currentFiles) => [...currentFiles, ...acceptedFiles])
    const newPreviewFiles = acceptedFiles.map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
      size: file.size,
      url: undefined,
      type: file.type,
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

  const removeFiles = () => {
    setFiles([])
    setPreviewFiles([])
  }

  const uploadFiles = async () => {
    if (!files.length) return

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('path', path)
      formData.append('password', password)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        const index = files.indexOf(file)
        if (index !== -1) {
          setPreviewFiles((currentPreviewFiles) =>
            currentPreviewFiles.map((prev, idx) => (idx === index ? { ...prev, url } : prev))
          )
        }
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
    <div className="p-6 border-2 rounded-xl border-blue-500 space-y-5">
      <InputWithLabel
        label="Password"
        value={password}
        onChange={setPassword}
        placeholder="Enter password to upload"
        labelWidth={120}
      />
      <InputWithLabel
        label="Upload Path"
        value={path}
        onChange={setPath}
        placeholder="Enter path of file here"
        labelWidth={120}
      />
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 rounded-md mt-5 p-1 md:p-6 text-center cursor-pointer flex flex-col"
      >
        <input {...getInputProps()} />
        {previewFiles.length === 0 && (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        {previewFiles.map((file, index) => (
          <FilePreview key={index} file={file} onRemove={removeFile} />
        ))}
      </div>
      <div className="flex justify-around">
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={uploadFiles}
        >
          Upload Files
        </button>
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={removeFiles}
        >
          Remove All
        </button>
      </div>
    </div>
  )
}

export default UploadForm
