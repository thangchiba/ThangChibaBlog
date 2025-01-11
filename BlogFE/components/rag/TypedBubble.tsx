import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { useLocale } from '~/hooks/useLocale'
import { useTranslation } from 'next-i18next'

export default function TypedBubble() {
  const typedRef = useRef<HTMLSpanElement>(null)
  const [locale] = useLocale() // Keeping this if locale usage is planned in future
  const { t } = useTranslation('common')

  const showStrings = Array.from({ length: 6 }, (_, i) => t(`rag.bubble_chat.rb_${i + 1}`))

  useEffect(() => {
    if (typedRef.current) {
      const typedInstance = new Typed(typedRef.current, {
        strings: showStrings,
        typeSpeed: 35,
        backSpeed: 15,
        loop: true,
        backDelay: 2500,
      })

      return () => {
        typedInstance.destroy()
      }
    }
  }, [showStrings])

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
