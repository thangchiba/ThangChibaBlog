import { useTranslation } from 'next-i18next'
import type { BlogMetaProps } from '~/types/components'
import { formatDate } from '~/utils/date'
import { Twemoji } from '../Twemoji'
import { ViewCounter } from '../ViewCounter'

export function BlogMeta({
  date,
  slug,
  readingTime,
  layout = 'horizontal',
  showView,
}: BlogMetaProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <dd
      className={`flex ${
        layout === 'vertical' ? 'flex-col' : 'flex-wrap'
      } text-sm font-medium leading-3 text-gray-500 dark:text-gray-400 md:text-base`}
    >
      <time
        dateTime={date}
        className={`flex items-center ${layout === 'vertical' ? 'mb-2' : 'justify-center'}`}
      >
        <Twemoji emoji="calendar" size="" />
        <span className={`ml-1.5 md:ml-2`}>{formatDate(date, lang)}</span>
      </time>
      <div className={`flex items-center ${layout === 'vertical' ? 'my-2' : ''}`}>
        <Twemoji emoji="hourglass-not-done" size="" />
        <span className={`ml-1.5 md:ml-2`}>
          {t('blog.reading_time', { time: Math.ceil(readingTime.minutes) })}
        </span>
      </div>
      {layout === 'horizontal' && <span className="mx-2">{' • '}</span>}
      {showView && (
        <>
          {layout === 'horizontal' && <span className="mx-2">{' • '}</span>}
          <div className={`flex items-center ${layout === 'vertical' ? 'mt-2' : ''}`}>
            <Twemoji emoji="eye" size="" />
            <ViewCounter className="ml-1.5 md:ml-2" slug={slug} />
          </div>
        </>
      )}
    </dd>
  )
}
