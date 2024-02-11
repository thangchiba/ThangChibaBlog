import { useTranslation } from 'next-i18next'

export function ShortDescription() {
  let { t } = useTranslation('common')

  return (
    <div className="mb-8 mt-4">
      <ul>
        <li>{t('bio_i_love')}</li>
        <li>{t('bio_i_want')}</li>
        <li>{t('bio_i_will')}</li>
        <li>{t('bio_i_share')}</li>
      </ul>
    </div>
  )
}
