import { useTranslation } from 'next-i18next'
import { Twemoji } from '~/components/Twemoji'

export function Heading() {
  let { t } = useTranslation('common')

  return (
    <h1 className="text-neutral-900 dark:text-neutral-200">
      <p>
        {t('introduction')}
        <span className="absolute ml-1.5 inline-flex pt-[3px]">
          <Twemoji emoji="flag-vietnam" />
        </span>
      </p>
      <p>
        {t('introduction_2')}
        <span className="absolute ml-1.5 inline-flex pt-[3px]">
          <Twemoji emoji="flag-japan" />
        </span>
      </p>
    </h1>
  )
}
