import React from 'react'

interface VideoProps {
  url: string

  [key: string]: any // Allows for additional props
}

const getEmbedUrl = (url: string) => {
  const videoId = url.split('v=')[1]?.split('&')[0]
  return `https://www.youtube.com/embed/${videoId}`
}

export function DemoVideo({ url, ...rest }: VideoProps) {
  const embedUrl = getEmbedUrl(url)

  return (
    <>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }} {...rest}>
        <iframe
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        ></iframe>
      </div>
    </>
  )
}

export default DemoVideo
