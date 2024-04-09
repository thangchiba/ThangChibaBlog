import React, { useState } from 'react'
import menuMap from '~/data/menuMap'
import Sidebar from '~/pages/utils/Sidebar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PageSeo } from '~/components/SEO'
import { useTranslation } from 'next-i18next'

export async function getStaticProps({ locale }: { locale: string }) {
  const translation = await serverSideTranslations(locale, ['common'])
  return {
    props: translation,
  }
}

const UtilsPage = () => {
  const [activeComponent, setActiveComponent] = useState('tts')
  let { t } = useTranslation('common')
  let description = t('utils.utils_description')

  const handleNavigation = (endpoint: string) => {
    setActiveComponent(endpoint)
  }

  const ActiveComponent = menuMap[activeComponent]?.component

  if (!ActiveComponent) {
    console.error('ActiveComponent is not defined:', activeComponent)
    return <div>Error: Component not found!</div>
  }

  return (
    <div className="relative flex bg-gray-100 dark:bg-gray-800 rounded-2xl h-[90vh]">
      <PageSeo
        title={`${t('utils.utils_title')} - ${t('site_meta_data.author')} - ${t(
          'site_meta_data.title'
        )}`}
        description={description}
      />
      <Sidebar
        onNavigate={handleNavigation}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      <div className="flex-1 xl:px-5 mt-11 xl:mt-0">
        <ActiveComponent />
      </div>
    </div>
  )
}

export default UtilsPage
