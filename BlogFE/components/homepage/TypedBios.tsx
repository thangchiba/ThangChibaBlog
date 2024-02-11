import { useTranslation } from 'next-i18next'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { Twemoji } from '../Twemoji'
import { useLocale } from '~/hooks/useLocale'

function createTypedInstance(el: HTMLElement) {
  return new Typed(el, {
    stringsElement: '#bios',
    typeSpeed: 40,
    backSpeed: 10,
    loop: true,
    backDelay: 1000,
  })
}

export function TypedBios() {
  let el = useRef(null)
  let typed = useRef(null)
  let [locale] = useLocale()
  let tr = useTranslation('common')

  useEffect(() => {
    if (tr.ready) {
      typed.current?.destroy()
      typed.current = createTypedInstance(el.current)
    }
  }, [locale, tr])

  return (
    <div>
      <ul id="bios" className="hidden">
        <li>{tr.t('bio_1')}</li>
        <li>{tr.t('bio_2')}</li>
        {/*<Twemoji emoji="video-game" />*/}
        <li>{tr.t('bio_3')}</li>
        <li>{tr.t('bio_4')}</li>
        <li>{tr.t('bio_5')}</li>
        <li>{tr.t('bio_6')}</li>
        <li>{tr.t('bio_7')}</li>
        <li>{tr.t('bio_8')}</li>
        <li>{tr.t('bio_9')}</li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}
