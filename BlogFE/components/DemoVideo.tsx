import React, { useState } from 'react'
import clsx from 'clsx'
import { VideoLightbox } from './VideoLightbox'

interface VideoProps {
  shouldOpenLightbox?: boolean
  url: string

  [key: string]: any // Allows for additional props
}

const getEmbedUrl = (url: string) => {
  const videoId = url.split('v=')[1]?.split('&')[0]
  return `https://www.youtube.com/embed/${videoId}`
}

export function DemoVideo({ shouldOpenLightbox = true, url, ...rest }: VideoProps) {
  const [openLightbox, setOpenLightbox] = useState(false)

  const handleOpenLightbox = () => {
    if (!shouldOpenLightbox) return
    document.documentElement.classList.add('lightbox-loading')
    setOpenLightbox(true)
  }

  const embedUrl = getEmbedUrl(url)
  const className = clsx(
    'flex justify-center',
    shouldOpenLightbox && 'cursor-zoom-in',
    rest.className
  )

  return (
    <>
      <div
        className={className}
        onClick={handleOpenLightbox}
        style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}
        {...rest}
      >
        <iframe
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        ></iframe>
      </div>
      {openLightbox && (
        <VideoLightbox closeLightbox={() => setOpenLightbox(false)} url={embedUrl} />
      )}
    </>
  )
}
