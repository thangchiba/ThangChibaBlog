import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'
import Sidebar from '~/pages/utils/Sidebar'
import menuMap from '~/pages/utils/menuMap'

export async function getStaticProps({ locale }: { locale: string }) {
  const translation = await serverSideTranslations(locale, ['common'])
  return {
    props: translation,
  }
}

const UtilsPage = () => {
  const [activeComponent, setActiveComponent] = useState('tts')

  console.log(activeComponent)
  const handleNavigation = (endpoint: string) => {
    setActiveComponent(endpoint)
  }

  const ActiveComponent = menuMap[activeComponent]?.component

  if (!ActiveComponent) {
    console.error('ActiveComponent is not defined:', activeComponent)
    return <div>Error: Component not found!</div>
  }

  return (
    <div className="relative flex bg-gray-50 dark:bg-gray-800 rounded-2xl h-[90vh]">
      <Sidebar onNavigate={handleNavigation} />
      <div className="flex-1 xl:px-5 mt-11 xl:mt-0">
        <ActiveComponent />
      </div>
    </div>
  )
}

export default UtilsPage
