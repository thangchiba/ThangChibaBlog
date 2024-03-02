import { BlogMeta } from '~/components/blog/BlogMeta'
import { BlogTags } from '~/components/blog/BlogTags'
import { Comments } from '~/components/comments'
import { PageTitle } from '~/components/PageTitle'
import { ScrollTopButton } from '~/components/ScrollTopButton'
import { SectionContainer } from '~/components/SectionContainer'
import { BlogSeo, PageSeo } from '~/components/SEO'
import { siteMetadata } from '~/data/siteMetadata'
import type { PostSimpleLayoutProps, ProjectLayoutProps } from '~/types/layout'
import { errors } from 'rehype-parse/lib/errors'

export function ProjectLayout(props: ProjectLayoutProps) {
  let { frontMatter, children, description, commentConfig } = props
  let { date, title, slug, fileName, tags, readingTime } = frontMatter

  return (
    <SectionContainer>
      <PageSeo title={title} description={description} />
      <ScrollTopButton />
      <article>
        <div>
          <header className="py-6 xl:pb-16 xl:pt-16">
            <div className="space-y-6">
              <BlogTags tags={tags} />
              <PageTitle>{title}</PageTitle>
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <BlogMeta date={date} slug={slug} readingTime={readingTime} />
                </div>
              </dl>
            </div>
          </header>
          <div className="pb-8" style={{ gridTemplateRows: 'auto 1fr' }}>
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose prose-base max-w-none pb-8 dark:prose-dark md:prose-lg">
                {children}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <Comments frontMatter={frontMatter} config={commentConfig} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

export default ProjectLayout
