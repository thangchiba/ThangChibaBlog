import { useTranslation } from 'next-i18next'

export function Footer() {
  let { t } = useTranslation('common')

  return (
    <footer>
      <div className="mb-8 mt-16 items-center justify-center space-y-4 md:mb-10 md:flex md:space-y-0">
        <div className="my-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`Copyright © ${new Date().getFullYear()}`}</div>
          <span>{` • `}</span>
          <span>{t('build_with.copyright_author')}</span>
        </div>
      </div>
    </footer>
  )
}
