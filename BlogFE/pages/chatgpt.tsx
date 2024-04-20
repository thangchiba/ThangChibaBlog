import React, { useState } from 'react'
import RedirectionModal from '~/components/common/RedirectModalProps'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getStaticProps({ locale }: { params: { slug: string[] }; locale: string }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) },
  }
}

const ChatGPTPage = () => {
  const [isModalOpen, setModalOpen] = useState(true)
  let { t } = useTranslation('common')

  return (
    <div>
      <RedirectionModal
        isOpen={isModalOpen}
        title={t('chatgpt_redirect.title')}
        content={t('chatgpt_redirect.content')}
        link="https://ai.thangchiba.com"
        onClose={() => setModalOpen(false)}
      />
      {/* Other content of the page can go here */}
    </div>
  )
}

export default ChatGPTPage
