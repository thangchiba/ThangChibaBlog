import { useTranslation } from 'next-i18next'
import { Link } from '~/components/Link'
import { BlogTags } from '~/components/blog/BlogTags'
import { FEATURED_POSTS } from '~/constant'
import type { BlogFrontMatter } from '~/types/mdx'
import { formatDate } from '~/utils/date'
import { BlogCardHorizontal } from '~/components/BlogCardHorizontal'
import { BlogCard } from '~/components/BlogCard'

export function FeaturedPosts({ posts }: { posts: BlogFrontMatter[] }) {
  let { t, i18n } = useTranslation()
  let lang = i18n.language
  return (
    <div className="border-t border-gray-200 dark:border-gray-700">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && 'No posts found.'}
        {posts.slice(0, FEATURED_POSTS).map((frontMatter) => {
          let { slug, date, title, summary, tags } = frontMatter
          return (
            <div key={'post-' + frontMatter.title} className={`w-full ${frontMatter.slug}`}>
              {/* Hide on small screens, show on medium and larger screens */}
              <div className="hidden md:block">
                <BlogCardHorizontal frontMatter={frontMatter} />
              </div>
              {/* Show on small screens, hide on medium and larger screens */}
              <div className="block md:hidden">
                <BlogCard frontMatter={frontMatter} />
              </div>
            </div>
          )
        })}
      </ul>
      {posts.length > FEATURED_POSTS && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-2xl text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 animate-bounce"
            aria-label="all posts"
          >
            <span data-umami-event="all-posts"> {t('blog.all_posts_title')} &rarr;</span>
          </Link>
        </div>
      )}
    </div>
  )
}
