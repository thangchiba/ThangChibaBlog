import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import InputWithLabel from '~/components/ui/InputWithLabel'
import FilePreview from '~/components/utils/UploadFile/FilePreview'
import { file } from '@babel/types'

const UploadForm = () => {
  const [path, setPath] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadUrls, setUploadUrls] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    setPreviews(
      acceptedFiles.map((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setPreviews((prev) => [...prev, reader.result as string])
          }
          reader.readAsDataURL(file)
        }
        return '' // Return empty string for non-image files or files we don't preview
      })
    )
  }, [])

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
        const data = await response.json()
        setUploadUrls((prev) => [...prev, data.url])
        alert('File uploaded successfully!')
      } else {
        alert('Upload failed.')
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  return (
    <div className="p-6">
      <InputWithLabel
        label={'Upload Path'}
        value={path}
        onChange={setPath}
        placeholder={'Enter path of file here'}
      />
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 rounded-md p-6 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or use the button below to select files</p>
      </div>
      {previews.map(
        (preview, index) =>
          preview && <img key={index} src={preview} alt="Preview" className="mt-4 max-h-40" />
      )}
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={uploadFiles}
      >
        Upload Files
      </button>
      {uploadUrls.map((url, index) => (
        <div key={index} className="mt-4">
          <p>
            Uploaded to:
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </p>
        </div>
      ))}
    </div>
  )
}

export default UploadForm
