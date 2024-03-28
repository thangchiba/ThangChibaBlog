import React from 'react'

interface AudioPlayerProps {
  audioUrl: string
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio controls src={audioUrl} preload="metadata" className="w-full">
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default AudioPlayer
