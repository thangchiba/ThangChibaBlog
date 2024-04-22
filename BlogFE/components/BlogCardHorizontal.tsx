import { useTranslation } from 'next-i18next'
import { Image } from './Image'
import { Link } from './Link'
import type { BlogFrontMatter } from '~/types/mdx'
import { BlogMeta } from '~/components/blog/BlogMeta'

type BlogCardProps = { frontMatter: BlogFrontMatter }

export function BlogCardHorizontal({ frontMatter }: BlogCardProps) {
  const { t } = useTranslation('common')
  const { title, summary, images, slug, tags, date, readingTime } = frontMatter
  const defaultImage = '/static/images/dog-no-avaiable-banner.webp'

  return (
    <div className="md p-4 md:w-full ">
      <div className="flex h-full w-full overflow-hidden rounded-2xl border border-transparent shadow-nextjs dark:shadow-nextjs-dark">
        <div className="w-2/5">
          <Image
            alt={title}
            src={(images && images[0]) || defaultImage}
            className="rounded-2xl object-cover"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            width={1088}
            height={300}
          />
        </div>
        <div className="flex flex-col justify-between w-3/5 p-6">
          <Link href={`/blog/${slug}`} aria-label={`Link to ${title}`} className="flex-grow">
            <div className="space-y-1 cursor-pointer">
              <h2 className="text-2xl font-bold leading-tight">{title}</h2>
              <div className="text-gray-500 dark:text-gray-400 overflow-hidden">
                <p className="line-clamp-6">{summary}</p>
              </div>
            </div>
          </Link>
          <BlogMeta date={date} slug={slug} readingTime={readingTime} layout="horizontal" />
        </div>
      </div>
    </div>
  )
}
