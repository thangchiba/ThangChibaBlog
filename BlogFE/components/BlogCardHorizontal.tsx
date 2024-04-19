import { useTranslation } from 'next-i18next'
import { Image } from './Image'
import { Link } from './Link'
import type { BlogFrontMatter } from '~/types/mdx'
import { BlogMeta } from '~/components/blog/BlogMeta'

type BlogCardProps = { frontMatter: BlogFrontMatter }

export function BlogCardHorizontal({ frontMatter }: BlogCardProps) {
  let { t } = useTranslation('common')
  let { title, summary, images, slug, tags, date, readingTime } = frontMatter
  let defaultImage =
    'https://thangchiba-storage.s3.ap-northeast-1.amazonaws.com/blog/images/dog-no-avaiable-banner.webp'

  return (
    <div className="md p-4 md:w-full" style={{ maxWidth: '1088px', height: '350px' }}>
      <div className="flex h-full w-full overflow-hidden rounded-2xl border border-transparent shadow-nextjs dark:shadow-nextjs-dark">
        <div className="w-1/3">
          <Image
            alt={title}
            src={(images && images[0]) || defaultImage}
            className="w-full h-full object-cover rounded-l-2xl"
            width={544} // You might adjust or remove these if they conflict with CSS sizes
            height={350} // Same as above
          />
        </div>
        <div className="flex flex-col justify-between w-2/3 p-4 md:p-6">
          <Link href={`/blog/${slug}`} aria-label={`Link to ${title}`} className="flex-grow">
            <div className="space-y-3 cursor-pointer">
              <h2 className="text-2xl font-bold leading-tight">{title}</h2>
              <div className="text-gray-500 dark:text-gray-400 overflow-hidden">
                <p className="line-clamp-3">{summary}</p> {/* Ensures text doesn't overflow */}
              </div>
            </div>
          </Link>
          <BlogMeta date={date} slug={slug} readingTime={readingTime} layout="horizontal" />
        </div>
      </div>
    </div>
  )
}
