import { useState } from 'react'
import { PageSeo } from '~/components/SEO'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ProjectCard } from '~/components/ProjectCard'
import type { ProjectFrontMatter } from '~/types/mdx'
import { PROJECT_TYPE } from '~/types/mdx'
import { getAllFilesFrontMatter } from '~/libs/mdx.server'

export async function getStaticProps({ locale }) {
  let project = getAllFilesFrontMatter(`${locale}/project`)

  return {
    props: {
      projectData: project,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default function Index({ projectData }: { projectData: ProjectFrontMatter[] }) {
  const [activeType, setActiveType] = useState(PROJECT_TYPE.SELF)
  const { t } = useTranslation('common')
  const description = t('project.project_description')

  const filteredProjects = projectData.filter(({ projectType }) => projectType === activeType)

  return (
    <>
      <PageSeo
        title={`${t('project.project_title')} - ${t('site_meta_data.author')} - ${t(
          'site_meta_data.title'
        )}`}
        description={description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-0 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('project.project_title')}
          </h1>
          <p className="text-base md:text-lg md:leading-7 text-gray-500 dark:text-gray-400">
            {description}
          </p>
          <div>
            <button
              className={`w-48 px-4 py-2 text-2xl font-semibold text-gray-900 bg-transparent hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600 ${
                activeType === PROJECT_TYPE.SELF
                  ? 'border-b-4 border-blue-500 dark:border-orange-300'
                  : ''
              }`}
              onClick={() => setActiveType(PROJECT_TYPE.SELF)}
            >
              {t('project.side_title')}
            </button>
            <button
              className={`w-48 px-4 py-2 text-2xl font-semibold text-gray-900 bg-transparent hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-600 ${
                activeType === PROJECT_TYPE.WORK
                  ? 'border-b-4 border-blue-500 dark:border-orange-300'
                  : ''
              }`}
              onClick={() => setActiveType(PROJECT_TYPE.WORK)}
            >
              {t('project.work_title')}
            </button>
          </div>
        </div>
        <div className="container py-8">
          <div className="-m-4 flex flex-wrap">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
