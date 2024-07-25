import { BlogMeta } from '~/components/blog/BlogMeta'
import { BlogTags } from '~/components/blog/BlogTags'
import { Comments } from '~/components/comments'
import { PageTitle } from '~/components/PageTitle'
import { ScrollTopButton } from '~/components/ScrollTopButton'
import { SectionContainer } from '~/components/SectionContainer'
import { BlogSeo } from '~/components/SEO'
import { SocialShareButtons } from '~/components/SocialShareButtons'
import { siteMetadata } from '~/data/siteMetadata'
import type { PostSimpleLayoutProps } from '~/types/layout'
import AudioPlayer from '~/components/media/AudioPlayer'
import { useRouter } from 'next/router'
import MediaDisplay from '~/components/MediaDisplay'

export function PostSimple(props: PostSimpleLayoutProps) {
  const router = useRouter()
  let { frontMatter, type, children, authorDetails, commentConfig } = props
  let { date, title, slug, fileName, tags, readingTime, audioURL, images, video } = frontMatter
  let postUrl = `${siteMetadata.siteUrl}/${router.locale}/${type}/${slug}`

  return (
    <SectionContainer>
      <BlogSeo url={`${postUrl}`} authorDetails={authorDetails} {...frontMatter} />
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
                  <BlogMeta date={date} slug={slug} readingTime={readingTime} showView={true} />
                </div>
              </dl>
              <MediaDisplay title={'Demo'} video={video} images={images} />
            </div>
          </header>
          <div className="pb-8" style={{ gridTemplateRows: 'auto 1fr' }}>
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose prose-base max-w-none pb-8 dark:prose-dark md:prose-lg">
                {audioURL && (
                  <div className="mb-5 w-full">
                    <AudioPlayer audioUrl={audioURL} />
                  </div>
                )}
                {children}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <SocialShareButtons postUrl={postUrl} title={title} fileName={fileName} />
                <Comments frontMatter={frontMatter} config={commentConfig} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

export default PostSimple
