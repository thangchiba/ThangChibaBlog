// components/TypedBubble.tsx
import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { useLocale } from '~/hooks/useLocale'
import { useTranslation } from 'next-i18next'

export default function TypedBubble() {
  const typedRef = useRef<HTMLSpanElement>(null)

  let el = useRef(null)
  let typed = useRef(null)
  let [locale] = useLocale()
  let { t } = useTranslation('common')

  const show_str = []
  for (let i = 1; i <= 6; i++) {
    const key = `rag_bubble_chat.rb_${i}`
    show_str.push(t(key))
  }

  useEffect(() => {
    if (typedRef.current) {
      const typedInstance = new Typed(typedRef.current, {
        strings: show_str,
        typeSpeed: 35,
        backSpeed: 20,
        loop: true,
        backDelay: 2500,
      })

      return () => {
        typedInstance.destroy()
      }
    }
  }, [t])

  return (
    <div
      className="
        absolute
        bottom-[4.6rem]
        right-[0rem]
        transition-all
        duration-300
        ease-in-out
        w-[130px]
      "
    >
      <div
        className="
          inline-block
          px-2
          py-2
          text-sm
          text-gray-700
          bg-white
          border
          border-gray-300
          rounded-xl
          shadow
        "
      >
        <span ref={typedRef} />
      </div>
    </div>
  )
}
