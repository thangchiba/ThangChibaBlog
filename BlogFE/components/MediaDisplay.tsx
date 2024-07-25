import React from 'react'
import { DemoVideo } from '~/components/DemoVideo'
import NextImage from 'next/image'

interface MediaDisplayProps {
  video?: string
  images?: string[]
  title: string
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({ video, images = [], title }) => {
  const hasVideo = Boolean(video)
  const hasImage = images.length > 0
  return (
    <div style={{ width: '100%' }}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-transparent shadow-nextjs dark:shadow-nextjs-dark">
        {hasVideo ? (
          <DemoVideo
            className="object-cover object-center md:h-36 lg:h-60 rounded-2xl"
            url={video!}
          />
        ) : hasImage ? (
          <NextImage
            alt={title}
            src={images[0]}
            layout="responsive"
            width={16}
            height={9}
            className="object-cover object-center rounded-2xl"
          />
        ) : (
          <div className="flex items-center justify-center h-60 bg-gray-200 dark:bg-gray-700 rounded-2xl">
            <p className="text-gray-500 dark:text-gray-400">No media available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MediaDisplay
