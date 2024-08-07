import { useTranslation } from 'next-i18next'
import { Link } from './Link'
import type { BlogFrontMatter } from '~/types/mdx'
import { BlogMeta } from '~/components/blog/BlogMeta'
import MediaDisplay from '~/components/MediaDisplay'

type BlogCardProps = { frontMatter: BlogFrontMatter }

export function BlogCard({ frontMatter }: BlogCardProps) {
  let { t } = useTranslation('common')
  let { title, summary, images, slug, tags, date, readingTime, video } = frontMatter

  return (
    <div className="md md:w-1/2 py-2" style={{ maxWidth: '544px' }}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-transparent shadow-nextjs dark:shadow-nextjs-dark">
        <MediaDisplay title={'Demo'} video={video} images={images} />
        <div className="flex grow flex-col justify-between p-4 md:p-6">
          <Link href={`/blog/${slug}`} aria-label={`Link to ${title}`}>
            <div className="space-y-3 cursor-pointer">
              <h2 className="text-2xl font-bold leading-tight tracking-tight">
                {slug ? <span data-umami-event="project-title-link">{title}</span> : title}
              </h2>
              <div className="max-w-none space-y-2 text-gray-500 dark:text-gray-400">
                <p>{summary}</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="mt-auto mb-4 md:mb-6 px-4 md:px-6">
          <BlogMeta date={date} slug={slug} readingTime={readingTime} layout="horizontal" />
        </div>
      </div>
    </div>
  )
}
