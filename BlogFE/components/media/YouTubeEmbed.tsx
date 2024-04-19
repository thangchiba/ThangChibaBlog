import React from 'react'

interface YouTubeEmbedProps {
  url: string // URL of the YouTube video
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
  const videoId = new URLSearchParams(new URL(url).search).get('v')

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      ></iframe>
    </div>
  )
}

export default YouTubeEmbed
