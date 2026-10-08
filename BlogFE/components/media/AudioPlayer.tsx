import React from 'react'
import { useTranslation } from 'next-i18next'

interface AudioPlayerProps {
  audioUrl: string
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const { t } = useTranslation('common')

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        controls
        src={audioUrl}
        preload="metadata"
        className="w-full"
        aria-label={t('audio.label')}
      >
        {t('audio.unsupported')}
      </audio>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t('audio.generated')}</p>
    </div>
  )
}

export default AudioPlayer
