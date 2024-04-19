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
  let workProject = projectData.filter(({ projectType }) => projectType === PROJECT_TYPE.WORK)
  let sideProject = projectData.filter(({ projectType }) => projectType === PROJECT_TYPE.SELF)
  let { t } = useTranslation('common')

  let description = t('project.project_description')

  return (
    <>
      <PageSeo
        title={`${t('project.project_title')} - ${t('site_meta_data.author')} - ${t(
          'site_meta_data.title'
        )}`}
        description={description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('project.project_title')}
          </h1>
          <p className="text-base md:text-lg md:leading-7 text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="container py-12">
          <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            {t('project.work_title')}
          </h3>
          <div className="-m-4 flex flex-wrap">
            {workProject.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
        <div className="container py-12">
          <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            {t('project.side_title')}
          </h3>
          <div className="-m-4 flex flex-wrap">
            {sideProject.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
