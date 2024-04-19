import { useState } from 'react'
import { Pagination } from '~/components/Pagination'
import { PostsSearch } from '~/components/PostsSearch'
import type { ListLayoutProps } from '~/types/layout'
import { useTranslation } from 'next-i18next'
import { BlogCard } from '~/components/BlogCard'
import { BlogCardHorizontal } from '~/components/BlogCardHorizontal'

export function NewListLayout(props: ListLayoutProps) {
  let { posts, title, initialDisplayPosts = [], pagination } = props
  let { t } = useTranslation('common')
  let [searchValue, setSearchValue] = useState('')
  let filteredBlogPosts = posts
    ? posts.filter((frontMatter) => {
        let searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
        return searchContent.toLowerCase().includes(searchValue.toLowerCase())
      })
    : []

  // If initialDisplayPosts exist, display it if no searchValue is specified
  let displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <header className="space-y-4 pb-12 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-base md:text-lg md:leading-7 text-gray-500 dark:text-gray-400">
            {t('blog.intro')}
          </p>
          <PostsSearch onChange={setSearchValue} />
        </header>
        {!filteredBlogPosts.length && t('blog.no_posts')}
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {displayPosts.map((frontMatter) => (
              <>
                {/* Conditional rendering based on screen size */}
                <div className={`w-full ${frontMatter.slug}`}>
                  {/* Hide on small screens, show on medium and larger screens */}
                  <div className="hidden md:block">
                    <BlogCardHorizontal frontMatter={frontMatter} />
                  </div>

                  {/* Show on small screens, hide on medium and larger screens */}
                  <div className="block md:hidden">
                    <BlogCard frontMatter={frontMatter} />
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}

export default NewListLayout
