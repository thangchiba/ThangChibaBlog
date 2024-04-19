import React from 'react'
import { useTranslation } from 'next-i18next'

interface RedirectionModalProps {
  isOpen: boolean
  title: string
  content: string
  link: string
  onClose: () => void
}

const RedirectionModal: React.FC<RedirectionModalProps> = ({
  isOpen,
  title,
  content,
  link,
  onClose,
}) => {
  if (!isOpen) return null
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { t } = useTranslation('common')

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center px-4 py-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold dark:text-white mb-2">{title}</h2>
        <hr className="border-t border-gray-300 dark:border-gray-700" />
        <p className="mt-4 dark:text-gray-300 mb-5">{content}</p>
        <hr className="border-t border-gray-300 dark:border-gray-700" />
        <div className="mt-6 space-x-4 flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white rounded px-5 py-2">
            {t('modals.redirect.no')}
          </button>
          <button
            onClick={() => (window.location.href = link)}
            className="bg-blue-500 text-white rounded px-5 py-2"
          >
            {t('modals.redirect.ok')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RedirectionModal
