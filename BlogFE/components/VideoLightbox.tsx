import React from 'react'

interface VideoLightboxProps {
  closeLightbox: () => void
  url: string
}

export const VideoLightbox: React.FC<VideoLightboxProps> = ({ closeLightbox, url }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative">
        <button className="absolute top-0 right-0 m-4 text-white" onClick={closeLightbox}>
          Close
        </button>
        <div className="w-full h-full flex justify-center items-center">
          <iframe
            width="860"
            height="515"
            src={url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}
