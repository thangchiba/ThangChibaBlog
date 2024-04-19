import { useTranslation } from 'next-i18next'
import type { ProjectCardProps } from '~/types/components'
import { Image } from './Image'
import { Link } from './Link'

export function ProjectCard({ project }: ProjectCardProps) {
  let { t } = useTranslation('common')
  let { title, summary, images, url, slug, repo } = project

  return (
    <div className="md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-transparent shadow-nextjs dark:shadow-nextjs-dark">
        <Image
          alt={title}
          src={images[0]}
          className="object-cover object-center md:h-36 lg:h-60 rounded-2xl"
          width={1088}
          height={612}
        />{' '}
        <div className="flex grow flex-col justify-between space-y-6 p-4 md:p-6">
          <Link href={`/project/${slug}`} aria-label={`Link to ${title}`}>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold leading-10 tracking-tight">
                {slug ? <span data-umami-event="project-title-link">{title}</span> : title}
              </h2>
              <div className="max-w-none space-y-2 text-gray-500 dark:text-gray-400">
                <p>{summary}</p>
                <div className="space-y-2">
                  {['Built With', 'FE', 'BE', 'DB', 'Network', 'Infra', 'Tools', 'Keywords'].map(
                    (category) => {
                      const key = category.toLowerCase() // Convert category to lowercase to match the project2 keys
                      const technologies = project[key] // Get technologies array using dynamic key

                      // Only render this category if there are technologies defined
                      return (
                        technologies &&
                        technologies.length > 0 && (
                          <div key={category} className="flex items-center flex-wrap">
                            <span className="shrink-0 font-semibold text-gray-600 dark:text-gray-300 mr-2">
                              {category} :
                            </span>
                            <div className="flex flex-wrap space-x-1.5">
                              {technologies.map((tech, index) => (
                                <span
                                  key={index}
                                  className="font-semibold text-gray-600 dark:text-gray-300"
                                >
                                  {tech}
                                  {index !== technologies.length - 1 && ','}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      )
                    }
                  )}
                </div>
              </div>
            </div>
          </Link>

          <div className="flex justify-between cursor-pointer">
            {slug && (
              <Link
                href={`/project/${slug}`}
                className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 animate-bounce cursor-pointer"
                aria-label={`Link to detail of ${title}`}
              >
                <span data-umami-event="project-learn-more">{t('project.learn_more')} &rarr;</span>
              </Link>
            )}
            {url && (
              <Link
                href={url}
                className="flex items-center text-base font-medium leading-6 text-green-400 hover:text-green-600 dark:hover:text-green-400 animate-pulse"
                aria-label={`Link to live page of ${title}`}
              >
                <svg className="ml-2 w-4 h-4" viewBox="0 0 8 8" fill="currentColor">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                <span data-umami-event="project-learn-more">{t('project.live_page')}</span>
              </Link>
            )}
          </div>
        </div>{' '}
      </div>
    </div>
  )
}
